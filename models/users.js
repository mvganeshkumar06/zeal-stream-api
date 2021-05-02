const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = Schema({
	userName: {
		type: String,
		required: [true, "Name field is required"],
	},
	password: {
		type: String,
		required: [true, "Password field is required"],
	},
	playlists: [
		{
			type: Schema.Types.ObjectId,
			ref: "playlists",
		},
	],
	avatar: {
		type: String,
	},
	subscriptions: [
		{
			type: Schema.Types.ObjectId,
			ref: "channels",
		},
	],
});

const users = model("users", usersSchema);

module.exports = users;
