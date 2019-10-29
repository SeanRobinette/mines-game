import React from 'react'
import { Board } from './Board'
import { Grid } from './Grid'

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: new Board(props.width, props.height, props.mines)
        };
    }
    render() {
        const board = this.state.board;
        const grid =  <Grid board={board}
                        handleLeftClick={(r,c) => this.handleLeftClick(r,c)}
                        handleRightClick={(r,c) => this.handleRightClick(r,c)}
                        handleDoubleClick={(r,c) => this.handleDoubleClick(r,c)}/>
        let statusMessage;
        if(board.state === 'lost') {
            statusMessage = <div>You lost.</div>
        } else if(board.state === 'won') {
            statusMessage = <div>You won!</div>
        } else {
            statusMessage = <div>Click on tiles to reveal them.</div>
        }
        return (
            <div>
                {grid}
                {statusMessage}
                <div className="row"><button onClick={() => this.reset()}>New Game</button></div>
                <div className="row"><label>Width:</label><input type="number"/></div>
                <div className="row"><label>Height:</label><input type="number"/></div>
                <div className="row"><label>Mines:</label><input type="number"/></div>
            </div>
        )
    }
    reset() {
        this.setState({board: new Board(this.props.width, this.props.height, this.props.mines)})
    }
    handleDoubleClick(r, c) {
        let board = this.state.board;
        if(!(board.state === 'active')) {
            return;
        }
        board.revealAdjacent(r, c);
        this.setState(board);
    }
    handleLeftClick(r, c) {
        let board = this.state.board;
        if(!(board.state === 'active')) {
            return;
        }
        board.reveal(r, c);
        this.setState({board: board});
    }
    handleRightClick(r, c){
        let board = this.state.board;
        if(!(board.state === 'active')) {
            return;
        }
        board.mark(r, c);
        this.setState({board: board});
    }
}