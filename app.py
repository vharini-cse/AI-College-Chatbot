from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder=".")


# --------------------------------
# College Enquiry Responses
# --------------------------------

def get_bot_response(message):

    message = message.lower().strip()

    if "admission" in message:
        return (
            "Admissions are currently open at PEC College. "
            "Students can visit the Admission Office for application "
            "details, eligibility requirements and important dates."
        )

    elif "course" in message or "courses" in message:
        return (
            "PEC College offers Undergraduate, Postgraduate and "
            "Professional courses in various disciplines. "
            "Please contact the college office for the complete course list."
        )

    elif "fee" in message or "fees" in message:
        return (
            "The fee structure depends on the selected course. "
            "Students can contact the Accounts Office for detailed "
            "information about tuition and other fees."
        )

    elif "hostel" in message:
        return (
            "PEC College provides separate hostel facilities for boys "
            "and girls. Hostel facilities include accommodation, mess, "
            "Wi-Fi and security."
        )

    elif "placement" in message:
        return (
            "The PEC College Placement Cell provides career guidance, "
            "internship opportunities, training and campus recruitment "
            "support for students."
        )

    elif "scholarship" in message:
        return (
            "Eligible students can apply for Government and Merit-based "
            "Scholarships. Please contact the Scholarship Cell for "
            "eligibility and application details."
        )

    elif "contact" in message:
        return (
            "You can contact PEC College through the college office. "
            "Phone: +91-9876543210 | "
            "Email: info@peccollege.edu"
        )

    elif "hello" in message or "hi" in message:
        return (
            "Hello! Welcome to PEC College. "
            "How may I help you today?"
        )

    else:
        return (
            "I'm sorry, I don't have information about that enquiry yet. "
            "Please ask about admissions, courses, fees, hostel, "
            "placements, scholarships or contact information."
        )


# --------------------------------
# Serve Website Files
# --------------------------------

@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/<path:filename>")
def serve_files(filename):
    return send_from_directory(".", filename)


# --------------------------------
# Chatbot API
# --------------------------------

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({
            "reply": "Please enter a question."
        }), 400

    user_message = data["message"]

    reply = get_bot_response(user_message)

    return jsonify({
        "reply": reply
    })


# --------------------------------
# Run Flask
# --------------------------------

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )