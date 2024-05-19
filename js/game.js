let canvas;
let world; 
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startGame(){
    document.getElementById('startImage').style = "display: none";
    document.getElementById('startGameButton').style = "display: none";
    displayNone();
}

window.addEventListener("keydown", (e) =>{
    if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38){
        keyboard.UP = true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68){
        keyboard.D = true;
    }

});

window.addEventListener("keyup", (e) =>{
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38){
        keyboard.UP = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68){
        keyboard.D = false;
    }
    
});

function replay(){
    displayNone();
    startGame();
}

function showControls(){
    document.getElementById('controller').classList.remove('d-none');
    displayNone();
}

function closeControls(){
    document.getElementById('controller').classList.add('d-none');
}

function won(){
    document.getElementById('endScreenWon').classList.remove('d-none');
}

function lost(){
    document.getElementById('endScreenLost').classList.remove('d-none');
}

function displayNone(){
    document.getElementById('endScreenLost').classList.add('d-none');
    document.getElementById('endScreenWon').classList.add('d-none');
    document.getElementById('lostImage').classList.add('d-none');
    document.getElementById('replayImageWon').classList.add('d-none');
    document.getElementById('wonImage').classList.add('d-none');
    document.getElementById('replayImageLost').classList.add('d-none');
}