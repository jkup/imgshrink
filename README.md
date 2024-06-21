# imgshrink

## Description

`imgshrink` is a command-line tool for optimizing images. It supports JPEG, PNG, GIF, and SVG formats.

## Dependencies

- [imagemin](https://www.npmjs.com/package/imagemin)
- [imagemin-jpegtran](https://www.npmjs.com/package/imagemin-jpegtran)
- [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant)
- [imagemin-gifsicle](https://www.npmjs.com/package/imagemin-gifsicle)
- [imagemin-svgo](https://www.npmjs.com/package/imagemin-svgo)

## Installation

### Install the package from npm:

```sh
npm install -g imgshrink
```

## Usage

Optimize a single image:

```sh
imgshrink path/to/image.jpg
```

Optimize all images in a folder:

```sh
imgshrink path/to/folder
```

## License

MIT
