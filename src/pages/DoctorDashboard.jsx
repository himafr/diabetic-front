import { useEffect, useState, useCallback } from "react";
import baseUrl from "../const/const";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import DoctorTable from "../components/DoctorTable";
import BarChart from "../components/BarChart";

function DoctorDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const [myPatient, setMyPatient] = useState([]);
    const [freePatient, setFreePatient] = useState([]);
    const [patientId, setPatientId] = useState(0);
    const [bgm2, setBgm2] = useState([]);
    const [bgm3, setBgm3] = useState([]);

    const setPatientIdValue = useCallback(async (value) => {
        await loadPatientData(value);
        setPatientId(value);
    }, []);

    const loadPatientData = useCallback(async (value) => {
        const res = await axios.get(`${baseUrl}api/v1/users/patient/${value}`, {
            headers: {
                Authorization: `Bearer ${localStorage.jwt_token}`,
                "Content-Type": "application/json",
            },
        });
        const { data } = res.data;

        if (res.data.status === 'success') {
            setBgm2(data.bgm2.map(e => e.bgm_num));
            setBgm3(data.bgm3.map(e => e.bgm_num));
        }
    }, []);

    useEffect(() => {
        async function loadUserData() {
            setIsLoading(true);
            const res = await axios.get(`${baseUrl}api/v1/users/doctor_new_patient`, {
                headers: {
                    Authorization: `Bearer ${localStorage.jwt_token}`,
                    "Content-Type": "application/json",
                },
            });
            const { data } = res.data;
            if (res.data.status === 'success') {
                console.log(data);
                setMyPatient(data.myPatient);
                setFreePatient(data.freePatient);
            }
            setIsLoading(false);
        }
        loadUserData();
    }, []); // Empty dependency array to ensure this runs only once

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="flex flex-wrap">
            <div className="w-1/2">
        <p>المرضي المسجلين </p>
                {myPatient.length !== 0 &&
                    <DoctorTable setPatientId={setPatientIdValue} header={["صورة", "اسم المستخدم", "الايمال", "تاريخ الانشاء", "الحاله"]} bgm={myPatient} />
                }
                <p>المرضي الغير  مسجلين </p>
                <DoctorTable setPatientId={setPatientIdValue} header={["صورة", "اسم المستخدم", "الايمال", "تاريخ الانشاء", "الحاله"]} bgm={freePatient} />
            </div>
            <div className="w-1/2">
                {patientId && (
                    <BarChart seriesName={["قياسات الشهر الحالي", "قياسات الشهر الماضي"]} seriesValue={[bgm2, bgm3]} />
                )}
            </div>
        </div>
    );
}

export default DoctorDashboard;
