import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// REDUX 
import  { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from 'react-redux';
// for api call through redux
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from 'state/api';


const store = configureStore({
  reducer:{
    global: globalReducer,

    // setting up api from redux , or from state folder
    [api.reducerPath]: api.reducer,
  },
  // setting up api from redux , or from state folder
  middleware: (getDefault) => getDefault().concat(api.middleware)
});

// setting up api from redux , or from state folder
setupListeners(store.dispatch)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>
);

