import mongoose from 'mongoose';
const Schema = mongoose.Schema
const grupSchema = new Schema({
    isim:{
        type:String
    },
    Alan:{
        type:String
    },
    grupSahibi:{
        type:String
    },
    uyeler:{
        type:Array
    },
    grupAciklamasi:{
        type:String
    },
    resim:{
        type:Buffer
    }
})
export default mongoose.model('Grup',grupSchema)