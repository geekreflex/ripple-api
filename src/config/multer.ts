import multer from 'multer';

export = multer({
  storage: multer.diskStorage({}),
});
