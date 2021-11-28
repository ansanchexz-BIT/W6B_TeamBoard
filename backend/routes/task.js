const express = require("express");
const router = express.Router();
const Task = require("../controllers/task");
const auth = require("../middleware/auth");
const upload = require("../middleware/file");

router.get("/list", auth, Task.listTask);
router.post("/upload", upload.single("image"), auth, Task.uploadTask);
router.put("/", auth, Task.editTask);
router.delete("/:_id", auth, Task.deleteTask);

module.exports = router;
