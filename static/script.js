document.getElementById('imageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const generateBtn = document.getElementById('generateBtn');
    
    // Disable the button and show loading text or spinner
    generateBtn.disabled = true;
    generateBtn.innerText = 'Loading...';
    
    fetch('/generate-image', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.blob())
    .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        const image = document.getElementById('generatedImage');
        image.src = imageUrl;
        image.style.display = 'block';

        // Enable the button and reset its text
        generateBtn.disabled = false;
        generateBtn.innerText = 'Generate Image';
    })
    .catch(error => {
        console.error('Error:', error);
        // In case of error, enable the button and reset its text
        generateBtn.disabled = false;
        generateBtn.innerText = 'Generate Image';
    });
});

