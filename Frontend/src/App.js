import React, { useState, useEffect } from "react";
import NavBar from './Components/Pages/NavBar'
import Footer from './Components/Pages/Footer'
import Home from './Components/Pages/Home'
import Profile from './Components/Pages/Profile'
import ProfilDuzenle from './Components/Pages/ProfilDuzenle'
import DigerProfil from './Components/Pages/OtherProfile'
import Gruplar from './Components/Pages/Gruplar'
import GrupPage from './Components/Pages/GrupPage'
import GrupOlustur from './Components/Pages/GrupOlustur'
import ProfilSayfası from './Components/Pages/ProfilSayfası'
import GrupSayfası from './Components/Pages/GrupSayfası'
import Register from './Components/Authentication/Register2'
import Login2 from './Components/Authentication/Login2'
import UserContext from "./context/UserContext";
import OtherUserContext from "./context/OtherUserContext";
import GrupContext from "./context/GrupContext";
import OtherGrupContext from "./context/OtherGrupContext";
import Axios from 'axios'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    
  });
  const [otherUserData, setOtherUserData] = useState({

    user: undefined,
  });
  const [grupData, setGrupData] = useState({

    grupİsimleri: undefined,
    grupAlanları: undefined,
    grupSahipleri: undefined

  });
  const [otherGrupData, setOtherGrupData] = useState({

    grup:undefined,
    grupSahibi:undefined,
    grupUyeleri:undefined,
    uyeMi:undefined
  });

  useEffect(() => {

    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");


      if (token === '') {
        console.log("token yok")
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "http://localhost:5005/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenRes.data) {

        const userRes = await Axios.get("http://localhost:5005/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
      
    };
    const grupGetir = async () =>{
      const grup = await Axios.get("http://localhost:5005/Gruplar");
      setGrupData({
          grupİsimleri: grup.data.grupİsimleri,
          grupAlanları: grup.data.grupAlanları,
          grupSahipleri: grup.data.grupSahipleri,
          grupResimleri:grup.data.grupResimleri
      });
    }
    
    

    checkLoggedIn();
    grupGetir();
  });

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <OtherUserContext.Provider value={{ otherUserData, setOtherUserData }}>
          <GrupContext.Provider value={{ grupData, setGrupData }}>
            <OtherGrupContext.Provider value={{ otherGrupData, setOtherGrupData }}>
              <NavBar />
              <div>
                <Switch>
                  
                  <Route path="/Home" component={Home} />
                  <Route path="/Profilim" component={Profile} />
                  <Route path="/Profil/:userName" component={DigerProfil} />
                  <Route path="/ProfilDuzenle" component={ProfilDuzenle} />
                  <Route path="/Gruplar" component={Gruplar} />
                  <Route path="/GrupPage/:grupName" component={GrupPage} />
                  <Route path="/GrupOlustur" component={GrupOlustur} />
                  <Route path="/Login" component={Login2} />
                  <Route path="/Register" component={Register} />
                  <Route path="/ProfilSayfası" component={ProfilSayfası} />
                  <Route path="/GrupSayfası" component={GrupSayfası} />
                </Switch>
              </div>
              <Footer />
            </OtherGrupContext.Provider>
          </GrupContext.Provider>
        </OtherUserContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
