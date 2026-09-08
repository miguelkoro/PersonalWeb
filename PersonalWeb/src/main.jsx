import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './context/DataContext.jsx'
import { BrowserRouter } from 'react-router-dom'

//Porque me sale error al actualizar una pagina con una ruta que no es la principal, y no me deja entrar a la pagina, entonces hago esto para que si hay un parametro p en la url, lo use como ruta de fallback.
const fallbackRoute = new URLSearchParams(window.location.search).get('p');
if (fallbackRoute) {
  window.history.replaceState({}, '', decodeURIComponent(fallbackRoute));
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <App />
      </DataProvider>
    </BrowserRouter>
  </StrictMode>,
)
