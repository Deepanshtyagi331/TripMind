const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');

/**
 * Extracts text from a document buffer (PDF or Image)
 * @param {Buffer} fileBuffer 
 * @param {String} fileType 'pdf' | 'image'
 * @returns {Promise<String>} Extracted text
 */
const extractText = async (fileBuffer, fileType) => {
  if (fileType === 'pdf') {
    try {
      const data = await pdfParse(fileBuffer);
      return data.text || '';
    } catch (error) {
      console.error('PDF extraction failed:', error);
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  } else if (fileType === 'image') {
    try {
      const { data: { text } } = await Tesseract.recognize(fileBuffer, 'eng');
      return text || '';
    } catch (error) {
      console.error('OCR Image extraction failed:', error);
      throw new Error(`Failed to extract text from image (OCR): ${error.message}`);
    }
  } else {
    throw new Error('Unsupported file type for extraction.');
  }
};

module.exports = { extractText };
