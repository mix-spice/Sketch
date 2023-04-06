const eraseButton = document.getElementById("eraseButton");
const container = document.getElementById("container");
const form = document.getElementById("myForm");
const sizeSlider = document.getElementById("sizeSlider");
const colorPicker = document.getElementById("colorPicker");
const acidButton = document.getElementById("acidButton");

let selectedColor = colorPicker.value;
let eraseMode = false;
let acidMode = false;
let paintMode = false;

window.addEventListener("load", function(){
    createElement(10);
});

function createElement(size){
    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = 'auto'; // Set the rows to auto
    let counter  = 0;
    for(let i = 0; i < size*size; i++) {
        const div = document.createElement("div");
        container.appendChild(div);
        
        div.addEventListener("click", () =>{
            if(eraseMode){
                div.style.backgroundColor = "white";
            } 
            else if(acidMode) {
                div.style.backgroundColor = generateRandomColor();
                counter++;
                if(counter%10===0){
                div.style.backgroundColor = "black";
                }
            }
                
            else if(selectedColor){
                div.style.backgroundColor = selectedColor;
                    
            }
        });
    }
}

function generateRandomColor(){
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

function generateBlack(){
    return `rgb(0, 0, 0)`;
}

colorPicker.addEventListener("change", () => {
    selectedColor = colorPicker.value;
});

sizeSlider.addEventListener("input", () => {
    const size = parseInt(sizeSlider.value, 10);
    createElement(size);
});

eraseButton.addEventListener("click" , () => {
    eraseMode = !eraseMode;
    paintMode = false;
    eraseButton.classList.toggle("active");

});

acidButton.addEventListener("click", () => {
    acidMode = !acidMode;
    paintMode = false;
    acidButton.classList.toggle("active");
    if(acidMode){
        acidInterval = setInterval(() => {
            acidButton.style.backgroundColor = generateRandomColor();
        }, 100);
    }
    else{
        clearInterval(acidInterval);
        acidButton.style.backgroundColor = "";
    }

});

colorPicker.addEventListener("click", () => {
    paintMode = true;  
});


