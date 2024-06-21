import { readdir, lstatSync, lstat } from "fs";
import { extname, dirname, join } from "path";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  let plugins = [];

  switch (ext) {
    case ".jpg":
    case ".jpeg":
      plugins.push(imageminJpegtran());
      break;
    case ".png":
      plugins.push(imageminPngquant({ quality: [0.6, 0.8] }));
      break;
    case ".gif":
      plugins.push(imageminGifsicle());
      break;
    case ".svg":
      plugins.push(imageminSvgo());
      break;
    default:
      console.log(`Unsupported file type: ${ext}`);
      return;
  }

  try {
    await imagemin([filePath], {
      destination: dirname(filePath),
      plugins: plugins,
    });
    console.log(`Optimized: ${filePath}`);
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
  }
}

async function optimizeImagesInFolder(folderPath) {
  readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading folder: ${err}`);
      return;
    }

    files.forEach((file) => {
      const filePath = join(folderPath, file);
      if (lstatSync(filePath).isFile()) {
        optimizeImage(filePath);
      }
    });
  });
}

const targetPath = process.argv[2];
if (!targetPath) {
  console.log("Please provide a file or folder path.");
  process.exit(1);
}

lstat(targetPath, (err, stats) => {
  if (err) {
    console.error(`Error reading path: ${err}`);
    process.exit(1);
  }

  if (stats.isFile()) {
    optimizeImage(targetPath);
  } else if (stats.isDirectory()) {
    optimizeImagesInFolder(targetPath);
  } else {
    console.log("Invalid path. Please provide a valid file or folder path.");
    process.exit(1);
  }
});
