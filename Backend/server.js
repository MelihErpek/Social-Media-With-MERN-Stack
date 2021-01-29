import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt, { decodeBase64 } from 'bcryptjs';
import jwt from 'jsonwebtoken';
const auth = require("./middleware/auth");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 100000 }));

import User from './models/Article';
import Grup from './models/Grup';

mongoose.connect("mongodb+srv://melihnode:meliherpek1@cluster0.g1oel.mongodb.net/proje?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},
  (err) => { if (err) { throw err } console.log("mongoose ile bağlantı kuruldu") })

app.get('/Gruplar', (req, res) => {
  Grup.find({}, (err, element) => {
    const sayi = element.length;
    let grupİsimleri = [sayi];
    let grupAlanları = [sayi];
    let grupSahipleri = [sayi];
    let grupResimleri = [sayi];
    for (let i = 0; i < element.length; i++) {
      grupİsimleri[i] = (element[i].isim);
      grupAlanları[i] = (element[i].Alan);
      grupSahipleri[i] = (element[i].grupSahibi);
      grupResimleri[i] = (element[i].resim.toString());
    }

    res.json({
      grupİsimleri,
      grupAlanları,
      grupSahipleri,
      grupResimleri
    })
  })
})
app.post('/GrubaKatil', async (req, res) => {
  const { kişi, grup } = req.body;
  let kisiListesi = [];

  const secilenGrup = await Grup.findOne({ isim: grup });
  kisiListesi = secilenGrup.uyeler;
  kisiListesi.push(kişi);
  await Grup.findByIdAndUpdate(secilenGrup._id, {
    uyeler: kisiListesi
  })
  res.json({
    uyeOlundu: true
  })
})

app.post('/GrupUyeleri', async (req, res) => {
  const grup = req.body;

  const secilenGrup = await Grup.findOne({ isim: Object.keys(grup) });
  let isimListesi = [];
  let kisiListesi = [];
  kisiListesi = secilenGrup.uyeler;
  let resimListesi = [];
  for (let i = 0; i < kisiListesi.length; i++) {
    const user = await User.findById(kisiListesi[i]);
    isimListesi.push(user.isim);
    resimListesi.push(user.resim.toString());
  }

  res.json({
    uyeler: isimListesi,
    resimler: resimListesi
  })


})
app.post('/GrupSahibi', async (req, res) => {
  const grupSahibi = req.body;

  const user = await User.findOne({ _id: Object.keys(grupSahibi) })

  res.json({
    isim: user.isim
  })
})


app.post('/OtherProfile', async (req, res) => {
  const userName = req.body;
  const user = await User.findOne({ isim: Object.values(userName) })
  const buf = user.resim.toString();
  if (user == null) {
    res.json({
      kullaniciYok: true

    })

  }
  else {
    res.json({
      isim: user.isim,
      id: user._id,
      dogumTarihi: user.dogumTarihi,
      hakkimda: user.hakkimda,
      ilgilenilenAlanlar: user.ilgilenilenAlanlar,
      mail: user.mail,
      resim: buf
    })
  }
})
app.post('/OtherGrup', async (req, res) => {
  const grupName = req.body;

  const grup = await Grup.findOne({ isim: Object.values(grupName) })
  
  if (grup == null) {
    res.json({
      grupYok: true

    })

  }
  else {
    const buf = grup.resim.toString();
    res.json({
      isim: grup.isim,
      alan: grup.Alan,
      grupSahibi: grup.grupSahibi,
      grupAciklamasi: grup.grupAciklamasi,
      resim: buf

    })

  }
})
app.post('/uyeMi', async (req, res) => {
  try {
    const { grupName, id } = req.body;
    const user = await User.findById(id.id);
    const grup = await Grup.findOne({ isim: grupName })
    let uyeMi;
    let uyeler = grup.uyeler;
    for (let i = 0; i < uyeler.length; i++) {
      if (uyeler[i] == user._id) {
        uyeMi = true;
      }
    }
    if (uyeMi == true) {
      res.json({
        uyeMi: true
      })
    }
    else {
      res.json({
        uyeMi: false
      })
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


})

app.post('/Pages/ProfilDuzenle', async (req, res) => {
  const { mail, hakkimda, ilgilenilenAlanlar, dogumTarihi } = req.body;
  const user = await User.findOne({ mail: mail })

  await User.findByIdAndUpdate(user._id, {

    hakkimda: hakkimda,
    ilgilenilenAlanlar: ilgilenilenAlanlar,
    dogumTarihi: dogumTarihi
  },
    function (err, docs) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Updated User : ", docs);
      }
    })
})

app.post('/Components/Register', async (req, res) => {
  const { isim, mail, parola, hakkimda, ilgilenilenAlanlar, dogumTarihi, baseImage } = req.body;
  const user = await User.findOne({ mail: mail })
  if (!user) {
    var resim = baseImage.toString('base64');
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(parola, salt);
    User.create({
      isim,
      mail,
      parola: passwordHash,
      hakkimda,
      ilgilenilenAlanlar,
      dogumTarihi,
      resim: resim
    }, err => {
      if (err) res.sendStatus(400);
      res.sendStatus(200);
    })
    console.log("içer")
  }
  else{
    res.status(400);
    console.log("dışar")
  
    res.json({ hata: "var" })
  }

})
app.post('/Components/Login', async (req, res) => {
  const { mail, parola } = req.body;
  const user = await User.findOne({ mail: mail })
  if (!user) {
    res.status(400);
    res.json({ hata: "var" })
  }
  else {
    const isMatch = await bcrypt.compare(parola, user.parola);
    if (!isMatch) {
      console.log("şifre yanlış");
      res.status(400);
      res.json({ hata: "var" })
    }
    else {
      const token = jwt.sign({ id: user._id }, 'melih');
      res.json({
        token,
        user: {
          id: user._id,
          isim: user.isim
        },
      });
    }
  }

})
app.post('/GrupOlustur', async (req, res) => {

  const { grupİsim, grupAlan, grupSahibi, grupAciklamasi, baseImage } = req.body;
  const grup = await Grup.findOne({ isim: grupİsim })
  if (!grup) {
    let uye = [grupSahibi];
    var resim = baseImage.toString('base64');
    Grup.create({
      isim: grupİsim,
      Alan: grupAlan,
      grupSahibi,
      grupAciklamasi: grupAciklamasi,
      uyeler: uye,
      resim: resim
    }, err => {
      if (err) res.sendStatus(400);
      res.sendStatus(200);
    })
  }
  else {
    res.status(400);
    res.json({ hata: "var" })
  }

})


app.post("/tokenIsValid", async (req, res) => {

  try {
    const token = req.header("x-auth-token");

    if (!token) return res.json(false);

    const verified = jwt.verify(token, 'melih');
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  const buf = user.resim.toString();


  res.json({
    isim: user.isim,
    id: user._id,
    dogumTarihi: user.dogumTarihi,
    hakkimda: user.hakkimda,
    ilgilenilenAlanlar: user.ilgilenilenAlanlar,
    mail: user.mail,
    resim: buf
  })
});


app.listen(5005);
