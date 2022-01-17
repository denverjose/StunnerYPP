                            
import './App.css';
import AddSong from './pages/AddSong';
import Navbar from './pages/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import ViewSong from './pages/ViewSong';
import EditSong from './pages/EditSong';
axios.defaults.baseURL = "http://localhost:8000/"

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path ="/songs" element={<ViewSong/>}></Route>
        <Route exact path ="/addsong" element={<AddSong/>}></Route>
        <Route exact path ="/songs/editsong/:id" element={<EditSong/>}></Route>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;