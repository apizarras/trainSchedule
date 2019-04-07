const config = {
    apiKey: "AIzaSyCRMTdEkIR1SZvRuvG3RnGE7ZXrKchpef8",
    authDomain: "trains-77778.firebaseapp.com",
    databaseURL: "https://trains-77778.firebaseio.com",
    projectId: "trains-77778",
    storageBucket: "trains-77778.appspot.com",
    messagingSenderId: "271228660033"
};

firebase.initializeApp(config);

const database = firebase.database();

let name = "";
let destination = "";
let firstTime = "";
let frequency = "";

$("#add-train").on("click", function(event) {
    event.preventDefault();

    let name = $("#train-name").val().trim();
    let destination = $("#destination").val().trim();
    let firstTime = $("#first-time").val().trim();
    let frequency = $("#frequency").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    });
});

database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val().name);

    // if(snapshot.child("name").exists()) {
    //     let trainName = snapshot.val().name;
    //     let destination = snapshot.val().destination;
    //     let firstTime = snapshot.val().firstTime;
    //     let frequency = snapshot.val().frequency;
    
        $("#name-output").text(snapshot.val().trainName);
        $("#destination-output").text(snapshot.val().destination);
        $("#first-time-output").text(snapshot.val().firstTime);
        $("#frequency").text(snapshot.val().frequency);
    // }
});