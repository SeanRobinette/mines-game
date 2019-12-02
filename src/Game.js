import React from 'react'
import { Board } from './Board'
import { Grid } from './Grid'

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: new Board(10, 10, 15),
            newWidth: 10,
            newHeight: 10,
            newMines: 15
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
        const newWidth = this.state.newWidth;
        const newHeight = this.state.newHeight;
        const newMines = this.state.newMines;

        return (
            <div>
                {grid}
                {statusMessage}
                <table>
                    <tbody>
                        <tr>
                            <td><label>Width:</label></td>
                            <td><input type="number" value={newWidth} name="newWidth" onChange={this.handleFormChange}/></td>
                        </tr>
                        <tr>
                            <td><label>Height:</label></td>
                            <td><input type="number" value={newHeight} name="newHeight" onChange={this.handleFormChange}/></td>
                        </tr>
                        <tr>
                            <td><label>Mines:</label></td>
                            <td><input type="number" value={newMines} name="newMines" onChange={this.handleFormChange}/></td>
                        </tr>
                    </tbody>
                </table>
                <div className="row"><button onClick={() => this.reset()}>New Game</button></div>
            </div>
        )
    }
    reset() {
        this.setState({board: new Board(this.state.newWidth, this.state.newHeight, this.state.newMines)})
    }
    handleFormChange = (e) => {
        let value = e.target.value;
        if(typeof value === 'string') {
            value = parseInt(value);
        }
        this.setState({
            [e.target.name]: value
        });
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