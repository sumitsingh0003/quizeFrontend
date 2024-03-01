import React from "react";
import styles from "./OptionForm.module.css";

const OptionTypeSection = ({ id, optionType, onChange, index }) => {

  console.log('OptionTypeSection', id, optionType, onChange, index)
  const handleChange = (type) => {
    console.log("Handling option type change:", id, type, index);
    onChange(id, type, index);
  };

  return (
    <div className={styles.optionTypeSection}>
      <label>Option Type</label>

      <div>
        <input
          className={styles.optiontype_btn}
          type="radio"
          value="text"
          checked={optionType === "text"}
          onChange={() => handleChange("text")}
        />
        <span>Text</span>
      </div>
      <div>
        <input
          className={styles.optiontypeBtn}
          type="radio"
          value="imgurl"
          checked={optionType === "imgurl"}
          onChange={() => handleChange("imgurl")}
        />
        <span>Image URL</span>
      </div>
      <div>
        <input
          className={styles.optiontypeBtn}
          type="radio"
          value="text_with_imgurl"
          checked={optionType === "text_with_imgurl"}
          onChange={() => handleChange("text_with_imgurl")}
        />
        <span>Text with Image URL</span>
      </div>
    </div>
  );
};

export default OptionTypeSection;
