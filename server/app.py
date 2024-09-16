from flask import Flask, request, jsonify, send_from_directory
from flask_pymongo import PyMongo
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from db import init_db
from config import Config
from model import OverlayModel

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

mongo = PyMongo(app)
init_db(app)

overlay_model = OverlayModel(mongo.db)

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/overlays', methods=['POST'])
def create_overlay():
    data = request.json
    new_overlay = overlay_model.create_overlay(
        content=data['content'],
        overlay_type=data['type'],
        position=data['position'],
        size=data.get('size')
    )
    return jsonify({'message': 'Overlay created successfully', 'id': new_overlay['id']}), 201

@app.route('/overlays', methods=['GET'])
def get_overlays():
    overlays = overlay_model.get_overlays()
    return jsonify(overlays)

@app.route('/overlays/<string:id>', methods=['PUT'])
def update_overlay(id):
    data = request.json
    success = overlay_model.update_overlay(
        overlay_id=id,
        content=data['content'],
        overlay_type=data['type'],
        position=data['position'],
        size=data.get('size')
    )
    if not success:
        return jsonify({'message': 'Overlay not found'}), 404
    return jsonify({'message': 'Overlay updated successfully'})

@app.route('/overlays/<string:id>', methods=['DELETE'])
def delete_overlay(id):
    success = overlay_model.delete_overlay(overlay_id=id)
    if not success:
        return jsonify({'message': 'Overlay not found'}), 404
    return jsonify({'message': 'Overlay deleted successfully'})

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        file_url = f"/{UPLOAD_FOLDER}{filename}"
        return jsonify({'url': file_url}), 201

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True, port=5000)
    