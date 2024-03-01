import React, { useState } from "react";
import styles from "./OptionForm.module.css";

const RadioButtonsContainer = ({
  id,
  optionType,
  optionsList,
  onChange,
  correctOptionIndex,
  onCorrectOptionChange,
}) => {
  const [inputValues, setInputValues] = useState(optionsList);
  const [radioValue, setRadioValue] = useState(correctOptionIndex);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
    onChange(id, index, optionType, value, radioValue);
  };

  const handleRadioBtn = (e) => {
    const selectedIndex = parseInt(e.target.value);
    setRadioValue(selectedIndex);
    onCorrectOptionChange(id, selectedIndex);
  };

  return (
    <div className={styles.radioButtonsContainer}>
      {[...Array(4)].map((_, index) => (
        <div key={index} className={styles.radioButtonContainer}>
          <input
            className={styles.dashboard_option_input}
            type="radio"
            name={`option-${id}`}
            value={index}
            onClick={handleRadioBtn}
          />
          {optionType === "text_with_imgurl" ? (
            <>
              <input
                className={styles.dashboard_option_input}
                type="text"
                placeholder="Text"
                value={inputValues[index * 2]}
                onChange={(e) => handleInputChange(index * 2, e.target.value)}
              />
              <input
                className={styles.dashboard_option_input}
                type="text"
                placeholder="Image URL"
                value={inputValues[index * 2 + 1]}
                onChange={(e) =>
                  handleInputChange(index * 2 + 1, e.target.value)
                }
              />
            </>
          ) : (
            <input
              className={styles.dashboard_option_input}
              type="text"
              placeholder={optionType === "text" ? "Text" : "Image URL"}
              value={inputValues[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RadioButtonsContainer;
