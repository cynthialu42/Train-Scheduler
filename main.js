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
    
    database.ref().on("child_added",function(childSnapshot){
        let dbTrainName = childSnapshot.val().trainName;
        let dbTrainDest = childSnapshot.val().trainDest;
        let dbTrainFirst = moment.utc(childSnapshot.val().trainFirst, "HH:mm");
        let dbTrainFreq = childSnapshot.val().trainFreq;

        let currentTime = moment();
        
        let hourDiff = currentTime.diff(dbTrainFirst, 'hours');
        let minuteDiff = currentTime.diff(dbTrainFirst, 'minutes'); 
        let hourDuration = Math.floor(minuteDiff/60);
        let minuteDuration = minuteDiff % 60;

        let mod = minuteDuration % dbTrainFreq;
        let minutesLeft = dbTrainFreq - mod;

        let duration = moment.duration({'minute':minutesLeft});
        let nextTrain = currentTime.add(duration).format('LT');

        $(".js-train-data").append('<tr> <td>'+ dbTrainName + '</td> <td>' + dbTrainDest + '</td> <td>' + dbTrainFreq + '</td> <td>' + nextTrain+ '</td> <td>'+ minutesLeft + '</td>');

    });
    $("#submit").on("click", function(){
        event.preventDefault();

        let trainName = $("#name").val().trim();
        let trainDest = $("#destination").val().trim();
        let trainFirst =$("#first").val().trim();
        let trainFreq = $("#freq").val().trim();
        //console.log(trainFirst);
        database.ref().push({
            trainName: trainName,
            trainDest: trainDest,
            trainFirst: trainFirst,
            trainFreq: trainFreq
        });
    
        $("#name").val('');
        $("#destination").val('');
        $("#first").val('');
        $("#freq").val('');
        
    });


});