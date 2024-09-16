import React from 'react';
import Draggable from 'react-draggable';
import Swal from 'sweetalert2';

const Overlay = ({ overlay, onDragStop, onUpdate, onDelete, showOptions, toggleOptions }) => {
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this overlay!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire(
          'Deleted!',
          'Your overlay has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <Draggable bounds="parent" defaultPosition={overlay.position} onStop={onDragStop}>
      <div
        onClick={() => toggleOptions(overlay.id)}
        style={{
          cursor: 'move',
          backgroundColor: 'rgba(240, 240, 240)',
          transform: 'translate(-50%, -50%)',
        }}
        className='position-absolute text-center p-1 rounded-2'
      >
        {overlay.type === 'text' ? (
          <div>{overlay.content}</div>
        ) : (
          <img src={`http://localhost:5000${overlay.content}`} alt="overlay" style={{ maxWidth: '100px', maxHeight: '100px' }} />
        )}
        {showOptions && (
          <div style={{ marginTop: '5px' }}>
            <button className='border-0 bg-transparent' onClick={() => onUpdate(overlay.id)} style={{ marginRight: '5px' }}>
              <i className="fa-solid fa-pen" style={{color: 'blue'}}></i>
            </button>
            <button className='border-0 bg-transparent' onClick={() => handleDelete(overlay.id)}>
              <i className="fa-solid fa-trash-can" style={{color:'red'}}></i>
            </button>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Overlay;