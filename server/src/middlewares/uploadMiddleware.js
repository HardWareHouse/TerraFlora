import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Répertoire de stockage des images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads'); // Répertoire où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename); // Nom de fichier unique (pour éviter les conflits)
  }
});

// Vérification type de fichier
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
  }
};

// Limitation taille image
const limits = {
  fileSize: 5 * 1024 * 1024 // 5MB
};

const upload = multer({ storage, fileFilter, limits });

export default upload;
