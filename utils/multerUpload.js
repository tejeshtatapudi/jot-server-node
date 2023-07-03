const multer = require("multer");

class MulterUpload {
  constructor(destination, starter) {
    this.destination = destination;
    this.starter = starter;
  }

  multerStorage() {
    return multer.diskStorage({
      destination: (req, file, next) => {
        next(null, this.destination);
      },

      filename: (req, file, next) => {
        const originalName = file.originalname
          .split(".")
          .slice(0, -1)
          .join("-")
          .split(" ")
          .join("-");
        const ext = file.mimetype.split("/")[1];

        next(
          null,
          `${
            this.starter ? this.starter : "upload"
          }-${originalName}-${Date.now()}.${ext}`
        );
      },
    });
  }

  multerFilter = (req, file, next) => {
    if (file.mimetype.startsWith("image")) {
      next(null, true);
    } else {
      next(new Error("Not an images. Please upload only images", 404), false);
    }
  };

  upload() {
    return multer({
      storage: this.multerStorage(),
      fileFilter: this.multerFilter,
    });
  }
}

module.exports = MulterUpload;
