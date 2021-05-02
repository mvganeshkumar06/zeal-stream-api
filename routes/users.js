const express = require("express");
const router = express.Router();
const users = require("../models/users");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
	try {
		const allUsers = await users
			.find({})
			.populate("playlists")
			.populate("subscriptions");
		res.json(allUsers);
	} catch (err) {
		res.status(404).json({ errMessage: err });
	}
});

router.get("/:userId", async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await users
			.findById(userId)
			.select("_id userName")
			.populate("playlists")
			.populate("subscriptions");
		res.json(user);
	} catch (err) {
		res.json({ errorMessage: err });
	}
});

router.post("/", async (req, res) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const user = await new users(req.body);
		await user.save();
		res.json(user);
	} catch (err) {
		res.status(500).json({ errorMessage: err });
	}
});

router.post("/login", async (req, res) => {
	const { userName, password } = req.body;
	const user = await users.findOne({ userName: userName });
	if (!user) {
		return res
			.status(401)
			.json({ errMessage: "Wrong username, please try again" });
	}
	const isAuthenticated = await bcrypt.compare(password, user.password);
	if (isAuthenticated) {
		return res.json({ id: user._id, name: userName });
	}
	res.status(401).json({ errorMessage: "Wrong password, please try again" });
});

module.exports = router;
