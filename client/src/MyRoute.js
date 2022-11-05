import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import App from "./App";
import EditComponent from './components/EditComponent';
import FormComponent from './components/FormComponent';
import LoginComponent from './components/LoginComponent';
import SingleComponent from './components/SingleComponent';
import React, {Fragment} from 'react'; //ใช้เพื่อการ redirect
import AdminRoute from './AdminRoute';


const MyRoute = ()=>{
    return(
        <Router>
            <Fragment>
                <Routes>
                    <Route path='/' element={<App/>}/>
                        <Route exact path='/' element={<AdminRoute/>}>
                            <Route path='/create' element={<FormComponent/>}/>
                            <Route path='/blog/edit/:slug' element={<EditComponent/>}/>
                        </Route>
                    <Route path='/blog/:slug' element={<SingleComponent/>}/>
                    <Route path='/login' element={<LoginComponent/>}/>
                </Routes>
            </Fragment>
        </Router>
    )
}

export default MyRoute