import React, { Component } from 'react';
import { Context } from './MainPage'
class EmployeesPage extends Component {
    state = { name: "الإعدادات" }
    static contextType = Context;
    componentWillMount() {
        this.context(this.state.name);
    }
    render() {
        return (
            <div>
                <h1>EmployeesPage</h1>
            </div>
        );
    }
}

export default EmployeesPage;