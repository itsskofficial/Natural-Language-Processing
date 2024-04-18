from gtts import gTTS
import soundfile as sf
import sounddevice as sd

def text_to_speech(text, output_file = "./output.mp3"):
    tts = gTTS(text=text, lang="en")
    tts.save(output_file)

def play_audio(file_path = "./output.mp3"):
    data, fs = sf.read(file_path, dtype = "float32")
    sd.play(data, fs)
    sd.wait()