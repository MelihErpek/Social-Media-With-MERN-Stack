import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import OtherGrupContext from "../../context/OtherGrupContext";
import UserContext from "../../context/UserContext";
import Axios from "axios";

import GrupUyesiGosterme from './GrupUyesiGosterme'

export default function Profile(props) {
    const history = useHistory();

    const { otherGrupData } = useContext(OtherGrupContext);
    const { userData } = useContext(UserContext);

    const submit = async () => {
        const kişi = userData.user.id;
        const grup = otherGrupData.grup.isim;
        const veri = { kişi, grup }
        const userRes = await Axios.post(
            "http://localhost:5005/GrubaKatil",
            veri
        )
        history.push("/Gruplar")
    }



    return (
        <div>
            {otherGrupData.grup.grupYok ? (
                <>
                    <h1>Grup Yok</h1>
                </>
            ) : (
                    <>
                        
                            {otherGrupData.uyeMi ? (
                                <>
                                    <div className="container" pb-3>
                                        <div className="row">

                                            <div className="col-md-6">
                                                <img src={otherGrupData.grup.resim} alt="Logo" style={{ height: 400, width: 400 }} />
                                            </div>
                                            <div className="col-md-6">

                                                <div style={{ textAlign: 'center' }}>
                                                    <ul className="list-group-flush" style={{ textAlign: 'center' }}>
                                                        <li className="list-group-item">
                                                            Grup Adı:<h5> {otherGrupData.grup.isim}</h5>
                                                        </li>

                                                        <li className="list-group-item">
                                                            Grup Alanı:<h5> {otherGrupData.grup.alan}</h5>
                                                        </li>
                                                        <li className="list-group-item">
                                                            Grup Sahibi:<h5><a href={"/Profil/" + otherGrupData.grupSahibi}>{otherGrupData.grupSahibi}</a></h5>
                                                        </li>

                                                    </ul>
                                                </div>


                                                <div className="row mt-3">
                                                    <div className="col-md-12">
                                                        <div className="bd-example bd-example-tabs">
                                                            <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                                                                <li className="nav-item">
                                                                    <a className="nav-link active" id="pills-description-tab" data-toggle="pill" href="#pills-description" role="tab" aria-controls="pills-description" aria-expanded="true">Grup Açıklaması</a>
                                                                </li>

                                                            </ul>
                                                            <div className="tab-content" id="pills-tabContent">
                                                                <div className="tab-pane fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab">
                                                                    <p>{otherGrupData.grup.grupAciklamasi}</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-2" style={{ float: 'right' }}>
                                                    <div className="col-md-12">




                                                    </div>
                                                </div>

                                            </div>



                                        </div>

                                    </div>
                                    <h1>Grup Üyeleri</h1>
                                    <GrupUyesiGosterme />
                                </>
                            ) : (
                                
                                    <>  
                                         {userData.user ? (
                                            <>
                                            
                                            <div className="container" pb-3>
                                            <div className="row">

                                                <div className="col-md-6">
                                                    <img src={otherGrupData.grup.resim} alt="Logo" style={{ height: 400, width: 400 }} />
                                                </div>
                                                <div className="col-md-6">

                                                    <div style={{ textAlign: 'center' }}>
                                                        <ul className="list-group-flush" style={{ textAlign: 'center' }}>
                                                            <li className="list-group-item">
                                                                Grup Adı:<h5> {otherGrupData.grup.isim}</h5>
                                                            </li>

                                                            <li className="list-group-item">
                                                                Grup Alanı:<h5> {otherGrupData.grup.alan}</h5>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Grup Sahibi:<h5><a href={"/Profil/" + otherGrupData.grupSahibi}>{otherGrupData.grupSahibi}</a></h5>
                                                            </li>

                                                        </ul>
                                                    </div>


                                                    <div className="row mt-3">
                                                        <div className="col-md-12">
                                                            <div className="bd-example bd-example-tabs">
                                                                <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                                                                    <li className="nav-item">
                                                                        <a className="nav-link active" id="pills-description-tab" data-toggle="pill" href="#pills-description" role="tab" aria-controls="pills-description" aria-expanded="true">Grup Açıklaması</a>
                                                                    </li>

                                                                </ul>
                                                                <div className="tab-content" id="pills-tabContent">
                                                                    <div className="tab-pane fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab">
                                                                        <p>{otherGrupData.grup.grupAciklamasi}</p>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-2" style={{ float: 'right' }}>
                                                        <div className="col-md-12">

                                                            <button type="submit" className="btn btn-success" onClick={submit}>
                                                                <i className="fa fa-cart-plus" aria-hidden="true" ></i>
                                                            Gruba Katıl
                                                            </button>


                                                        </div>
                                                    </div>

                                                </div>



                                            </div>

                                        </div>
                                        <h1>Grup Üyeleri</h1>
                                        <GrupUyesiGosterme />


                                            </>
                                        ) : (
                                            <>
                                            <div className="container" pb-3>
                                            <div className="row">

                                                <div className="col-md-6">
                                                    <img src={otherGrupData.grup.resim} alt="Logo" style={{ height: 400, width: 400 }} />
                                                </div>
                                                <div className="col-md-6">

                                                    <div style={{ textAlign: 'center' }}>
                                                        <ul className="list-group-flush" style={{ textAlign: 'center' }}>
                                                            <li className="list-group-item">
                                                                Grup Adı:<h5> {otherGrupData.grup.isim}</h5>
                                                            </li>

                                                            <li className="list-group-item">
                                                                Grup Alanı:<h5> {otherGrupData.grup.alan}</h5>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Grup Sahibi:<h5><a href={"/Profil/" + otherGrupData.grupSahibi}>{otherGrupData.grupSahibi}</a></h5>
                                                            </li>

                                                        </ul>
                                                    </div>


                                                    <div className="row mt-3">
                                                        <div className="col-md-12">
                                                            <div className="bd-example bd-example-tabs">
                                                                <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                                                                    <li className="nav-item">
                                                                        <a className="nav-link active" id="pills-description-tab" data-toggle="pill" href="#pills-description" role="tab" aria-controls="pills-description" aria-expanded="true">Grup Açıklaması</a>
                                                                    </li>

                                                                </ul>
                                                                <div className="tab-content" id="pills-tabContent">
                                                                    <div className="tab-pane fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab">
                                                                        <p>{otherGrupData.grup.grupAciklamasi}</p>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-2" style={{ float: 'right' }}>
                                                        <div className="col-md-12">

                                                           


                                                        </div>
                                                    </div>

                                                </div>



                                            </div>

                                        </div>
                                        <h1>Grup Üyeleri</h1>
                                        <GrupUyesiGosterme />


                                            </>
                                            )}
                                        
                                    </>
                                )}


                        

                    </>
                )}
        </div>


    );
}


/*

    <div>

      {userData.user ? (
        <>
          
          


        </>
      ) : (
          <>
           


          </>
        )}
    </div>
*/