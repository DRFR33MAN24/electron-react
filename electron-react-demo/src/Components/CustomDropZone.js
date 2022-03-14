import React, { Component } from 'react';

export const Preview = ({ meta }) => {
    const { name, percent, status, previewUrl } = meta;
    return (
        <div style={{ width: 200, height: 300 }}>
            <img
                src={previewUrl}
                width="200"
                height="300"
                style={{ objectFit: "fill" }}
            />
            {/* {status === "uploading" ? (
        <div class="progress">
          <div
            style={{ width: `${Math.round(percent)}%` }}
            class="progress-bar"
            role="progressbar"
            aria-valuenow={Math.round(percent)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {Math.round(percent)}%
          </div>
        </div>
      ) : null} */}

            {/* <span>
        {name}, {status}
      </span> */}
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
        <div>
            <div {...dropzoneProps}>
                {/* {previews} */}
                {files.length < maxFiles && input}
            </div>

            {/* {files.length > 0 && submitButton} */}
        </div>
    );
};
