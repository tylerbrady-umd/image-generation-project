document.getElementById('imageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
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
    })
    .catch(error => console.error('Error:', error));
});

