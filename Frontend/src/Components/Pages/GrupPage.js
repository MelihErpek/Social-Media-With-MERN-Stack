import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import OtherGrupContext from "../../context/OtherGrupContext";
import UserContext from "../../context/UserContext";
export default function GrupPage(props) {
  const history = useHistory();

  const { userData } = useContext(UserContext);
  const { otherGrupData, setOtherGrupData } = useContext(OtherGrupContext);
  const id = userData.user;
  const grupName = props.match.params.grupName;
  const goruntule = async () => {
    console.log(userData);
   
    const grup = { grupName };
    let uyeMi;
    const veri = { grupName, id }
    const grupRes = await Axios.post(
      "http://localhost:5005/OtherGrup",
      grup

    );
    const uye = await Axios.post(
      "http://localhost:5005/GrupUyeleri",
      grupRes.data.isim
    );
    const userRes = await Axios.post(
      "http://localhost:5005/GrupSahibi",
      grupRes.data.grupSahibi

    );
    if (userData.user) {
      uyeMi = await Axios.post(
        "http://localhost:5005/uyeMi",
        veri

      );
      setOtherGrupData({

        grup: grupRes.data,
        grupSahibi: userRes.data.isim,
        grupUyeleri: uye.data.uyeler,
        grupUyeResimleri: uye.data.resimler,
        uyeMi: uyeMi.data.uyeMi
      });
    }
    else {
      setOtherGrupData({

        grup: grupRes.data,
        grupSahibi: userRes.data.isim,
        grupUyeleri: uye.data.uyeler,
        grupUyeResimleri: uye.data.resimler,
      });
    }

    if (otherGrupData.grup) {
      history.push("/GrupSayfası")
    }



  };

  goruntule();



  return (

    <h1>Yükleniyor</h1>
  )
}
