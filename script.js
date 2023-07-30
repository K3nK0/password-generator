const passwordLenght = document.getElementById('character-length');


passwordLenght.addEventListener('input', () => {
    handleBackRange(passwordLenght.value);
})

const backInputRange = document.querySelector('.background-range');
const valueLenghtPassword = document.getElementById('value-character-length');

function handleBackRange(value) {
    
    let valueRange = value - 4;
    let pourcentageValue = valueRange / 16 * 100;
    backInputRange.style.left = `${pourcentageValue}%`;

    valueLenghtPassword.textContent = value;
}