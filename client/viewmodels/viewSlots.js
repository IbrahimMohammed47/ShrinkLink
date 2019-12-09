let doctorId = localStorage.getItem("viewedDoctor")

fetch(`http://localhost:5000/api/doctors/view/${doctorId}`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
}).then(response => {
  return response.json()
}).then((data) => {
  $(`#docName`).text(data.firstName + " " + data.lastName);

  console.log('Request success: ', data);
  const docSchedule = data.slots || {}
  for (let day = 0; day < 7; day++) {
    for (let hour = 10; hour < 23; hour += 2) {
      const slot = `${day}-${hour}`;
      if (docSchedule[slot] == undefined) {
        $(`#${slot}`).prop("disabled", true)
      }
      else if (docSchedule[slot] === 'true') {
        $(`#${slot}`).prop("checked", false)
      }
      else {
        $(`#${slot}`).prop("indeterminate", true)
        $(`#${slot}`).prop("disabled", true)
      }
    }
  }

  let chosenSlot = ''
  $(".chooseThis").click((event) => {
    if ($("#" + event.target.id).prop("checked") === true) {
      chosenSlot = event.target.id;
      console.log(chosenSlot)
    }
  })

  $("#bookBtn").click(event => {
    fetch(`http://localhost:5000/api/appointments/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'auth ' + localStorage.getItem("authData")
      },
      body: JSON.stringify({
        slot: chosenSlot,
        doctor_id: doctorId,
      })
    }).then(response => {
      console.log('Request success: ', response)
      window.alert("an email will be sent to you to confirm booking !");
    }).catch(function (err) {
      console.log(err)
    })
  })
}).catch(function (err) {
  console.log(err)
})




// $("#saveBtn").click(event => {
//   if (doctor) {
//     localStorage.setItem("userData", JSON.stringify({ ...doctor, slots: docSchedule }))
//     fetch(`http://localhost:5000/api/doctors/edit/${doctor.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'authorization': 'auth ' + localStorage.getItem("authData")
//       },
//       body: JSON.stringify({
//         slots: docSchedule,
//       })
//     }).then(response => {
//       console.log('Request success: ', response)
//       window.alert("schedule is saved !");
//     }).catch(function (err) {
//       console.log(err)
//     })
//   }
// })