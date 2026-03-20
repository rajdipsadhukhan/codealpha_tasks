let input = document.getElementById("inputShow");
let buttons = document.querySelectorAll('button');

let string = "";
let array = Array.from(buttons);

array.forEach(button=>{
    button.addEventListener('click', (e)=>{
        if(e.target.innerHTML == '='){
            string = eval(string); 
            input.value = string;
        }
        else if(e.target.innerHTML == 'AC'){
            string = "";
            input.value = string;
        }
        else if(e.target.innerHTML == 'DELETE'){
            string = string.substring(0, string.length-1);
            input.value = string;
        }
        else if(e.target.innerHTML == 'π'){
            string = string + Math.PI;
            input.value = string;
        }
        else if(e.target.innerHTML == '✕'){
            string = string + '*';
            input.value = string;
        }
        else if(e.target.innerHTML == '%'){
            string = string + '/100';
            input.value = string;
        }
        else{
             string = string + e.target.innerHTML;
             input.value = string;
        }
       
    })

});

/* Keyboard Support */

document.addEventListener("keydown", function(e){

    let key = e.key;

    if(key >= '0' && key <= '9'){
        pressButton(key);
    }

    else if(key == '+' || key == '-' || key == '/'){
        pressButton(key);
    }

    else if(key == '*'){
        pressButton('✕');
    }

    else if(key == '%'){
    pressButton('%');
    }

    else if(key == 'Enter'){
        pressButton('=');
    }

    else if(key == 'Backspace'){
        pressButton('DELETE');
    }

    else if(key == 'Escape'){
        pressButton('AC');
    }

    else if(key == '.'){
        pressButton('.');
    }

    else if(key == '(' || key == ')'){
        pressButton(key);
    }

});


function pressButton(value){
    buttons.forEach(button=>{
        if(button.innerHTML == value){
            button.click();
        }
    });
}
