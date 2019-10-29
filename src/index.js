import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Game } from './Game';

let body = (
    <div className="container">
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h1 className="panel-title">Mines Game</h1>
            </div>
            <div className="panel-body">
                <Game width={10} height={10} mines={5}/>
            </div>
        </div>
    </div>
)
ReactDOM.render(body, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
