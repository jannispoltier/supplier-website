"use client";

import { ChangeEvent, useState } from "react";

export default function Home() {
  const [id, setId] = useState("");
  const [result, setResult] = useState("");
  const [price, setPrice] = useState(0);

  function isPerfectSquare(num: number) {
    const sqrt = Math.sqrt(num);
    return sqrt === Math.floor(sqrt);
  }

  function isFibonacci(number: number) {
    if (number < 0) return false;
    const test1 = 5 * number * number + 4;
    const test2 = 5 * number * number - 4;

    return isPerfectSquare(test1) || isPerfectSquare(test2);
  }

  function extractAndCheckFibonacci(inputString: string) {
    // Check if the number is part of the Fibonacci sequence
    const isFib = isFibonacci(extractNumber(inputString));

    return isFib;
  }

  function extractNumber(inputString: string) {
    const match = inputString.match(/(\d+)$/);

    if (!match) {
      throw new Error("No numbers found in the input string");
    }

    // Convert the matched number string to an integer and remove leading zeros
    return parseInt(match[1], 10);
  }

  const handleExport = () => {
    // Create CSV content
    const csvHeader = "OrderNr,Result,Price\n"; // Column headers
    const csvRow = `${id},${result},${price}\n`; // Row data
    const csvContent = csvHeader + csvRow;

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv"); // File name
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  function generateNumber(inputNumber: number) {
    if (inputNumber < 0 || inputNumber > 999) {
      throw new Error(
        "Input number must be a 3-digit number between 0 and 999."
      );
    }

    // Normalize the input number (0 to 1)
    const normalizedValue = inputNumber / 999;

    // Scale to the range 50.00 to 60.00
    const output = 50.0 + normalizedValue * (60.0 - 50.0);

    // Round to two decimal places
    return parseFloat(output.toFixed(2));
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-blue-200">
      <div className="flex flex-col justify-center items-center mb-12">
        <h2 className="text-3xl font-bold text-blue-900">MyLab</h2>
        <h3 className="text-blue-900">Sample result checker</h3>
      </div>
      <div className="flex gap-2">
        <input
          className="bg-white min-w-[240px] p-3"
          id={"id"}
          type="text"
          value={id}
          placeholder="Ex.: ORD-LAB-20250101-001"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
        />
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white p-3 disabled:bg-gray-400"
          id={"checkID"}
          disabled={id.length != 20}
          onClick={() => {
            setResult(extractAndCheckFibonacci(id) ? "Negative" : "Positive");
            setPrice(generateNumber(extractNumber(id)));
          }}
        >
          Show result
        </button>
      </div>
      {result != "" ? (
        <div>
          <div className="grid grid-cols-2 gap-2 mt-12 text-blue-900">
            <div>Result:</div>
            <div className="font-semibold" id="result">
              {result}
            </div>

            <div>Price:</div>
            <div className="font-semibold" id="price">
              {price}€
            </div>
          </div>
          <button
            onClick={handleExport}
            id={"download"}
            className="hover:bg-blue-700 border-2 border-blue-700 text-blue-700 hover:text-white p-3 mt-8"
          >
            Download data
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
