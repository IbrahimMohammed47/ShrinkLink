function GenericLoginViewModel(url, gotoPage) {
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
      }).then(response => {
        console.log('Request success: ', response)
        return response.json()
      }).then((data) => {
        console.log('Request success: ', data);
        localStorage.setItem("authData", data.authData)
        localStorage.setItem("userData", JSON.stringify(data.userData))
        window.location.href = gotoPage;
      }).catch(function (err) {
        console.log(err)
      })
    };
  };
}
const DoctorLoginViewModel = GenericLoginViewModel("http://localhost:5000/api/doctors/login", "editSlots.html");
const UserLoginViewModel = GenericLoginViewModel("http://localhost:5000/api/patients/login", "doctorsListing.html");

ko.applyBindings(new DoctorLoginViewModel(), document.getElementById("doctorLoginId"));
ko.applyBindings(new UserLoginViewModel(), document.getElementById("userLoginId"));

$('#goToRegister').click(e => {
  window.location.href = "register.html";
})
