import React , { useContext }from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import OtherUserContext from "../../context/OtherUserContext";

export default function Profile(props) {
    const history = useHistory();
    
    const { setOtherUserData } = useContext(OtherUserContext);
    const userName =props.match.params.userName;  
      const profil = async () =>{
        const loginUser = {userName};
        
        const userRes = await Axios.post(
            "http://localhost:5005/OtherProfile",
            loginUser
            
          );
          console.log(userRes);
          setOtherUserData({
            
            user: userRes.data,
          });
          history.push("/ProfilSayfası")
      }
      profil();
    return (
        
      <h1>Yükleniyor</h1>
    )
}

