const express = require("express");
const router = express.Router();
const podcasts = require("../models/podcasts");

router.get("/", async (req, res) => {
	try {
		const allpodcasts = await podcasts
			.find({})
			.select("_id name imageUrl streams duration uploadedDate channel")
			.populate("channel", "_id name avatar subscriptions");
		res.json(allpodcasts);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

router.get("/:podcastId", async (req, res) => {
	try {
		const { podcastId } = req.params;
		const podcast = await podcasts
			.findById(podcastId)
			.populate("channel", "_id name avatar subscriptions");
		res.json(podcast);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

router.post("/", async (req, res) => {
	try {
		const podcast = await new podcasts(req.body);
		await podcast.save();
		res.json(podcast);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

module.exports = router;
