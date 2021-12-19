export const getCroppedImg = (image, crop, mimetype) => {

  console.log("image", image);
  console.log("crop", crop);

  const canvas = document.createElement("canvas");

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  console.log("scaleX", scaleX);
  console.log("scaleY", scaleY);

  canvas.width = crop.width;
  canvas.height = crop.height;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    0,
    0,
    crop.width,
    crop.height
  );

  // as base64 string
  const base64Image = canvas.toDataURL(mimetype);

  return base64Image;

}