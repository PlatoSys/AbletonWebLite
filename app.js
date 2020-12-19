
window.onresize = reportWindowSize;

let recordedNotes = {};
let savedRecordings = {};
let savedNums = localStorage.length;
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
recordingButton = false
let patterns = document.querySelector('#patterns');


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

(function () {
    for(let i = 0 ;i<savedNums ;i++){
        let Data = localStorage.getItem(`${i}template`);
        if (Data != null){
            console.log('ara')
            let pattern = document.createElement('div');
            let h4 = document.createElement('h4');
            let patternBtn = document.createElement('button');
            let patternName = document.querySelector('#saveInput');
        
            pattern.classList.add('pattern');
            patternBtn.classList.add('btn');
            patternBtn.classList.add('btn-secondary');
            pattern.id = `pattern${savedNums}`;
            patternBtn.setAttribute('onclick','removePattern(this)');
            patternBtn.setAttribute('patternNum',`pattern${i}`);
            pattern.appendChild(h4);
            h4.innerHTML = patternName.value;
            pattern.appendChild(patternBtn);
            patternBtn.innerHTML = 'X';
            pattern.id = `pattern${i}`
            patterns.appendChild(pattern);
        }
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
            'implement here';
            console.log('each',eachNote);
            keyPlayNote(eachNote[2]);
        });
    }

    for(let i = 0;i<savedNums;i++){
        let Data = localStorage.getItem(`${i}template`);
        if (Data != null){
            console.log(localStorage);
            iterator = JSON.parse(Data);
            if(iterator[playRecording] != null){
                let playNotes = JSON.parse(iterator[playRecording]);
                keyPlayNote(playNotes[0][2]);
            }
        }
    }

    // if(savedRecordings[0] != undefined){
    //     for(let i = 0;i <savedNums;i++){
    //         if(savedRecordings[i][playRecording] != undefined){
    //             let playSavedNote = JSON.parse(savedRecordings[i][playRecording]);
    //             playSavedNote.forEach(element => {

    //                 keyPlayNote(element[2])
    //             });
    //         }

    //     }
    // }

    // if(savedRecordings[0] != undefined){
    //     for(let i = 0;i <savedNums;i++){
    //         if(savedRecordings[i][playRecording] != undefined){
    //             let playSavedNote = JSON.parse(savedRecordings[i][playRecording]);
    //             playSavedNote.forEach(element => {

    //                 keyPlayNote(element[2])
    //             });
    //         }

    //     }
    // }


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

function recording(btn){
    if(btn.getAttribute('recording') == 'true'){
        btn.setAttribute('recording',false);
        recordingButton = 'false';
    } else {
        btn.setAttribute('recording',true);
        recordingButton = 'true';
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

function removePattern(pattern){
    let patternNum = pattern.getAttribute('patternnum');
    let removePattern = document.querySelector(`#${patternNum}`)
    let patternID = patternNum.slice(7,patternNum.length);

    console.log(patternID,removePattern)
    localStorage.removeItem(`${patternID}template`);
    removePattern.remove();
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
    localStorage.setItem(`${savedNums}template`,JSON.stringify(recordedNotes));
    // localStorage.clear();
    recordedNotes = {};

    let pattern = document.createElement('div');
    let h4 = document.createElement('h4');
    let patternBtn = document.createElement('button');
    let patternName = document.querySelector('#saveInput');

    pattern.classList.add('pattern');
    patternBtn.classList.add('btn');
    patternBtn.classList.add('btn-secondary');
    pattern.id = `pattern${savedNums}`;
    patternBtn.setAttribute('onclick','removePattern(this)');
    patternBtn.setAttribute('patternNum',`pattern${savedNums}`);
    pattern.appendChild(h4);
    h4.innerHTML = patternName.value;
    pattern.appendChild(patternBtn);
    patternBtn.innerHTML = 'X';
    
    patterns.appendChild(pattern);
    savedNums++;
    
    
});


function removeCertainNote(current){

    let left = current.style.left;
    recordedNotes[left] = []
    current.remove();
}

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
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')
        colorKeys(key.firstChild);

        if(recordingButton == false){
            return;
        }

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"C"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"C"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
    }
    if(event.code == 'KeyW'){
        keyPlayNote('CS');
        let key = document.querySelector('#CS'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`CS`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`);
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);

        if(recordingButton == false){
            return;
        }

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"CS"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"CS"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
    }
    if(event.code == 'KeyS'){
        keyPlayNote('D');
        let key = document.querySelector('#D'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`D`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);

        if(recordingButton == false){
            return;
        }

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"D"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"D"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }


        notes.appendChild(NoteDiv);
    }
    if(event.code == 'KeyE'){
        keyPlayNote('DS');
        let key = document.querySelector('#DS'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`DS`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`);
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);

        if(recordingButton == false){
            return;
        }

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"DS"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"DS"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
    }
    if(event.code == 'KeyD'){
        keyPlayNote('E');
        let key = document.querySelector('#E'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`E`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`);
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);


        if(recordingButton == false){
            return;
        }

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"E"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"E"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
    }
    if(event.code == 'KeyF'){
        keyPlayNote('F');
        let key = document.querySelector('#F'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`F`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`);
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);

        if(recordingButton == false){
            return;
        }

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"F"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"F"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
    }
    if(event.code == 'KeyT'){
        keyPlayNote('FS');
        let key = document.querySelector('#FS');
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`FS`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`);
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);

        if(recordingButton == false){
            return;
        }

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"FS"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"FS"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv); 
    }
    if(event.code == 'KeyG'){
        keyPlayNote('G');
        let key = document.querySelector('#G'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`G`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`);
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);

        if(recordingButton == false){
            return;
        }


        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"G"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"G"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
    }
    if(event.code == 'KeyY'){
        keyPlayNote('GS');
        let key = document.querySelector('#GS'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`GS`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`);
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);


        if(recordingButton == false){
            return;
        }


        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"GS"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"GS"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
    }
    if(event.code == 'KeyH'){
        keyPlayNote('A');
        let key = document.querySelector('#A'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`A`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`);
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);

        if(recordingButton == false){
            return;
        }

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"A"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"A"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
    }
    if(event.code == 'KeyU'){
        keyPlayNote('AS');
        let key = document.querySelector('#AS'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`AS`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`);
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);

        if(recordingButton == false){
            return;
        }

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"AS"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"AS"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
    }
    if(event.code == 'KeyJ'){
        keyPlayNote('B');
        let key = document.querySelector('#B'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`B`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`);
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);

        if(recordingButton == false){
            return;
        }

        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"B"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"B"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
    }
    if(event.code == 'KeyK'){
        keyPlayNote('C5');
        let key = document.querySelector('#C5'); 
        NoteDiv.style.left = `${Xposition}`;
        NoteDiv.style.top = `${key.offsetTop}px`;
        NoteDiv.classList.add(`C5`);
        NoteDiv.classList.add(`RecordedNote`);
        NoteDiv.classList.add(`${Xposition}`)
        NoteDiv.setAttribute('ondblclick','removeCertainNote(this)')

        colorKeys(key.firstChild);

        if(recordingButton == false){
            return;
        }


        if(recordedNotes[Xposition] == undefined){
            recordedNotes[Xposition] = [`[["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"C5"]]'].toString();
        } else {
            let temp = '[' + recordedNotes[Xposition].slice(1,recordedNotes[Xposition].length-1) + ',' + [`["` + Xposition + `"`,`"` +`${key.offsetTop}px` + `"`,'"C5"]'].toString() + ']';
            recordedNotes[Xposition] = temp;
        }

        notes.appendChild(NoteDiv);
    }
})

