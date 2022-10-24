import { Application, Request, Response } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.diskStorage({}) });

export class UploadRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UploadRoutes');
  }

  configureRoutes(): Application {
    this.app.post(
      '/api/upload',
      upload.single('photo'),
      async (req: Request, res: Response) => {
        try {
          const file: any = req?.file?.path;
          const uploaded = await cloudinary.uploader.upload(file);
          res.send(uploaded);
        } catch (error) {
          console.error(error);
        }
      }
    );

    this.app.get('/api/upload', (req: Request, res: Response) => {
      res.status(200).send('Hello');
    });

    return this.app;
  }
}
