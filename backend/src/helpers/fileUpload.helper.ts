import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import fs from "fs";

dotenv.config();

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
      let filename = path.parse(file.originalname).name;
      let time = new Date().getTime();
      let extension = path.extname(file.originalname);
      cb(null, filename + "-" + time + extension);
    },
  }),
});
