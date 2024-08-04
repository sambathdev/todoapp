import './chess-app.css';
interface ChessAppProps {}

const ChessApp = ({}: ChessAppProps) => {
  // const board: number[][] = [
  //   [],
  //   []
  // ]
  return (
    <div className=" flex justify-center items-center py-4 bg-red-300 px-2">
      <div className="grid">
        {Array(64)
          .fill(1)
          .map((_, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            return (
              <div
                style={{
                  left: `${col * 100}px`,
                  top: `${row * 100}px`,
                }}
                className={`grid-block ${
                  (row + col) % 2 == 0 ? 'grid-block-even' : 'grid-block-odd'
                }`}
                key={index}
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default ChessApp;
