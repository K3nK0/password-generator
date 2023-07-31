// récupérer un nombre aléatoire

function getRandomNumber(min, max) {
    let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
    randomNumber = randomNumber / 4294967296;

    return Math.trunc(randomNumber * (max - min + 1)) + min;
}

// récupérer les différents caractères

function addSet(fromCode, toCode) {
    let characterList = "";
    for(let i = fromCode; i < toCode; i++) {
        characterList += String.fromCharCode(i)
    }
    return characterList;
}

const characterSet = {
    uppercaseLetters : addSet(65, 91),
    lowercaseLetters : addSet(97,123),
    numbersCharacters : addSet(48,58),
    symbolsCharacters : addSet(33,47) + addSet(58,64) + addSet(91,96) + addSet(123,126)
}


// récupérent la longueur du mot de passe

const passwordLenght = document.getElementById('character-length');

passwordLenght.addEventListener('input', () => {
    handleBackRange(passwordLenght.value);
})

const backInputRange = document.querySelector('.background-range');
const valueLenghtPassword = document.getElementById('value-character-length');

function handleBackRange(value) {
    
    let pourcentageValue = value / 20 * 100;
    backInputRange.style.left = `${pourcentageValue}%`;

    valueLenghtPassword.textContent = value;
}

const passwordResult = document.querySelector('.password-result');
const form = document.querySelector('form');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

form.addEventListener('submit', e => {
    e.preventDefault();

    levelPassword.textContent = "";
    rodsStreigth.forEach((rod) => {
        rod.style.background = "transparent";
        rod.style.border = "2px solid var(--almost-white)";
    })

    createPassword();
})

function createPassword() {
    const checkedDataSets = checkedSets();
    if(!checkedDataSets.length) return;

    const concatenatedDataSets = checkedDataSets.reduce((acc, cur) => acc + cur);

    let password = '';

    let passwordBase = [];
    for(let i = 0; i < checkedDataSets.length; i++){
        passwordBase += checkedDataSets[i][getRandomNumber(0, checkedDataSets[i].length - 1)]
    }

    for(let i = checkedDataSets.length; i < passwordLenght.value; i++){
        password += concatenatedDataSets[getRandomNumber(0, concatenatedDataSets.length - 1)]
    }

    for(let i = 0; i < passwordBase.length; i++){
        const randomIndex = getRandomNumber(0, password.length);
        password = password.slice(0, randomIndex) + passwordBase[i] + password.slice(randomIndex);
    }

    let passwordFinal = '';
    for(let i = 0; i < passwordLenght.value; i++){
        passwordFinal += password[i]
    }
    if(!passwordFinal.length) return;
    
    passwordResult.textContent = passwordFinal;
    passwordResult.style.opacity = 1;

    handleLevelStreigth();
}


function checkedSets(){
    const dataCharacters = [];
    checkboxes.forEach(checkbox => checkbox.checked && dataCharacters.push(characterSet[checkbox.id]));
    return dataCharacters;
}


// copie password

const copyBtn = document.querySelector('#icon-copy');
const copyMsg = document.querySelector('.txt-copy');

copyBtn.addEventListener('click', () => {
    let locked = false;
    navigator.clipboard.writeText(passwordResult.textContent);

    if(!locked){
        copyMsg.classList.add('active');
        locked = true;

        setTimeout(() => {
            copyMsg.classList.remove('active');
            locked = false;
        }, 1200)
    }
})

// force du password

const rodsStreigth = document.querySelectorAll('.rod');
const levelPassword = document.getElementById('level-password');

const strength = [
    ['TOO WEAK!', "#F64A4A"],
    ['WEAK', '#FB7C58'],
    ['MEDIUM', '#F8CD65'],
    ['STRONG', '#A4FFAF']
]


function handleDisplayStreigth(levelStreigth) {
    levelPassword.textContent = `${strength[levelStreigth][0]}`;

    for(let i = 0; i < levelStreigth + 1; i++){
        rodsStreigth[i].style.background = `${strength[levelStreigth][1]}`;
        rodsStreigth[i].style.border = `2px solid ${strength[levelStreigth][1]}`;
    }
}


function handleLevelStreigth() {
    let levelStreigth = -1;
    let checkboxChecked = 0;
    checkboxes.forEach(boxe => {
        if(boxe.checked){
            checkboxChecked++
        }
    })

    if(passwordLenght.value < 6 || checkboxChecked < 2){
        levelStreigth = 0
    }
    else if(8 <= passwordLenght.value && checkboxChecked === 4){
        levelStreigth = 3
    }
    else if(passwordLenght.value >= 6 && checkboxChecked < 3){
        levelStreigth = 1
    }
    else if(6 < passwordLenght.value < 8 && checkboxChecked <= 4){
        levelStreigth = 2
    }

    handleDisplayStreigth(levelStreigth)
}

