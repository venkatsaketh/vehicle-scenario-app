import './App.css';
import SideBar from './components/SideBar';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import AddScenario from './components/AddScenario';
import AddVehicle from './components/AddVehicle';
import View from './components/ViewScenario';

function App() {
  return (
    <div className="App">
      <SideBar/>
      <div className="content">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/AddScenario" element={<AddScenario/>} />
        <Route path="/AddVehicle" element={<AddVehicle/>} />
        <Route path="/View" element={<View/>} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
