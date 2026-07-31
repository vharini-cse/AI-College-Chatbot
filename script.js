// ==========================================
// PEC COLLEGE AI CHATBOT
// Frontend ↔ Flask Backend Connection
// ==========================================


// Get elements from the HTML page
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");


// ==========================================
// SEND MESSAGE
// ==========================================

async function sendMessage() {

    const message = userInput.value.trim();

    // Do nothing if the input is empty
    if (message === "") {
        return;
    }

    // Display the user's message
    addUserMessage(message);

    // Clear the input box
    userInput.value = "";

    // Show temporary thinking message
    const thinkingMessage = addBotMessage("Thinking...");

    try {

        // Send the message to Flask backend
        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        // Check whether the backend responded successfully
        if (!response.ok) {
            throw new Error("Server response was not successful.");
        }


        // Convert backend response to JSON
        const data = await response.json();


        // Replace "Thinking..." with actual response
        thinkingMessage.querySelector("p").textContent = data.reply;


    } catch (error) {

        console.error("Chatbot error:", error);

        // Show error message to the user
        thinkingMessage.querySelector("p").textContent =
            "Sorry, I am unable to connect to the college server right now. Please try again.";

    }


    // Scroll to latest message
    scrollChat();

}


// ==========================================
// QUICK QUESTION BUTTONS
// ==========================================

function quickQuestion(question) {

    // Put the selected question into the input box
    userInput.value = question;

    // Send it to the backend
    sendMessage();

}


// ==========================================
// ADD USER MESSAGE
// ==========================================

function addUserMessage(message) {

    const userDiv = document.createElement("div");

    userDiv.className = "user-chat";

    userDiv.innerHTML = `
        <div class="chat-message user-message">
            <h3>You</h3>
            <p>${escapeHTML(message)}</p>
        </div>
    `;

    chatBox.appendChild(userDiv);

    scrollChat();

}


// ==========================================
// ADD BOT MESSAGE
// ==========================================

function addBotMessage(message) {

    const botDiv = document.createElement("div");

    botDiv.className = "bot-chat";

    botDiv.innerHTML = `
        <div class="bot-icon">🤖</div>

        <div class="chat-message">

            <h3>AI Assistant</h3>

            <p>${escapeHTML(message)}</p>

        </div>
    `;

    chatBox.appendChild(botDiv);

    scrollChat();

    return botDiv;

}


// ==========================================
// SCROLL CHAT TO LATEST MESSAGE
// ==========================================

function scrollChat() {

    chatBox.scrollTop = chatBox.scrollHeight;

}


// ==========================================
// PROTECT CHAT FROM HTML INPUT
// ==========================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ==========================================
// ENTER KEY SUPPORT
// ==========================================

userInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendMessage();

    }

});
