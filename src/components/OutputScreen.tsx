import { useFileStore } from "../store/store";
import OutputDataHeader from "./output-data/OutputDataHeader";

const OutputScreen = () => {
  const { output, inputFile } = useFileStore();

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col items-center p-4 md:p-10 w-full font-mono'>
      <h1 className='text-sm font-bold text-blue-600 mb-2 self-start md:self-center'>[ SYSTEM STATUS: READY ]</h1>
      
      <div className="w-full max-w-5xl bg-white shadow-lg border border-gray-300 p-4 md:p-8 rounded-sm">
        
        {/* 1. Header Section */}
        <OutputDataHeader />

        {/* 2. File Metadata */}
        <div className="mb-8 text-sm text-gray-800 leading-relaxed">
          <p>INPUT FILE: <span className="font-bold">{inputFile.filename}</span></p>
          <p>TOTAL LINES: {output.totalLines}</p>
          <p>LINES WITH CODE: {output.codeLines}</p>
          <p>TOTAL TOKENS: {output.tokenCount}</p>
        </div>

        <div className="w-full overflow-hidden whitespace-nowrap mb-2">
          {"=".repeat(150)}
        </div>
        <h2 className="font-bold mb-2 uppercase">1. TOKEN TYPE SUMMARY</h2>
        <div className="w-full overflow-hidden whitespace-nowrap mb-4">
          {"=".repeat(150)}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left text-sm border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-dashed border-gray-300">
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">| Token Type</th>
                <th className="py-2 pr-4">| Qty</th>
                <th className="py-2 pr-4">| %</th>
                <th className="py-2">| Lines</th>
              </tr>
            </thead>
            <tbody>
              {output.categoryData?.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-1 pr-4">{row.category}</td>
                  <td className="py-1 pr-4 text-blue-700">| {row.token_type}</td>
                  <td className="py-1 pr-4">| {row.quantity}</td>
                  <td className="py-1 pr-4">| {row.percentage}</td>
                  <td className="py-1 text-xs text-gray-500">| {row.line.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full overflow-hidden whitespace-nowrap mb-2 mt-10">
          {"=".repeat(150)}
        </div>
        <h2 className="font-bold mb-2 uppercase">IDENTIFIER STATISTICS</h2>
        <div className="w-full overflow-hidden whitespace-nowrap mb-4">
          {"=".repeat(150)}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left text-sm border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-dashed border-gray-300">
                <th className="py-2 pr-4">Identifiers</th>
                <th className="py-2 pr-4">| Frequency</th>
                <th className="py-2 pr-4">| Lines</th>
              </tr>
            </thead>
            <tbody>
              {output.identifierData?.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-1 pr-4">{row.identifier}</td>
                  <td className="py-1 pr-4 text-blue-700">| {row.frequency}</td>
                  <td className="py-1 pr-4">| {row.lines.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full overflow-hidden whitespace-nowrap mb-2 mt-10">
          {"=".repeat(150)}
        </div>
        <h2 className="font-bold mb-2 uppercase">LITERAL STATISTICS</h2>
        <div className="w-full overflow-hidden whitespace-nowrap mb-4">
          {"=".repeat(150)}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left text-sm border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-dashed border-gray-300">
                <th className="py-2 pr-4">Literals</th>
                <th className="py-2 pr-4">| Type</th>
                <th className="py-2 pr-4">| Frequency</th>
                <th className="py-2 pr-4">| Lines</th>
              </tr>
            </thead>
            <tbody>
              {output.literalsData?.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-1 pr-4">{row.literal}</td>
                  <td className="py-1 pr-4 text-blue-700">| {row.type}</td>
                  <td className="py-1 pr-4">| {row.frequency}</td>
                  <td className="py-1 pr-4">| {row.lines.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full overflow-hidden whitespace-nowrap mb-2 mt-10">
          {"=".repeat(150)}
        </div>
        <div className="w-full overflow-hidden whitespace-nowrap mb-2">
          {"=".repeat(150)}
        </div>
        <h2 className="font-bold mb-2 uppercase">TOKEN SUMMARY STATISTICS</h2>
        <div className="w-full overflow-hidden whitespace-nowrap mb-4">
          {"=".repeat(150)}
        </div>

        <div className="mb-8 text-sm text-gray-800 leading-relaxed">
          <p>TOTAL TOKENS: <span className="font-bold">{output.tokenCount}</span></p>
          <p>UNIQUE TOTAL TOKENS: <span className="font-bold">{output.totalTokensTypes}</span></p>
          <p>TOTAL LINES WITH CODE: {output.codeLines}</p>
          <p>EMPTY/IGNORE LINES: {output.totalLines - output.codeLines}</p>
        </div>

        <div className="mb-8 text-sm text-gray-800 leading-relaxed">
          <p>MOST FREQUENT TOKEN: <span className="font-bold">{output.mostFrequentToken.type}</span> ({output.mostFrequentToken.count} occurrences, {((output.mostFrequentToken.count / output.tokenCount) * 100).toFixed(2)}%)</p>
          <p>LEAST FREQUENT TOKEN: <span className="font-bold">{output.leastFrequentToken.type}</span> ({output.leastFrequentToken.count} occurrences, {((output.leastFrequentToken.count / output.tokenCount) * 100).toFixed(2)}%)</p>
        </div>
        <div className="mb-8 text-sm text-gray-800 leading-relaxed">
          <p>AVERAGE TOKEN PER LINE: <span className="font-bold">{output.averageTokensPerLine.toFixed(2)}</span></p>
          <p>MAXIMUM TOKEN IN A SINGLE LINE: <span className="font-bold">{output.mostFrequentTokenInSingleLine.count} (Line {output.mostFrequentTokenInSingleLine.line})</span></p>
          <p>MINIMUM TOKEN IN A SINGLE LINE: <span className="font-bold">{output.leastFrequentTokenInSingleLine.count} (Line {output.leastFrequentTokenInSingleLine.line})</span></p>
        </div>

        <div className="w-full overflow-hidden whitespace-nowrap mb-2 mt-10">
          {"=".repeat(150)}
        </div>
        <div className="w-full overflow-hidden whitespace-nowrap mb-2">
          {"=".repeat(150)}
        </div>
        <h2 className="font-bold mb-2 uppercase">TOKEN CATEGORY BREAKDOWN</h2>
        <div className="w-full overflow-hidden whitespace-nowrap mb-4">
          {"=".repeat(150)}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left text-sm border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-dashed border-gray-300">
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">| Count</th>
                <th className="py-2 pr-4">| Percentage</th>
              </tr>
            </thead>
            <tbody>
              {output.categoryBreakdownResult?.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-1 pr-4">{row.category}</td>
                  <td className="py-1 pr-4 text-blue-700">| {row.count}</td>
                  <td className="py-1 pr-4">| {row.percentage.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 w-full overflow-hidden whitespace-nowrap">
          {"*".repeat(150)}
        </div>
        <h2 className="font-bold mb-2 uppercase">END OF REPORT</h2>
        <div className="w-full overflow-hidden whitespace-nowrap">
          {"*".repeat(150)}
        </div>
      </div>
    </div>
  );
};

export default OutputScreen;