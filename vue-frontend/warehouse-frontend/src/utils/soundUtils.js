export function playErrorSound() {
    const errorSound = new Audio(require('@/assets/sounds/error-sound.wav'));
    errorSound.play();
}

export function playSuccessSound(){
    const successSound = new Audio(require('@/assets/sounds/success-sound.wav'));
    successSound.play();
}