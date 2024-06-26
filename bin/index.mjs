#!/usr/bin/env node

import { lstat } from "fs";
import { optimizeImage, optimizeImagesInFolder } from "../index.mjs";

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
