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
    $("#success-msg").text("you have successfully added a new train schedule")
});

database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val().name);

    let name = snapshot.val().name;
    let destination = snapshot.val().destination;
    let firstTime = snapshot.val().firstTime;
    let frequency = snapshot.val().frequency;

    const firstTimePretty = moment(firstTime).format('MMMM Do YYYY, h:mm:ss a')

    const currentTime = moment().format('hh:mm');
    console.log("current time" + currentTime);

    let timeDifference = moment().diff(moment(firstTime),"minutes");
    console.log("time diff" + timeDifference);

    let timeRemainder = timeDifference % frequency;
    console.log("remainder" + timeRemainder);

    let timeTillNextTrain = frequency - timeRemainder;
    console.log("min till next train" + timeTillNextTrain);

    let nextTime = moment().add(timeTillNextTrain, "minutes");
    console.log("next train time" + nextTime);

    let nextTimeFormat = moment(nextTime).format('hh:mm a');

    
    const newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(firstTimePretty),
        $("<td>").text(nextTimeFormat),
        $("<td>").text(frequency)
    );
    $("#train-table > tbody").append(newRow);
});

    // if(snapshot.child("name").exists()) {
    //     let trainName = snapshot.val().name;
    //     let destination = snapshot.val().destination;
    //     let firstTime = snapshot.val().firstTime;
    //     let frequency = snapshot.val().frequency;