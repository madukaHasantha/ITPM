import React from 'react';
import {Switch} from 'react-router-dom';

import AdminRoute from "../_AdminRoute";


import BranchTable from "../../components/TeacherTable";
import AddBranch from "../../components/AddTeacher";
import EditBranch from "../../components/EditTeacher";
import Report from "../../components/Report";


const Routing = () => {
    return (
        <Switch>
          
            <AdminRoute exact path='/'
                        component={BranchTable}/>
            <AdminRoute exact path='/branch'
                        component={BranchTable}/>
            <AdminRoute exact path='/create'
                        component={AddBranch}/>
            <AdminRoute exact path='/edit/:id'
                        component={EditBranch}/>
            <AdminRoute exact path='/Report/'
                        component={Report}/>
        </Switch>
    );
}

export default Routing;