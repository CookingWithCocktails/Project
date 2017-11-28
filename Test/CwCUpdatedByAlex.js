window.onload = function() {
    var uiConfig = {
        callbacks: {
            signInSuccess: function() {
                $("#firebaseui-auth-container").hide();
                $("#UILogged").show();
               // $('#accountDropdown').dropdown('toggle')
              return false;
            },
        },
        credentialHelper:firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
        //Specify providers you want to offer your users.
         firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
    };
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        ui.reset();
        $('#acc').html(firebase.auth().currentUser.displayName);
        $("#firebaseui-auth-container").hide();
        $("#UILogged").show();
      } else {
        ui.start('#firebaseui-auth-container', uiConfig);
        $('#acc').html("Log in/Sign Up!");
        $("#firebaseui-auth-container").show();
        $("#UILogged").hide();
      }
    });
};
/*
//to pull stuff from the database
$( document ).ready(function() {
    function boldString(str, find){
    var re = new RegExp(find, 'g');
    return str.replace(re, '<b>'+find+'</b>');
}
    var query = firebase.database().ref("Recipes/Food recipes /Chicken curry").orderByKey();
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

*/

  var config = {
    apiKey: "AIzaSyC-GPyE5zrbTHM8VtE1B5EIUsvbYIt9IxY",
    authDomain: "cwc-2017.firebaseapp.com",
    databaseURL: "https://cwc-2017.firebaseio.com",
    projectId: "cwc-2017",
    storageBucket: "cwc-2017.appspot.com",
    messagingSenderId: "377243567404"
  };

firebase.initializeApp(config);
database=firebase.database();
var ref=database.ref('Recipes/Food recipes /Chicken curry/');
ref.on('value',gotData, errData);
function errData(err){
  console.log(err);
}


//this is the function that retrieves stuff from the db

function gotData(data){
   var scores=data.val();
    var keys=Object.keys(scores);
//convert object to an array of arrays;
    var result = Object.keys(scores).map(function(key) {
  return [Number(key), scores[key]];
  });
//magic happens here use console.log to make sense of these 2 things
//if possible, change this function to somehow make it working without having to use an arrays of arrays.


var ar=result[1];
var obj2=ar[1];

var ar2=result[0];
var obj1=ar2[1];

//the 2d arrays is printed to the console i.e the ingredients

myArray = Object.keys(obj1).map(v => new Array(v, obj1[v]));
  for(var i=0; i<myArray.length; i++){
  	console.log(myArray[i][0]+": "+myArray[i][1]);
  	}
console.log("displayed separately");
console.log("displayed separately");
console.log("displayed separately");
console.log("displayed separately");

//the 2d arrays is printed to the console i.e the cooking method

  myArray2 = Object.keys(obj2).map(v => new Array(v, obj2[v]));
      for(var i=0; i<myArray2.length; i++){
      	console.log(myArray2[i][0]+": "+myArray2[i][1]);
      	}
}
