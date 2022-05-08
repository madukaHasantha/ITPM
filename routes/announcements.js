const router = require("express").Router();
let Announcement = require("../models/announcement");

router.route("/announcementAdd").post(async (req, res) => {
    const { announcementID, catagory, toWhome,from, message, date, time } = req.body;
  
    const newAnnouncement = new Announcement({
        announcementID,
        catagory,
        toWhome,
        from,
        message,
        date,
        time
    });
  
    const announcement = await Announcement.findOne({ announcementID: req.body.announcementID });
  
    if (announcement == null) {
        newAnnouncement
        .save()
        .then(() => {
          return res
            .status(200)
            .json({ message: "You are successfully published a announcement " });
        })
        .catch((err) => {
          console.log(err.message);
          return res.status(400).send({ status: "Erro with published a announcement!" });
        });
    } else {
      return res
        .status(400)
        .json({ message: "You are already use this ID " });
    }
  });



  router.route("/getAllAnnouncement").get(async (req, res) => {
    try {
      const announcement = await Announcement.find();
  
      if (announcement != null) {
        res.json(announcement);
      } else {
        return res
          .status(400)
          .send({ status: "there are no any announcement to show in the database" });
      }
    } catch (e) {
      console.log(e.message);
      return res.status(400).send({ status: "erro with getting announcement!" });
    }
  });


  router.route("/updateAnnouncement").put(async (req, res) => {
    try {
      const announcementID = req.body.announcementID;
      const announcement = await Announcement.findOne({ announcementID: announcementID });
      if (announcement != null) {
        Object.keys(req.body).forEach((key) => {
            announcement[key] = req.body[key];
        });
        await announcement.save();
        return res
          .status(200)
          .json({ message: "announcement details succussfully updated!" });
      } else {
        return res
          .status(400)
          .json({ message: "There is no any announcement in this announcementID to update!" });
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  });
  
  router.route("/getannouncementById").get(async (req, res) => {
    try {
      let announcementID = req.body.announcementID;
      const announcement = await Announcement.findOne({ announcementID: announcementID });
      if (announcement != null) {
        res
          .status(200)
          .send({ status: "Announcement details fetched successfully!", announcement });
      } else {
        return res
          .status(400)
          .json({ message: "There is no any announcement in this ID!" });
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  });

  router.route("/deleteAnnouncement").delete(async (req, res) => {
    try {
      let announcementID = req.body.announcementID;
  
      const announcement = await Announcement.findOne({ announcementID: announcementID });
      //if (student.role == "admin") {
      if (announcement != null) {
        await announcement.remove();
  
        return res.status(200).json({ message: "Delete announcement successfully!" });
      } else {
        return res
          .status(200)
          .json({ message: "There is no any class to announcement in this Id" });
      }
      // } else {
      //   return res
      //     .status(400)
      //     .json({ message: "You have not permited to delete a class" });
      // }
    } catch (e) {
      return res.status(400).json(e);
    }
  });
  



module.exports = router;