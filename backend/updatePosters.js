require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./models/Movie');

async function updatePosters() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');

  const updates = [
    { title: /inception/i, url: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg' },
    { title: /jawan/i, url: 'https://image.tmdb.org/t/p/original/9c2yR3K1rK4f5h3Z2V0vPZ6lN2y.jpg' },
    { title: /avengers.*endgame/i, url: 'https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
    { title: /interstellar/i, url: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg' },
    { title: /dark.*knight/i, url: 'https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg' }
  ];

  for (const update of updates) {
    const movie = await Movie.findOneAndUpdate({ title: update.title }, { poster: update.url }, { new: true });
    if (movie) {
      console.log(`Updated: ${movie.title}`);
    } else {
      console.log(`Not found: ${update.title}`);
    }
  }

  process.exit(0);
}

updatePosters();
