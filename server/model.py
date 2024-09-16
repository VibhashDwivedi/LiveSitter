from pymongo import MongoClient
import uuid

class OverlayModel:
    def __init__(self, db):
        self.collection = db.overlays

    def create_overlay(self, content, overlay_type, position, size=None):
        if size is None:
            size = {'width': 100, 'height': 100}
        new_overlay = {
            'id': str(uuid.uuid4()),  # Generate a unique ID
            'content': content,
            'type': overlay_type,
            'position': position,
            'size': size
        }
        self.collection.insert_one(new_overlay)
        return new_overlay

    def get_overlays(self):
        return list(self.collection.find({}, {'_id': 0}))  # Exclude MongoDB's internal _id field

    def update_overlay(self, overlay_id, content, overlay_type, position, size=None):
        if size is None:
            size = {'width': 100, 'height': 100}
        updated_overlay = {
            'content': content,
            'type': overlay_type,
            'position': position,
            'size': size
        }
        result = self.collection.update_one({'id': overlay_id}, {'$set': updated_overlay})
        return result.matched_count > 0

    def delete_overlay(self, overlay_id):
        result = self.collection.delete_one({'id': overlay_id})
        return result.deleted_count > 0