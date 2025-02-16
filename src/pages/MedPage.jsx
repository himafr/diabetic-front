import { useEffect } from "react";
import useMeds from "../hooks/medsHooks";
import { useParams } from "react-router-dom";

function MedPage() {
  const {loadMedById}=useMeds()
  const id=useParams().id

  useEffect(()=> async()=>{
    // get medicines from db and set them in state here.
    const data=await loadMedById(id)
    console.log(data)

  },[])
  return <div>med page {id}</div>;
}

export default MedPage;
