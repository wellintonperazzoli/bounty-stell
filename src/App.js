import React, { useState } from 'react';
import useController from './hooks/useController';

import './App.css';
import Challenge1 from './Challenge1';
import Challenge2 from './Challenge2';
import Challenge3 from './Challenge3';
import GameOver from './GameOver';



const cells = 15;
const fieldSize = cells * cells;
const cellSize = 100 / cells;

const GameChallenge = {
  0: {
    position: 0,
    jsx: () => {
      return (
        <h1>Game Over</h1>
      )
    }
  },
  1: {
    position: Math.floor(Math.random() * fieldSize),
    jsx: Challenge1,
  },
  2: {
    position: Math.floor(Math.random() * fieldSize),
    jsx: Challenge2,
  },
  3: {
    position: Math.floor(Math.random() * fieldSize),
    jsx: Challenge3,
  }
}





const App = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  // const [playerPosition, setPlayerPosition] = useState(GameChallenge[1].position);
  const [currentChallenge, setCurrentChallenge] = useState(1);
  const [holdGame, setHoldGame] = useState(false);



  const nextChallenge = () => {
    setCurrentChallenge((prev) => {
      if (GameChallenge[prev + 1] === undefined) {
        return 0;
      }
      return prev + 1;
    });
  }

  const setPosition = (position, inc = false) => {
    if (holdGame) {
      return;
    }

    setPlayerPosition((prev) => {
      const next = inc ? prev + position : position;
      if (next < 0 || next >= fieldSize) {
        return prev;
      }

      if (GameChallenge[currentChallenge].position === next) setHoldGame(true);

      return next;
    });

  }

  const continueGame = () => {
    setHoldGame(false);
    nextChallenge();
  }

  const movePlayer = (count) => {
    setPosition(count, true);
  }



  const actions = {
    ArrowLeft: () => movePlayer(-1),
    ArrowRight: () => movePlayer(1),
    ArrowUp: () => movePlayer(cells * -1),
    ArrowDown: () => movePlayer(cells)
  };

  const gameActions = (key) => {
    if (actions[key]) {
      actions[key]();
    }
  }

  const [swipeHandlers] = useController({ actions: gameActions });

  if (currentChallenge === 0) {
    return (
      <GameOver />
    );
  }


  if (GameChallenge[currentChallenge].position === playerPosition) {
    const CustomElement = GameChallenge[currentChallenge].jsx;
    const options = {
      continueGame: continueGame,
    }
    return (<div className="game" {...swipeHandlers}>
      <div className="game-board">
        <CustomElement {...options} />
      </div>
    </div>);
  }


  return (
    <div className="game" {...swipeHandlers}>
      <div className="game-board">
        {Array.from({ length: fieldSize }).map((_, i) => (
          <Field key={i} active={playerPosition === i} onClick={() => setPosition(i)} cellSize={cellSize}>
            {/* {i === GameChallenge[currentChallenge].position ? "🎯" : i === playerPosition ? "👾" : ""} */}
            {i === playerPosition ? "👾" : i+1}
          </Field>
        ))}
      </div>
    </div>
  );
}

const Field = (props) => {
  const classes = ["game-field",
    // props.active ? "active" : ""
  ];

  const style = {
    width: `${props.cellSize}%`,
    height: `${props.cellSize}%`
  }

  return (
    <div className={classes.join(" ")} style={style} onClick={props.onClick}>
      <div className='content'>
        {props.children}
      </div>
    </div>
  )
}

export default App;
