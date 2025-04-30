import {  useState } from "react";
import axios from "axios";
import baseUrl from "../const/const";
import { useAuth } from "../context/AuthContext";

export default function useDashboard() {
    const {user}=useAuth()
  const [isLoading, setIsLoading] = useState(true);
  const [myPatient, setMyPatient] = useState([]);
  const [freePatient, setFreePatient] = useState([]);
  const [patientId, setPatientId] = useState(0);
  const [bgm2, setBgm2] = useState([]);
  const [bgm,setBgm] = useState([]);
  const [bgm3, setBgm3] = useState([]);
    const [myMed,setMyMed] = useState(0);
    const [otherMed,setOtherMed] = useState(0);
  
  async function loadPatientData(value) {
    try {
      const res = await axios.get(`${baseUrl}api/v1/users/patient/${value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt_token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (res?.data?.status === "success" && res.data.data) {
        const { bgm2 = [], bgm3 = [] } = res.data.data;
        setBgm2(bgm2.map((e) => e.bgm_num));
        setBgm3(bgm3.map((e) => e.bgm_num));
      } else {
        console.error("Unexpected response format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  }
  
  async function loadUserData() {
    setIsLoading(true);
    const res = await axios.get(`${baseUrl}api/v1/users/doctor_new_patient`, {
      headers: {
        Authorization: `Bearer ${localStorage.jwt_token}`,
        "Content-Type": "application/json",
      },
    });
    const { data } = res.data;
    if (res.data.status === "success") {
      console.log(data);
      setMyPatient(data.myPatient);
      setFreePatient(data.freePatient);
    }
    setIsLoading(false);
  }

  async  function loadPatientInfo(){
    setIsLoading(true);
    const res =await axios.get(`${baseUrl}api/v1/users/patient/${user.userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.jwt_token}`,
            "Content-Type": "application/json",
        },
    });
    const {data}=res.data;
    if(res.data.status==='success'){
      const b=data.bgm
      const b2=data.bgm2.map(e=>e.bgm_num)
      const b3=data.bgm3.map(e=>e.bgm_num)
        setBgm(b);
        setBgm2(b2);
        setBgm3(b3);
    }
      setIsLoading(false);
    }
    
  async  function loadPharmInfo(){
    setIsLoading(true);
    const res =await axios.get(`${baseUrl}api/v1/meds/pharm`, {
        headers: {
            Authorization: `Bearer ${localStorage.jwt_token}`,
            "Content-Type": "application/json",
        },
    });
    const {data}=res.data;
    if(res.data.status==='success'){
        setMyMed(data.myMed);
        setOtherMed(data.otherMed);
        console.log(data)
    }
    setIsLoading(false);
    }
   

  return {
    bgm,
    bgm2,
    bgm3,
    myMed,
    otherMed,
    loadPatientData,
    loadUserData,
    isLoading,
    myPatient,
    freePatient,
    patientId,
    setPatientId,
    loadPatientInfo,
    loadPharmInfo,
    setIsLoading
  };
}
