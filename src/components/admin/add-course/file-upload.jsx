import { useState } from "react";

export default function FileUpload({ onFilesChange, errors }) {
  const [files, setFiles] = useState({
    coverImage: null,
    trailer: null,
    attachment: null,
  });

  const handleFileChange = (event, fileType) => {
    const updatedFiles = { ...files, [fileType]: event.target.files[0] };
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleRemoveFile = (fileType) => {
    const updatedFiles = { ...files };
    delete updatedFiles[fileType];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        {/* coverImage */}
        <div className="flex gap-2">
          <label htmlFor="img-upload">Cover image *</label>
          {errors.coverImage && (
            <span className="text-red-500">{errors.coverImage}</span>
          )}
        </div>
        <input
          id="img-upload"
          name="coverImage"
          type="file"
          accept="image/*"
          hidden
          //required
          onChange={(event) => handleFileChange(event, "coverImage")}
        />
        {files.coverImage ? (
          <div
            className="image-preview w-60
              h-60 relative flex justify-center items-center rounded-[8px] bg-[#F6F7FC] overflow-hidden"
          >
            <img
              src={URL.createObjectURL(files.coverImage)}
              alt={files.coverImage.name}
            />
            <button
              className="rounded-full bg-[#9B2FAC] w-4 h-4 text-center text-white text-[8px]  top-[6px] right-[6px] absolute"
              onClick={() => {
                handleRemoveFile("coverImage");
              }}
              aria-label="Remove cover image"
            >
              X
            </button>
          </div>
        ) : (
          <label
            htmlFor="img-upload"
            className="flex flex-col justify-center bg-[#F6F7FC] w-60 h-60"
          >
            <p className="text-[#5483D0] text-center">+</p>
            <p className="text-[#5483D0] text-center">Upload Image</p>
          </label>
        )}
      </div>
      {/* trailer */}
      <div className="flex flex-col gap-1 w-full">
        <div className="flex gap-2">
          <label htmlFor="trailer-upload">Video Trailer *</label>
          {errors.trailer && (
            <span className="text-red-500">{errors.trailer}</span>
          )}
        </div>
        <input
          id="trailer-upload"
          name="trailer"
          type="file"
          accept="video/*"
          hidden
          //required
          onChange={(event) => handleFileChange(event, "trailer")}
        />
        {files.trailer ? (
          <div
            className="trailer-preview w-60
                h-60 relative bg-[#F6F7FC] flex justify-center items-center rounded-[8px]"
          >
            <video
              controls
              src={URL.createObjectURL(files.trailer)}
              type="video/mp4"
              className="h-full w-full rounded-2xl"
            >
              Your browser does not support the video tag.
            </video>
            <button
              className="rounded-full bg-[#9B2FAC] w-4 h-4 text-center text-white text-[8px]  top-[6px] right-[6px] absolute"
              onClick={() => {
                handleRemoveFile("trailer");
              }}
              aria-label="Remove cover image"
            >
              X
            </button>
          </div>
        ) : (
          <label
            htmlFor="trailer-upload"
            className="flex flex-col justify-center bg-[#F6F7FC] w-60 h-60 rounded-[8px]"
          >
            <p className="text-[#5483D0] text-center">+</p>
            <p className="text-[#5483D0] text-center">Upload Video</p>
          </label>
        )}
      </div>
      {/* attachment */}
      <div className="flex flex-col gap-1 w-full">
        <label>Attach file (Optional) *</label>
        <input
          id="attchment-upload"
          name="attachment"
          type="file"
          accept="*/*"
          onChange={(event) => handleFileChange(event, "attachment")}
          hidden
        />
        {files.attachment ? (
          <div className="ttachment-preview w-fit h-10 relative bg-[#F6F7FC] flex justify-center items-center rounded-[8px] px-3 pr-10">
            <p className="text-xs">{files.attachment.name}</p>
            <button
              className="rounded-full bg-[#9B2FAC] w-4 h-4 text-center text-white text-[8px]  top-[6px] right-[6px] absolute"
              onClick={() => {
                handleRemoveFile("attachment");
              }}
              aria-label="Remove attachments"
            >
              X
            </button>
          </div>
        ) : (
          <label
            htmlFor="attchment-upload"
            className="flex flex-col justify-center bg-[#F6F7FC] w-40 h-40"
          >
            <p className="text-[#5483D0] text-center">+</p>
            <p className="text-[#5483D0] text-center">Upload file</p>
          </label>
        )}
      </div>
    </>
  );
}
