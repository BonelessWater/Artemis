# Wifi ON
import os
import openai
from dotenv import load_dotenv

# Wifi OFF
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

load_dotenv()

def connect(prompt, wifi=True):

    if wifi:
        
        openai_api_key = os.getenv("API_KEY")
        if not openai_api_key:
            raise ValueError("API_KEY not found in environment variables.")

        openai.api_key = openai_api_key

        # Create a chat completion using the ChatGPT API
        response = openai.ChatCompletion.create(
            model="gpt-4",  # or "gpt-4" if you have access
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        # Print out the response from ChatGPT
        return response.choices[0].message.content
    else:
        # Use the absolute path to ensure it's recognized as a local directory
        model_path = r"DeepSeek-R1-Distill-Qwen-1.5B"

        # Load the tokenizer and model
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        model = AutoModelForCausalLM.from_pretrained(model_path)

        # Move the model to the appropriate device
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model.to(device)

        # Prepare an input prompt
        input_text = "Hello, how are you?"
        inputs = tokenizer(input_text, return_tensors="pt").to(device)

        # Generate output from the model
        outputs = model.generate(**inputs, max_length=50)
        result = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return result

if __name__ == "__main__":
    prompt = "Hello"
    print(connect(prompt=prompt, wifi=True))