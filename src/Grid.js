import React from 'react';
import './Grid.css';
import { Board } from './Board';

export class Square extends React.Component {
    render() {
        const value = this.props.value;
        const showing = this.props.showing;
        if(showing) {
            return (<td className={'revealed square square-' + value} 
                        onClick={this.props.onClick}
                        onContextMenu={this.props.onContextMenu}>{this.props.value}</td>)
        } else {
            return (<td className={'secret square'} 
                        onClick={this.props.onClick}
                        onContextMenu={this.props.onContextMenu}>{this.props.value === '?' ? '' : this.props.value}</td>)
        }
    }
}

export class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
        this.state = {
            board: new Board(props.width, props.height, props.mines)
        };
    }
    render() {
        const rows = this.props.height;
        const cols = this.props.width;
        const mines = this.props.mines;
        const board = this.state.board;

        // Loop over rows, then columns, adding <tr> and <td> tags respectively
        const content = Array(rows).fill().map((_, r) => (
            <tr key={r}>
                {Array(cols).fill().map((_, c) => (
                    <Square value={board.getDisplay(r,c)} 
                            showing={board.isShowing(r,c)} 
                            key={c} 
                            onClick={() => this.handleLeftClick(r,c)}
                            onContextMenu={() => this.handleRightClick(r,c)}/>
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
        let board = this.state.board;
        board.reveal(r, c);
        this.setState({board: board});
    }
    handleRightClick(r,c){
        let board = this.state.board;
        board.mark(r, c);
        this.setState({board: board});
    }
}