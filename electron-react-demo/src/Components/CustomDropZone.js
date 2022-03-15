import React, { Component } from "react";

export const Preview = ({ meta }) => {
  const { name, percent, status, previewUrl } = meta;
  return (
    <div>
      <img
        width="64"
        height="64"
        src={previewUrl}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
          zIndex: 500
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.5,
          zIndex: 600,
          backgroundColor: "gray",
          minHeight: "64px",
          minWidth: "64px"
        }}
      ></div>
    </div>
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
