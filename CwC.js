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

function SubmitRecipe(){
    var user = firebase.auth().currentUser;
    var author = user.displayName;
    var title = $("#RecipeName").val();
    var method = $("#IngredientsInput").val();
    var ingredients = $("#MethodInput").val();
    var entryType = $("#SelectRecipeType").val();

    var RecipeData = {
      author: author,
      title: title,
      method: method,
      ingredients: ingredients
    };
  console.log(RecipeData);
  console.log(entryType);

    //var newPostKey = firebase.database().ref().child('stream').push().key;
   // firebase.database().ref('/stream/' + newPostKey).set(RecipeData);

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

//dbfunc
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
    img_url: "https://firebasestorage.googleapis.com/v0/b/cwc-2017.appspot.com/o/Bolognese.jpg?alt=media&token=a43f2f8c-acfc-4e83-b129-6166369d5b0f",
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