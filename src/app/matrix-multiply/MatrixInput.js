export default function MatrixInput({ matrix, setMatrix }) {
  return (
    <div className='flex flex-col items-center gap-2 overflow-x-auto'>
      {matrix.map((row, i) => (
        <div className='flex gap-2 mb-1' key={i}>
          {row.map((val, j) => (
            <input
              className='bg-white outline-none focus-within:bg-green-300 p-1 px-4 rounded-lg w-20'
              key={j}
              type='number'
              value={val}
              onChange={(e) => setMatrix(i, j, e.target.value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
