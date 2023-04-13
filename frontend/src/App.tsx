import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home';
import Register from './features/users/Register';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/register' element={<Register/>}/>
            </Route>
        </Routes>
    );
}

export default App;
