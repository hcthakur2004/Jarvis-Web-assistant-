// JARVIS Web Assistant
const startBtn = document.getElementById("start-btn");
const outputText = document.getElementById("output-text");

// Initialize speech recognition and speech synthesis
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const synth = window.speechSynthesis;

// Set recognition properties
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Start recognition when button is clicked
startBtn.addEventListener("click", () => {
    outputText.textContent = "Listening...";
    recognition.start();
});

// Handle recognition result
recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript.toLowerCase();
    outputText.textContent = `You said: "${speechResult}"`;

    // Process the user's voice input (commands)
    processCommand(speechResult);
};

// Error handling
recognition.onerror = (event) => {
    outputText.textContent = `Error occurred in recognition: ${event.error}`;
};

// Stop recognition when finished
recognition.onspeechend = () => {
    recognition.stop();
};

// Function to process voice commands
function processCommand(command) {
    let response = "I'm sorry, I didn't understand that.";

    if (command.includes("hello")) {
        response = "Hello, how can I assist you?";
    } else if (command.includes("what is your name")) {
        response = "My name is JARVIS.";
    } else if (command.includes("open youtube")) {
        response = "Opening YouTube.";
        window.open("https://www.youtube.com");
    } else if (command.includes("open google")) {
        response = "Opening Google.";
        window.open("https://www.google.com");
    } else if (command.includes("what time is it")) {
        const time = new Date().toLocaleTimeString();
        response = `The time is ${time}.`;
    }

    // Speak the response
    speakResponse(response);
}

// Function to convert text to speech
function speakResponse(text) {
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);

    utterThis.onend = () => {
        console.log("Speech synthesis finished.");
    };
}
