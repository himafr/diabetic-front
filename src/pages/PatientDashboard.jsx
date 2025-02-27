import React, { useEffect, useRef, useState } from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import UserTable from "../components/UserTable";
import baseUrl from "../const/const";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function PatientDashboard() {
  const {user}=useAuth()
    const [isLoading,setIsLoading]=useState(true)
  const [bgm,setBgm] = useState([]);
  const [bgm2,setBgm2] = useState([]);
  const [bgm3,setBgm3] = useState([]);
  useEffect(() => {
  async  function loadUserData(){
    setIsLoading(true);
    const res =await axios.get(`${baseUrl}api/v1/users/patient/${user.userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.jwt_token}`,
            "Content-Type": "application/json",
        },
    });
    const {data}=res.data;
    if(res.data.status==='success'){
        setBgm(data.bgm);
        setBgm2(data.bgm2.map(e=>e.bgm_num));
        setBgm3(data.bgm3.map(e=>e.bgm_num));
    }
    setIsLoading(false);
    }
    loadUserData();
  }, []);

  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <div>
      <BarChart seriesName={["قياسات الشهر الحالي","قياسات الشهر الماضي"]} seriesValue={[bgm2,bgm3]}/>
      <UserTable   bgm={bgm} header={["صورة","اسم المستخدم ","قياس السكر","تاريخ القياس","الحاله"]}/>
    </div>
  );
}

export default PatientDashboard;
