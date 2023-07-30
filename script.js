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
    console.log(passwordBase);

    for(let i = checkedDataSets.length; i < passwordLenght.value; i++){
        password += concatenatedDataSets[getRandomNumber(0, concatenatedDataSets.length - 1)]
    }
    console.log(passwordLenght.value);

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
}

function checkedSets(){
    const dataCharacters = [];
    checkboxes.forEach(checkbox => checkbox.checked && dataCharacters.push(characterSet[checkbox.id]));
    return dataCharacters;
}