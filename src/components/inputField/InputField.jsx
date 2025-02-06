import styles from "./InputField.module.css";

export default function InputField({ placeholder = "", bgColor = "#fff",outColor="#6b9997",textColor="#000" ,inHeight="20px",type ,width,setValue,value}) {
    return (
    <div className={styles.group} style={{color:textColor,width}} >
      <input 
      style={{height:inHeight+"px", outlineColor:outColor,color:textColor,width}}
      required
        className={styles.group_input}
        type={type?type:"text"}
        placeholder={placeholder}
        onChange={(e)=>setValue(e.target.value)}
        value={value}
        
      />
      <label
      id="myLabel"
        htmlFor="myInput"
        className={styles.group_label}
        style={{ backgroundColor: bgColor,height:inHeight ,color:textColor}}
      >
        {placeholder.split("optional")[0]}
      </label>
    </div>
  );
}
