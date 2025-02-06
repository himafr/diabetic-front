import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InputFieldHandle from "../components/inputField/InputField.handle";
import useMeds from "../hooks/medsHooks";
import MedCard from "../components/MedCard";
import WhiteButton from "../components/WhiteButton";

function MedAdd() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user.role != "pharmacy") navigate("/app/medicine");
  const {
    handleChange,
    addMedicine,
    handleFilesChange,
    preview,
    medData,
    error,
    isLoading,
  } = useMeds();
  const { med_name, med_price, med_summary } = medData;
  return (
    <div className="max-w-screen-xl mx-auto px-5  sm:p-10 md:p-16 md:py-3">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-10">
        <div className="flex flex-col justify-center">
          <form onSubmit={addMedicine} className="flex flex-col gap-10">
            <InputFieldHandle
              type={"file"}
              accept={"image/*"}
              placeholder="medicine photo"
              name="med_photo"
              handleValue={handleFilesChange}
              width={"100%"}
            />
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
            {isLoading && <p className="loader"></p>}
            {error && <p>{error}</p>}
            <WhiteButton
              type={"submit"}
              disabled={isLoading && { disabled: true }}
            >
              Add Medicine
            </WhiteButton>
          </form>
        </div>
        <div>
          <h2 style={{ marginTop: "0" }}>Preview</h2>
          <MedCard
            src={preview && preview}
            summary={med_summary && med_summary}
            name={med_name && med_name}
            price={med_price && med_price}
          />
        </div>
      </div>
    </div>
  );
}

export default MedAdd;
