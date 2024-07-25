const ffprobeClient = require('ffprobe-client');
const path = require('path');
const ffprobeStatic = require('ffprobe-static');

const validateVideoDuration = async (req, res, next) => {
    console.log("validateVideoDuration called:req.file:", req.file);
    if (!req.file || !req.file.mimetype.startsWith('video/')) {
        console.log("validateVideoDuration in if:req.file:", req.file);
        return next(); // If no file or the file is not a video, skip validation
    }

    const filePath = path.join(__dirname, '..', 'public/uploads', req.file.filename);

    try {
        const metadata = await ffprobeClient(filePath, { path: ffprobeStatic.path });
        const duration = metadata.streams[0].duration;
        console.log("validateVideoDuration duration:", duration);

        const MAX_VIDEO_DURATION = 600; // 10 minutes in seconds
        if (duration > MAX_VIDEO_DURATION) {
            console.log("validateVideoDuration duration unsuccess:");
            return res.status(400).send({ status: false, message: "Video duration exceeds the maximum limit of 2 minutes" });
        }
        console.log("validateVideoDuration duration success:");
        next();
    } catch (err) {
        console.error("Error in ffprobe:", err);
        return res.status(500).send({ status: false, message: "Error processing video file" });
    }
};

module.exports = validateVideoDuration;
