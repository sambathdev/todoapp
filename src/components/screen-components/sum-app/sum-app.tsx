import { useEffect, useState } from 'react';
import './sum-app.css';

interface SumAppProps {}

const SumApp = ({}: SumAppProps) => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  function paddArray(n: number, arr: any[], side = 'left'): any[] {
    const chunkArray = new Array(n - arr.length).fill(0);
    if (side == 'left') return [...chunkArray, ...arr];
    if (side == 'right') return [...arr, ...chunkArray];
    return [];
  }

  const findRandomAvailableSlot = (bOard: number[][]) => {
    const availablePositions: number[][] = [];
    bOard.forEach((row, rowInd) => {
      row.forEach((col, colInd) => {
        if (col == 0) {
          availablePositions.push([rowInd, colInd]);
        }
      });
    });
    return availablePositions[0];
  };

  const shiftRight = (bOard: number[][]) => {
    return bOard.map((row) => {
      const newArray = paddArray(
        4,
        row.filter((n) => n),
        'left'
      );
      return newArray;
    });
  };

  const shiftLeft = (bOard: number[][]) => {
    return bOard.map((row) => {
      const newArray = paddArray(
        4,
        row.filter((n) => n),
        'right'
      );
      return newArray;
    });
  };

  const rotateRight = (arr: number[][]) => {
    const result = [];
    for (let i = 0; i < arr[0].length; i++) {
      const row = [];
      for (let j = 0; j < arr.length; j++) {
        row.push(arr[j][i]);
      }
      result.push(row);
    }
    return result;
  };

  const shiftDown = (bOard: number[][]) => {
    const rotatedRight = rotateRight(rotateRight(rotateRight(bOard)));
    const rotatedRightShifted = rotatedRight.map((row) => {
      const newArray = paddArray(
        4,
        row.filter((n) => n),
        'left'
      );
      return newArray;
    });
    const toReturn = rotateRight(rotatedRightShifted);
    return toReturn;
  };
  const shiftUp = (bOard: number[][]) => {
    const rotatedRight = rotateRight(bOard);
    const rotatedRightShifted = rotatedRight.map((row) => {
      const newArray = paddArray(
        4,
        row.filter((n) => n),
        'right'
      );
      return newArray;
    });
    const toReturn = rotateRight(rotateRight(rotateRight(rotatedRightShifted)));
    return toReturn;
  };

  // const addAfterShifted = (bOard: number[][]) => {
    
  // }

  const rightKeyPress = () => {
    setBoard((prev) => {
      const shiftedRight = shiftRight(prev);

      return shiftedRight;
    });
  };

  const leftKeyPress = () => {
    setBoard((prev) => {
      const shiftedRight = shiftLeft(prev);
      return shiftedRight;
    });
  };
  const upKeyPress = () => {
    setBoard((prev) => {
      const shiftedRight = shiftUp(prev);
      return shiftedRight;
    });
  };
  const downKeyPress = () => {
    setBoard((prev) => {
      const shiftedRight = shiftDown(prev);
      return shiftedRight;
    });
  };

  const addRandomNumberToTheBoard = () => {
    const randNum = Math.round(Math.random()) ? 2 : 4;
    setBoard((prev) => {
      const addToPosition = findRandomAvailableSlot(prev);
      return prev.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex == addToPosition[1] && rowIndex == addToPosition[0]) {
            return randNum;
          }
          return col;
        })
      );
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      switch (event.key) {
        case 'ArrowUp':
          upKeyPress();
          break;
        case 'ArrowDown':
          downKeyPress();
          break;
        case 'ArrowLeft':
          leftKeyPress();
          break;
        case 'ArrowRight':
          rightKeyPress();
          break;
        default:
          addRandomNumberToTheBoard();
          // add new random number to the board
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="sum flex flex-col justify-center items-center w-screen">
      <h1 className="text-center" onClick={() => addRandomNumberToTheBoard()}>
        2048
      </h1>

      <div className="grid">
        {Array(16)
          .fill(1)
          .map((_, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            return (
              <div
                style={{
                  left: `${col * 200}px`,
                  top: `${row * 200}px`,
                }}
                className={`grid-block ${
                  (row + col) % 2 == 0 ? 'grid-block-even' : 'grid-block-odd'
                }`}
                key={index}
              ></div>
            );
          })}
        {board.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            return (
              <div
                style={{
                  left: `${colIndex * 200}px`,
                  top: `${rowIndex * 200}px`,
                }}
                className={`grid-block flex justify-center items-center text-2xl`}
                key={`${rowIndex}${colIndex}`}
              >
                {col}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default SumApp;
