import os
from utils import *
from dotenv import load_dotenv
import speech_recognition as sr
import google.generativeai as genai

load_dotenv("secrets.env")

genai.configure(api_key = os.environ["GOOGLE_API_KEY"])
r = sr.Recognizer()

# Configuration settings for text generation
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

# Safety settings to filter harmful content during text generation
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

# Initialize the GenerativeModel with specified settings
model = genai.GenerativeModel(
    model_name="gemini-1.0-pro-latest",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

chat = model.start_chat(history=[])

with sr.Microphone() as source:
    print("Please give input through speech")
    audio = r.listen(source)
    input = r.recognize_google(audio)
    print(f"\nInput: {input}")
    output = chat.send_message(input).text
    text_to_speech(output)
    print(f"\nOutput: {output}\n")
    play_audio()
    
    