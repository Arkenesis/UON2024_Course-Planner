import { image_db } from "../services/database.js";

export const getFiles = async (req, res) => {
  try {
    // Reference to the folder in the bucket
    const folderRef = image_db;

    // List all files in the folder
    const [files] = await folderRef.getFiles({ prefix: 'CoursePlanner/'});
    // remove first element, because it is a file path 'CoursePlanner/' not an image
    files.shift();
    // Format file names or other relevant information
    // const fileNames = files.map(file => file.name);
    const fileDetails = await Promise.all(files.map(async (file) => {
        // Set a far future expiration date or customize as needed
        const [url] = await file.getSignedUrl({ action: 'read', expires: '03-09-2500' }); 
        return { name:file.name, url: url};
      }));
    return res.json({ files: fileDetails });
  } catch (error) {
    console.error("Error listing files:", error);
    return res.status(403).json({ message: "Failed to retrieve the information!" });
  }
};


export const uploadFiles = async (req, res, err) => {
  // if (err) {
  //   return res.status(400).send({ message: err.message })
  // }
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const fileUrls = await Promise.all(files.map(async (file) => {
      const file_name = file.originalname;
      const blob = image_db.file(`CoursePlanner/${file_name}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype
      });

      await new Promise((resolve, reject) => {
        blobStream.on('error', (err) => reject(err));
        blobStream.on('finish', () => resolve());
        blobStream.end(file.buffer);
      });

      return `https://storage.googleapis.com/${image_db.name}/${blob.name}`;
    }));

    return res.status(200).json({ message: "Files uploaded successfully", urls: fileUrls });
  } catch (error) {
  //   console.error('Error uploading files:', error);
    return res.status(500).json({ message: error });
  }
};