import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home';
import Register from './features/users/Register';
import Login from './features/users/Login';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
            </Route>
        </Routes>
    );
}

export default App;
