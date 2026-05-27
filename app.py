from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# MongoDB Connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["shecan_db"]
contacts = db["contacts"]

# Home Route
@app.route("/")
def home():
    return render_template("index.html")

# Contact Form Route
@app.route("/submit", methods=["POST"])
def submit():

    # Get form data
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")

    # Validation
    if not name or not email or not message:
        return jsonify({
            "status": "error",
            "message": "All fields are required"
        })

    # Store in MongoDB
    contacts.insert_one({
        "name": name,
        "email": email,
        "message": message
    })

    return jsonify({
        "status": "success",
        "message": "Form Submitted Successfully"
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)