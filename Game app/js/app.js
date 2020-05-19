const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const buttonReset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const div = document.querySelector('.start');



const tries = document.querySelectorAll('.tries');
let missed = 0;


const arrText = [
    'hans zimmer',
    'no time for caution',
    'where we are going',
    'tick tock',
    'saving the world'
]

//Event listeners 
buttonReset.addEventListener('click', () => {
    overlay.style.display = 'none';
})

//Function -> Return random phrase from array
const getRandomPhraseAsArray = (arr) => {
    let randomPhrase = Math.floor(Math.random()*arr.length);
    return arr[randomPhrase].split(''); //.split() to seperate by letters
};

//Function -> Add phrase to display
const addPhraseToDisplay = (arr) => {
    for (let i=0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i]; //Give to the li the content of the array phrasess
        const ul = document.getElementsByTagName('ul')[0]; //[0] get's first ul of the DOM

        if (li.textContent === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        //Add li to the ul
        ul.appendChild(li);
    }
};

const phraseArray = getRandomPhraseAsArray(arrText);

addPhraseToDisplay(phraseArray);

const checkLetter = button => {
    let match = null;
    const liItems = document.getElementsByClassName('letter');
    for (let i = 0; i < liItems.length; i++) {
        if (liItems[i].textContent === button) {
            liItems[i].classList.add('show');
            match = liItems[i].textContent;
        } 
    }
    return match;
};

qwerty.addEventListener('click', (event) => {
    const letterFound = checkLetter(event.target.innerHTML);

    if (event.target.tagName === 'BUTTON') {
        event.target.classList.add("chosen");
        event.target.disabled = true;
    }

    if (letterFound === null && event.target.tagName === "BUTTON") { 
        const lostHeart = document.getElementsByTagName('img')[missed]; 
        lostHeart.src = 'images/lostHeart.png';
        missed += 1;

    }
    checkWin();
})


const checkWin = () => {
    const letter = document.getElementsByClassName('letter');
    const classShow = document.getElementsByClassName('show');
    const finalMessage = document.querySelector('.title');
    
    if (letter.length === classShow.length) {
        finalMessage.textContent = 'Congratulations!';
        overlay.classList.add('win');
        overlay.style.display = "flex";
        div.setAttribute("onClick","window.location.reload()");
        buttonReset.textContent = 'Perhaps another try?';

    } else if (missed === 5) {
        finalMessage.textContent = `You failed this time! The correct answer was: ${phraseArray.join('')} `;
        overlay.classList.add('lose');
        overlay.style.display = "flex";
        div.setAttribute("onClick","window.location.reload()");
        buttonReset.textContent = 'Try again!';
    }
}
