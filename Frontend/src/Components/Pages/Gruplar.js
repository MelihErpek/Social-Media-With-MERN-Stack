import React, { useContext } from 'react'
import GrupContext from "../../context/GrupContext";
export default function Gruplar() {
    const { grupData } = useContext(GrupContext);
    let array = [];
    const a = () => {
        for(let i = 0 ; i <grupData.grupİsimleri.length;i++)
        {
            array.push(<div class="col-md-2" >
            <div className="card" style={{ width: 250 }} >
                <img className="img-fluid rounded" src={grupData.grupResimleri[i]} style={{height:250,width:250}} alt=""/>
                <div className="card-body " style={{ height: 75 }}>
                    <h5 className="card-title">
                        <a href={"/GrupPage/"+grupData.grupİsimleri[i]}>{grupData.grupİsimleri[i]}</a>
                       
                    </h5>
                    
                </div>
            </div>
        </div>) 
        }
        return array;
    }
    
    return (
        <div>
             
        <h1 style={{textAlign:'center'}}>Gruplar</h1>
        <div className="row">
        {a()}
        
        
        </div>
        </div>
    )



}
