const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {

    mongoose.connect(process.env.database_url)
    .then(()=> console.log("Database connected successfully" ))
    .catch((err)=> {
        console.log("Error in connecting database : ", err);
        process.exit(1);
    });
}