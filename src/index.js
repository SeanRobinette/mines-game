import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Grid } from './Grid';

let body = (
    <div class="container">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h1 class="panel-title">Mines Game</h1>
            </div>
            <div class="panel-body">
                <Grid width={10} height={10} mines={15}/>
            </div>
        </div>
    </div>
)
ReactDOM.render(body, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
