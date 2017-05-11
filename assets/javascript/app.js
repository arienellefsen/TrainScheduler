// 1. Initialize Firebase

  var config = {
    apiKey: "AIzaSyDXQH0CGPXl5pHGsZNsLhJxKPlD88GhvS4",
    authDomain: "train-96764.firebaseapp.com",
    databaseURL: "https://train-96764.firebaseio.com",
    projectId: "train-96764",
    storageBucket: "train-96764.appspot.com",
    messagingSenderId: "110253274809"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

// 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

// Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var empStart = $("#start-input").val().trim();
  var frequency = $("#frequency-input").val().trim();  

// Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    start: empStart,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var empStart = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;
  var tFrequency = frequency;

  var firstTime = empStart;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;    

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  
  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

