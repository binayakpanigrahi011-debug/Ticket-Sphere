const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController')
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require("multer");
const path=require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/public/posters");
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});

const upload = multer({ storage });
// @route   GET /api/movies
// @desc    Fetch all movies
router.get('/', movieController.getallMovies);

// @route   GET /api/movies/:id
// @desc    Fetch single movie
router.get('/:id', movieController.getSingleMovie);


router.post('/', protect, admin, upload.single("poster"), movieController.createMovie);

// @route   DELETE /api/movies/:id
// @desc    Delete a movie
// @access  Private/Admin
router.delete('/:id', protect, admin, movieController.deleteMovie);



module.exports = router;
