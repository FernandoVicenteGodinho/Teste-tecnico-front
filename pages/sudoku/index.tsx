import CustomButton from '@/components/Gobal/CustomButton';
import { generateAIResponse } from '@/services/api';
import React, { useState } from 'react';

const Sudoku = () => {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill('')));
  const [isLoading, setIsLoading] = useState(false);
  const [resolvido, setResolvido] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const [type, setType] = useState<'Iniciante' | "Intermediário" | "Difícil" | "Especialista" | ''>('');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [start, setStart] = useState(false);
  const [outputText, setOutputText] = useState('');

  const handleGenerate = async (text: 'Iniciante' | "Intermediário" | "Difícil" | "Especialista") => {
    try {
      setIsLoading(true);
      setType(text);
      const inputText = `Gere um sudoku do nivel ${text}`;

      const response = await generateAIResponse(inputText);

      const { resolvido, jogo } = extractGrids(response.response);
      setResolvido(resolvido);
      setGrid(jogo);
      setOutputText(response);
    } catch (error) {
      setOutputText('Error generating response.');
    } finally {
      setStart(true);
      setIsLoading(false);
    }
  };
  const extractGrids = (apiResponse) => {
    const jsonString = apiResponse.replace(/```json|```/g, '').trim();
    const parsedData = JSON.parse(jsonString);
    return {
      resolvido: parsedData.resolvido,
      jogo: parsedData.jogo,
    };
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    const number = grid[row][col];
    if (number !== '') {
      setSelectedNumber(number);
    } else {
      setSelectedNumber(null);
    }
  };

  const handleReset = () => {
    setGrid(Array(9).fill(Array(9).fill('')));
    setErrorCount(0);
    setStart(false);
    setType('');
  };

  const handleNumberClick = (num: number | '') => {
    if (selectedCell) {
      const { row, col } = selectedCell;

      // Atualiza o grid com o número inserido
      const newGrid = grid.map((rowArray, rowIndex) =>
        rowArray.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? num.toString() : cell
        )
      );

      // Verifica se o número inserido está correto
      if (num !== '' && num.toString() !== resolvido[row][col]) {
        setErrorCount((prev) => prev + 1); // Incrementa o contador de erros
      }

      setGrid(newGrid);
      setSelectedNumber(num.toString());
    }
  };

  const fillGrid = (inputGrid: string[][]) => {
    setGrid(inputGrid);
  };

  const getGrid = () => {
    return grid;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="pt-5">
        <h2 className="text-center my-5 text-2xl md:text-5xl font-bold">Sudoku</h2>
        <p className="text-center text-white brightness-50 my-5 text-mb md:text-lg">Utilize a inteligência artificial para jogar</p>
      </div>
      {start && (
        <>
          <div className="text-center mt-5">
            <p className="text-red-500 font-bold">Erros: {errorCount}</p>
          </div>
          <div className="grid grid-cols-9 gap-1">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`border w-10 h-10 flex items-center justify-center cursor-pointer ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-2' : ''
                    } ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-2' : ''}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    backgroundColor:
                      selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                        ? 'lightblue'
                        : '',
                    color:
                      grid[rowIndex][colIndex] !== '' &&
                        grid[rowIndex][colIndex] !== resolvido[rowIndex][colIndex]
                        ? 'red'
                        : '',
                  }}
                >
                  {cell}
                </div>
              )),
            )}
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2 justify-center mt-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, ''].map((num, index) => (
              <button
                key={index}
                className="border border-gray-400 w-10 h-10 flex items-center justify-center"
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex flex-row justify-center items-center gap-5 mt-5">
            <CustomButton onClick={handleReset} ButtonType="btn-danger" isSave={isLoading} disabled={isLoading}>
              Reiniciar
            </CustomButton>
            <CustomButton onClick={() => fillGrid(resolvido)} ButtonType="btn-primary" isSave={isLoading} disabled={isLoading}>
              Resolver
            </CustomButton>
          </div>
        </>
      )}
      {!start && (
        <div className="flex flex-row justify-center items-center gap-5">
          <CustomButton onClick={() => handleGenerate('Iniciante')} ButtonType="btn-primary" isSave={type === "Iniciante"} disabled={isLoading}>
            Iniciante
          </CustomButton>

          <CustomButton onClick={() => handleGenerate('Intermediário')} ButtonType="btn-secondary" isSave={type === "Intermediário"} disabled={isLoading}>
            Intermediário
          </CustomButton>

          <CustomButton onClick={() => handleGenerate('Difícil')} ButtonType="btn-outline-primary" isSave={type === "Difícil"} disabled={isLoading}>
            Difícil
          </CustomButton>

          <CustomButton onClick={() => handleGenerate('Especialista')} ButtonType="btn-outline-secondary" isSave={type === "Especialista"} disabled={isLoading}>
            Especialista
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default Sudoku;
