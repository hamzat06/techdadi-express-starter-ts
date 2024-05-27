import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req: Request, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// const fileFilter = (
//   req: Request,
//   file: { mimetype: string },
//   cb: (arg0: { message: string } | null, arg1: boolean) => void,
// ) => {
//   if (
//     file.mimetype === 'image/jpeg' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/svg'
//   ) {
//     cb(null, true);
//   } else {
//     cb({ message: 'Unsupported File Format' }, false);
//   }

// const fileSize = parseInt(req.headers["content-length"]);
// if (fileSize > 4194304) {
//   return callback(new AppError("File size over 4mb", 400));
// }
// };

type CustomCallback = (
  error: { message: string } | null,
  acceptFile: boolean,
) => void;

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: CustomCallback | FileFilterCallback | any,
) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/svg'
  ) {
    cb(null, true);
  } else {
    cb({ message: 'Unsupported File Format' }, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

export default upload;
