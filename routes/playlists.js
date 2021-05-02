const express = require("express");
const router = express.Router();
const playlists = require("../models/playlists");

router.get("/", async (req, res) => {
	try {
		const allPlaylists = await playlists
			.find({})
			.populate("creator", "_id userName")
			.populate(
				"podcasts",
				"_id name imageUrl streams duration uploadedDate"
			)
			.populate(
				"videos",
				"_id name imageUrl streams duration uploadedDate"
			);
		res.json(allPlaylists);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

router.get("/:playlistId", async (req, res) => {
	try {
		const { playlistId } = req.params;
		const playlist = await playlists
			.findById(playlistId)
			.populate("creator", "_id userName")
			.populate(
				"podcasts",
				"_id name imageUrl streams duration uploadedDate"
			)
			.populate(
				"videos",
				"_id name imageUrl streams duration uploadedDate"
			);
		res.json(playlist);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

router.post("/", async (req, res) => {
	try {
		const playlist = await new playlists(req.body);
		await playlist.save();
		res.json(playlist);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

module.exports = router;
