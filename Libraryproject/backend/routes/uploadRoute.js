const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadController = require("../controllers/uploadController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Use memory storage for quick parsing
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype === "text/csv") {
            cb(null, true);
        } else {
            cb(new Error("Only .xlsx and .csv files are allowed"), false);
        }
    }
});

// Endpoint: POST /api/admin/upload-products
router.post("/", authMiddleware, adminMiddleware, upload.single("file"), uploadController.uploadProducts);

module.exports = router;
