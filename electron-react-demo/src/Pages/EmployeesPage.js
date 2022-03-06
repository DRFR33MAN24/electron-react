import React, { Component } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { Context } from "./MainPage";
import loc from "../localization";

const Preview = ({ meta }) => {
  const { name, percent, status, previewUrl } = meta;
  return (
    <div>
      {console.log(meta)}
      <img src={previewUrl} className="" width="64" height="64" />
      {status === "uploading" ? (
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
      ) : null}

      {/* <span>
        {name}, {status}
      </span> */}
    </div>
  );
};
const Layout = ({
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
        {files.length < maxFiles && input}
        {previews}
      </div>

      {/* {files.length > 0 && submitButton} */}
    </div>
  );
};
class EmployeesPage extends Component {
  state = { name: loc.employees };
  static contextType = Context;
  componentWillMount() {
    this.context(this.state.name);
  }

  // specify upload params and url for your files
  getUploadParams = ({ file, meta }) => {
    // const body = new FormData()
    // body.append('fileField', file)
    return {
      url: "http://localhost:5000/api/auth/idUpload",
      headers: { "x-auth-token": localStorage.token }
    };
  };

  // called every time a file's `status` changes
  handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };
  render() {
    return (
      <div className=" p-2">
        <div className="card ">
          <button
            class="btn btn-link "
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <div class="text-right h4 text-gray-800">{loc.addEmployee}</div>
          </button>
          <div class="collapse" id="collapseExample">
            <div className="  text-right p-2 mb-3   ">
              <div class="row  flex-row py-2   ">
                <div class="col-3 d-flex   justify-content-end align-items-start    ">
                  <p class="my-auto">{loc.EmployeeName}</p>
                </div>
                <div class="col-9  d-flex justify-content-start align-items-start mb-2 ">
                  <div class="input-group w-75 ">
                    <input
                      type="text"
                      class="form-control "
                      aria-label="Amount (to the nearest dollar)"
                    />
                  </div>
                </div>
                <div class="col-3 d-flex   justify-content-end align-items-start    ">
                  <p class="my-auto">{loc.phoneNumber}</p>
                </div>
                <div class="col-9  d-flex justify-content-start align-items-start mb-2">
                  <div class="input-group w-75 ">
                    <input
                      type="text"
                      class="form-control "
                      aria-label="Amount (to the nearest dollar)"
                    />
                  </div>
                </div>
                <div class="col-3 d-flex   justify-content-end align-items-start    ">
                  <p class="my-auto">{loc.nationality}</p>
                </div>
                <div class="col-9  d-flex justify-content-start align-items-start mb-2 ">
                  <div class="input-group w-75 ">
                    <input
                      type="text"
                      class="form-control "
                      aria-label="Amount (to the nearest dollar)"
                    />
                  </div>
                </div>
                <div class="col-3 d-flex   justify-content-end align-items-start    ">
                  <p class="my-auto">{loc.id}</p>
                </div>
                <div class="col-9  d-flex justify-content-center align-items-start mb-2 ">
                  <div class="container-fluid border0">
                    <Dropzone
                      maxFiles={1}
                      multiple={false}
                      canCancel={false}
                      getUploadParams={this.getUploadParams}
                      onChangeStatus={this.handleChangeStatus}
                      onSubmit={this.handleSubmit}
                      LayoutComponent={Layout}
                      PreviewComponent={Preview}
                      inputWithFilesContent={null}
                      inputContent={
                        <div className="text-middle  h5 text-gray-800">
                          {loc.dragUploadFile}
                        </div>
                      }
                      accept="image/*,audio/*,video/*"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeesPage;
