import React, { Component } from "react";

export const Preview = ({ meta }) => {
  const { name, percent, status, previewUrl } = meta;
  return (
    <img
      width="64"
      height="64"
      src={previewUrl}
      style={{ objectFit: "cover" }}
    />
  );
};
export const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles }
}) => {
  return (
    <div className="">
      <div {...dropzoneProps}>
        {previews}
        {files.length < maxFiles && input}
      </div>

      {/* {files.length > 0 && submitButton} */}
    </div>
  );
};
