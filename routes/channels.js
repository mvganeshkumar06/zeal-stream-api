const express = require("express");
const router = express.Router();
const channels = require("../models/channels");

router.get("/", async (req, res) => {
	try {
		const allChannels = await channels
			.find({})
			.populate("creator", "_id userName")
			.populate(
				"videos",
				"_id name imageUrl streams duration uploadedDate channel"
			)
			.populate(
				"podcasts",
				"_id name imageUrl streams duration uploadedDate channel"
			)
			.populate("playlists", "_id name");
		res.json(allChannels);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

router.get("/:channelId", async (req, res) => {
	try {
		const { channelId } = req.params;
		const channel = await channels
			.findById(channelId)
			.populate("creator", "_id userName")
			.populate(
				"videos",
				"_id name imageUrl streams duration uploadedDate channel"
			)
			.populate(
				"podcasts",
				"_id name imageUrl streams duration uploadedDate channel"
			)
			.populate("playlists", "_id name");
		res.json(channel);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

router.post("/", async (req, res) => {
	try {
		const channel = await new channels(req.body);
		await channel.save();
		res.json(channel);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

module.exports = router;
