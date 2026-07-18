const { useState } = React;

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('Next player: X');

  const calculateWinner = (squares) => {
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
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    const winner = calculateWinner(squaresCopy);
    
    if (winner || squaresCopy[i]) {
      return;
    }

    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);

    const newWinner = calculateWinner(squaresCopy);
    if (newWinner) {
      setStatus(`Winner: ${newWinner}`);
    } else if (squaresCopy.every(square => square !== null)) {
      setStatus('Draw');
    } else {
      setStatus(`Next player: ${xIsNext ? 'O' : 'X'}`);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setStatus('Next player: X');
  };

  const styles = {
    board: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '20px'
    },
    boardRow: {
      display: 'flex'
    },
    square: {
      width: '60px',
      height: '60px',
      border: '2px solid #333',
      background: '#fff',
      fontSize: '24px',
      fontWeight: 'bold',
      cursor: 'pointer',
      margin: '0',
      padding: '0',
      transition: 'background 0.2s'
    },
    squareHover: {
      background: '#e6e6e6'
    },
    status: {
      fontSize: '24px',
      marginBottom: '20px',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    reset: {
      marginTop: '20px',
      padding: '10px 30px',
      fontSize: '18px',
      background: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background 0.3s'
    },
    resetHover: {
      background: '#45a049'
    }
  };

  const renderSquare = (i) => {
    return (
      <button 
        className="square" 
        style={styles.square}
        onClick={() => handleClick(i)}
        onMouseEnter={(e) => e.target.style.background = '#e6e6e6'}
        onMouseLeave={(e) => e.target.style.background = '#fff'}
      >
        {squares[i]}
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', margin: 0, fontFamily: 'Arial, sans-serif', background: '#f0f0f0' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={styles.status}>{status}</div>
        <div style={styles.board}>
          <div style={styles.boardRow}>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div style={styles.boardRow}>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div style={styles.boardRow}>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <button 
          id="reset" 
          style={styles.reset}
          onClick={resetGame}
          onMouseEnter={(e) => e.target.style.background = '#45a049'}
          onMouseLeave={(e) => e.target.style.background = '#4CAF50'}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}