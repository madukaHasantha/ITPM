const router = require("express").Router();
let Announcement = require("../models/announcement");

router.route("/announcementAdd").post(async (req, res) => {
  const { announcementID, catagory, toWhome, from, message, date } =
    req.body;

  const newAnnouncement = new Announcement({
    announcementID,
    catagory,
    toWhome,
    from,
    message,
    date
  });

  const announcement = await Announcement.findOne({
    announcementID: req.body.announcementID,
  });

  if (announcement == null) {
    newAnnouncement
      .save()
      .then(() => {
        return res
          .status(201)
          .json({ message: "You are successfully published a announcement " });
      })
      .catch((err) => {
        console.log(err.message);
        return res
          .status(400)
          .send({ status: "Error with published a announcement!" });
      });
  } else {
    return res.status(400).json({ message: "You are already use this ID " });
  }
});

router.get("/getAllAnnouncement", (req, res) => {
  Announcement.find().exec((err, announcement) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingAnnouncement: announcement,
    });
  });
});

// router.route("/getAllAnnouncement").get(async (req, res) => {
//   try {
//     const announcement = await Announcement.find();

//     if (announcement != null) {
//       res.json(announcement);
//     } else {
//       return res
//         .status(400)
//         .send({ status: "there are no any announcement to show in the database" });
//     }
//   } catch (e) {
//     console.log(e.message);
//     return res.status(400).send({ status: "erro with getting announcement!" });
//   }
// });

router.put("/updateAnnouncement/:id",async(req, res) => {
  try {
     await Announcement.findByIdAndUpdate(
      req.params.id,
      {$set:{catagory:req.body.catagory,
        toWhome: req.body.toWhome, 
        from: req.body.from , 
        message: req.body.message , 
        date: req.body.date
        }}
    )
    .then(data => {
      res.status(200).send("Details updated");
    })
  }
  catch (e) {
    return res.status(400).json(e);
  }
})

router.get("/getannouncementById/:id",async (req, res) => {
  try {
    
    const announcement = await Announcement.findById(
      req.params.id
    );
    if (announcement != null) {
      return res.status(200).send({
        status: "Announcement details fetched successfully!",
        announcement,
      });
    } else {
      return res
        .status(400)
        .json({ message: "There is no any announcement in this ID!" });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
});


router.delete('/deleteAnnouncement/:id', async (req, res) => {

  const announcementID = req.params.id;

  try {
      
      var announcement = await Announcement.findById(announcementID);
      if (!announcement) {
        return res.status(404).json({ message: "No announcement found this Id" });
      }

      await Announcement.findByIdAndDelete(announcementID);
      return res.status(200).json({ message: "Announcement Successfully Deleted " });

  } catch (error) {
    return res.status(500).json({ message: "Server error while deleting announcement, try again latter" });
  }
});


// router.route('/deleteAnnouncement/:id').delete(async (req, res) => {

//     let announcementID = req.body.announcementID;

//     try {

//       var announcement = await Announcement.findById(announcementID);
//       if (!announcement) {
//         return res.status(404).json({ message: "No announcement found this Id" });
//       }

//       await Announcement.findByIdAndDelete(announcementID);
//       return res.status(200).json({ message: "Announcement Successfully Deleted " });

//     } catch (error) {
//       return res.status(500).json({ message: "Server error while deleting announcement, try again latter" });
//     }


//     // const announcement = await Announcement.findOne({
//     //   announcementID: announcementID,
//     // });
//     // //if (student.role == "admin") {
//     // if (announcement != null) {
//     //   await announcement.remove();

//     //   return res
//     //     .status(200)
//     //     .json({ message: "Delete announcement successfully!" });
//     // } else {
//     //   return res
//     //     .status(200)
//     //     .json({ message: "There is no any class to announcement in this Id" });
//     // }
//     // } else {
//     //   return res
//     //     .status(400)
//     //     .json({ message: "You have not permited to delete a class" });
//     // }
// });

module.exports = router;
