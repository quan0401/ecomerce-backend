const imageValidate = (images) => {
  let imagesList = [];
  if (Array.isArray(images)) {
    imagesList = images;
  } else {
    imagesList.push(images);
  }
  const filetypes = /jpg|jpeg|png/;
  if (imagesList.length > 3)
    return { error: "Cannot upload more than 3 images" };

  const result = imagesList.every(
    (img) => filetypes.test(img.mimetype) === true
  );
  if (!result) return { error: "Not image type" };
  return { error: false };
};

export default imageValidate;
