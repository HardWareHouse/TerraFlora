import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

jest.mock('multer');
jest.mock('path');
jest.mock('uuid');

describe('Upload Middleware', () => {
  let mockMulter;
  let multerOptions;
  let destinationCallback;
  let filenameCallback;

  beforeEach(() => {
    jest.clearAllMocks();
    
    destinationCallback = jest.fn();
    filenameCallback = jest.fn();
    
    mockMulter = jest.fn().mockReturnValue('mockedMiddleware');
    multer.mockReturnValue(mockMulter);
    
    multer.diskStorage.mockImplementation((options) => {
      options.destination({}, {}, destinationCallback);
      options.filename({}, { originalname: 'test.jpg' }, filenameCallback);
      return {
        destination: options.destination,
        filename: options.filename
      };
    });

    jest.isolateModules(() => {
      require('../../middlewares/uploadMiddleware');
    });
    
    multerOptions = multer.mock.calls[0][0];
  });

  it('should configure multer with correct options', () => {
    expect(multer).toHaveBeenCalledWith(expect.objectContaining({
      storage: expect.any(Object),
      fileFilter: expect.any(Function),
      limits: { fileSize: 5 * 1024 * 1024 }
    }));
  });

  describe('Storage Configuration', () => {
    it('should set correct destination', () => {
      expect(destinationCallback).toHaveBeenCalledWith(null, 'src/uploads');
    });

    it('should set filename with UUID', () => {
      const mockUuid = 'mock-uuid';
      uuidv4.mockReturnValue(mockUuid);
      path.extname.mockReturnValue('.jpg');

      multerOptions.storage.filename({}, { originalname: 'test.jpg' }, filenameCallback);

      expect(filenameCallback).toHaveBeenCalledWith(null, `${mockUuid}.jpg`);
    });
  });

  describe('File Filter', () => {
    it('should accept jpeg files', () => {
      const cb = jest.fn();
      multerOptions.fileFilter({}, { mimetype: 'image/jpeg' }, cb);
      expect(cb).toHaveBeenCalledWith(null, true);
    });

    it('should accept jpg files', () => {
      const cb = jest.fn();
      multerOptions.fileFilter({}, { mimetype: 'image/jpg' }, cb);
      expect(cb).toHaveBeenCalledWith(null, true);
    });

    it('should accept png files', () => {
      const cb = jest.fn();
      multerOptions.fileFilter({}, { mimetype: 'image/png' }, cb);
      expect(cb).toHaveBeenCalledWith(null, true);
    });

    it('should reject other file types', () => {
      const cb = jest.fn();
      multerOptions.fileFilter({}, { mimetype: 'image/gif' }, cb);
      expect(cb).toHaveBeenCalledWith(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
    });
  });

  it('should set correct file size limit', () => {
    expect(multerOptions.limits.fileSize).toBe(5 * 1024 * 1024); 
  });
});