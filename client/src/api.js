export const fetchOverlays = () => {
    return fetch('http://localhost:5000/overlays')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  };
  
  export const addOverlay = (overlay) => {
    return fetch('http://localhost:5000/overlays', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(overlay)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  };
  
  export const updateOverlay = (id, overlay) => {
    return fetch(`http://localhost:5000/overlays/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(overlay)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  };
  
  export const deleteOverlay = (id) => {
    return fetch(`http://localhost:5000/overlays/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  };
  
  export const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
  
    return fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json());
  };