export const validateFormInput = (formInput, files) => {
  const errors = {};
  if (!formInput.course_name) {
    errors.course_name = "Please enter course name.";
  } else if (formInput.course_name.length > 60) {
    errors.course_name = "Course name should be at most 60 characters.";
  }

  if (!formInput.price) {
    errors.price = "Please enter course price.";
  } else if (formInput.price < 0) {
    errors.price = "Price must be a positive number.";
  }

  if (!formInput.duration) {
    errors.duration = "Please enter course duration.";
  } else if (formInput.duration < 0) {
    errors.duration = "Duration must be a positive number.";
  }

  if (!formInput.summary) {
    errors.summary = "Please enter course summary.";
  } else if (formInput.summary.length > 60) {
    errors.summary = "Course summary should be at most 60 characters.";
  }

  if (!formInput.detail) {
    errors.detail = "Please enter course detail.";
  } else if (formInput.detail.length > 1500) {
    errors.detail = "Course detail should be at most 1,500 characters.";
  }

  if (files.coverImage) {
    const coverImageType = files.coverImage.type;
    const coverImageSize = files.coverImage.size / 1024 / 1024;
    if (!["image/jpeg", "image/jpg", "image/png"].includes(coverImageType)) {
      errors.coverImage = "Cover image must be a .jpg, .jpeg, or .png file.";
    }
    if (coverImageSize > 5) {
      errors.coverImage = "Cover image must be less than 5 MB.";
    }
  } else {
    errors.coverImage = "Cover image is required.";
  }
  if (files.trailer) {
    const trailerType = files.trailer.type;
    const trailerSize = files.trailer.size / 1024 / 1024;
    if (!["video/mp4", "video/mov", "video/avi"].includes(trailerType)) {
      errors.trailer = "Video trailer must be a .mp4, .mov, or .avi file.";
    }
    if (trailerSize > 20) {
      errors.trailer = "Video trailer must be less than 20 MB.";
    }
  } else {
    errors.trailer = "Video trailer is required.";
  }

  return errors;
};
