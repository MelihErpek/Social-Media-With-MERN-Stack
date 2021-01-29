import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";

export default function GrupOlustur() {
  const history = useHistory();
  const [grupİsim, setgrupİsim] = useState();
  const [grupAlan, setgrupAlan] = useState();
  const [grupAciklamasi, setgrupAciklamasi] = useState();
  const [baseImage, setbaseImage] = useState();


  const { userData } = useContext(UserContext);
  const grupSahibi = userData.user.id;

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
  const submit = async (e) => {
    e.preventDefault();
    try {
      const grup = { grupİsim, grupAlan, grupSahibi, grupAciklamasi, baseImage };
      await axios.post(
        "http://localhost:5005/GrupOlustur",
        grup
      );
      history.push("/Home");
    } catch (err) {
      alert("Bu Grup İsminde Bir Grup Vardır Lütfen Başka Bir İsim Seçiniz")
    }

  };

  return (
    <div>
      <div className="text-center">
        <h1>Grup Oluştur</h1>
        <form className="form" onSubmit={submit}>
          <div className="mx-auto w-25">


            <div class="form-group">
              <label for="exampleFormControlInput1">Grup İsmi</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Grup İsmi"
                onChange={e => setgrupİsim(e.target.value)}

              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Grup Alanı</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Grup Alanı"
                onChange={e => setgrupAlan(e.target.value)}

              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Grup Açıklaması</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Grup Alanı"
                onChange={e => setgrupAciklamasi(e.target.value)}

              />
            </div>

            <div className="form-group">
              <label for="exampleFormControlInput1">Grup Fotoğrafı</label>
              <input type="file" className="form-control" id="exampleFormControlInput1"

                onChange={(e) => uploadImage(e)}

              />
            </div>


            <input type="submit" value="Grup Oluştur" />
          </div>
        </form>
      </div>
    </div>
  )
}
