import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
 
  const history = useHistory();

  const grupOlustur = () => history.push("/GrupOlustur");
  const login2 = () => history.push("/Login");
  const register2 = () => history.push("/Register");
  const profile = () => history.push("/Profilim")
  const home = () => history.push("/Home")
  const gruplar = () => history.push("/Gruplar")
  const logout = () => {
    
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/Home")
    
 
    
  };

  return (
    <div>

      {userData.user ? (
        <>
          
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand  onClick={home}>Topluluk.com</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={home}>Ana Sayfa</Nav.Link>
                <Nav.Link onClick={grupOlustur}>Grup Oluştur</Nav.Link>
                <Nav.Link onClick={gruplar}>Grup Bul</Nav.Link>

              </Nav>
              <Nav>
                <Nav.Link onClick={profile}>Profil</Nav.Link>
                <Nav.Link onClick={logout}>Çıkış Yap</Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
          </Navbar>


        </>
      ) : (
          <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand  onClick={home}>Topluluk.com</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={home}>Ana Sayfa</Nav.Link>
                <Nav.Link onClick={gruplar}>Grup Bul</Nav.Link>

              </Nav>
              <Nav>
                <Nav.Link onClick={register2}>Kayıt Ol</Nav.Link>
                <Nav.Link onClick={login2}>Giriş Yap</Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
          </Navbar>


          </>
        )}
    </div>



  );
}


