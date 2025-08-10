from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

app = Flask(__name__)  # ✅ Correct — double underscores

# Database setup
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'results.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model for storing quiz and challenge results
class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    skill_type = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Home page
@app.route('/')
def home():
    return render_template('index.html')

# Route for submitting results
@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get('name')
    score = int(request.form.get('score', 0))
    skill_type = request.form.get('skill_type')

    new_result = Result(name=name, score=score, skill_type=skill_type)
    db.session.add(new_result)
    db.session.commit()

    return redirect(url_for('results'))

# Show all results
@app.route('/results')
def results():
    all_results = Result.query.order_by(Result.timestamp.desc()).all()
    return render_template('results.html', results=all_results)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
