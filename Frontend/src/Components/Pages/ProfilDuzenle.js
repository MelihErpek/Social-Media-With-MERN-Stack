import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";

export default function ProfilDuzenle() {

    const [hakkimda, setHakkimda] = useState();
    const [ilgilenilenAlanlar, setİlgilenilenAlanlar] = useState();
    const [dogumTarihi, setDogumTarihi] = useState();

    const history = useHistory();
    const { userData } = useContext(UserContext);

    const { setUserData } = useContext(UserContext);
    const mail = userData.user.mail;
    const submit = async (e) => {
        e.preventDefault();
        try {
            const edit = { mail, hakkimda, ilgilenilenAlanlar, dogumTarihi };
            axios.post("http://localhost:5005/Pages/ProfilDuzenle", edit);
            setUserData({

                hakkimda: hakkimda,
                ilgilenilenAlanlar: ilgilenilenAlanlar,
                dogumTarihi: dogumTarihi
            });
            history.push("/Home");

        } catch (err) {

        }

    };

    return (
        <div>

            <div className="text-center" >
                <form className="form" onSubmit={submit}>
                    <div className="mx-auto w-25">


                        <div class="form-group">
                            <label for="exampleFormControlInput1">Hakkımda</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder={userData.user.hakkimda}

                                onChange={(e) => setHakkimda(e.target.value)}

                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">İlgilendiğim Alanlar</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder={userData.user.ilgilenilenAlanlar}

                                onChange={(e) => setİlgilenilenAlanlar(e.target.value)}

                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Doğum Tarihi</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder={userData.user.dogumTarihi}

                                onChange={(e) => setDogumTarihi(e.target.value)}

                            />
                        </div>




                        <input type="submit" value="Kaydet" />
                    </div>
                </form>
            </div>
        </div>
    )
}
