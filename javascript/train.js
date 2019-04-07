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

//see how many active viewers there are
let connections = database.ref("/connections");

let connected = database.ref(".info/connected");

connected.on("value", function(snapshot) {
    if(snapshot.val()) {
        const con = connections.push(true);

        con.onDisconnect().remove();
    }
});
console.log("num of connections " + connections);

connections.on("value", function(snapshot) {
    $("#connected-viewers").text(snapshot.numChildren());
})

let name = "";
let destination = "";
let firstTime = "";
let frequency = "";

//submit button trigger getting form values and pushing them to firebase
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
        $("#success-msg").text("You have successfully added a new train schedule")
});

//listener to see if your firebase object has child items and then display in table
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
    console.log("time diff " + timeDifference);

    let timeRemainder = timeDifference % frequency;
    console.log("remainder " + timeRemainder);

    let timeTillNextTrain = frequency - timeRemainder;
    console.log("min till next train " + timeTillNextTrain);

    let nextTime = moment().add(timeTillNextTrain, "minutes");
    console.log("next train time " + nextTime);

    let nextTimeFormat = moment(nextTime).format('hh:mm a');

    
    const newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(firstTimePretty),
        $("<td>").text(nextTimeFormat),
        $("<td>").text(timeTillNextTrain)
        
    );
    $("#train-table > tbody").append(newRow);
});