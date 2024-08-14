const express = require("express");
const { Complains, Words } = require("../db");
const { authMiddleware } = require("../middleware");
const cloudinary = require("cloudinary").v2;
const fileupload = require("express-fileupload");

cloudinary.config({
  cloud_name: "dcjpwnsx2",
  api_key: "244438243482951",
  api_secret: "C-WwpLDDRaS0JuBmTdrYCaQUsjM",
});

const router = express.Router();
router.use(fileupload({ useTempFiles: true }));

router.post("/createcomplain", authMiddleware, async (req, res) => {
  console.log("userid: " + req.userId);

  try {
    let uploadedImages = [];

    if (req.files && req.files.images) {
      const imagesArray = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      uploadedImages = await Promise.all(
        imagesArray.map(async (image, index) => {
          try {
            const result = await cloudinary.uploader.upload(
              image.tempFilePath,
              {
                folder: "complaintImages",
              }
            );
            return {
              index,
              public_id: result.public_id,
              url: result.secure_url,
            };
          } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
          }
        })
      );
    }

    console.log("Uploaded images:", uploadedImages);

    // const words = await Words.find({});
    // const complainText = req.body.title + " " + req.body.description;

    // // Check if any of the words are present in the complain text
    // const offendingWords = words.filter(({ word }) =>
    //   complainText.toLowerCase().includes(word.toLowerCase())
    // );

    // if (offendingWords.length > 0) {
    //   return res.status(400).json({
    //     msg: "Complain contains offensive words: " + offendingWords.join(", "),
    //   });
    // }

    const complain = await Complains.create({
      title: req.body.title,
      description: req.body.description,
      topics: req.body.topics,
      complainStatus: req.body.complainStatus,
      canBeAnsweredBy: req.body.canBeAnsweredBy,
      userId: req.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      images: uploadedImages,
    });

    res.json({ msg: "Complain created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.put("/updatecomplain/:complainid", authMiddleware, async (req, res) => {
  const complainId = req.params.complainid;
  const updateFields = req.body; // Fields to be updated

  try {
    const existingComplain = await Complains.findOne({
      _id: complainId,
      userId: req.userId,
    });

    if (!existingComplain) {
      return res
        .status(404)
        .json({ msg: "Complaint not found or unauthorized" });
    }

    for (const key in updateFields) {
      existingComplain[key] = updateFields[key];
    }

    existingComplain.updatedAt = Date.now();

    await existingComplain.save();

    res.json({ msg: "Complaint updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/allcomplains", async (req, res) => {
  try {
    const allcomplains = await Complains.find({});
    if (!allcomplains)
      return res.status(403).json({ msg: "something went wrong" });
    res.json({
      msg: "compalains retieved successfully",
      complains: allcomplains,
    });
  } catch (error) {
    console.log(error);
    res.status(411).json({ msg: "something went wrong" });
  }
});

router.delete(
  "/deletecomplain/:complainid",
  authMiddleware,
  async (req, res) => {
    const complainId = req.params.complainid;
    try {
      const existingComplain = await Complains.findOne({
        _id: complainId,
        userId: req.userId,
      });
      if (!existingComplain)
        return res
          .status(403)
          .json({ msg: "Complain you want to delete not found" });
      await existingComplain.remove();
      res.json({ msg: "Complain deleted Successfully" });
    } catch (error) {
      console.log(error);
      res.status(411).josn({ msg: "Something went wrong" });
    }
  }
);
router.get("/getcomplainbyid/:complainId", async (req, res) => {
  try {
    const complainId = req.params.complainId;
    const complain = await Complains.findOne({ _id: complainId });
    if (!complain) {
      return res.status(403).json({ msg: "Complain not found" });
    }
    res.json({ complain: complain });
  } catch (error) {
    console.log(error);
    res.status(411).json({ msg: "Not able to fetch complain" });
  }
});

module.exports = router;
