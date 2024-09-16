import React from 'react';
import './App.css'
import LiveStreamPlayer from './components/LiveStreamPlayer';

const App = () => {
  const videoUrl = 'https://wv-cdn-00-00.wowza.com/f24ec902-e8ae-4a34-a912-311226451bc0/v-c09280e1-33ca-4f1b-9d6f-f6a7ae33bc5e_original.mp4';

  return (
    <div className="bg-dark vh-100">
      <h1 className='text-center text-white pt-5'>Livestream player</h1>
      <div className='d-flex justify-content-center align-items-center '>
      <LiveStreamPlayer src={videoUrl}  />
      </div>
    
    </div>
  );
};

export default App;