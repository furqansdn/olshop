import cloudinary from 'cloudinary';

import config from '../config/index.js';

cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.key,
  api_secret: config.cloudinary.secret,
});

export const Upload = function (image) {
  return new Promise(function (resolve, reject) {
    cloudinary.v2.uploader.upload(image, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};
