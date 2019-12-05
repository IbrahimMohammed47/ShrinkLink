
function GenericLoginViewModel(url) {
  return function () {
    let self = this
    self.email = ko.observable();
    self.password = ko.observable();
    self.login = () => {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: self.email(),
          password: self.password(),
        })
      }).then(response =>
        response.json()
      ).then((data) => {
        console.log('Request success: ', data);
        localStorage.setItem("authData", data.authData)
        localStorage.setItem("userData", JSON.stringify(data.userData))
      }).catch(function (err) {
        console.log(err)
      })
    };
  };
}
const DoctorLoginViewModel = GenericLoginViewModel("https://localhost:5000/api/doctors/login");
const UserLoginViewModel = GenericLoginViewModel("http://localhost:5000/api/patients/login");

ko.applyBindings(new DoctorLoginViewModel(), document.getElementById("doctorLoginId"));
ko.applyBindings(new UserLoginViewModel(), document.getElementById("userLoginId"));
