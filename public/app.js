document.addEventListener('DOMContentLoaded', function() {
  var $input = document.querySelector('#input')
  var $output = document.querySelector('#output')
  var db = firebase.database()
  var messageRef = db.ref('/message')

  $input.addEventListener('input', function(e) {
    var target = e.target
    messageRef.set(target.value)
  })

  messageRef.on('value', function(snapshot) {
    $output.textContent = snapshot.val()
  })
})
