const typing_text=document.querySelector('.text-of-typing p');
const inputField= document.querySelector('.container .input-field');
const errorTag= document.querySelector('.errors span');
const timeTag=document.querySelector('.time span');
const wpmTag=document.querySelector('.wpm span');
const cpmTag=document.querySelector('.cpm span');
const button=document.querySelector('button');

let characterIndex = 0;
let errors =0;
let timer;
let maxtime= 60;
let timeleft=maxtime
let isTyping=0

function randomParagrph(){
    // console.log(paragraphs[12])
    let randomIndex= Math.floor(Math.random() * paragraphs.length)
    // console.log(randomIndex)
    
    typing_text.innerHTML = "";
    
    paragraphs[randomIndex].split("").forEach((span)=>{
        let spanTag=`<span>${span}</span>`;
        // console.log(spanTag)
        typing_text.innerHTML += spanTag;
    });

    typing_text.querySelectorAll('span')[0].classList.add('active')

    document.addEventListener('keydown',() => inputField.focus())
    typing_text.addEventListener('click',() => inputField.focus())
}
randomParagrph();

function initTyping(){
    // console.log('Input Clicked');

    const characters=typing_text.querySelectorAll('span');
    // console.log(characters);
    let typedCharacter =inputField.value.split("")[characterIndex];
    // console.log(typedCharacter);
    
    if(characterIndex<characters.length-1 && timeleft>0){   
        if(!isTyping){
        timer = setInterval(initTimer,1000);
        isTyping=true;
        }

    if(typedCharacter==null){
        // if user typed back sapce
        characterIndex--;
        
        if(characters[characterIndex].classList.contains('incorrect')){
            errors--;
        }

        characters[characterIndex].classList.remove('correct','incorrect')
    }else{
        if(characters[characterIndex].innerText === typedCharacter){
            // console.log("Correct")
            characters[characterIndex].classList.add('correct')
        }else{
            // console.log("Incorrect");
            errors++
            characters[characterIndex].classList.add('incorrect')
        }
        characterIndex++;
    }
     

    characters.forEach(span => span.classList.remove('active'));
    characters[characterIndex].classList.add('active');

    errorTag.innerText = errors;

    cpmTag.innerText=characterIndex -errors; //cpm will not count errors

    let wpm = Math.round((((characterIndex-errors)/5)/(maxtime-timeleft))*60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
    wpmTag.innerText = wpm;
}else{
    inputField.value-"";
    clearInterval(timer);
}
}

inputField.addEventListener('input',initTyping);

function initTimer(){
  if(timeleft>0){
    timeleft--;
    timeTag.innerText=timeleft
  }  else{
    clearInterval(timer);
  }
}

function resetTest(){
    randomParagrph()
    inputField.value ="";
    clearInterval(timer);
    timeleft =maxtime;
    characterIndex = 0;
    errors =0;
    isTyping = 0;
    timeTag.innerText = timeleft;
    errorTag.innerText = errors;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}
button.addEventListener('click',resetTest)