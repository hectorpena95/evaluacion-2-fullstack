import React from 'react'; 
import './App.css'; 

import Cabecera from './components/Cabecera';
import PieDePagina from './components/PieDePagina';
import PaginaCatalogo from './paginas/PaginaCatalogo'; 


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