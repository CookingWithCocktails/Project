// Initialize Firebase
var config = {
    apiKey: "AIzaSyC-GPyE5zrbTHM8VtE1B5EIUsvbYIt9IxY",
    authDomain: "cwc-2017.firebaseapp.com",
    databaseURL: "https://cwc-2017.firebaseio.com",
    projectId: "cwc-2017",
    storageBucket: "cwc-2017.appspot.com",
    messagingSenderId: "377243567404"
};

firebase.initializeApp(config);
var thisid;
var index = 0;
window.onload = function () {
    var uiConfig = {
        callbacks: {
            signInSuccess: function () {
                $("#firebaseui-auth-container").hide();
                $("#UILogged").show();
                // $('#accountDropdown').dropdown('toggle')
                return false;
            },
        },
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
            //Specify providers you want to offer your users.
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
    };
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    firebase.auth().onAuthStateChanged(function (user) {
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

function SubmitRecipe(e) {
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    if (user == null) {
        alert("Please log in/register in order to submit a recipe");
        return false;  
    }
    else {

        var author = user.displayName;
        var title = $("#RecipeName").val();
        var sFriendly = $("#StudentSuitable").val();
        var method = $("#MethodInput").val();
        var ingredients = $("#IngredientsInput").val();
        var type = $("#SelectRecipeType").val();
        var student = $("#StudentSuitable").val();

        var RecipeData = {
            author: author,
            title: title,
            method: method,
            ingredients: ingredients,
            student: student,
        };

        if (type == "Food") {
            var ref = database.ref('Recipes/Food recipes /');
            ref.push(RecipeData);
            alert("Success!");
        }
        else {
            var ref = database.ref('Recipes/Cocktails/');
            ref.push(RecipeData);
            alert("Success!");
        }
        return true;  
    }
}
$(document).ready(function () {
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var index3 = 0;
    var index2 = 0;
    var ref = database.ref('Recipes/Food recipes /');
    var ref2 = database.ref('Recipes/Cocktails/');
    var ref3 = database.ref('Recipes/Food recipes /');
    var ref4 = database.ref('Recipes/Favourites/');
    //pull food from the db
    ref.once("value")
        .then(function (snapshot) {
            ref.once("value", function (snapshot) {
                snapshot.forEach(function (child) {
                    var ingredients = child.val().ingredients;
                    var method = child.val().method;
                    var title = child.val().title;
                    thisid = child.key;
                    $('#accordion').append(
                        `<div class="card">
                        <div class="card-header" role="tab" id="heading${index}">
                            <h5 class="mb-0 names">
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
                            <div>
                          <button class="btn buto1" id="${thisid}" onClick="reply_click(this.id)">Add to favourites</button>
                            </div>
                        </div>
                    </div>`
                    );
                    index += 1;
                });
            });
        });

    ref.once("value")
        .then(function (snapshot) {
            ref3.once("value", function (snapshot) {
                snapshot.forEach(function (child) {
                    var student = child.val().student;
                    var ingredients = child.val().ingredients;
                    var method = child.val().method;
                    var title = child.val().title;
                    thisid = child.key;
                    if (student == "Yes") {
                        index = index + 1;
                        index2 = index;
                        $('#accordion3').append(
                            `<div class="card">
                          <div class="card-header" role="tab" id="heading${index2}">
                              <h5 class="mb-0">
                                  <a data-toggle="collapse" href="#collapse${index2}" aria-expanded="true" aria-controls="collapse${index}2">
                                        ${title}
                                  </a>
                              </h5>
                          </div>
                          <div id="collapse${index2}" class="collapse" role="tabpanel" aria-labelledby="heading${index2}" data-parent="#accordion3">
                              <div class="card-body">
                                <strong>Ingredients: </strong>
                                ${ingredients}<br>
                                  <strong>  Cooking method: </strong>
                                ${method}
                              </div>
                              <button class="btn buto1" id="${thisid}" onClick="reply_click(this.id)">Add to favourites</button>
                          </div>
                      </div>`
                        );
                    }
                });
            });
        });

    ref2.once("value")
        .then(function (snapshot) {
            ref2.once("value", function (snapshot) {
                snapshot.forEach(function (child) {
                    var ingredients = child.val().ingredients;
                    var method = child.val().method;
                    var title = child.val().title;
                    index = index + 1;
                    index3 = index;
                    thisid = child.key;

                    $('#accordion2').append(
                        `<div class="card">
                          <div class="card-header" role="tab" id="heading${index3}">
                              <h5 class="mb-0">
                                  <a data-toggle="collapse" href="#collapse${index3}" aria-expanded="true" aria-controls="collapse${index3}">
                                        ${title}
                                  </a>
                              </h5>
                          </div>
                          <div id="collapse${index3}" class="collapse" role="tabpanel" aria-labelledby="heading${index3}" data-parent="#accordion2">
                              <div class="card-body">
                              <strong>Ingredients: </strong>
                                ${ingredients}<br>
                                  <strong> Mixing method: </strong>
                                ${method}
                              </div>
                              <button class="btn buto1" id="${thisid}" onClick="reply_click2(this.id)">Add to favourites</button>
                          </div>
                      </div>`
                    );
                });
            });
        });



    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            ref4.once("value")
                .then(function (snapshot) {
                    ref4.once("value", function (snapshot) {
                        snapshot.forEach(function (child) {
                            if (user.uid == child.key) {
                                child.forEach(function (childofchild) {
                                    var ingredients = childofchild.val().ingredients;
                                    var method = childofchild.val().method;
                                    var title = childofchild.val().title;
                                    index = index + 1;
                                    $('#accordion432').append(
                                        `<div class="card">
                       <div class="card-header" role="tab" id="heading${index}">
                           <h5 class="mb-0">
                               <a data-toggle="collapse" href="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                     ${title}
                               </a>
                           </h5>
                       </div>
                       <div id="collapse${index}" class="collapse" role="tabpanel" aria-labelledby="heading${index}" data-parent="#accordion432">
                           <div class="card-body">
                           <strong>Ingredients: </strong>
                             ${ingredients}<br>
                               <strong> Mixing method: </strong>
                             ${method}
                           </div>
                           <button class="btn buto1" id="${title}" onClick="reply_click3(this.id)">Delete from favourites</button>
                       </div>
                           </div>
                   </div>`);
                                });
                            }
                        });
                    });
                });



            // User is signed in.
        } else {
            // No user is signed in.
        }
    });


});
$(document).ready(function () {
    var database = firebase.database();
    var firebaseRef = firebase.database().ref();
    $('#searchedbutton').click(function () {
        var searching = document.getElementById("thissearched").value;
        var database = firebase.database();
        var ref = database.ref('Recipes/Food recipes /');
        var ref2 = database.ref('Recipes/Cocktails/');
        var searchResults = false;
        ref.once("value")
            .then(function (snapshot) {
                ref.once("value", function (snapshot) {
                    snapshot.forEach(function (child) {

                        var ingredients = child.val().ingredients;
                        var method = child.val().method;
                        var title = child.val().title;
                        var lookfor = new RegExp(searching, 'i');
                        if (title.match(lookfor) || ingredients.match(lookfor)) {
                            searchResults = true;
                            index = index + 1;

                            thisid = child.key;
                            $('#searchthings').append(
                                `<div class="card">
                           <div class="card-header" role="tab" id="heading${index}">
                               <h5 class="mb-0">
                                   <a data-toggle="collapse" href="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                         ${title}
                                   </a>
                               </h5>
                           </div>
                           <div id="collapse${index}" class="collapse" role="tabpanel" aria-labelledby="heading${index}" data-parent="#searchthings">
                               <div class="card-body">
                               <strong>Ingredients: </strong>
                                 ${ingredients}<br>
                                   <strong> Mixing method: </strong>
                                 ${method}
                               </div>
                               <button class="btn buto1" id="${thisid}" onClick="reply_click(this.id)">Add to favourites</button>
                           </div>
                       </div>`);
                        }
                    });
                });
            });

        ref2.once("value")
            .then(function (snapshot) {
                ref2.once("value", function (snapshot) {
                    snapshot.forEach(function (child) {
                        var ingredients = child.val().ingredients;
                        var method = child.val().method;
                        var title = child.val().title;
                        var lookfor = new RegExp(searching, 'i');
                        if (title.match(lookfor) || ingredients.match(lookfor)) {
                            searchResults = true;
                            index = index + 1;
                            thisid = child.key;
                            console.log(title);
                            $('#searchthings').append(
                                `<div class="card">
                           <div class="card-header" role="tab" id="heading${index}">
                               <h5 class="mb-0">
                                   <a data-toggle="collapse" href="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                         ${title}
                                   </a>
                               </h5>
                           </div>
                           <div id="collapse${index}" class="collapse" role="tabpanel" aria-labelledby="heading${index}" data-parent="#searchthings">
                               <div class="card-body">
                               <strong>Ingredients: </strong>
                                 ${ingredients}<br>
                                   <strong> Mixing method: </strong>
                                 ${method}
                               </div>
                               <button class="btn buto1" id="${thisid}" onClick="reply_click2(this.id)">Add to favourites</button>
                           </div>
                       </div>`);
                        }
                    });
                    if (!searchResults) {
                        $('#searchthings').html(`<h2 style="text-align: center">No results found! :'(</h2>`);
                    }
                });
            });

        $("#searchthings").empty();
        $("#thissearched").val('');
    });



});

$("#searchedbutton").click(function () {
    $('#search-tab').trigger('click');
});



function reply_click(clicked_id) {
    var user = firebase.auth().currentUser;
    if (user == null) {
        alert("Please log in/register in order to add to favourites");
    }
    else {
        var database = firebase.database();
        var ref = database.ref('Recipes/Food recipes /');
        //pull food from the db
        ref.once("value")
            .then(function (snapshot) {
                ref.once("value", function (snapshot) {
                    snapshot.forEach(function (child) {
                        if (clicked_id == child.key) {
                            var ingredients = child.val().ingredients;
                            var method = child.val().method;
                            var title = child.val().title;


                            var RecipeData = {
                                title: title,
                                method: method,
                                ingredients: ingredients,
                            };
                            var ref = database.ref('Recipes/Favourites/' + user.uid);
                            ref.push(RecipeData);
                            alert("Success");
                            location.reload();
                        }
                    });
                });
            });
    }
}
function reply_click2(clicked_id) {
    var user = firebase.auth().currentUser;
    if (user == null) {
        alert("Please log in/register in order to add to favourites");
    }
    else {
        var database = firebase.database();
        var ref = database.ref('Recipes/Cocktails/');
        //pull food from the db
        ref.once("value")
            .then(function (snapshot) {
                ref.once("value", function (snapshot) {
                    snapshot.forEach(function (child) {
                        if (clicked_id == child.key) {
                            var ingredients = child.val().ingredients;
                            var method = child.val().method;
                            var title = child.val().title;
                            var RecipeData = {
                                title: title,
                                method: method,
                                ingredients: ingredients,
                            };
                            var ref = database.ref('Recipes/Favourites/' + user.uid);
                            ref.push(RecipeData);
                            alert("Success");
                            location.reload();
                        }
                    });
                });
            });
    }
}

function reply_click3(clicked_id) {
    alert(clicked_id);
    var database = firebase.database();
    var ref = database.ref('Recipes/Favourites/');

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            ref.once("value")
                .then(function (snapshot) {
                    ref.once("value", function (snapshot) {
                        snapshot.forEach(function (child) {
                            if (user.uid == child.key) {
                                child.forEach(function (childofchild) {
                                    if (clicked_id == childofchild.val().title) {
                                        console.log(childofchild.key.toString());
                                        location.reload();


                                        childofchild.ref.remove();
                                    }
                                });
                            }
                        });
                    });
                });



            // User is signed in.
        } else {
            // No user is signed in.
        }
    });

}