import { useNavigate, useParams } from "react-router-dom";
import InputFieldHandle from "../components/inputField/InputField.handle";
import useMeds from "../hooks/medsHooks";
import { useAuth } from "../context/AuthContext";
import MedCard from "../components/MedCard";
import { useEffect, useState } from "react";
import baseUrl from "../const/const";
import WhiteButtonDelete from "../components/WhiteButtonDelete";
import WhiteButtonUpdate from "../components/WhiteButtonUpdate";

function MedEdit() {
  const { id } = useParams();
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  if (user.role != "pharmacy") navigate("/app/medicine");
  const {
    handleChange,
    preview,
    medData,
    isLoading,
    loadMedById,
    addMedicine,
    setMedData,
    deleteMed,
    updateMed,
  } = useMeds();
  const { med_name, med_price, med_summary, med_photo ,med_cat} = medData;
  async function handleUpdate(e) {
    try {
      await updateMed(e, id);
    } catch (e) {
      setError(e.message);
      setTimeout(() => setError(null), 3000);
    }
  }
  async function handleDeleteMed(e) {
    try {
      await deleteMed(e, id);
    } catch (e) {
      setError(e.message);
      setTimeout(() => setError(null), 3000);
    }
  }
  useEffect(() => {
    async function getMed() {
      try {
        const myMed = await loadMedById(id);
        setMedData(myMed);
      } catch (e) {
        setError(e.message);
      }
    }
    getMed();
  }, [id]);
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;
  return (
    <div className="max-w-screen-xl mx-auto px-5  sm:p-10 md:p-16 md:py-3">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-10">
        <div className="flex flex-col justify-center">
          <form
            onSubmit={addMedicine}
            className="flex flex-col gap-10"
            id="formToUpdate"
          >
            <InputFieldHandle
              type={"text"}
              placeholder="medicine name"
              name="med_name"
              required={true}
              handleValue={handleChange}
              width={"100%"}
              value={med_name}
            />
            <InputFieldHandle
              type={"number"}
              placeholder="medicine price"
              name="med_price"
              required={true}
              handleValue={handleChange}
              width={"100%"}
              value={med_price}
            />
            <InputFieldHandle
              type={"text"}
              placeholder="medicine summary"
              name="med_summary"
              required={true}
              handleValue={handleChange}
              width={"100%"}
              value={med_summary}
            />
            <InputFieldHandle
              type={"text"}
              placeholder="medicine category"
              name="med_cat"
              required={true}
              handleValue={handleChange}
              width={"100%"}
              value={med_cat}
            />
            {isLoading && <p className="loader"></p>}
            {error && <p>{error}</p>}
          </form>
          <div className="flex pt-5 justify-around">
            <WhiteButtonUpdate
              type={"submit"}
              btnClick={handleUpdate}
              form={"formToUpdate"}
              disabled={isLoading && { disabled: true }}
            >
              Update Medicine
            </WhiteButtonUpdate>
            <WhiteButtonDelete
              btnClick={handleDeleteMed}
              disabled={isLoading && { disabled: true }}
            >
              Delete Medicine
            </WhiteButtonDelete>
          </div>
        </div>
        <div>
          <h2 style={{ marginTop: "0" }}>Preview</h2>
          <MedCard
            src={
              preview
                ? preview
                : med_photo != "not set"
                ? `${baseUrl}get/${med_photo}`
                : false
            }
            summary={med_summary && med_summary}
            name={med_name && med_name}
            price={med_price && med_price}
            category={med_cat&& med_cat}
          />
        </div>
      </div>
    </div>
  );
}

export default MedEdit;
