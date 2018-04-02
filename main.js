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

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    /*database.ref().on("child_removed", function(oldChildSnapshot){
        console.log("hey");
        location.reload();
    });*/
    database.ref().on("child_added",function(childSnapshot){
        console.log(childSnapshot);
        let dbTrainName = childSnapshot.val().trainName;
        let dbTrainDest = childSnapshot.val().trainDest;
        let dbTrainFirst = moment(childSnapshot.val().trainFirst, "HH:mm");
        let dbTrainFreq = childSnapshot.val().trainFreq;

        let currentTime = moment();
        //console.log(dbTrainFirst.format('LT'));
        //console.log(currentTime.format('LT'));
        let hourDiff = currentTime.diff(dbTrainFirst, 'hours');
        let minuteDiff = currentTime.diff(dbTrainFirst, 'minutes'); 
        let hourDuration = Math.floor(minuteDiff/60);
        let minuteDuration = minuteDiff % 60;
        //console.log(minuteDiff);
        //console.log(minuteDuration);
        let mod = minuteDuration % dbTrainFreq;
        let minutesLeft = dbTrainFreq - mod;
        //console.log("Minutes left:" + minutesLeft);
        let duration = moment.duration({'minute':minutesLeft});
        let nextTrain = currentTime.add(duration).format('LT');
        //console.log("nextTrain: "+ nextTrain);
        $(".js-train-data").append('<tr class = "train" data-train = "train"> <td>'+ dbTrainName + '</td> <td>' + dbTrainDest + '</td> <td>' + dbTrainFreq + '</td> <td>' + nextTrain+ '</td> <td>'+ minutesLeft + '</td>');

    });
    $("#submit").on("click", function(){
        event.preventDefault();

        let trainName = $("#name").val().trim();
        let trainDest = $("#destination").val().trim();
        let trainFirst =$("#first").val().trim();
        let trainFreq = $("#freq").val().trim();
        //console.log(trainFirst);
        //database.ref().child(trainName).push({
        database.ref().push({
            trainName: trainName,
            trainDest: trainDest,
            trainFirst: trainFirst,
            trainFreq: trainFreq
        });
    
        
        /*let dbTrainFirst = moment.utc(trainFirst, "HH:mm");

        let currentTime = moment();
        
        let hourDiff = (currentTime.diff(dbTrainFirst, 'hours'))*-1;
        let minuteDiff = (currentTime.diff(dbTrainFirst, 'minutes'))*-1; 
        let hourDuration = Math.floor(minuteDiff/60);
        let minuteDuration = minuteDiff % 60;
        //console.log(minuteDiff);
        console.log(dbTrainFirst.format("LT"));
        console.log(currentTime.format("LT"));
        console.log(minuteDiff);
        console.log(minuteDuration);
        let mod = minuteDuration % trainFreq;
        let minutesLeft = trainFreq - mod;
        console.log("Minutes left:" + minutesLeft);
        let duration = moment.duration({'minute':minutesLeft});
        let nextTrain = currentTime.add(duration).format('LT');
        console.log("nextTrain: "+ nextTrain);

        let fromDate = moment("08:00", "HH:mm");
        let duration = moment.duration({'hour':2, 'minute':15});
        let toDate = moment();
        //toDate.add(duration);
        console.log(moment().startOf('day'));
        console.log(fromDate.format('mmmm DD-MMM-YYYY hh:mm a'));
        console.log(toDate.format('mmmm DD-MMM-YYYY hh:mm a'));
        var hourDiff = toDate.diff(fromDate,'hours');
        var minuteDiff = toDate.diff(fromDate,'minutes');
        let hourDuration = Math.floor(minuteDiff/60);
        let minuteDuration = minuteDiff % 60;
    
        console.log(hourDuration);
        console.log(minuteDuration);*/
        $("#name").val('');
        $("#destination").val('');
        $("#first").val('');
        $("#freq").val('');
        //database.ref().child("NSHF").remove();

    });


    /*$("#test").on("click", function(){
        console.log('here');
        database.ref().child("BBB").remove();
    });*/

    $(".test").on("click", function(){
        console.log("here");
    });
});