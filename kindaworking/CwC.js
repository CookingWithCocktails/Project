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

//$( document ).ready(function() {
//	var count = 1;
//    var query = firebase.database().ref("Test1/Chicken curry/Cooking method").orderByKey();
//     query.once("value").then(function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//      var key = childSnapshot.key;
//      var childData = childSnapshot.val();
//        console.log(childData);
//        document.getElementById("test123").innerHTML += count + ")" + " " + childData + ". <br>";
//		count++;
//  });
//         
//});
//});

$( document ).ready(function() {
	function boldString(str, find){
    var re = new RegExp(find, 'g');
    return str.replace(re, '<b>'+find+'</b>');
}
    var query = firebase.database().ref("Test1").orderByKey();
     query.once("value").then(function(snapshot) {
     snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
        console.log(childData);
		str = JSON.stringify(childData, null, 4);
		var str2 = str.replace(/,/g, "<br>")
		var str3 = str2.replace(/"/g, " ")
		var str4 = str3.replace(/}/g, " ")
		var str5 = str4.replace(/{/g, " ")
		var str6 = boldString(str5,"Cooking method");
		var str7 = boldString(str6,"Ingredients")
        document.getElementById("test123").innerHTML += " " + str7 + ". <br>" + " ";
  });
         
});
});
