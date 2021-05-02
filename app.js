require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./database/connection");
const usersRoutes = require("./routes/users");
const channelsRoutes = require("./routes/channels");
const podcastsRoutes = require("./routes/podcasts");
const videosRoutes = require("./routes/videos");
const playlistsRoutes = require("./routes/playlists");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectToDatabase();

app.use("/users", usersRoutes);
app.use("/channels", channelsRoutes);
app.use("/podcasts", podcastsRoutes);
app.use("/videos", videosRoutes);
app.use("/playlists", playlistsRoutes);

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});
