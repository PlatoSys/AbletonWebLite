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




window.onresize = reportWindowSize;

let recordedNotes = {};
let savedRecordings = {};
let savedNums = 0;
let saveRecordBtn = document.querySelector('#saveRecordBtn')
let keyboardCanPlay = document.querySelector('#OnOff').getAttribute('playable');
let metronome = document.querySelector('#metronomeButton').getAttribute('metronome');
let timer;
let clearNotes = document.querySelector('#clearNotes');
let noteLength = parseInt(document.querySelector('.note').offsetWidth);
let verticalLine1 = document.createElement('div');
verticalLine1.classList.add('verticalLine');
let verticalLine2 = document.createElement('div');
verticalLine2.classList.add('verticalLine');
let verticalLine3 = document.createElement('div');
verticalLine3.classList.add('verticalLine');
let playerPanelWidth = document.querySelector('.player-panel').offsetWidth;
let movingLine = document.createElement('div');
movingLine.classList.add('movingLine');
movingLine.style.left = `${playerPanelWidth + noteLength}px`;
let notes = document.querySelector('.notes');
notes.appendChild(movingLine);


function reportWindowSize() {

    let noteLength = parseInt(document.querySelector('.note').offsetWidth);
    let lineWidth = ((parseInt(document.querySelector('.notesfordiv').offsetWidth))/4);
    let quarters = document.querySelectorAll('.metronomeLine');
    let metronomeLine = (parseInt(document.querySelector('.line').offsetWidth)-noteLength)/16;
    movingLine.style.left = `${playerPanelWidth + noteLength}px`;
    verticalLine1.style.left = `${playerPanelWidth + noteLength + lineWidth}px`;
    verticalLine2.style.left = `${playerPanelWidth + noteLength + 2*lineWidth}px`;
    verticalLine3.style.left = `${playerPanelWidth + noteLength + (3*lineWidth)}px`;
    let i = 1;
    quarters.forEach(element => {   
        element.style.left = `${playerPanelWidth + noteLength + (metronomeLine) * i}px`;
        i ++;
    });
}

  
(function () { 
    let noteLength = parseInt(document.querySelector('.note').offsetWidth);
    let lineWidth = ((parseInt(document.querySelector('.notesfordiv').offsetWidth))/4);
    let metronomeLine = (parseInt(document.querySelector('.line').offsetWidth)-noteLength)/16;
    let movLine = document.querySelector('.moveLine');

    verticalLine1.style.left = `${playerPanelWidth + noteLength + lineWidth}px`;
    verticalLine2.style.left = `${playerPanelWidth + noteLength + 2*lineWidth}px`;
    verticalLine3.style.left = `${playerPanelWidth + noteLength + (3*lineWidth)}px`;
    movLine.appendChild(verticalLine1);
    movLine.appendChild(verticalLine2);
    movLine.appendChild(verticalLine3);

    for(let i = 1; i <= 16; i++){
        let line = document.createElement('div');
        line.classList.add('metronomeLine');
        if(i == 16){
            line.classList.add('lastmetronomeLine')
        }
        line.style.left = `${playerPanelWidth + noteLength + (metronomeLine) * i}px`;
        notes.appendChild(line);
    }

})();


function start(){
    let bpm = (60/parseInt(document.querySelector('#bpmInput').value)) * 1000;
    clearInterval(timer);
    clearInterval(movingLine);

    if(metronome == 'true'){
        let audio = new Audio(`/Notes/metronomesound.mp3`);
        audio.play();
        timer = setInterval(metronomeSound, bpm);

        let LineDoMove = document.querySelector('.movingLine');
        let noteLength = parseInt(document.querySelector('.note').offsetWidth);
        let lineWidth = document.querySelector('.line');
        let firstMetronomeLine = document.querySelector('.metronomeLine');
        let Speed = (parseInt(firstMetronomeLine.offsetLeft) - playerPanelWidth - noteLength)/50;
    
        previousPos = parseInt(document.querySelector('.movingLine').offsetLeft);
        LineDoMove.style.left = `${previousPos + Speed}px`;
        movingLine = setInterval(moveLine, bpm / 50 );
    }
}

function pause(){
    clearInterval(timer);
    clearInterval(movingLine);
    console.log('paused');
}

function stop(){
    clearInterval(timer);
    clearInterval(movingLine);
    let resetLine = document.querySelector('.movingLine');
    resetLine.style.left = `${playerPanelWidth + noteLength}px`;
}

function moveLine(){
    
    let lastMetronomeLine = document.querySelector('.lastmetronomeLine');
    let LineDoMove = document.querySelector('.movingLine');
    let noteLength = parseInt(document.querySelector('.note').offsetWidth);
    let lineWidth = document.querySelector('.line');
    let firstMetronomeLine = document.querySelector('.metronomeLine');
    let Speed = (parseInt(firstMetronomeLine.offsetLeft) - playerPanelWidth - noteLength)/50;

    previousPos = parseInt(document.querySelector('.movingLine').offsetLeft);
    LineDoMove.style.left = `${previousPos + Speed}px`;
    let CurrentPosition = LineDoMove.style.left.slice(0,LineDoMove.style.left.length - 2);
    let LeftSide = parseInt(lastMetronomeLine.style.left.slice(0,lastMetronomeLine.style.left.length - 2)) - 1;
    let RightSide = parseInt(lastMetronomeLine.style.left.slice(0,lastMetronomeLine.style.left.length - 2)) + 1;
    if(CurrentPosition > LeftSide && CurrentPosition < RightSide){
        LineDoMove.style.left = `${playerPanelWidth + noteLength + 2}px`;
    }

    playRecording = LineDoMove.style.left;
    // console.log(recordedNotes);
    if(recordedNotes[playRecording] != undefined){
        let PlayIt = JSON.parse(recordedNotes[playRecording]);
        PlayIt.forEach(eachNote => {
            keyPlayNote(eachNote[2]);
        });
    }
    if(savedRecordings[0] != undefined){
        for(let i = 0;i <savedNums;i++){
            if(savedRecordings[i][playRecording] != undefined){
                let playSavedNote = JSON.parse(savedRecordings[i][playRecording]);
                playSavedNote.forEach(element => {
                    keyPlayNote(element[2])
                });
            }

        }
    }
    // savedRecordings.forEach(element => {
    //     console.log(element);
    // });
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

clearNotes.addEventListener('click', ev => {
    let Clear = document.querySelectorAll('.RecordedNote');
    Clear.forEach(element => {
        element.remove();
    });
    recordedNotes = {};
})

saveRecordBtn.addEventListener('click', ev => {
    let Clear = document.querySelectorAll('.RecordedNote');
    Clear.forEach(element => {
        element.remove();
    });
    savedRecordings[savedNums] = recordedNotes;
    recordedNotes = {};
    savedNums++;
    console.log(savedRecordings);
});




document.addEventListener('keypress', ev => {
    let Xposition = document.querySelector('.movingLine').style.left;
    let NoteDiv = document.createElement('div');
    NoteDiv.style.width = '30px';
    NoteDiv.style.height = '30px';
    NoteDiv.style.backgroundColor = 'red';
    NoteDiv.style.position = 'absolute';
    NoteDiv.style.border = 'solid';
    NoteDiv.style.borderColor = 'black';
    NoteDiv.style.borderWidth = `0.5px`;
    if(keyboardCanPlay == 'false'){
        return;
    }
    if(event.code == 'KeyA'){
        keyPlayNote('C');
        let key = document.querySelector('#C');
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`C`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"C"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"C"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyW'){
        keyPlayNote('CS');
        let key = document.querySelector('#CS'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`CS`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`);

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"CS"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"CS"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyS'){
        keyPlayNote('D');
        let key = document.querySelector('#D'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`D`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"D"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"D"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }


        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyE'){
        keyPlayNote('DS');
        let key = document.querySelector('#DS'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`DS`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"DS"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"DS"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyD'){
        keyPlayNote('E');
        let key = document.querySelector('#E'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`E`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"E"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"E"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyF'){
        keyPlayNote('F');
        let key = document.querySelector('#F'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`F`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"F"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"F"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyT'){
        keyPlayNote('FS');
        let key = document.querySelector('#FS');
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`FS`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"FS"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"FS"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv); 
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyG'){
        keyPlayNote('G');
        let key = document.querySelector('#G'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`G`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)


        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"G"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"G"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyY'){
        keyPlayNote('GS');
        let key = document.querySelector('#GS'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`GS`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)


        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"GS"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"GS"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyH'){
        keyPlayNote('A');
        let key = document.querySelector('#A'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`A`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"A"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"A"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyU'){
        keyPlayNote('AS');
        let key = document.querySelector('#AS'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`AS`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"AS"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"AS"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyJ'){
        keyPlayNote('B');
        let key = document.querySelector('#B'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`B`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"B"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"B"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
    if(event.code == 'KeyK'){
        keyPlayNote('C5');
        let key = document.querySelector('#C5'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`C5`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)


        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"C5"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"C5"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
        colorKeys(key.firstChild);
    }
})

