import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Page from './components/page.jsx';
import './styles/index.scss';
import NavBar from './components/NavBar.jsx';

function App() {
  const [appWidth, setAppWidth] = useState(window.innerWidth);
  const [appHeight, setAppHeight] = useState(window.innerHeight);
  const [screen, setScreen] = useState();




  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  function handleResize(){
    setAppWidth(window.innerWidth);
    setAppHeight(window.innerHeight);
  }

  const handleImagenChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImagenSrc(url)
    setImagen(url) // Opcional: guarda la URL temporal en el estado
  }

  // Descargar datos como JSON
  const handleDownload = () => {
    const data = { frase, autor, imagen }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'datos.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Cargar datos desde un archivo JSON
  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        setFrase(data.frase || '')
        setAutor(data.autor || '')
        setImagen(data.imagen || '')
        setImagenSrc(data.imagen || '')
      } catch {
        alert('Archivo inválido')
      }
    }
    reader.readAsText(file)
  }

    // Permitir cambiar la imagen por URL manualmente
  const handleImagenUrl = (e) => {
    setImagen(e.target.value)
    setImagenSrc(e.target.value)
  }

  /*let screens = [
    {
      id: MAIN_SCREEN,
      content: <MainScreen appHeight={appHeight} appWidth={appWidth} onKeypadSolved={onKeypadSolved} />
    },
    {
      id: MESSAGE_SCREEN,
      content: <MessageScreen appHeight={appHeight} appWidth={appWidth} submitPuzzleSolution={submitPuzzleSolution} />
    }
  ];*/

  /*const renderScreen = (screenId, screenContent) => (
    <div key={screenId} className={`screen_wrapper ${screen === screenId ? 'active' : ''}`} >
      {screenContent}
    </div>
  );*/

  return (
   <>
      <div>
        {/*renderScreens(screens)*/}
        <NavBar/>
        <Page boxWidth={appWidth} boxHeight={appHeight}/>
      </div>

    </>
  )
}

export default App