$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA8EQvpvwgU_Vkwc65hQisHG-SCNwOfcAg",
        authDomain: "train-timetable-4c923.firebaseapp.com",
        databaseURL: "https://train-timetable-4c923.firebaseio.com",
        projectId: "train-timetable-4c923",
        storageBucket: "",
        messagingSenderId: "755926022566"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    // Grab data from Firebase when node added
    database.ref().on("child_added",function(childSnapshot){
        // Get values from database
        let dbTrainName = childSnapshot.val().trainName;
        let dbTrainDest = childSnapshot.val().trainDest;
        let dbTrainFirst = moment(childSnapshot.val().trainFirst, "HH:mm");
        let dbTrainFreq = childSnapshot.val().trainFreq;

        // Calculate the hours and minutes difference between now and first train
        let currentTime = moment();
        let hourDiff = currentTime.diff(dbTrainFirst, 'hours');
        let minuteDiff = currentTime.diff(dbTrainFirst, 'minutes'); 
        let hourDuration = Math.floor(minuteDiff/60);
        let minuteDuration = minuteDiff % 60;

        // Calculate minutes left until next train
        let mod = minuteDuration % dbTrainFreq;
        let minutesLeft = dbTrainFreq - mod;

        // Calculate next train time
        let duration = moment.duration({'minute':minutesLeft});
        let nextTrain = currentTime.add(duration).format('LT');

        // Add data to the table
        $(".js-train-data").append('<tr class = "train" data-train = "train"> <td>'+ dbTrainName + '</td> <td>' + dbTrainDest + '</td> <td>' + dbTrainFreq + '</td> <td>' + nextTrain+ '</td> <td>'+ minutesLeft + '</td>');

    });

    // Click Events

    // On submit send data to firebase
    $("#submit").on("click", function(){
        event.preventDefault();

        // Get input values
        let trainName = $("#name").val().trim();
        let trainDest = $("#destination").val().trim();
        let trainFirst =$("#first").val().trim();
        let trainFreq = $("#freq").val().trim();

        // Send data to firebase
        database.ref().push({
            trainName: trainName,
            trainDest: trainDest,
            trainFirst: trainFirst,
            trainFreq: trainFreq
        });

        // Clear out input fields
        $("#name").val('');
        $("#destination").val('');
        $("#first").val('');
        $("#freq").val('');

    });

    // CSS styling
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    // Collapsing sidebar
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

});