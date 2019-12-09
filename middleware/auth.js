const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createToken = (email, id) => {
  let expirationDate = Math.floor(Date.now() / 1000) + 14400; //4 hours from now...
  var token = jwt.sign({ email: email, id: id, exp: expirationDate }, process.env.JWTSECRET);
  return token;
}

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) return res.status(400).send('request missing headers');
  jwt.verify(((req.headers.authorization.split(' '))[1]), process.env.JWTSECRET, function (err, decoded) {
    if (err) console.log(err)
    if (decoded) {
      req.userId = decoded.id;
      return next();
    } else {
      return res.status(401).send('Please log in first');
    }
  })
}

const login = (Model) => async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body)
  let member = await Model.findOne({ where: { email: email } })
  if (!member) return res.status(401).send("Either your E-mail or Password is wrong.")

  let flag = bcrypt.compareSync(password, member.password);
  if (flag) {
    res.json({
      authData: createToken(email, member.id),
      userData: {
        email: email,
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        membershipExpiryDate: member.membershipExpiryDate,
        slots: member.slots ? member.slots : null
      }
    })
  }
  else {
    res.status(401).send("Either your E-mail or Password is wrong.")
  }
}


module.exports = {
  login,
  verifyToken
}