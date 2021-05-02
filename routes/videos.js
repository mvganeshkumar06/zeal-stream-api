const express = require("express");
const router = express.Router();
const videos = require("../models/videos");

router.get("/", async (req, res) => {
	try {
		const allVideos = await videos
			.find({})
			.select("_id name imageUrl streams duration uploadedDate channel")
			.populate("channel", "_id name avatar subscriptions");
		res.json(allVideos);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

router.get("/:videoId", async (req, res) => {
	try {
		const { videoId } = req.params;
		const video = await videos
			.findById(videoId)
			.populate("channel", "_id name avatar subscriptions");
		res.json(video);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

router.post("/", async (req, res) => {
	try {
		const video = await new videos(req.body);
		await video.save();
		res.json(video);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

module.exports = router;
