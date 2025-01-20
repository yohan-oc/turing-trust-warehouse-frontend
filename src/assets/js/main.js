
const assetIdInput = document.getElementById('assetId');
const messageDiv = document.getElementById('message');
const messageSuccessDiv = document.getElementById('message-success');

assetIdInput.addEventListener('input', function () {
const assetId = assetIdInput.value.trim();

if (assetId === '100') {
    // Show error message and play error sound
    assetIdInput.classList.add('is-invalid');
    assetIdInput.classList.remove('is-valid');
    messageDiv.textContent = "Error: Invalid Asset ID.";
    messageDiv.style.display = 'block';  // Show error message
    messageSuccessDiv.style.display = 'none';  // Hide success message
playErrorSound();
} else if (assetId === '200') {
    // Show success message and play success sound
    assetIdInput.classList.add('is-valid');
    assetIdInput.classList.remove('is-invalid');
    messageSuccessDiv.textContent = "Success: Asset ID is valid.";
    messageSuccessDiv.style.display = 'block';  // Show success message
    messageDiv.style.display = 'none';  // Hide error message
    playSuccessSound();
} else {
    // Reset form and hide both messages
    assetIdInput.classList.remove('is-invalid', 'is-valid');
    messageDiv.style.display = 'none';
    messageSuccessDiv.style.display = 'none';
}
});

function playErrorSound() {
    const errorSound = new Audio('./assets/sounds/error-sound.mp3'); // Make sure you have an error sound file.
    errorSound.play();
}

function playSuccessSound() {
    const successSound = new Audio('./assets/sounds/success-sound.mp3'); // Make sure you have a success sound file.
    successSound.play();
}