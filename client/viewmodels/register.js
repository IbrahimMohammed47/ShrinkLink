function DoctorRegisterViewModel() {
  let self = this

  self.firstName = ko.observable();
  self.lastName = ko.observable();
  self.password = ko.observable();
  self.specialization = ko.observable();
  self.email = ko.observable();
  self.mobileNumber = ko.observable();
  self.place = ko.observable();
  self.register = () => {
    fetch("https://localhost:5000/api/doctors/create", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: self.firstName(),
        lastName: self.lastName(),
        password: self.password(),
        specialization: self.specialization(),
        email: self.email(),
        mobileNumber: self.mobileNumber(),
        place: self.place(),
      })
    }).then(response =>
      response.json()
    ).then((data) => {
      console.log('Request success: ', data);
    }).catch(function (err) {
      console.log(err)
    })
  }
}
function UserRegisterViewModel() {
  let self = this

  self.firstName = ko.observable();
  self.lastName = ko.observable();
  self.password = ko.observable();
  self.email = ko.observable();
  self.mobileNumber = ko.observable();
  self.age = ko.observable();
  self.gender = ko.observable();
  self.register = () => {
    fetch("https://localhost:5000/api/patients/create", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: self.firstName(),
        lastName: self.lastName(),
        password: self.password(),
        email: self.email(),
        mobileNumber: self.mobileNumber(),
        age: self.age(),
        gender: self.gender(),
      })
    }).then(response =>
      response.json()
    ).then((data) => {
      console.log('Request success: ', data);
    }).catch(function (err) {
      console.log(err)
    })
  }
}

ko.applyBindings(new DoctorRegisterViewModel(), document.getElementById("doctorRegisterId"));
ko.applyBindings(new UserRegisterViewModel(), document.getElementById("userRegisterId"));


$('#goToLogin').click(e => {
  window.location.replace("login.html");
})
