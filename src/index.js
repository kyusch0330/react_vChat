// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';


// ReactDOM.render(
//   <React.StrictMode>
//     <App /> 
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  console.log(props.cond);
  return (
    <button
     className={"square"+ (props.cond ? " cond":"")}
     onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    let isCond = false;
    if (this.props.cond) {
      this.props.cond.forEach((c) => {
        if(c === i) {isCond = true;} 
      })
    }

    return (
      <Square 
        cond = {isCond} 
        key = {'square'+i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} // square 클릭시 해당하는 i 인덱스에 X/O 저장
      />
    );
  }

  render() {
    let boardRows = [];
    for (let i = 0; i < 3; i++){ 
      let boardRow = [];
      for (let j = 0; j < 3; j++){
        boardRow.push(this.renderSquare(i*3+j));
      }
      boardRows.push(
        <div className="board-row" key={'boardRow'+i}>
          {boardRow}
        </div>
      );
    }
    return (
      <div>
        {boardRows}
        {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    );
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        pos: {r: null, c:null},
      }],
      stepNumber: 0, //jumpTo를 위함
      xIsNext: true,
      inASC: true,
    };
  }

  handleClick(i) {
    //시간 이동후 빈칸 클릭 시 해당 시간으로 보드를 돌려놓기 위해 slice 사용 (이후 시간대는 잊혀짐)
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    //승자가 있거나, 이미 채워진 칸이 클릭된 경우 무시
    if (calculateWinner(squares) || squares[i]) { 
      return;
    }
    squares[i] = this.state.xIsNext? 'X' : 'O';
    this.setState({
      //현재 squares를 가지는 객체 배열(길이 1)을 history 배열에 붙여준다.
      //push()와 달리 concat() 함수는 기존 배열을 변경하지 않기 때문에 권장
      history: history.concat([{
        squares: squares, 
        pos: {r: Math.floor(i/3), c:i%3},
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    //시간 이동 시 stepNumber가 변하므로 해당하는 히스토리를 current로 지정
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);
    const winner = result? result.winner : null;
    const cond = result? result.cond : null; //승리시 일자가 된 칸 배열

    //map()을 이용해 history를 button 엘리먼트 리스트로 저장
    const moves = history.map((step, move) => { //step:value, move:index
      // move(몇번째 수)가 0보다 클 경우와 0일 때 구분해서 출력
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      const id = (this.state.stepNumber === move) ? 'selectedHist' : 'hist'+move //선택된 버튼 css 적용 위해

      return (
        // move를 key로 지정
        <li key={move} > 
          <button id={id} onClick={(e) => {this.jumpTo(move)}}>
             {desc}  
             {(move !== 0) ? ((move % 2 === 0) ? ' O ' : ' X ') : null}
             {(move !== 0) ? `(${step.pos.r} , ${step.pos.c})` : null}
          </button>
        </li>
      );
    });

    let status;
    console.log(moves);
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else if(this.state.stepNumber > 8) {
      status = "Draw";
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // 히스토리 정렬 방식
    const inASC = this.state.inASC;

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares} // history에서 현재의 square를 전달해서 표시한다.
            onClick={(i) => this.handleClick(i)}
            cond = {cond ? cond : null}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <br/>
          <button onClick={()=> this.setState({inASC: !this.state.inASC})}>
             {inASC ? 'ASC':'DESC'}
          </button>
          <ol>{inASC ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


// 승리한 플레이어를 반환, 없으면 null 반환
function calculateWinner(squares) { 
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], cond: [a, b, c]};
    }
  }
  return null;
}