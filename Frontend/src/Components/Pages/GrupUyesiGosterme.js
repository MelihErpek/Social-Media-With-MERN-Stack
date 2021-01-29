import React, { useContext } from 'react'
import OtherGrupContext from "../../context/OtherGrupContext";

export default function Gruplar() {
    const { otherGrupData } = useContext(OtherGrupContext);
    let array = [];
    const uyeGoster = () => {
        for(let i = 0 ; i <otherGrupData.grupUyeleri.length;i++)
        {
            array.push(<div class="col-md-2" >
            <div className="card" style={{ width: 250 }} >
                <img className="img-fluid rounded" src={otherGrupData.grupUyeResimleri[i]} style={{height:250,width:250}} alt="" />
                <div className="card-body " style={{ height: 75 }}>
                    <h5 className="card-title">
                        <a href={"/Profil/"+otherGrupData.grupUyeleri[i]}>{otherGrupData.grupUyeleri[i]}</a>
                       
                    </h5>
                    
                </div>
            </div>
        </div>) 
        }
        return array;
    }
    return (
        <div className="row">
       
       {uyeGoster()}
        </div>
    )



}
