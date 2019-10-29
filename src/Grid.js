import React from 'react';
import './Grid.css';
import { Board } from './Board';

export class Square extends React.Component {
    render() {
        const value = this.props.value;
        const showing = this.props.showing;
        if(showing) {
            let content;
            if(typeof(value) === 'number') {
                if(value > 0)
                    content = <img className='tile' src={'assets/' + value + '.png'} />
                else 
                    content = ''
            } else {
                if(value === 'X')
                    content = <img className='tile mine' src={'assets/mine.png'} />
                else
                    content = ''
            }

            return (<td className={'revealed square square-' + value} 
                        onClick={this.props.onClick}
                        onContextMenu={this.props.onContextMenu}>{content}</td>)
        } else {
            let content = ''
            if(this.props.value === 'x')
                content = <img className='tile' src={'assets/flag.png'} />
            return (<td className={'secret square'} 
                        onClick={this.props.onClick}
                        onContextMenu={this.props.onContextMenu}>{content}</td>)
        }
    }
}

export class Grid extends React.Component {
    
    clickedRecently = {button: undefined, r:-1, c:-1};

    constructor(props) {
        super(props);
        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }
    render() {
        const rows = this.props.board.height;
        const cols = this.props.board.width;
        const board = this.props.board;
        console.log(this.props);

        // Loop over rows, then columns, adding <tr> and <td> tags respectively
        const content = Array(rows).fill().map((_, r) => (
            <tr key={r}>
                {Array(cols).fill().map((_, c) => (
                    <Square value={board.getDisplay(r,c)} 
                            showing={board.isShowing(r,c)} 
                            key={c} 
                            onClick={() => this.handleLeftClick(r,c)}
                            onContextMenu={() => this.handleRightClick(r,c)}
                            />
                ))}
            </tr>
        ));
        return (
            <table className="grid">
                <tbody>
                {content}
                </tbody>
            </table>
            )
    }
    handleLeftClick(r,c) {
        this.props.handleLeftClick(r,c)
        if(this.clickedRecently.button === 'right'
          && this.clickedRecently.r === r
          && this.clickedRecently.c === c) {
            clearTimeout(this.clickTimeout);
            this.clickedRecently = {button: undefined,r:-1,c:-1};
            this.clickTimeout = undefined;
            this.handleDoubleClick(r,c);
        } else {
            clearTimeout(this.clickTimeout);
            this.clickedRecently = {button: 'left',r: r,c: c};
            this.clickTimeout = setTimeout(() => {
                this.clickedRecently = {button: undefined,r:-1,c:-1};
            }, 200);
        }
    }
    handleRightClick(r,c){
        this.props.handleRightClick(r,c);
        if(this.clickedRecently.button === 'left'
          && this.clickedRecently.r === r
          && this.clickedRecently.c === c) {
            clearTimeout(this.clickTimeout);
            this.clickedRecently = {button: undefined,r:-1,c:-1};
            this.clickTimeout = undefined;
            this.handleDoubleClick(r,c);
        } else {
            clearTimeout(this.clickTimeout);
            this.clickedRecently = {button: 'right',r: r,c: c};
            this.clickTimeout = setTimeout(() => {
                this.clickedRecently = {button: undefined,r:-1,c:-1};
            }, 200);
        }
    }
    handleDoubleClick(r,c) {
        console.log('double clicked!');
        this.props.handleDoubleClick(r,c);
    }
}