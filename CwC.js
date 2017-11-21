var config = {
    apiKey: "AIzaSyC-GPyE5zrbTHM8VtE1B5EIUsvbYIt9IxY",
    authDomain: "cwc-2017.firebaseapp.com",
    databaseURL: "https://cwc-2017.firebaseio.com",
    projectId: "cwc-2017",
    storageBucket: "cwc-2017.appspot.com",
    messagingSenderId: "377243567404"
};
firebase.initializeApp(config);

var str5="a";
var test1="test";
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
    var database=firebase.database();
    var user = firebase.auth().currentUser;
    var author = user.displayName;
    var title = $("#RecipeName").val();
    var sFriendly = $("#StudentSuitable").val();
    var method = $("#MethodInput").val();
    var ingredients = $("#IngredientsInput").val();
    var type=$("#SelectRecipeType").val();

    var RecipeData = {
      author: author,
      title: title,
      method: method,
      ingredients: ingredients
    };

    if (type=="Food"){
      var ref=database.ref('Recipes/Food recipes /');
      ref.push(RecipeData);
      alert("Success!");
    }
    else{
      var ref=database.ref('Recipes/Cocktails/');
      ref.push(RecipeData);
      alert("Success!");
    }
}
function displayDB() {
      var database=firebase.database();
      var index = 0;
      var index2 = 0;
      var ref=database.ref('Recipes/Food recipes /');
      var ref2=database.ref('Recipes/Cocktails/');
	  var ref3=database.ref('Recipes/Food recipes /');
      //pull food from the db
      ref.once("value")
        .then(function(snapshot) {
          ref.once("value", function(snapshot) {
            snapshot.forEach(function(child) {
              var ingredients = child.val().ingredients;
              var method = child.val().method;
              var title = child.val().title;

                $('#accordion').append(
                    `<div class="card">
                        <div class="card-header" role="tab" id="heading${index}">
                            <h5 class="mb-0">
                                <a data-toggle="collapse" href="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                      ${title}
                                </a>
                            </h5>
                        </div>
                        <div id="collapse${index}" class="collapse" role="tabpanel" aria-labelledby="heading${index}" data-parent="#accordion">
                            <div class="card-body">
                              <strong>Ingredients: </strong>
                              ${ingredients}<br>
                                <strong>  Cooking method: </strong>
                              ${method}
                            </div>
                        </div>
                    </div>`
                );
                index += 1;
                index2=index;
              });
            });
        });

        ref2.once("value")
          .then(function(snapshot) {
            ref2.once("value", function(snapshot) {
              snapshot.forEach(function(child) {
                var ingredients = child.val().ingredients;
                var method = child.val().method;
                var title = child.val().title;;
                  $('#accordion2').append(
                      `<div class="card">
                          <div class="card-header" role="tab" id="heading${index2}">
                              <h5 class="mb-0">
                                  <a data-toggle="collapse" href="#collapse${index2}" aria-expanded="true" aria-controls="collapse${index2}">
                                        ${title}
                                  </a>
                              </h5>
                          </div>
                          <div id="collapse${index2}" class="collapse" role="tabpanel" aria-labelledby="heading${index2}" data-parent="#accordion2">
                              <div class="card-body">
                              <strong>Ingredients: </strong>
                                ${ingredients}<br>
                                  <strong> Mixing method: </strong>
                                ${method}
                              </div>
                          </div>
                      </div>`
                  );
                  index2 += 1;

                });
              });
          });
		  ref3.once("value")
        .then(function(snapshot) {
          ref3.once("value", function(snapshot) {
            snapshot.forEach(function(child) {
			var student = child.val().student;	
              var ingredients = child.val().ingredients;
              var method = child.val().method;
              var title = child.val().title;
			  
			  if(student=="Yes"){
                $('#accordion3').append(
                    `<div class="card">
                        <div class="card-header" role="tab" id="heading${index}">
                            <h5 class="mb-0">
                                <a data-toggle="collapse" href="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                      ${title}
                                </a>
                            </h5>
                        </div>
                        <div id="collapse${index}" class="collapse" role="tabpanel" aria-labelledby="heading${index}" data-parent="#accordion">
                            <div class="card-body">
                              <strong>Ingredients: </strong>
                              ${ingredients}<br>
                                <strong>  Cooking method: </strong>
                              ${method}
                            </div>
                        </div>
                    </div>`
			  );
			  }
                index2 += 1;
			});
            });
        });
      }

displayDB()