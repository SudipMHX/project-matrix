"use client";
import { useState } from "react";
import MatrixInput from "./MatrixInput";
import ResultMatrix from "./ResultMatrix";
import Swal from "sweetalert2";

export default function MatrixForm() {
  const [dims, setDims] = useState({ r1: "", c1: "", r2: "", c2: "" });
  const [matrix1, setMatrix1] = useState([]);
  const [matrix2, setMatrix2] = useState([]);
  const [result, setResult] = useState([]);

  const handleDimsChange = (e) => {
    const { name, value } = e.target;
    setDims({ ...dims, [name]: value });
  };

  const generateMatrices = () => {
    const r1 = parseInt(dims.r1);
    const c1 = parseInt(dims.c1);
    const r2 = parseInt(dims.r2);
    const c2 = parseInt(dims.c2);

    // Validate inputs
    // if ([r1, c1, r2, c2].some((val) => isNaN(val) || val <= 0)) {
    //   alert("Please enter valid positive integers for all dimensions.");
    //   return;
    // }

    const m1 = Array.from({ length: r1 }, () => Array(c1).fill(0));
    const m2 = Array.from({ length: r2 }, () => Array(c2).fill(0));
    setMatrix1(m1);
    setMatrix2(m2);
    setResult([]);
  };

  const handleMatrixChange = (matrixSetter, matrix, i, j, value) => {
    const updated = matrix.map((row, ri) =>
      row.map((val, ci) =>
        ri === i && ci === j ? parseFloat(value) || 0 : val
      )
    );
    matrixSetter(updated);
  };

  const multiplyMatrices = () => {
    const r1 = matrix1.length;
    const c1 = matrix1[0]?.length || 0;
    const r2 = matrix2.length;
    const c2 = matrix2[0]?.length || 0;

    if (c1 !== r2) {
      Swal.fire({
        title: "Matrix multiplication not possible",
        text: "Columns of A must equal Rows of B",
        icon: "error",
      });
      return;
    }

    const res = Array.from({ length: r1 }, () => Array(c2).fill(0));

    for (let i = 0; i < r1; i++) {
      for (let j = 0; j < c2; j++) {
        for (let k = 0; k < c1; k++) {
          res[i][j] += matrix1[i][k] * matrix2[k][j];
        }
      }
    }

    setResult(res);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className='text-2xl font-semibold text-blue-600 py-10'>
        Matrix Multiplication
      </h1>
      <div className='flex justify-center gap-5' style={{ marginBottom: 10 }}>
        <div className='space-y-2'>
          <h4>Matrix A Dimensions</h4>
          <input
            className='p-1 bg-white focus-within:bg-green-300 block px-4 rounded-lg outline-none'
            name='r1'
            type='number'
            placeholder='Rows'
            value={dims.r1}
            onChange={handleDimsChange}
          />
          <input
            className='p-1 bg-white focus-within:bg-green-300 block px-4 rounded-lg outline-none'
            name='c1'
            placeholder='Columns'
            type='number'
            value={dims.c1}
            onChange={handleDimsChange}
          />
        </div>
        <div className='space-y-2'>
          <h4>Matrix B Dimensions</h4>
          <input
            className='p-1 bg-white focus-within:bg-green-300 block px-4 rounded-lg outline-none'
            name='r2'
            type='number'
            placeholder='Rows'
            value={dims.r2}
            onChange={handleDimsChange}
          />
          <input
            className='p-1 bg-white focus-within:bg-green-300 block px-4 rounded-lg outline-none'
            name='c2'
            type='number'
            placeholder='Columns'
            value={dims.c2}
            onChange={handleDimsChange}
          />
        </div>
      </div>
      <button
        className='bg-green-600 hover:bg-green-700 my-5 text-white px-3 py-2 rounded-lg cursor-pointer'
        onClick={generateMatrices}>
        Enter Matrices
      </button>

      {matrix1.length > 0 && (
        <div className=''>
          <div style={{ marginTop: 20 }}>
            <h3 className='text-lg mb-3 font-semibold'>Matrix A</h3>
            <MatrixInput
              matrix={matrix1}
              setMatrix={(i, j, val) =>
                handleMatrixChange(setMatrix1, matrix1, i, j, val)
              }
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <h3 className='text-lg mb-3 font-semibold'>Matrix B</h3>
            <MatrixInput
              matrix={matrix2}
              setMatrix={(i, j, val) =>
                handleMatrixChange(setMatrix2, matrix2, i, j, val)
              }
            />
          </div>
        </div>
      )}

      <div>
        <button
          className='bg-fuchsia-600 hover:bg-fuchsia-700 my-5 text-white px-3 py-2 rounded-lg cursor-pointer'
          onClick={multiplyMatrices}>
          Multiply
        </button>

        {result.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <ResultMatrix result={result} />
          </div>
        )}
      </div>
    </div>
  );
}
