# new_flask_api.py or modified flask_app.py
import os
import json
from pathlib import Path
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from parser import parse_resume

# --- Config ---
UPLOAD_FOLDER = Path(__file__).resolve().parent / "uploads"
ALLOWED_EXT = {"pdf", "doc", "docx"} # Adding doc/docx to be safe
UPLOAD_FOLDER.mkdir(exist_ok=True)

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = str(UPLOAD_FOLDER)

# --- Helpers ---
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXT

# --- Routes ---
@app.route("/api/parse-resume", methods=["POST"])
def parse_resume_api():
    if "resume" not in request.files:
        return jsonify({"error": "No file part"}), 400

    f = request.files["resume"]
    if f.filename == "":
        return jsonify({"error": "No selected file"}), 400
    if not allowed_file(f.filename):
        return jsonify({"error": "Only PDF, DOC, and DOCX files are allowed"}), 400

    try:
        filename = secure_filename(f.filename)
        save_path = UPLOAD_FOLDER / filename
        f.save(save_path)

        # Call your core parsing function
        parsed_data = parse_resume(str(save_path))

        # Cleanup the temporary file
        os.remove(save_path)

        # Return the parsed JSON data
        return jsonify({"message": "Resume parsed successfully!", "data": parsed_data}), 200

    except Exception as e:
        print(f"Error parsing resume: {e}")
        return jsonify({"error": "Failed to parse the resume"}), 500

if __name__ == "__main__":
    # In production, this should be run with a production server like Gunicorn
    app.run(debug=True, host="0.0.0.0", port=5001)