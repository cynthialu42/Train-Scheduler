$(document).ready(function(){



    $("#submit").on("click", function(){
        event.preventDefault();

        let trainName = $("#name").val().trim();
        let trainDest = $("#destination").val().trim();
        let trainFreq = $("#frequency").val().trim();
        let trainNext = $("#next").val().trim();
        
        console.log(trainName);
        console.log(trainDest);
        console.log(trainFreq);
        console.log(trainNext);

        //let trainData = $("<")
        $(".js-train-data").append('<tr> <td>'+ trainName + '</td> <td>' + trainDest + '</td> <td>' + trainFreq + '</td> <td>' + trainNext+ '</td> <td> 6 </td>');
        $("#name").val('');
        $("#destination").val('');
        $("#frequency").val('');
        $("#next").val('');
    });


});