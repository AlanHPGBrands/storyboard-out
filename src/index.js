import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";

if (process.env.NODE_ENV === 'production') {
    console.log = () => {}
    console.debug = () => {}
};

Amplify.configure({...awsExports});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode> ,
    document.getElementById( 'root' )
);
