const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const channelsSchema = Schema({
	name: {
		type: String,
		required: [true, "Name field is required"],
	},
	avatar: {
		type: String,
		required: [true, "Avatar field is required"],
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
	playlists: [
		{
			type: Schema.Types.ObjectId,
			ref: "playlists",
		},
	],
	description: [
		{
			type: String,
		},
	],
	subscriptions: {
		type: Number,
		default: 0,
	},
});

const channels = model("channels", channelsSchema);

module.exports = channels;
