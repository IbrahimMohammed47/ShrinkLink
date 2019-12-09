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
    fetch("http://localhost:5000/api/doctors/create", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: ko.toJSON(this)
    }).then(response => {
      console.log('Request success: ', response);
      window.alert("Registraion succesful !");
      window.location.href = "login.html";
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
    fetch("http://localhost:5000/api/patients/create", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: ko.toJSON(this)
    }).then(response => {
      console.log('Request success: ', response);
      window.alert("Registraion succesful !");
      window.location.href = "login.html";
    }).catch(function (err) {
      console.log(err)
    })
  }
}

ko.applyBindings(new DoctorRegisterViewModel(), document.getElementById("doctorRegisterId"));
ko.applyBindings(new UserRegisterViewModel(), document.getElementById("userRegisterId"));


$('#goToLogin').click(e => {
  window.location.href = "login.html";
})
