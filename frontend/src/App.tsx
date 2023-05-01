import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Dashboard from './containers/Dashboard';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/dashboard/:listName' element={<Dashboard/>}/>
                <Route path='/:managerName/:projectName/:id' element={<Dashboard/>}/>
                <Route path='/:dashboard/:managerName/:projectName/:id' element={<Dashboard/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
            </Route>
        </Routes>
    );
}

export default App;
