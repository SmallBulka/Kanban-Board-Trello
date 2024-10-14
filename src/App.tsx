
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'


import KarbanBord from './components/KarbanBord'
import Slidebar from './components/layout/sidebar/Slidebar';
import Tasks from './components/Tasks';
import TotmatTaimer from './components/Timer/TotmatTaimer';





function App() {
  return (
    <BrowserRouter>
        <Slidebar/>

      <Routes>
        <Route path='/Timer' element={<TotmatTaimer/>}/>
        <Route path='/Dashboard' element={<KarbanBord/>}/>
        <Route path='/Tasks' element={<Tasks/>}/>
      </Routes>
  </BrowserRouter>
  );
  
}


export default App;
