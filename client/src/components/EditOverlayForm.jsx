import React from 'react';

const EditOverlayForm = ({ overlay, setOverlay, onSave, onCancel }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1000
    }}>
      <h3>Edit Overlay</h3>
      <input
        type="text"
        placeholder="Text or Image URL"
        value={overlay.content}
        onChange={(e) => setOverlay({ ...overlay, content: e.target.value })}
        style={{ display: overlay.type === 'text' ? 'block' : 'none' }}
        className='form-control my-2'
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setOverlay({ ...overlay, imageFile: e.target.files[0] })}
        style={{ display: overlay.type === 'image' ? 'block' : 'none' }}
        className='form-control my-2'
      />
      <button className='btn btn-primary mx-2' onClick={onSave}>Save</button>
      <button className='btn btn-secondary' onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditOverlayForm;