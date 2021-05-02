const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const podcastsSchema = Schema({
	name: {
		type: String,
		required: [true, "Name field is required"],
	},
	podcastUrl: {
		type: String,
		required: [true, "Podcast Url field is required"],
	},
	duration: {
		type: String,
		required: [true, "Duration field is required"],
	},
	uploadedDate: {
		type: String,
		required: [true, "Uploaded Date field is required"],
	},
	channel: {
		type: Schema.Types.ObjectId,
		ref: "channels",
	},
	description: [
		{
			type: String,
		},
	],
	streams: {
		type: Number,
		required: [true, "Streams field is required"],
	},
});

const podcasts = model("podcasts", podcastsSchema);

module.exports = podcasts;
