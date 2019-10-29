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
        const grid =  <Grid board={this.state.board}
                        handleLeftClick={(r,c) => this.handleLeftClick(r,c)}
                        handleRightClick={(r,c) => this.handleRightClick(r,c)}/>
        return (
            <div>
                {grid}
                <div class="row"><button>New Game</button></div>
                <div class="row"><label>Width:</label><input type="number"/></div>
                <div class="row"><label>Height:</label><input type="number"/></div>
                <div class="row"><label>Mines:</label><input type="number"/></div>
            </div>
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