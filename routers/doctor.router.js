const express = require('express')
const router = express.Router()

router.get('/register', async (req, res) => {
  res.send("hi")
})

module.exports = router
