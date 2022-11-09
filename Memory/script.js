card_state = [0,0,0,0,0,0];
play = 0;
assign = ["1","2","3","4","5","6"]
lost = 0;
var startTimer;

var dict = {
    "1": "images/triangle.png",
    "2": "images/circle.png",
    "3": "images/circle.png",
    "4": "images/triangle.png",
    "5": "images/square.png",
    "6": "images/square.png"
}

var song= new Audio('sound/music.mp3');
var flip= new Audio('sound/flip.mp3');




function newGame(){
    lost = 0;
    song.play();
    document.getElementById('btn').style.visibility='hidden';
    timer = document.getElementById('time');
    duration = 9;
    timer.textContent = "00:10";
    startTimer = setInterval(function() {
        seconds = parseInt(duration % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timer.textContent = "00:"+seconds;
        duration--;
        if (duration < 0) {
            clearInterval(startTimer);
            document.getElementById('btn').innerHTML = "LOST";
            document.getElementById('btn').style.visibility='visible';
            card_state = [2,2,2,2,2,2];
            lost = 1;
        }
        
  }, 1000);
    for(var i = 1; i <= card_state.length;i++){
        document.getElementById(i).src = "images/question.png";
        card_state[i-1] = 0;
    }
    assign = ["1","2","3","4","5","6"]
    play = 0;
    cards = document.getElementsByClassName("card");
    for(let i = 0; i < cards.length;i++){
        num = rand(0,assign.length-1);
        cards[i].id = assign[num];
        cards[i].class = dict[assign[num]];
        assign.splice(num, 1);
        cards[i].addEventListener('click', click, false);
    }
}


function click(card){
    id = card.target.id;

    if(card_state[id-1]==0){
        flip.play();
        card_state[id-1]= 1;
        document.getElementById(id).src = dict[id];
        
        if(play == 0){
            play = id;
        }
        else{
            if(dict[id]==dict[play]){
                
                document.getElementById(id).src = "images/black.jpeg";
                document.getElementById(play).src = "images/black.jpeg";
                card_state[id-1]= 2;
                card_state[play-1]= 2;
            }
            else{
  
                document.getElementById(id).src = "images/question.png";
                document.getElementById(play).src = "images/question.png";
                card_state[id-1]= 0;
                card_state[play-1]= 0;
            }
            play = 0;
        }
        
    }
    else if(play != id && card_state[id-1]==1){
        card_state[id-1] = 0;
        document.getElementById(id).src = "images/question.png";
    }

    if(lost == 0 && typeof(card_state.find(element => element != 2)) == "undefined"){
        
        document.getElementById('btn').innerHTML = "WON";
        document.getElementById('btn').style.visibility='visible';
        clearInterval(startTimer);
    }
 }

 function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }


  

  

