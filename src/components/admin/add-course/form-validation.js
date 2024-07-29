export const validateFormInput = (course) => {
  const errors = {};
  if (!course.course_name) {
    errors.course_name = "Please enter course name.";
  } else if (course.course_name.length > 60) {
    errors.course_name = "Course name should be at most 60 characters.";
  }

  if (!course.price) {
    errors.price = "Please enter course price.";
  } else if (course.price < 0) {
    errors.price = "Price must be a positive number.";
  }

  if (!course.duration) {
    errors.duration = "Please enter course duration.";
  } else if (course.duration < 0) {
    errors.duration = "Duration must be a positive number.";
  }

  if (!course.summary) {
    errors.summary = "Please enter course summary.";
  } else if (course.summary.length > 60) {
    errors.summary = "Course summary should be at most 60 characters.";
  }

  if (!course.detail) {
    errors.detail = "Please enter course detail.";
  } else if (course.detail.length > 1500) {
    errors.detail = "Course detail should be at most 1,500 characters.";
  }

  if (course.course_image) {
    const coverImageType = course.course_image.type;
    const coverImageSize = course.course_image.size / 1024 / 1024;
    if (!["image/jpeg", "image/jpg", "image/png"].includes(coverImageType)) {
      errors.coverImage = "Cover image must be a .jpg, .jpeg, or .png file.";
    }
    if (coverImageSize > 5) {
      errors.coverImage = "Cover image must be less than 5 MB.";
    }
  } else {
    errors.coverImage = "Cover image is required.";
  }
  if (course.video_trailer) {
    const trailerType = course.video_trailer.type;
    const trailerSize = course.video_trailer.size / 1024 / 1024;
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
