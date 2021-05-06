const express = require("express");
const router = express.Router();
const playlists = require("../models/playlists");
const users = require("../models/users");
const mongoose = require("mongoose");

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

router.post("/:userId", async (req, res) => {
	try {
		const playlist = await new playlists(req.body);
		await playlist.save();
		const { userId } = req.params;
		const user = await users.findById(userId);
		user.playlists.push(playlist._id);
		await user.save();
		const playlistsPopulated = await playlist
			.populate("creator", "_id userName")
			.populate(
				"podcasts",
				"_id name imageUrl streams duration uploadedDate"
			)
			.populate(
				"videos",
				"_id name imageUrl streams duration uploadedDate"
			)
			.execPopulate();
		res.json(playlistsPopulated);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

router.post("/:userId/:playlistId", async (req, res) => {
	try {
		const { userId, playlistId } = req.params;
		const allUserPlaylists = await playlists
			.find({ creator: mongoose.Types.ObjectId(userId) })
			.populate("creator", "_id userName")
			.populate(
				"podcasts",
				"_id name imageUrl streams duration uploadedDate"
			)
			.populate(
				"videos",
				"_id name imageUrl streams duration uploadedDate"
			);
		const playlist = allUserPlaylists.find(
			(playlist) => playlist._id.toString() === playlistId
		);
		const { addToPlaylist, isVideo, isPodcast, streamDetails } = req.body;
		if (isVideo) {
			if (addToPlaylist) {
				playlist.videos.push(streamDetails);
			} else {
				playlist.videos = playlist.videos.filter(
					(video) => video._id.toString() !== streamDetails._id
				);
			}
		} else if (isPodcast) {
			if (addToPlaylist) {
				playlist.podcasts.push(streamDetails);
			} else {
				playlist.podcasts = playlist.podcasts.filter(
					(podcast) => podcast._id.toString() !== streamDetails._id
				);
			}
		}
		await playlist.save();
		res.json(allUserPlaylists);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

router.post("/:playlistId", async (req, res) => {
	try {
		const { playlistId } = req.params;
		let allPlaylists = await playlists
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
		allPlaylists = allPlaylists.filter(
			(playlist) => playlist._id.toString() !== playlistId
		);
		await allPlaylists.save();
		res.json(allPlaylists);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

module.exports = router;
