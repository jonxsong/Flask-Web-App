from flask import Blueprint, flash, jsonify, render_template, request
from flask_login import login_required, current_user
from .models import Note
from website._init_ import db
import json
import openai

openai.api_key = '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'

views = Blueprint('views', __name__) 

@views.route('/', methods=['GET','POST'])
@views.route('/home', methods=['GET','POST'])
@login_required
def home():
    if request.method == 'POST':
        note = request.form.get('note')

        if len(note) < 1:
            flash('Note is too short!', category='error')
        else:
            new_note = Note(data=note, user_id=current_user.id)
            db.session.add(new_note)
            db.session.commit()
            flash('Note added!', category='success')

    return render_template("home.html", user=current_user)

@views.route('/chat', methods=['POST'])
def chat():
    message = request.form['message']
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=message,
        max_tokens=50,
        n=1,
        stop=None,
        temperature=0.7
    )
    reply = response.choices[0].text.strip()
    return reply

@views.route('/delete-note', methods=['POST'])
def delete_note():
    note = json.loads(request.data)
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()

    return jsonify({})