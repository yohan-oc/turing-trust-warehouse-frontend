export function playErrorSound() {
    const errorSound = new Audio(require('@/assets/sounds/error-sound.mp3'));
    errorSound.play();
}

export function playSuccessSound(){
    const successSound = new Audio(require('@/assets/sounds/success-sound.mp3'));
    successSound.play();
}