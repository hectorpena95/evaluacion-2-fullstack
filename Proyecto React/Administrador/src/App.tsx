import React from 'react'; 
import './App.css'; 

import Cabecera from './components/Cabecera.jsx';
import PieDePagina from './components/PieDePagina.jsx';
import PaginaCatalogo from './paginas/PaginaCatalogo.jsx'; 


function App() {
  return (
    <>
      <Cabecera />
      <PaginaCatalogo /> 
      <PieDePagina />
    </>
  );
}

export default App;