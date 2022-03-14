import React, { Component } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { Context } from "./MainPage";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/authAction";
import { clearErrors, returnErrors } from "../actions/errorAction";
import { getEmployees } from "../actions/employeesAction";
import loc from "../localization";
import TableFilter from "react-table-filter";
import "react-table-filter/lib/styles.css";
const Preview = ({ meta }) => {
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
const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles }
}) => {
  return (
    <div className="w-100">
      <div {...dropzoneProps}>
        {previews}
        {files.length < maxFiles && input}
      </div>

      {/* {files.length > 0 && submitButton} */}
    </div>
  );
};
class EmployeesPage extends Component {
  state = {
    name: loc.employees,
    employeeName: "",
    employeeType: "",
    employeeNationality: "",
    employeePhone: "",
    empIDReady: false,
    employees: []
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,

    error: PropTypes.object.isRequired,
    getEmployees: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired,
    employees: PropTypes.object,

  };
  static contextType = Context;
  componentWillMount() {
    this.context(this.state.name);
    this.props.getEmployees();
  }
  componentDidMount() {
    // pass user id to filter employees by permissions imposed on the given user.
  }
  UNSAFE_componentWillReceiveProps() {
    this.setState({ employees: this.props.employees })
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
  // handleSubmit = (files, allFiles) => {
  //   console.log(files.map(f => f.meta));
  //   allFiles.forEach(f => f.remove());
  // };
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  _filterUpdated = (newData, filtersObject) => {

    this.setState({
      employees: newData
    });
  }
  render() {

    if (this.state.employees.length === 0) return (<div></div>);
    const tableContent = this.state.employees.map((item, index) => {
      return (
        <tr key={'row_' + index}>
          <td className="cell">
            {item.id}
          </td>
          <td className="cell">
            {item.name}
          </td>
          <td className="cell">
            {item.phone}
          </td>
        </tr>
      );
    });
    return (
      <div className=" p-2">
        <div className="card ">
          <button
            class="btn btn-link bg-gradient-success text-gray-800"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <div class="text-right  mt-2 h4 text-gray-800">
              {loc.addEmployee}
              <span>
                <i class="fas fa-plus fa-sm fa-fw"></i>
              </span>
            </div>
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
                      name="employeeName"
                      value={this.state.employeeName}
                      onChange={this.handleInputChange}
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
                      name="employeePhone"
                      value={this.state.employeePhone}
                      onChange={this.handleInputChange}
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
                  <select
                    name="employeeNationality"
                    id="inputState"
                    class="form-control w-75"
                    value={this.state.employeeNationality}
                    onChange={this.handleInputChange}
                  >
                    <option selected>{loc.choose}</option>
                    <option value="dd">...</option>
                    <option value="ss">...</option>
                  </select>
                </div>
                <div class="col-3 d-flex   justify-content-end align-items-start    ">
                  <p class="my-auto">{loc.id}</p>
                </div>
                <div class="col-9  d-flex justify-content-center align-items-start mb-2 ">
                  <div class="container w-75">
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
                        <div className="text-middle drop-zone-input  h5 text-gray-800">
                          {loc.dragUploadFile}
                        </div>
                      }
                      accept="image/*,audio/*,video/*"
                    />
                  </div>
                </div>
                <div class="col-3 d-flex   justify-content-end align-items-start    ">
                  <p class="my-auto">{loc.employeeType}</p>
                </div>
                <div class="col-9  d-flex justify-content-start align-items-start mb-2 ">
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      name="employeeType"
                      value="manager"
                      checked={this.state.employeeType === "manager"}
                      onChange={this.handleInputChange}
                      type="radio"
                      id="customRadioInline1"
                      name="customRadioInline1"
                      class="custom-control-input"
                    />
                    <label
                      class="custom-control-label"
                      for="customRadioInline1"
                    >
                      {loc.manager}
                    </label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      name="employeeType"
                      value="employee"
                      checked={this.state.employeeType === "employee"}
                      onChange={this.handleInputChange}
                      type="radio"
                      id="customRadioInline2"
                      name="customRadioInline1"
                      class="custom-control-input"
                    />
                    <label
                      class="custom-control-label"
                      for="customRadioInline2"
                    >
                      {loc.employee}
                    </label>
                  </div>
                </div>
                <div class="col-12 d-flex   justify-content-center    ">
                  <button
                    type="submit"
                    className="btn bg-gradient-success text-gray-800"
                    onClick={this.addEmployee}
                  >
                    {loc.save}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <table className='table'>
            <thead>

              <TableFilter
                rows={this.state.employees}
                onFilterUpdate={this._filterUpdated}
              >

                <th key="id" filterkey='id'>{loc.id}</th>
                <th key="name" filterkey='name' showsearch={'true'}>{loc.EmployeeName}</th>
                <th key="phone" filterkey='phone'>{loc.phoneNumber}</th>

              </TableFilter>
            </thead>
            <tbody>
              {tableContent}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
  employees: state.employees.employees
});

// export default compose(withRouter, connect(mapStateToProps, { login, returnErrors, clearErrors })(
//   LoginPage));
export default
  connect(mapStateToProps, { logout, returnErrors, clearErrors, getEmployees })(EmployeesPage)



