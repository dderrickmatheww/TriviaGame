$(document).ready(function () {
    var options = [
        {
            question: " During his embarrassing Dundie award presentation, Michael covers a number of popular songs. To whom is Michael presenting a Dundie award when he sings along to: You Sexy Thing by '70s British funk band Hot Chocolate?", 
            choice: ["Ryan", "Kevin", "Dwight", "Himself"],
            answer: 0,
            photo: "assets/images/pupusas.jpg"
         },
         {
             question: "What is Michael Scott's middle name?", 
            choice: ["Scarn", "Jay", "Gary", "Burrito"],
            answer: 2,
            photo: "assets/images/mtdew.gif"
         }, 
         {
             question: "In the episode 'Basketball', who does Michael say is on the team, 'of course'?", 
            choice: ["Dwight", "Jim", "Stanley", "Toby" ],
            answer: 2,
            photo: "assets/images/coffee.gif"
        }, 
        {
            question: "What is the exclusive club that Pam, Oscar, and Toby establish in the episode 'Branch Wars'?", 
            choice: ["Reading Club", "The Nicier Things Club", "The Smaller Things Club", "The Finer Things Club" ],
            answer: 3,
            photo: "assets/images/harvey.jpg"
        }, 
        {
            question: "What substance does Jim put office supplies owned by Dwight and Andy into?", 
            choice: ["Alchol", "Feces", "Jello", "Cake" ],
            answer: 2,
            photo: "assets/images/dozen.jpg"
        }, 
        {
            question: "Where did Michael get his 'World's Best Boss' mug?", 
            choice: ["Hot Topic", "Spencer's", "Barns and Nobles", "He made it" ],
            answer: 1,
            photo: "assets/images/herring.jpg"
        }, 
        {
            question: "He once suggested that his middle name was 'Danger', but what is Dwight Schrute's actual middle name?", 
            choice: ["Stewart", "Kurt", "Keith", "Lemon" ],
            answer: 1,
            photo: "assets/images/lemon.gif"
        }, 
        {
            question: "At Jim and Pam's wedding in the 'Niagara' episode, what was Kevin wearing on his feet?", 
            choice: ["Tissue Boxes", "Shoe Boxes", "Ice Bags", "Bare-feet" ],
            answer: 0,
            photo: "assets/images/guava.gif"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: <button>" + pick.choice[pick.answer] + "</button></p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<div><h2>" + pick.question + "</h2></div>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })