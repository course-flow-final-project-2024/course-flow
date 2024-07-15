import { supabase } from "../../../../lib/supabase";
import { useState } from "react";

export default function FileUpload({ onFilesChange }) {
  const handleImageUpload = async (event) => {
    await uploadFile(event, "cover_images");
  };
  const handleTrailerUpload = async (event) => {
    await uploadFile(event, "trailers");
  };
  const handleAttachmentUpload = async (event) => {
    await uploadFile(event, "attachments");
  };
  // Handle file upload event
  const uploadFile = async (event, folderPath) => {
    const file = event.target.files[0];
    const bucketName = "course";

    console.log(file);
    try {
      // Call Storage API to upload file
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`${folderPath}/${file.name}`, file);

      // Handle error if upload failed
      if (error) {
        console.error("Error uploading file:", error.message);
        alert("Error uploading file.");
        return;
      }

      alert("File uploaded successfully!");
      console.log("File details:", data);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("Error uploading file.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <label>Cover image *</label>
        <input
          id="img-upload"
          name="coverImage"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          hidden
          required
        />
        <label
          htmlFor="img-upload"
          className="flex flex-col justify-center bg-[#F6F7FC] w-60 h-60"
        >
          <p className="text-[#5483D0] text-center">+</p>
          <p className="text-[#5483D0] text-center">Upload Image</p>
        </label>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label>Video Trailer *</label>
        <input
          id="trailer-upload"
          name="trailer"
          type="file"
          accept="video/*"
          onChange={(e) => {
            uploadFile(e, "trailers");
          }}
          hidden
          required
        />
        <label
          htmlFor="trailer-upload"
          className="flex flex-col justify-center bg-[#F6F7FC] w-60 h-60 "
        >
          <p className="text-[#5483D0] text-center">+</p>
          <p className="text-[#5483D0] text-center">Upload Video</p>
        </label>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label>Attach file (Optional) *</label>
        <input
          id="attchment-upload"
          name="attachment"
          type="file"
          accept="*/*"
          onChange={handleAttachmentUpload}
          hidden
        />
        <label
          htmlFor="attchment-upload"
          className="flex flex-col justify-center bg-[#F6F7FC] w-40 h-40"
        >
          <p className="text-[#5483D0] text-center">+</p>
          <p className="text-[#5483D0] text-center">Upload Video</p>
        </label>
      </div>
    </>
  );
}
