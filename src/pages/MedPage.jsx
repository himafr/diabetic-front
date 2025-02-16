import { useEffect } from "react";
import useMeds from "../hooks/medsHooks";
import { useParams } from "react-router-dom";

function MedPage() {
  const {loadMedById}=useMeds()
  const id=useParams().id

  return <div>med page {id}</div>;
}

export default MedPage;
