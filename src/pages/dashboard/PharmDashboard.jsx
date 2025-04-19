import { useEffect, useState } from "react";
import PieChart from "../../components/PieChart"
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import baseUrl from "../../const/const";

function PharmDashboard() {
    const {user}=useAuth()
    const [isLoading,setIsLoading]=useState(true)
  const [myMed,setMyMed] = useState(0);
  const [otherMed,setOtherMed] = useState(0);
  useEffect(() => {
  async  function loadUserData(){
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
    loadUserData();
  }, []);

  if(isLoading){
    return <div>Loading...</div>
  }
    return (
        <div>
        
            <PieChart  labels={["الادوية الخاصه بي","الادوية الاخري"]} series={[myMed.length,otherMed.length]}/>
        </div>
    )
}

export default PharmDashboard
