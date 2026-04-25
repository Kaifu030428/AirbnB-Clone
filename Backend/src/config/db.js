const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        let res = await mongoose.connect(process.env.MONGO_URI)  
        if(res){
            console.log("connected to database");
        }
    } catch (error) {
        console.log("eror in connecting to database",error);
    }
}

module.exports = connectDB;