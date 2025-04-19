import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar"
import PatientDashboard from "./PatientDashboard";
import DoctorDashboard from "./DoctorDashboard";
import PharmDashboard from "./PharmDashboard";
import { useAuth } from "../../context/AuthContext";


// import styles from './HomePage.module.css'
function HomePage() {
const {user}=useAuth();
if (user.role=="patient") return <PatientDashboard />;
if (user.role=="doctor") return <DoctorDashboard />;
  if (user.role=="pharmacy") return <PharmDashboard />;
}

export default HomePage
