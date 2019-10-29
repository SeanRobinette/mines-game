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
                        handleRightClick={(r,c) => this.handleRightClick(r,c)}/>
        return (
            <div>
                {grid}
                <div class="row"><button onClick={() => this.reset()}>New Game</button></div>
                <div class="row"><label>Width:</label><input type="number"/></div>
                <div class="row"><label>Height:</label><input type="number"/></div>
                <div class="row"><label>Mines:</label><input type="number"/></div>
            </div>
        )
    }
    reset() {
        this.setState({board: new Board(this.props.width, this.props.height, this.props.mines)})
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