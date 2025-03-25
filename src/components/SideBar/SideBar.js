
import home_icon from '../../Assets/home_icon.png';
import dashboard_icon from '../../Assets/dashboard_icon.png';
import mammograph_icon from '../../Assets/mammograph_icon.png';
import pathology_icon from '../../Assets/pathology_icon.png';
import patient_icon from '../../Assets/patient_icon.png';
import doctor_icon from '../../Assets/doctor_icon.png';
import { Link } from 'react-router-dom';
import './SideBar.scss'

export default function SideBar(){
    return(
        
<aside className="aside_nav">
<ul>
  <li>
    <Link to="/">
      <img src={home_icon} alt="Home" />
      <h3>Home</h3>
    </Link>
  </li>
  <li>
    <Link to="/Dashboard">
      <img src={dashboard_icon} alt="Dashboard" />
      <h3>Dashboard</h3>
    </Link>
  </li>
  <li>
    <Link to="/Patients">
      <img src={patient_icon} alt="Patients" />
      <h3>Patients</h3>
    </Link>
  </li>
  <li>
    <Link to="/Doctors">
      <img src={doctor_icon} alt="Doctors" />
      <h3>Doctors</h3>
    </Link>
  </li>
  <li>
    <Link to="/mammograph">
      <img src={mammograph_icon} alt="Mammograph" />
      <h3>Mammograph</h3>
    </Link>
  </li>
  <li>
    <Link to="/pathology">
      <img src={pathology_icon} alt="Pathology" />
      <h3>Pathology</h3>
    </Link>
  </li>
</ul>
</aside>
    )
}