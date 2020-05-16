//Variables 
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const buttonReset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const div = document.querySelector('.start');


//Variables to keep score's track
const tries = document.querySelectorAll('.tries');
let missed = 0;

//Array of phrases
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

//console.log(phraseArray);

//check letter function
const checkLetter = button => {
    //Create a variable to store if a match is found and give it an initial value of null
    let match = null;

    //get all the elements with the class letter
    const liItems = document.getElementsByClassName('letter');
    //The function should loop over the letters and check 
    //if they match the letter in the button the player has chosen.
    for (let i = 0; i < liItems.length; i++) {
        if (liItems[i].textContent === button) {
            liItems[i].classList.add('show');
            match = liItems[i].textContent;
        } 
        
    }
    return match;
};

//Add an event listener to the keyboard
qwerty.addEventListener('click', (event) => {
    const letterFound = checkLetter(event.target.innerHTML);

    //if button selected add class chosen  and disable it.
    if (event.target.tagName === 'BUTTON') {
        const chosen = event.target;
        chosen.addClass = 'chosen';
        event.target.disabled = true;
    }

    if (letterFound === null) { 
        const lostHeart = document.getElementsByTagName('img')[missed]; //use [missed] as the index
        lostHeart.src = 'images/lostHeart.png'; // Replace old img for new one
        missed += 1; // add +1 per wrong letter to the score

    }
    checkWin();
})

//Function checkWin

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
