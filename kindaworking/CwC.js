 function register() { 
var email = document.getElementById("em").value;
var password = document.getElementById("psw").value;
var fname = document.getElementById("fname").value;
var sname = document.getElementById("sname").value;
firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    firebase.database().ref('users/' + user.uid).set({
        fname: fname,
        sname: sname, 
        email: email,
        password:password
    });   
    });
}
 function login(){
     var email = document.getElementById("logemail").value;
     var password = document.getElementById("logpw").value;    
     console.log(email);
     console.log(password);
     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
     var errorCode = error.code;
     var errorMessage = error.message;
        console.log(errorCode);
         console.log(errorMessage);
});
     
     
   
     
 }

$( document ).ready(function() {
    var query = firebase.database().ref("Recipies/Tomato Cod").orderByKey();
     query.once("value").then(function(snapshot) {
     snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
        console.log(childData);
        document.getElementById("test123").innerHTML = childData;
  });
         
});
});
