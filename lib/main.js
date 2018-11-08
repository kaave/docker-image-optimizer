const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const gifsicle = require('imagemin-gifsicle');
const webp = require('imagemin-webp');
const dotenv = require('dotenv');

dotenv.config();

const createWebP = process.env.CREATE_WEBP === 'true';

const paths = {
  source: path.join(process.cwd(), 'src'),
  dest: path.join(process.cwd(), 'dest'),
};

async function main() {
  try {
    fs.accessSync(paths.source, fs.constants.R_OK);
    fs.accessSync(paths.dest, fs.constants.R_OK | fs.constants.W_OK);

    await imagemin([`${paths.source}/**/*.{jpg,jpeg,gif,png,svg}`], paths.dest, {
      plugins: [
        mozjpeg(),
        pngquant(),
        gifsicle({ optimizationLevel: 3 }),
      ],
    });

    if (createWebP) {
      await imagemin([`${paths.source}/**/*.{jpg,jpeg,gif,png,webp}`], paths.dest, {
        plugins: [webp()],
      });
    }
  } catch (error) {
    throw error;
  }
}

main()
  .then(() => console.log('compress finish.'))
  .catch(() => console.error(error));
