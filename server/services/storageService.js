const cloudinary = require('../config/cloudinary');

/**
 * Uploads a file buffer to storage (Cloudinary default, S3 optional)
 * @param {Buffer} fileBuffer 
 * @param {String} originalName 
 * @param {String} mimeType 
 * @returns {Promise<{url: String, publicId: String}>}
 */
const uploadToStorage = async (fileBuffer, originalName, mimeType) => {
  const useS3 = process.env.USE_S3 === 'true';

  if (useS3) {
    try {
      const { S3Client } = require('@aws-sdk/client-s3');
      const { Upload } = require('@aws-sdk/lib-storage');

      const s3 = new S3Client({
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });

      const fileKey = `${Date.now()}_${originalName.replace(/\s+/g, '_')}`;

      const upload = new Upload({
        client: s3,
        params: {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
          Body: fileBuffer,
          ContentType: mimeType,
        },
      });

      const result = await upload.done();
      return {
        url: result.Location,
        publicId: fileKey,
      };
    } catch (s3Error) {
      console.error('S3 upload failed, falling back to Cloudinary:', s3Error);
      // Fall through to Cloudinary
    }
  }

  // Cloudinary fallback or default upload
  return new Promise((resolve, reject) => {
    // PDF should be uploaded with resource_type 'raw' or 'auto'
    const isPDF = mimeType === 'application/pdf';
    const uploadOptions = {
      folder: 'tripmind',
      resource_type: isPDF ? 'raw' : 'image',
      public_id: `${Date.now()}_${originalName.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_')}`,
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

module.exports = { uploadToStorage };
