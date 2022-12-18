import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

function App() {

  const [imgFile, setImgFile] = useState();
  const [result, setResult] = useState();
  const imageInput = useRef();

  const handleClick = () => {
    imageInput.current.click();
  }

  const previewImage = () => {
    const file = imageInput.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const analyzeImage = () => {
    const img = document.getElementById('imagePreview')
    mobilenet.load().then((model) => {
      model.classify(img).then((predictions) => {
        console.log(predictions);
        setResult(predictions);
      })
    })
  }

  return (
    <div className="App">

      <div 
        className='previewContainer'
        ref={imageInput}
        onClick={handleClick}
      >
        <img 
          id='imagePreview'
          className='imagePreview'
          src={imgFile ? imgFile : 'src/assets/picture.png'}
        />
      </div>

      <h1>동물 품종 알려줌</h1>
      <h4>이미지 업로드하면 대충 알아맞힘</h4>

      <input 
        type="file"
        accept="image/*"
        ref={imageInput}
        style={{display: 'none'}} 
        onChange={previewImage}
      />

      <button 
        className="btn-upload"
        onClick={analyzeImage}
      >
        <span>분석하기!</span>
        <div className="progress"></div>
        <div className="check">
          <span></span>
          <span></span>
        </div>
      </button>

      <div className='result'>
        {
          result ? (
            <>
              <h3>이거... 혹시</h3>
              <h2>{result[0]?.className}</h2>
              <span>인듯</span>
              <h2>{Math.round(result[0].probability * 100)}% 정도 비슷하네여</h2>
            </>
          ) : null
        }
      </div>

    </div>
  )
}

export default App
