import React , { useContext }from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
export default function Profile() {
    const history = useHistory();
    const profileEdit = () => history.push("/ProfilDuzenle")
    const { userData } = useContext(UserContext);
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Profilim</h1>
        <div className="container" pb-3>
        <div className="row">
            
        <div className="col-md-6">
        <img src={userData.user.resim} alt="Logo" style={{height:400,width:400}} />
    </div>
    <div className="col-md-6">
        
    <div style={{textAlign:'center'}}>
                <ul className="list-group-flush" style={{textAlign:'center'}}>
                    <li className="list-group-item">
                        Ad Soyad:<h5> {userData.user.isim}</h5>
                    </li>
                    <li className="list-group-item">
                        E-Posta Adresi:<h5>{userData.user.mail}</h5>
                    </li>
                    <li className="list-group-item">
                        Doğum Tarihi:<h5> {userData.user.dogumTarihi}</h5>
                    </li>
                    <li className="list-group-item">
                        İlgilenilen Alanlar:<h5> {userData.user.ilgilenilenAlanlar}</h5>
                    </li>
                    
                </ul>
            </div>
        

        <div className="row mt-3">
            <div className="col-md-12">
                <div className="bd-example bd-example-tabs">
                    <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="pills-description-tab" data-toggle="pill" href="#pills-description" role="tab" aria-controls="pills-description" aria-expanded="true">Hakkımda</a>
                        </li>

                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab">
                            <p>{userData.user.hakkimda}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className="row mt-2" style={{float:'right'}}>
            <div className="col-md-12">

                
                <button type="submit" className="btn btn-success" onClick={profileEdit}>
                    <i className="fa fa-cart-plus" aria-hidden="true" ></i>
                    Profilimi Düzenle
                </button>
                
            </div>
        </div>

    </div>
    
    
   
</div>

</div>
</div>
    )
}

