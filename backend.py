from flask import Flask, request, send_file, render_template
from diffusers import StableDiffusionPipeline
import torch

app = Flask(__name__)

# Loading in the image generation model
model_id = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float32)
pipe = pipe.to("cpu") #Using CPU cause not all computers have needed GPU

@app.route('/')
def index():
    # Serving the local web UI html
    return render_template('index.html')

@app.route('/generate-image', methods=['POST'])
def generate_image():
    prompt = request.form['prompt']
    image = pipe(prompt).images[0]
    image_path = "generated_image.png"
    image.save(image_path)
    return send_file(image_path, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
