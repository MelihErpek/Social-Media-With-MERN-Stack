import React from "react";
import yazılım from './yazılım.jpg';
import valorant from './valorant.jpg';
import nfl from './nfl.png';

import topluluk from './topluluk.jpg';
import login from './login.png';
import register from './register.jpg';


export default function Home() {
  

  return (
    <div className="container pb-5">
    <div className="row">
      <div className=" col-md-6 ">
        <div className="jumbotron" style={{height:400}}>
          <div className="container">
            <h1 className="display-4">Topluluk.com</h1>
            <p className="lead">Kayıt Olun , Giriş Yapın ,İlgi Alanlarınıza Göre Gruplar Bulup İletişime Geçin</p>
          </div>
        </div>
      </div>

      <div id="carouselExampleIndicators" className="carousel slide col-md-6" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={topluluk} class="d-block w-100 " style={{height:400}} alt="..."/>
        </div>
            <div className="carousel-item">
              <img src={login} class="d-block w-100 " style={{height:400}} alt="..."/>
            </div>
              <div className="carousel-item">
                <img src={register} class="d-block w-100 " style={{height:400}} alt="..."/>
                
            </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
        </div>


    </div>
    <h1 style={{textAlign:'center'}}>Bazı Gruplar</h1>
    <div>
            
        <div className="row">
        
              <div class="col-md-4" >
                <div className="card" style={{ width: 300 }} >
                    <img className="img-fluid rounded" src={yazılım} style={{height:300 ,width:300}} alt=""/>
                    <div className="card-body " style={{ height: 75 }}>
                        <h5 className="card-title">
                            <a href={"/GrupPage/Yazılımcılar"}>Yazılımcılar</a>
                        </h5>
                        
                    </div>
                </div>
              </div>
              <div class="col-md-4" >
                <div className="card" style={{ width: 300 }} >
                    <img className="img-fluid rounded" src={nfl} style={{height:300,width:300}} alt=""/>
                    <div className="card-body " style={{ height: 75 }}>
                        <h5 className="card-title">
                            <a href={"/GrupPage/NFL Sevenler"}>NFL Sevenler</a>
                        </h5>
                        
                    </div>
                </div>
              </div>
              <div class="col-md-4" >
                <div className="card" style={{ width: 300 }} >
                    <img className="img-fluid rounded" src={valorant} style={{height:300,width:300}} alt=""/>
                    <div className="card-body " style={{ height: 75 }}>
                        <h5 className="card-title">
                            <a href={"/GrupPage/Online Oyun Sevenler"}>Online Oyun Sevenler</a>
                        </h5>
                        
                    </div>
                </div>
              </div>
            
        
        </div>
  </div>
    </div>
  );
}

/*
 <div>
            
        <div className="row">
        
              <div class="col-md-2" >
                <div className="card" style={{ width: 250 }} >
                    <img className="img-fluid rounded" src={pp} />
                    <div className="card-body " style={{ height: 75 }}>
                        <h5 className="card-title">
                            <a href={"/GrupPage/"+user}>{user}</a>
                        </h5>
                        
                    </div>
                </div>
              </div>
            
        
        </div>
  </div>
*/ 
/*<div className="page">
            {userData.user ? (
              <h1>Welcome {userData.user.isim}</h1>
            ) : (
                <>
                  <h2>You are not logged in</h2>
                  <Link to="/login">Log in</Link>
                </>
              )}
          </div>*/
