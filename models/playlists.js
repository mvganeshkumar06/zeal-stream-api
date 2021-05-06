const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const playlistsSchema = Schema({
	name: {
		type: String,
		required: [true, "Name field is required"],
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	videos: [
		{
			type: Schema.Types.ObjectId,
			ref: "videos",
		},
	],
	podcasts: [
		{
			type: Schema.ObjectId,
			ref: "podcasts",
		},
	],
	description: [
		{
			type: String,
			default: "",
		},
	],
});

const playlists = model("playlists", playlistsSchema);

module.exports = playlists;
