import React, { useState } from "react";
import styles from "./AuthComponent.module.css";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import BASEURL from "../../constant/baseurl";
import validator from "validator";
import OpenEye from "../../assets/images/openEye.png"
import CloseEye from "../../assets/images/closeEye.png"


const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(!true);
  const [error, setError] = useState("");
  const [disabled,setDisabled] = useState(false);
  const [showPswd, setShowPswd] = useState();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerError, setRegisterError] = useState({
    nameError: "",
    emailError: "",
    domainError: "",
    passwordError: "",
    c_passwordError: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // eslint-disable-next-line
    switch (name) {
      case `name`:
        value?.length === 0
          ? setRegisterError({
              ...registerError,
              nameError: "Name should not be empty",
            })
          : setRegisterError({ ...registerError, nameError: "" });
        break;
      case `email`:
        !validator.isEmail(value)
          ? setRegisterError({
              ...registerError,
              emailError: "Please provide valid email address.",
            })
          : setRegisterError({ ...registerError, emailError: "" });
        break;
      case `password`:
        value?.length < 6 || value?.length > 20
          ? setRegisterError({
              ...registerError,
              passwordError:
                "Password length should be in between 6 to 20 characters.",
            })
          : setRegisterError({ ...registerError, passwordError: "" });
        break;
      case `confirmPassword`:
        // eslint-disable-next-line
        value != formData.password
          ? setRegisterError({
              ...registerError,
              c_passwordError: "Password mismatch.",
            })
          : setRegisterError({ ...registerError, c_passwordError: "" });
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { name, email, password, confirmPassword} = formData;
      // if (!name || !email || !password || !confirmPassword) {
      //   return alert('Please fill the Field')
      // }

      const response = await axios.post(isLogin ?  `${BASEURL}/api/auth/login` :  `${BASEURL}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (response.status === 200 || response.status === 201) {
        setRegisterError({nameError: "",emailError: "",domainError: "",passwordError: "",c_passwordError: "",})
        setFormData({name: "",email: "",password: "",confirmPassword: "",})
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else { 
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.log(`Error occured in Registeration`, error);
      setError("Something went wrong. Please try again after sometime");
    }
  };
  React.useEffect(()=>{
    if (isLogin) {
      if (formData.email === "" ||formData.password === "" ||registerError.emailError ||registerError.passwordError) {
        setDisabled(true);
        console.log(true);
      } else {
        setDisabled(false);
      }
    } else {
      if (formData.email === "" ||formData.password === "" ||formData.name === "" ||formData.confirmPassword === "" ||registerError.emailError ||
      registerError.passwordError ||registerError.nameError ||registerError.c_passwordError) {
      setDisabled(true);
      console.log(true);
    } else {
      setDisabled(false);
    }
    }

    // eslint-disable-next-line
  },[formData])

  return (
    <div className={styles.Auth_MainContainer}>
      <div className={styles.Auth_SubContainer}>

    <div className="leftSec">
      <img src="https://img.freepik.com/premium-vector/quiz-banner-sign-quiz-speech-bubble-label_686498-20.jpg" alt=" " />
    </div>
    <div className="rightSec">
     
        <div className={styles.Auth_Logo}>QUIZZIE</div>
        <div className={styles.btn_Container}>
          <button
            onClick={() => setIsLogin(false)}
            className={`${styles.signup_btn} ${isLogin ? "" : styles.active} firstBtn`}
          >
            Signup
          </button>
          <button
            onClick={() => setIsLogin(true)}
            className={`${styles.login_btn} ${isLogin ? styles.active : ""} sectBtn`}
          >
            Login
          </button>
        </div>

        <form className={`${styles.auth_formcontainer} ${isLogin ? styles.login_formcontainer : styles.register_formcontainer}`}
        >
          {!isLogin && (
            <div className={styles.formRow}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {registerError?.nameError && (
              <p className="inputError">{registerError?.nameError}</p>
            )}
            </div>
          )}

          <div className={styles.formRow}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {registerError?.emailError && (
              <p className="inputError">{registerError?.emailError}</p>
            )}
          </div>

          <div className={styles.formRow}>
            <label>Password:</label>
            <input
              type={`${showPswd ? 'text' : 'password'}`}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className="showPsdwdImg">
            {showPswd ? <img src={CloseEye} alt="eye" onClick={() => setShowPswd(!true)} /> 
            : <img src={OpenEye} alt="eye" onClick={() => setShowPswd(!false)} />
            }
            </div>
            
            {registerError?.passwordError && (
              <p className="inputError">{registerError?.passwordError}</p>
            )}
          </div>

          {!isLogin && (
            <div className={styles.formRow}>
              <label>Confirm Password:</label>
              <input
                // type={`${showPswd ? 'text' : 'password'}`}
                type="text"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {/* <div className="showPsdwdImg">
              {showPswd ? <img src={CloseEye} alt="eye" onClick={() => setShowPswd(!true)} /> 
              : <img src={OpenEye} alt="eye" onClick={() => setShowPswd(!false)} />
              }
              </div> */}
               {registerError?.c_passwordError && (
              <p className="inputError">{registerError?.c_passwordError}</p>
            )}
            </div>
          )}

          <br />
          {disabled ? <div className='formSubmitButton disableBtn'>{isLogin ? "Log In" : "Sign-Up"}</div> 
          :
          <button type="submit" className={styles.formSubmitButton} onClick={handleSubmit}>{isLogin ? "Log In" : "Sign-Up"}</button>
          }

        </form>
        <p>{error && error}</p>
        {/* <br /> */}
      </div>
      
    </div>

    </div>
  );
};

export default AuthComponent;
