// ===========================================
// const el = document.querySelector(".item");

// let isResizing = false;

// el.addEventListener("mousedown", mousedown);

// function mousedown(e) {
//   window.addEventListener("mousemove", mousemove);
//   window.addEventListener("mouseup", mouseup);

//   let prevX = e.clientX;
//   let prevY = e.clientY;

//   function mousemove(e) {
//     if (!isResizing) {
//       let newX = prevX - e.clientX;
//       let newY = prevY - e.clientY;

//       const rect = el.getBoundingClientRect();

//       el.style.left = rect.left - newX + "px";
//       el.style.top = rect.top - newY + "px";

//       prevX = e.clientX;
//       prevY = e.clientY;
//     }
//   }

//   function mouseup() {
//     window.removeEventListener("mousemove", mousemove);
//     window.removeEventListener("mouseup", mouseup);
//   }
// }

// const resizers = document.querySelectorAll(".resizer");
// let currentResizer;

// for (let resizer of resizers) {
//   resizer.addEventListener("mousedown", mousedown);

//   function mousedown(e) {
//     currentResizer = e.target;
//     isResizing = true;

//     let prevX = e.clientX;
//     let prevY = e.clientY;

//     window.addEventListener("mousemove", mousemove);
//     window.addEventListener("mouseup", mouseup);

//     function mousemove(e) {
//       const rect = el.getBoundingClientRect();

//       if (currentResizer.classList.contains("se")) {
//         el.style.width = rect.width - (prevX - e.clientX) + "px";
//         el.style.height = rect.height - (prevY - e.clientY) + "px";
//       } else if (currentResizer.classList.contains("sw")) {
//         el.style.width = rect.width + (prevX - e.clientX) + "px";
//         el.style.height = rect.height - (prevY - e.clientY) + "px";
//         el.style.left = rect.left - (prevX - e.clientX) + "px";
//       } else if (currentResizer.classList.contains("ne")) {
//         el.style.width = rect.width - (prevX - e.clientX) + "px";
//         el.style.height = rect.height + (prevY - e.clientY) + "px";
//         el.style.top = rect.top - (prevY - e.clientY) + "px";
//       } else {
//         el.style.width = rect.width + (prevX - e.clientX) + "px";
//         el.style.height = rect.height + (prevY - e.clientY) + "px";
//         el.style.top = rect.top - (prevY - e.clientY) + "px";
//         el.style.left = rect.left - (prevX - e.clientX) + "px";
//       }

//       prevX = e.clientX;
//       prevY = e.clientY;
//     }

//     function mouseup() {
//       window.removeEventListener("mousemove", mousemove);
//       window.removeEventListener("mouseup", mouseup);
//       isResizing = false;
//     }
//   }
// }
// ==================


let keyboardCanPlay = document.querySelector('#OnOff').getAttribute('playable');
let metronome = document.querySelector('#metronomeButton').getAttribute('metronome');
let timer;
let movingLine;
let verticalLine1 = document.createElement('div');
verticalLine1.classList.add('verticalLine');
let verticalLine2 = document.createElement('div');
verticalLine2.classList.add('verticalLine');
let verticalLine3 = document.createElement('div');
verticalLine3.classList.add('verticalLine');


(function () { 
    let notes = document.querySelector('.notes');
    let noteLength = parseInt(document.querySelector('.note').offsetWidth);
    let lineWidth = ((parseInt(document.querySelector('.notesfordiv').offsetWidth))/4);
    let metronomeLine = (parseInt(document.querySelector('.line').offsetWidth)-noteLength)/12;
    let movLine = document.querySelector('.moveLine');

    console.log(lineWidth);
    verticalLine1.style.left = `${noteLength + lineWidth}px`;
    verticalLine2.style.left = `${(2*lineWidth)}px`;
    verticalLine3.style.left = `${noteLength + (3*lineWidth)}px`;
    movLine.appendChild(verticalLine1);
    movLine.appendChild(verticalLine2);
    movLine.appendChild(verticalLine3);

    for(let i = 1; i <= 12; i++){
        // console.log(metronomeLine * i)
        let line = document.createElement('div');
        line.classList.add('metronomeLine');
        line.style.left = `${metronomeLine * i}px`;
        // notes.appendChild(line);
    }
})();


function start(){
    let bpm = (60/parseInt(document.querySelector('#bpmInput').value)) * 1000;
    clearInterval(timer);
    clearInterval(movingLine);
    if(metronome == 'true'){
        let audio = new Audio(`/Notes/metronomesound.mp3`);
        audio.play();
        console.log(bpm)
        timer = setInterval(metronomeSound, bpm);
        movingLine = setInterval(moveLine, bpm);
    }
}

function stop(){
    clearInterval(timer);
    console.log('stoped');
}

function moveLine(){
    let lineWidth = document.querySelector('.line');
    console.log(lineWidth.offsetWidth);
}

function metronomeSound(){
    // var date = new Date();
    // var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if(metronome == 'false'){
        return;
    }
    let audio = new Audio(`/Notes/metronomesound.mp3`);
    audio.play();
}

function MetronomeOnOff(btn){
    if(btn.getAttribute('metronome') == 'true'){
        btn.setAttribute('metronome',false);
        metronome = 'false';
    } else {
        btn.setAttribute('metronome',true);
        metronome = 'true';
    }
}

function OnOff(btn){
    console.log(btn.getAttribute('playable'))
    if(btn.getAttribute('playable') == 'true'){
        btn.setAttribute('playable',false);
        keyboardCanPlay = 'false';
    } else {
        btn.setAttribute('playable',true);
        keyboardCanPlay = 'true';
    }
}

function playNote(note){
    colorKeys(note)
    var audio = new Audio(`/Notes/${note.parentNode.id}.mp3`);
    audio.play();
}

function keyPlayNote(note){
    var audio = new Audio(`/Notes/${note}.mp3`);
    audio.play();
}

function colorKeys(current){
    let mainCol;
    current.parentNode.style.backgroundColor = 'red';
    if(current.parentNode.id.includes('S')){
        mainCol = 'black';
    } else {
        mainCol = 'lightblue';
    }
    setTimeout(function myFunction() {
        current.parentNode.style.backgroundColor = mainCol;
    }, 100);
}

function keyPlay(ev) {
    if(keyboardCanPlay == 'false'){
        return;
    }
    if(event.code == 'KeyA'){
        keyPlayNote('C');
        let key = document.querySelector('#C');
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyW'){
        keyPlayNote('CS');
        let key = document.querySelector('#CS'); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyS'){
        keyPlayNote('D');
        let key = document.querySelector('#D'); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyE'){
        keyPlayNote('DS');
        let key = document.querySelector('#DS'); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyD'){
        keyPlayNote('E');
        let key = document.querySelector('#E'); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyF'){
        keyPlayNote('F');
        let key = document.querySelector('#F'); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyT'){
        keyPlayNote('FS');
        let key = document.querySelector('#FS'); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyG'){
        keyPlayNote('G');
        let key = document.querySelector('#G'); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyY'){
        keyPlayNote('GS');
        let key = document.querySelector('#GS'); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyH'){
        keyPlayNote('A');
        let key = document.querySelector('#A'); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyU'){
        keyPlayNote('AS');
        let key = document.querySelector('#AS'); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyJ'){
        keyPlayNote('B');
        let key = document.querySelector('#B'); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyK'){
        keyPlayNote('C5');
        let key = document.querySelector('#C5'); 
        colorKeys(key.firstChild);
    }
}

