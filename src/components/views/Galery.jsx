import React, { useRef, useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import Photos from './Photos';
import Swal from 'sweetalert2';
import './Galery.css';

const Galery = ( { userId }) => {
  const videoRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error acceso camera:', error);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth /2;
    canvas.height = videoRef.current.videoHeight / 2;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL('image/png');
    setPhoto(dataURL);
  };

  const uploadPhoto = () => {
    if (photo) {
      const storage = getStorage();
      const storageRef = ref(storage, 'some-child');

      const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);

      uploadBytes(storageRef, bytes).then((snapshot) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡You Rock!",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Foto en servidor');
        setPhoto(null);
      });
    }
  };

  return (
    <div className="gallery-container">
      <div className="card">
        <video ref={videoRef} autoPlay playsInline />
        <div className="button-container">
          <button onClick={startCamera}>Inicia Camara</button>
          <button onClick={capturePhoto}>Captura Foto</button>
          <button onClick={uploadPhoto}>Sube tu foto</button>
        </div>
        {photo && <img className="captured-photo" src={photo} alt="Captured" />}
      </div>
      <div className="photos-container">
        <h2>Mis Fotos</h2>
        <Photos userId={userId} />
      </div>   
    </div>
  );
};

export default Galery;
