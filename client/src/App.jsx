import { useState } from 'react'
import './App.css'
import Nav from './Nav';

function App() {
  const [prompt, setPrompt] = useState('');
  const [bgImage, setBgImage] = useState('');
  const [visible, setVisible] = useState(!true);

  const hide = () => {
    setVisible(!visible);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    hide();

    try {
      // url originally "http://localhost:3000/image" during development.
      // Changed to "/image" for build.
      const response = await fetch('/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (response.ok) {
        const { image } = await response.json();
        setBgImage(image);
        setVisible(!true);
      } else {
        const err = await response.text();
        console.error(err);
        alert(err);
        setVisible(!true);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="app">
      <Nav />
      <h1>Text to Image Generator</h1>
      <div id='image' style={{ backgroundImage: `url(${bgImage})` }}></div>
      <form onSubmit={handleSubmit}>
        <input name='prompt' value={prompt} onChange={(e) => setPrompt(e.target.value)} type='text' placeholder='Enter your prompt.' maxLength='150' required></input>
        <button type='submit'>Generate <span className={visible ? 'loader' : 'hide loader'}></span></button>
      </form>
      <span className='footer'>This site was built using <a href='https://reactjs.org/' target='blank' className='react'>React</a> and <a href='https://vitejs.dev/' target='blank' className='vite'>Vite</a> for the front-end, <a href='https://expressjs.com/' target='blank' className='express'>Express</a> for the back-end and the <a href='https://openai.com/blog/dall-e-api-now-available-in-public-beta/' target='blank' className='express'>OpenAI DALL·E API</a>.</span>
      <span className='footer'>You can find the source code <a href='https://github.com/piarenivar/text-to-image' target='blank'>here.</a></span>
    </div>
  )
}

export default App;
