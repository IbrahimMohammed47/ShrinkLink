let doctor = localStorage.getItem("userData") ? JSON.parse(localStorage.userData) : null
const docSchedule = doctor.slots || {}
for (const slot in docSchedule) {
  if (docSchedule[slot] === 'true') {
    $(`#${slot}`).prop("checked", true)
  }
  else {
    $(`#${slot}`).prop("indeterminate", true)
    $(`#${slot}`).prop("disabled", true)

  }
}

$(".editbtn").click((event) => {
  if ($("#" + event.target.id).prop("checked")) {
    docSchedule[event.target.id] = true
  }
  else {
    if (docSchedule[event.target.id]) {
      delete docSchedule[event.target.id]
    }
  }
})

$("#saveBtn").click(event => {
  if (doctor) {
    localStorage.setItem("userData", JSON.stringify({ ...doctor, slots: docSchedule }))
    fetch(`http://localhost:5000/api/doctors/edit/${doctor.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'auth ' + localStorage.getItem("authData")
      },
      body: JSON.stringify({
        slots: docSchedule,
      })
    }).then(response => {
      console.log('Request success: ', response)
      window.alert("schedule is saved !");
    }).catch(function (err) {
      console.log(err)
    })
  }
})