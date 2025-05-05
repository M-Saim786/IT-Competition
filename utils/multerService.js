
const multer = require("multer");
const fs = require("fs");
// Ensure upload directory exists
const uploadDir = "/tmp/uploads"; // Use /tmp for Vercel
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqeString = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.originalname.split(".").pop();
        cb(null, "media-" + uniqeString + "." + ext);
    },

})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB file size limit 
});

// const uploadImgs = upload.fields([{ name: "logo", maxCount: 1 }])

module.exports = upload;