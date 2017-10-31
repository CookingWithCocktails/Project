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

//render func -> pass id and data from db
for(sampleEntry in sampleDB){
    $('#frecipes').append(`<div class="card"> <img class="card-img-top" src="${sampleDB[sampleEntry].img_url}" alt="Card image cap"><div class="card-body"><h4 class="card-title">${sampleDB[sampleEntry].title}</h4><p class="card-text">${sampleDB[sampleEntry].content}</p><button class="btn buto">${sampleDB[sampleEntry].button_txt}</button></div></div> `);   
}