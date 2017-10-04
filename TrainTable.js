
  // Initialize Firebase
  



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD-URMCuZ5r3YsbDGyKgye_Wzz_hJ4SVSg",
    authDomain: "traintable-c8e48.firebaseapp.com",
    databaseURL: "https://traintable-c8e48.firebaseio.com",
    projectId: "traintable-c8e48",
    storageBucket: "traintable-c8e48.appspot.com",
    messagingSenderId: "668296204704"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStartDate = moment($("#start-date-input").val().trim(), "hh:mm");
  var trainFrequency = $("#frequency-input").val().trim();

  var firstTime = "05:00";
  var nextTrain = "10 minutes";
  var currentTime = moment();
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % trainFrequency;
  var tMinutesTillTrain = trainFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    startDate: trainStartDate.format(),
    frequency: trainFrequency,
  };
console.log(newTrain);
  // Uploads train data to the database
  database.ref().push(newTrain);

 

  $("next-train-arrival-input").text(nextTrain);

  // Alert
  alert("New train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-date-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStartDate = childSnapshot.val().startDate;
  var trainFrequency = childSnapshot.val().frequency;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStartDate);
  console.log(trainFrequency);

  // Prettify the train start
  var trainStartPretty = moment.unix(trainStartDate).format("hh:mm");


 $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainStartDate + "</td><td>" + trainFrequency + "</td><td>" + nextTrain +"</td></tr>");

  /*$("#first").append("trainName");
  $("#second").append("trainDestination");
  $("third").append("trainStartPretty");
  $("fourth").append("trainFrequency");
  $("fifth").append("nextTrain");*/
});

