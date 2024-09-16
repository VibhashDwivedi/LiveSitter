import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import Overlay from './Overlay';
import EditOverlayForm from './EditOverlayForm';
import { fetchOverlays, addOverlay, updateOverlay, deleteOverlay, uploadImage } from '../api';
import Swal from 'sweetalert2';

const LiveStreamPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState({ content: '', type: 'text', position: { x: 320, y: -180 }});
  const [imageFile, setImageFile] = useState(null);
  const [editingOverlay, setEditingOverlay] = useState(null);
  const [showOptions, setShowOptions] = useState({}); 

  useEffect(() => {
    fetchOverlays()
      .then(data => setOverlays(data))
      .catch(error => console.error('Error fetching overlays:', error));
  }, []);

  const handleAddOverlay = () => {
    if (newOverlay.type === 'text' && !newOverlay.content.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Text content cannot be empty!',
      });
      return;
    }

    if (newOverlay.type === 'image' && !imageFile) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please choose an image file!',
      });
      return;
    }

    if (newOverlay.type === 'image' && imageFile) {
      uploadImage(imageFile)
        .then(data => {
          const overlayContent = data.url; // URL of the uploaded image
          addOverlayToServer(overlayContent);
        })
        .catch(error => console.error('Error uploading image:', error));
    } else {
      addOverlayToServer(newOverlay.content);
    }
  };

  const addOverlayToServer = (content) => {
    addOverlay({ ...newOverlay, content })
      .then((data) => {
        setOverlays([...overlays, { ...newOverlay, id: data.id, content }]);
        setNewOverlay({ content: '', type: 'text', position: { x: 320, y: -180 } });
        setImageFile(null);
      })
      .catch(error => console.error('Error adding overlay:', error));
  };

  const handleUpdateOverlay = (id) => {
    const overlayToUpdate = overlays.find(overlay => overlay.id === id);
    setEditingOverlay(overlayToUpdate);
  };

  const handleSaveOverlay = () => {
    updateOverlay(editingOverlay.id, editingOverlay)
      .then(() => {
        setOverlays(overlays.map(overlay => (overlay.id === editingOverlay.id ? editingOverlay : overlay)));
        setEditingOverlay(null);
      })
      .catch(error => console.error('Error updating overlay:', error));
  };

  const handleDeleteOverlay = (id) => {
    deleteOverlay(id)
      .then(() => {
        setOverlays(overlays.filter(overlay => overlay.id !== id));
      })
      .catch(error => console.error('Error deleting overlay:', error));
  };

  const handleDrag = (e, data) => {
    if (editingOverlay) {
      setEditingOverlay({ ...editingOverlay, position: { x: data.x, y: data.y } });
    } else {
      setNewOverlay({ ...newOverlay, position: { x: data.x, y: data.y } });
    }
  };

  const toggleOptions = (id) => {
    setShowOptions(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <video ref={videoRef} controls width="640" height="360">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {overlays.map((overlay) => (
        <Overlay
          key={overlay.id}
          overlay={overlay}
          onDragStop={handleDrag}
          onUpdate={handleUpdateOverlay}
          onDelete={handleDeleteOverlay}
          showOptions={showOptions[overlay.id]}
          toggleOptions={toggleOptions}
        />
      ))}
      <Draggable bounds="parent" position={newOverlay.position} onDrag={handleDrag}>
        <div
          style={{
            position: 'absolute',
            cursor: 'move',
            padding: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center' ,
            border: 'none' 
          }}
        >
          {newOverlay.type === 'text' ? (
            <div>{newOverlay.content}</div>
          ) : (
            newOverlay.content && <img src={`http://localhost:5000${newOverlay.content}`} alt="overlay" style={{ maxWidth: '100px', maxHeight: '100px' }} />
          )}
        </div>
      </Draggable>
      <div className='p-2'>
        <input
          type="text"
          placeholder="Text"
          value={newOverlay.content}
          className='form-control'
          onChange={(e) => setNewOverlay({ ...newOverlay, content: e.target.value })}
          style={{ display: newOverlay.type === 'text' ? 'block' : 'none' }}
        />
        <input
          type="file"
          accept="image/*"
          className='form-control'
          onChange={(e) => setImageFile(e.target.files[0])}
          style={{ display: newOverlay.type === 'image' ? 'block' : 'none' }}
        />
        <select
          value={newOverlay.type}
          onChange={(e) => setNewOverlay({ ...newOverlay, type: e.target.value })}
          className='form-select my-2'
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
        <button className='btn btn-primary' onClick={handleAddOverlay}>Add Overlay</button>
      </div>
      {editingOverlay && (
        <EditOverlayForm
          overlay={editingOverlay}
          setOverlay={setEditingOverlay}
          onSave={handleSaveOverlay}
          onCancel={() => setEditingOverlay(null)}
        />
      )}
    </div>
  );
};

export default LiveStreamPlayer;