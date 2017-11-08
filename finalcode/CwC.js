//register
function register() {
var email = document.getElementById("em").value;
var password = document.getElementById("psw").value;
var fname = document.getElementById("fname").value;
var sname = document.getElementById("sname").value;
var letters=/^[A-z]+$/;
if(!fname.match(letters) || !sname.match(letters)){
  alert("Invalid First Name/Second Name");
}
else{
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
    });
    });
  }
}
//the login
 function login(){
     var email = document.getElementById("logemail").value;
     var password = document.getElementById("logpw").value;
     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
     var errorCode = error.code;
     var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
    $( "#logout" ).click(function() {
         firebase.auth().signOut().then(function() {
           console.log("success");
         }).catch(function(error) {
           console.log("error");
         });
      });
 }

//to pull stuff from the database

 $( document ).ready(function() {
	function boldString(str, find){
    var re = new RegExp(find, 'g');
    return str.replace(re, '<b>'+find+'</b>');
}
    var query = firebase.database().ref("Recipies").orderByKey();
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



let sampleDB=[];
let entry = {
    title: "testing",
    content: "hmm",
    img_url: "https://media.giphy.com/media/3o6nVcDxJmVoZAuoH6/giphy.gif",
    button_txt: "push me",
};
sampleDB.push(entry);
 entry = {
    title: "Tasty Indian Curry",
    content: "Enjoy this tasty curry!",
    img_url: "images/curry.jpg",
    button_txt: "See curry",
};
sampleDB.push(entry);
entry = {
    title: "Spagetti Bolognaise",
    content: "Enjoy this household Fave!!!!!!!!!!",
    img_url: "images/bolog.jpg",
    button_txt: "See recipe",
};

sampleDB.push(entry);

entry = {
    title: "Nom nom",
    content: "Recipes are a thing",
    img_url: "https://media.giphy.com/media/l44QlRRQmJyT8kFuo/giphy.gif",
    button_txt: "Nom nom",
};
sampleDB.push(entry);
entry = {
    title: "Nom nom",
    content: "Recipes are a thing",
    img_url: "https://media.giphy.com/media/l44QlRRQmJyT8kFuo/giphy.gif",
    button_txt: "Nom nom",
};
sampleDB.push(entry);
entry = {
    title: "Nom nom",
    content: "Recipes are a thing",
    img_url: "https://media.giphy.com/media/l44QlRRQmJyT8kFuo/giphy.gif",
    button_txt: "Nom nom",
};
sampleDB.push(entry);

//render func -> pass id and data from db
for(sampleEntry in sampleDB){
    $('#frecipes').append(`<div class="card"> <img class="card-img-top" src="${sampleDB[sampleEntry].img_url}" alt="Card image cap"><div class="card-body"><h4 class="card-title">${sampleDB[sampleEntry].title}</h4><p class="card-text">${sampleDB[sampleEntry].content}</p><button class="btn buto">${sampleDB[sampleEntry].button_txt}</button></div></div> `);
}
