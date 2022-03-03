import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import { Context } from './MainPage'
import loc from '../localization'

class EmployeesPage extends Component {
    state = { name: loc.employees }
    static contextType = Context;
    componentWillMount() {
        this.context(this.state.name);
    }
    render() {
        return (
            <div className=" p-2">
                <div className='card'>
                    <button class="btn btn-link " type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <div class="text-right h4 text-gray-800">{loc.addEmployee}</div>

                    </button>
                    <div class="collapse" id="collapseExample">
                        <div className="  text-right p-2 mb-3   ">
                            <div class="row  flex-row    ">
                                <div class="col-3 d-flex   justify-content-end align-items-start    ">
                                    <p class="my-auto">{loc.EmployeeName}</p>
                                </div>
                                <div class="col-9  d-flex justify-content-start align-items-start ">
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
                                <div class="col-9  d-flex justify-content-start align-items-start ">
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
                                <div class="col-9  d-flex justify-content-start align-items-start ">
                                    <div class="input-group w-75 ">
                                        <input
                                            type="text"
                                            class="form-control "
                                            aria-label="Amount (to the nearest dollar)"
                                        />
                                    </div>

                                </div>
                                {/* <div class="col-3 d-flex   justify-content-end align-items-start    ">
                                    <p class="my-auto">{loc.nationality}</p>
                                </div> */}
                                <div class="container p-5 bg-gray-200 text-middle h3 shadow rounded m-3">
                                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                        {({ getRootProps, getInputProps }) => (

                                            <section   >
                                                <div  {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>

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