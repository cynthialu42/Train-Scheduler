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
    
    $("#submit").on("click", function(){
        event.preventDefault();

        let trainName = $("#name").val().trim();
        let trainDest = $("#destination").val().trim();
        let trainFirst = moment.utc($("#first").val().trim(),"HH:mm");
        let trainFreq = $("#freq").val().trim();
        let currentTime = moment();
        
        let hourDiff = currentTime.diff(trainFirst, 'hours');
        let minuteDiff = currentTime.diff(trainFirst, 'minutes'); 
        let hourDuration = Math.floor(minuteDiff/60);
        let minuteDuration = minuteDiff % 60;

        let mod = minuteDuration % trainFreq;
        let minutesLeft = trainFreq - mod;

        let duration = moment.duration({'minute':minutesLeft});
        let nextTrain = currentTime.add(duration).format('LT');
        // console.log(trainName);
        // console.log(trainDest);
        // console.log(trainFreq);
        // console.log(trainFirst);
        
        //var start = moment.utc("12:00", "HH:mm");
        // This is the frequency of the train
        //let freq = moment.duration({'minute':15});
        //let freq = 15;
        // This should be the current time
        //let now = moment();
        //toDate.add(duration);
        //console.log(start.format('LT'));
        //console.log(now.format('LT'));
        // var hourDiff = now.diff(start,'hours');
        // var minuteDiff = now.diff(start,'minutes');
        // let hourDuration = Math.floor(minuteDiff/60);
        // let minuteDuration = minuteDiff % 60;
    
        // console.log(hourDuration);
        // console.log(minuteDuration);

        // let mod = minuteDuration % freq;
        // console.log(mod);
        // let x = freq - mod;
        // let duration = moment.duration({'minute':x});
        // let next = now.add(duration);
        // console.log(next.format('LT'));
    
        $(".js-train-data").append('<tr> <td>'+ trainName + '</td> <td>' + trainDest + '</td> <td>' + trainFreq + '</td> <td>' + nextTrain+ '</td> <td>'+ minutesLeft + '</td>');
        $("#name").val('');
        $("#destination").val('');
        $("#first").val('');
        $("#freq").val('');
        
    });


});