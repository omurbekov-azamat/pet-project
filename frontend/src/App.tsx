import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home';
import Register from './features/users/components/Register';
import Login from './features/users/components/Login';
import Dashboard from './containers/Dashboard';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';
import {selectUser} from './features/users/usersSlice';
import {useAppSelector} from './app/hooks';

function App() {
    const user = useAppSelector(selectUser)
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={
                    <ProtectedRoute isAllowed={user && Boolean(user)}>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>
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
