import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";

export default function Login2() {
  const [mail, setEmail] = useState();
  const [parola, setPassword] = useState();

  

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { mail, parola };
      const loginRes = await axios.post(
        "http://localhost:5005/Components/Login",
        loginUser
      );

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      })
      localStorage.setItem("auth-token", loginRes.data.token);
      
      history.push("/Home");
    } catch (err) {
      alert("E-Mail veya Parola Yanlış")
    }
  };
  
  return (
    <div className="text-center">
      <h1>Giriş Yap</h1>
      
      <form className="form" onSubmit={submit}>
        <div className="mx-auto w-25">
         
       

          <div class="form-group">
            <label for="exampleFormControlInput1">E-posta Adresi</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="E-Posta Adresi"
              onChange={e => setEmail(e.target.value)}

            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Parola</label>
            <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Parola"
              onChange={e => setPassword(e.target.value)}

            />
          </div>


          <input type="submit" value="Log in" />
        </div>
      </form>
    </div>



  );
}
