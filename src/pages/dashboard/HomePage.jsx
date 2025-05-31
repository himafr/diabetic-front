import { useEffect, useState,useCallback } from "react";
import BarChart from "../../components/BarChart";
import UserTable from "../../components/UserTable";
import useDashboard from "../../hooks/dashboardHooks";
import DoctorTable from "../../components/DoctorTable";
import PieChart from "../../components/PieChart"
import { useAuth } from "../../context/AuthContext";
import InputFieldHandle from "../../components/inputField/InputField.handle";

// import styles from './HomePage.module.css'
function HomePage() {
  const [addBgm,setAddBgm]=useState(0);
    const handleChange = (e) => {
    setAddBgm(e.target.value);
  };

  const { user,addMyBgm } = useAuth();
  const {
    bgm2,
    bgm3,
    loadPatientData,
    freePatient,
    myPatient,
    patientId,
    setPatientId,
    isLoading,
    loadUserData,
    bgm,
    loadPatientInfo,
    loadPharmInfo,
    myMed,
    otherMed,
  } = useDashboard();
  
  const setPatientIdValue = useCallback(async (value) => {
    await loadPatientData(value);
    setPatientId(value);
  }, [loadPatientData,setPatientId]);

  useEffect(() => {
    if (user.role == "patient") loadPatientInfo();
    if (user.role == "doctor") loadUserData();
    if (user.role == "pharmacy") loadPharmInfo();
  }, []); // Runs only once when the component mounts
  if (isLoading) return <div>Loading...</div>;
  if (user.role == "patient")
    return (
  <div>
       <div className="flex">
                <InputFieldHandle
                          type={"number"}
                          placeholder="قياس السكر  "
                          required={true}
                          handleValue={handleChange}
                          width={"60%"}
                          value={addBgm}
                        />
                        
      <button className="inline ml-11" onClick={()=>addMyBgm(addBgm)}>  add your result </button>
          </div>
        <div >
          <BarChart
            seriesName={["قياسات الشهر الحالي", "قياسات الشهر الماضي"]}
            seriesValue={[bgm2, bgm3]}
          />
         
        </div>
        <UserTable
          bgm={bgm}
          header={[
            "صورة",  "اسم المستخدم ",  "قياس السكر",  "تاريخ القياس",  "الحاله",
          ]}   />
      </div>
    );
  if (user.role == "doctor")
    return (
      <div className="flex flex-wrap">
        <div className="w-1/2">
          <p>المرضي المسجلين </p>
          {myPatient.length !== 0 && (
            <DoctorTable
              setPatientId={setPatientIdValue}
              header={[
                "صورة",  "اسم المستخدم",  "الايمال",  "تاريخ الانشاء",  "الحاله",
              ]}
              bgm={myPatient}
            />
          )}
          <p>المرضي الغير مسجلين </p>
          <DoctorTable
            setPatientId={setPatientIdValue}
            header={[
              "صورة",  "اسم المستخدم",  "الايمال",  "تاريخ الانشاء",  "الحاله",
            ]}
            bgm={freePatient}
          />
        </div>
        <div className="w-1/2">
          {patientId && (
            <BarChart
              seriesName={["قياسات الشهر الحالي", "قياسات الشهر الماضي"]}
              seriesValue={[bgm2, bgm3]}
            />
          )}
        </div>
      </div>
    );
  if (user.role == "pharmacy")
    return (
      <div>
        <PieChart
          labels={["الادوية الخاصه بي", "الادوية الاخري"]}
          series={[myMed.length, otherMed.length]}
        />
      </div>
    );
}

export default HomePage;
