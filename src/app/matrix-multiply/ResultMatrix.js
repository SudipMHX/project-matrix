export default function ResultMatrix({ result }) {
  return (
    <div className='space-y-2'>
      <h2 style={{ color: "#15803d" }}>Result Matrix</h2>
      {result.map((row, i) => (
        <div className='space-x-2' key={i}>
          {row.map((val, j) => (
            <input
              className='bg-fuchsia-500 text-white font-semibold outline-none focus-within:bg-green-300 p-1 px-4 rounded-lg w-20'
              key={j}
              type='number'
              value={val}
              disabled
            />
          ))}
        </div>
      ))}
    </div>
  );
}
