
function DoctorsViewModel() {
  this.doctors = ko.observableArray([
    new DoctorViewModel({ firstName: 'Zaki', lastName: 'Sami', speciazlization: 'insomnia', rating: 3, mobileNumber: 681315, place: "wara el D" }),
    new DoctorViewModel({ firstName: 'Ash', lastName: 'Alex', speciazlization: 'blabla', rating: 2, mobileNumber: 1612315, place: "wara el D" }),
    new DoctorViewModel({ firstName: 'Ahmed', lastName: 'Ashraf', speciazlization: 'schezophernia', rating: 3.7, mobileNumber: 132124, place: "wara el D" })
  ])
}
let doctorsViewModel = new DoctorsViewModel()

function DoctorViewModel(data) {
  this.id = data.id
  this.firstName = ko.observable(data.firstName)
  this.lastName = ko.observable(data.lastName)
  this.fullName = ko.computed(() => this.firstName() + " " + this.lastName())
  this.speciazlization = ko.observable(data.specialization)
  this.rating = ko.observable(data.rating)
  this.mobileNumber = ko.observable(data.mobileNumber)
  this.place = ko.observable(data.place)
}
DoctorViewModel.prototype.viewSchedule = function () {
  localStorage.setItem("viewedDoctor", this.id)
  window.location.href = "viewSlots.html";
}

fetch('http://localhost:5000/api/doctors/list', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
}).then(response => {
  return response.json()
}).then((data) => {
  console.log('Request success: ', data);
  data.forEach(doc => {
    console.log(doc.specialization)
    doctorsViewModel.doctors.push(new DoctorViewModel(doc))
  });
}).catch(function (err) {
  console.log(err)
})


// ko.applyBindings({
//   doctors: [
//     new DoctorModel({ firstName: 'Zaki', lastName: 'Sami', speciazlization: 'insomnia', rating: 3, mobileNumber: 681315, place: "wara el D" }),
//     new DoctorModel({ firstName: 'Ash', lastName: 'Alex', speciazlization: 'blabla', rating: 2, mobileNumber: 1612315, place: "wara el D" }),
//     new DoctorModel({ firstName: 'Ahmed', lastName: 'Ashraf', speciazlization: 'schezophernia', rating: 3.7, mobileNumber: 132124, place: "wara el D" })
//   ]
// });

ko.applyBindings(doctorsViewModel);