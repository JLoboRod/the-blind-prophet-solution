// The Blind Prophet

var d;
var directions = ['up', 'down', 'left', 'right'];
var movements = ['up', 'right'];
var lastMovement = '';
var x0;
var y0;
var lost = true;
var pathSet = false;

function coordinate(d0){
    return Math.round((d*d - d0*d0 + 1)/2);
}

function setMovements(x0, y0){
    var min = Math.min(Math.abs(x0), Math.abs(y0));
    console.log("min: " + min);
    var max = Math.max(Math.abs(x0), Math.abs(y0));
    
    var x0n = x0/min;
    var y0n = y0/min;
    console.log("x0n= " + Math.abs(Math.floor(x0n)));
    console.log("y0n= " + Math.abs(Math.floor(y0n)));
    var remainder;
    var movement;
    
    
    if(Math.abs(x0) >= Math.abs(y0)){
        
        for(var i=0;i<min;i++){
            
            for(var j=0;j<Math.floor(Math.abs(x0n));j++){
                movement = (x0 < 0)? 'left': 'right';
                movements.push(movement);
            }
            for(var k=0;k<Math.floor(Math.abs(y0n));k++){
                movement = (y0 < 0)? 'down': 'up';
                movements.push(movement);
            }
            
        }
        
        remainder = Math.abs(x0 % min);
        console.log("remainderx:" + remainder);
        movement = (x0 < 0)? 'left': 'right';
        for(var l=0;l<remainder;l++){
            movements.push(movement);
        }
        
    }
    else if(Math.abs(y0) > Math.abs(x0)){
        
        for(var i=0;i<min;i++){
            
            for(var j=0;j<Math.floor(Math.abs(x0n));j++){
                movement = (x0 < 0)? 'left': 'right';
                movements.push(movement);
            }
            for(var k=0;k<Math.floor(Math.abs(y0n));k++){
                movement = (y0 < 0)? 'down': 'up';
                movements.push(movement);
            }
            
        }
        
        remainder = Math.abs(y0 % min);
        console.log("remaindery:" + remainder);
        movement = (y0 < 0)? 'down': 'up';
        for(var l=0;l<remainder;l++){
            movements.push(movement);
        }
        
    }
    
    console.log(x0n + " ... " + y0n);
    console.log(movements);
}

function restoreMov(lastMov){
    var result;
    switch(lastMov){
        case 'up':
            result = 'down';
            break;
        case 'down':
            result = 'up';
            break;
        case 'left':
            result = 'right';
            break;
        case 'right':
            result = 'left';
            break;
    }
    lastMovement = '';
    return result;
}

function tick(distance) {
    var result;
    
    if(d == null){ // d only has to be set once
        d = distance;
        console.log(d);
        //console.log(distance);
    }
    
    if(lost){ // The Prophet doesn't know where to go...
        
        if(lastMovement){
            if(y0 == null){
                y0 = coordinate(distance);
                console.log("distancey:" + distance);
            }
            else if(x0 == null){
                x0 = coordinate(distance);
                console.log("distancex: " + distance);
                console.log("Destiny: " + x0 + ", " + y0);
            }
            
            result = restoreMov(lastMovement);
        }
        else{
            
            result = movements.shift();
            lastMovement = result;
            console.log("movement: " + result);
        }

        lost = (x0==null || y0==null);
        console.log("perdido:" + lost);
        
    }
    else{
        if(!pathSet){
            setMovements(x0, y0);
            pathSet = true; // Ready to go!
        }
        else{
            result = movements.shift();
            lastMovement = result;
        }
    }
   
    return result;   
}