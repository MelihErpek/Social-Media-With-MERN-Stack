import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

export default function Register2() {
    const [isim, setDisplayName] = useState();
    const [mail, setEmail] = useState();
    const [parola, setPassword] = useState();
    const [baseImage, setbaseImage] = useState();
    const hakkimda = "hakkimdaYok";
    const ilgilenilenAlanlar ="ilgilenilenAlanlar Yok";
    const dogumTarihi ="dogumTarihi Yok";
    
    const uploadImage = async (e) => {

        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setbaseImage(base64);
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        })
    }
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try{
            const newUser = { isim, mail, parola,hakkimda ,ilgilenilenAlanlar ,dogumTarihi,baseImage};
            await axios.post("http://localhost:5005/Components/Register", newUser);
            console.log("içerde");
            history.push("/Home");
        }catch(err){
            console.log("dışarda");
            alert("Bu Mail Daha Önce Kullanılmıştır Lütfen Farklı Bir Mail Belirleyiniz")
        }

        

    };

    return (

        <div>

            <div className="text-center" >
                <h1>Kayıt Ol</h1>
                <form className="form" onSubmit={submit}>
                    <div className="mx-auto w-25">

                        <div className="form-group">
                            <label for="exampleFormControlInput1">Ad Soyad</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Ad Soyad"

                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlInput1">E-posta Adresi</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="E-Posta Adresi"

                                onChange={(e) => setEmail(e.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlInput1">Parola</label>
                            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Parola"

                                onChange={(e) => setPassword(e.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlInput1">Profil Fotoğrafı</label>
                            <input type="file" className="form-control" id="exampleFormControlInput1" 

                                onChange={(e) => uploadImage(e)}

                            />
                        </div>
                        
                        


                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    )
}
