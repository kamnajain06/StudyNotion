const cloudinary = require("cloudinary").v2;

exports.uploadFileToCloudinary = async (file, folder) => {
    const options = { folder };
    options.resource_type = "auto";
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;

    }catch(err){
        console.log("error: ", err);
        return null;
    }
}

