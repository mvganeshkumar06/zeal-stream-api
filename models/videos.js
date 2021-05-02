const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videosSchema = Schema({
	name: {
		type: String,
		required: [true, "Name field is required"],
	},
	imageUrl: {
		thumbnailUrl: {
			type: String,
			required: [true, "Thumbnail field is required"],
		},
		gifUrl: {
			type: String,
			required: [true, "Gif field is required"],
		},
	},
	videoUrl: {
		type: String,
		required: [true, "Video Url field is required"],
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

const videos = model("videos", videosSchema);

module.exports = videos;
