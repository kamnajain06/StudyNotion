const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadFileToCloudinary } = require("../utils/fileUploader");
require("dotenv").config();

exports.createSubSection = async(req,res) => {
    try{
        //fetch data
        const {title, description, sectionId} = req.body;

        
        //extract video
        const videoFile = req.files.videoUrl;
        // console.log("VideoFile", videoFile);

        //validation
        if(!title || !description || !videoFile){
            return res.status(403).json({
                success:false,
                message:"Fill the required fields"
            })
        }
        //upload video to cloudinary and get a secure_url
        const supportedType = ["mov","mp4"];
        const fileType = videoFile.name.split(".")[1].toLowerCase();
        if(!supportedType.includes(fileType)){
            return res.status(500).json({
                success:false,
                message:"Video File can't be uploaded"
            })
        }

        const fileUpload = await uploadFileToCloudinary(videoFile,process.env.VIDEO_FOLDER);
        // console.log("fileUpload", fileUpload);
        //create subsection
        const newSubSection = {
            title: title,
            description: description,
            videoUrl : fileUpload.secure_url,
            timeDuration : `${fileUpload.duration}`
        }
        const subSection = await SubSection.create(newSubSection);

        //add subsection id to Section Schema
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$push : {
            subSection: subSection._id,
        }}, {new:true}).populate("subSection").exec();

        console.log("Updated SubSecton: ", updatedSection);

        //return user
        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            data: updatedSection,
        })

    }catch(err){
        console.log("Error : ", err);
        return res.status(500).json({
            success:false,
            message:"SubSection can't be created",
        })
    }
}
exports.updateSubSection = async(req,res) => {
    try{
        //fetch data
        const {sectionId, title, description, subsectionId} = req.body;

        console.log("SubsectionID", subsectionId);

        const subSection = await SubSection.findById(subsectionId)

        if (!subSection) {
            return res.status(404).json({
              success: false,
              message: "SubSection not found",
            })
          }
      
          if (title !== undefined) {
            subSection.title = title
          }
      
          if (description !== undefined) {
            subSection.description = description
          }

          if (req.files?.videoUrl && req.files.videoUrl !== undefined) {
            const video = req.files.videoUrl;
            const uploadDetails = await uploadFileToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            // console.log("Upload Details", uploadDetails);
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
          }
      
          await subSection.save();

          const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
          )
      
          console.log("updated section", updatedSection)
      
        console.log("Updated Subsection : ", updatedSection);
        return res.status(200).json({
            success:true,
            message:"SubSection updated Successfully",
            data:updatedSection,
        })
    }catch(err){
        console.log("Error : ", err);
        return res.status(500).json({
            success:false,
            message:"SubSection can't be updated"
        }) 
    }
}
exports.deleteSubSection = async(req,res) => {
    try{
        const {sectionId,subsectionId} = req.body;
        const deleteSubSection = await SubSection.findByIdAndDelete(subsectionId);
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$pull : {
            subSection:deleteSubSection._id,
        }}, {new:true}).populate("subSection").exec();

        console.log("Updated Section: ", updatedSection);

        return res.status(200).json({
            success:true,
            message:"SubSection deleted Successfully",
            data:updatedSection,
        })
    }catch(err){
        console.log("Error : ", err);
        return res.status(500).json({
            success:false,
            message:"SubSection can't be deleted"
        }) 
    }
}