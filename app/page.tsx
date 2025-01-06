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
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#b7dbeb]">
      <h2>MyLab</h2>
      <h3>Sample result checker</h3>
      <div>
        <input
          id={"id"}
          type="text"
          value={id}
          placeholder="Ex.: ORD-LAB-20250101-001"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
        />
        <button
          id={"checkID"}
          onClick={() => {
            setResult(extractAndCheckFibonacci(id) ? "Negative" : "Positive");
            setPrice(generateNumber(extractNumber(id)));
          }}
        >
          Show result
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>Result</div>
        <div>Price</div>

        <div id="result">{result}</div>
        <div id="price">{price}€</div>
      </div>
      <button onClick={handleExport} id={"download"}>
        Download data
      </button>
    </div>
  );
}
