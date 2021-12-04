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

  var $signin = document.querySelector('#signin')
  var provider = new firebase.auth.GoogleAuthProvider()
  
  $signin.addEventListener('click', function() {
    firebase.auth().signInWithRedirect(provider)
  })

  firebase.auth().onAuthStateChanged(function(user) {
    var $profile = document.querySelector('#profile')
    if (user) {
      $profile.innerHTML = `
        <div>uid: ${user['uid']}</div>
        <div>displayName: ${user['displayName']}</div>
        <div>email: ${user['email']}</div>
        <img src="${user['photoURL']}" width="96">
      `
    } else {
      $profile.innerHTML = `
        <p>Please sign in!</p>
      `
    }
  })

  var $signout = document.querySelector('#signout')

  $signout.addEventListener('click', function() {
    firebase.auth().signOut().then(function() {
      location.reload()
    })
  })




  var ref = db.ref('/info')
  ref.push({
    url: 'https://firebase.google.com/'
  })  

  






const generateId = (idLength = 7) => {
  let id
  const idHeadSrc = "abcdefghijklmnopqrstuvwxyz"
  const idBodySrc = "0123465789" + idHeadSrc
  const getRandomCharacter = (src) => src[Math.floor(Math.random() * src.length)]
  const generateRandomString = () => {
    id = "" + getRandomCharacter(idHeadSrc)
    for (let i = 0; i < idLength - 1; i++) {
      id += getRandomCharacter(idBodySrc)
    }
    if (!/\d/.test(id)) {
      generateRandomString()
    }
  }
  generateRandomString()
  return id
}


  document.querySelector('#id').innerHTML = generateId()
})
