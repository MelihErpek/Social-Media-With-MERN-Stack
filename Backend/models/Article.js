import mongoose from 'mongoose';
const Schema = mongoose.Schema
const fikirSchema = new Schema({
    isim:{
        type:String
    },
    mail:{
        type:String
    },
    parola:{
        type:String
    },
    hakkimda:{
        type:String
    },
    ilgilenilenAlanlar:{
        type:String
    },
    dogumTarihi:{
        type:String 
    },
    resim:{
        type:Buffer
    }
    
    
    
    
})
export default mongoose.model('Kayıt',fikirSchema)