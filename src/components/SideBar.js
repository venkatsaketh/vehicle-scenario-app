import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();

  const navigatePage = (Pname) => {
    navigate(Pname);
  }
  return (
    <div className="sidebar">
      <div className="nav">
        <button onClick={() => navigatePage("/")}>Home</button>
        <button onClick={() => navigatePage("AddScenario")}>Add Scenario</button>
        <button onClick={() => navigatePage("View")}>All Scenarios</button>
        <button onClick={() => navigatePage("AddVehicle")}>Add Vehicle</button>
      </div>
    </div>
  );
}

export default SideBar;