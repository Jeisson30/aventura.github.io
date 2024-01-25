import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
//import Carousel from 'react-bootstrap/Carousel';
import './Photos.css'; 

const Photos = ({ userId }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, userId);

    listAll(storageRef)
      .then((result) => {
        const promises = result.items.map((item) => getDownloadURL(item));
        return Promise.all(promises);
      })
      .then((downloadUrls) => {
        setPhotos(downloadUrls);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, [userId]);

  if (photos.length === 0) {
    return <p className="no-photos">Iniciemos la aventura</p>;
  }

  return (
    <div>
      {photos.map((photo, index) => (

          <img className="d-block enlarge-image" src={photo} alt={`Foto ${index + 1}`} />

      ))}
    </div>
  );
};

export default Photos;
