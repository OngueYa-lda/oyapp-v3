/* eslint-disable camelcase */
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function getImagesByFolder(folder) {
  const hoteisEntry = process.env.CLOUDINARY_HOTEIS_ENTRY;
  const cloudinaryResult = await cloudinary.v2.search
    .expression(`folder="${hoteisEntry}/${folder}"`)
    .execute();

  return cloudinaryResult.resources.map(r => r.url);
}

export async function getImagesPerFolders() {
  const hoteisEntry = process.env.CLOUDINARY_HOTEIS_ENTRY;
  const cloudinaryResult = await cloudinary.v2.api.sub_folders(hoteisEntry);
  const folders = cloudinaryResult.folders;
  // eslint-disable-next-line no-undef
  const images = await Promise.all(
    folders.map(async f => ({
      [f.name]: await getImagesByFolder(f.name)
    }))
  );

  return images;
}
