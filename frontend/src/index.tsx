import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter} from 'react-router-dom';
import {persistor, store} from './app/store';
import {addInterceptors} from './axiosApi';

addInterceptors(store);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
