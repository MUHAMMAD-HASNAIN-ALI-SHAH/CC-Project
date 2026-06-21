import { useParserStore } from "../../store/useParserStore";

const ErrorInCodeLine = () => {
  const { inputFile, result } = useParserStore();

  const lines = inputFile.content.split("\n");

  const errorLines = new Map<number, { message: string; type: string; column: number }[]>();
  if (result) {
    for (const error of result) {
      if (!errorLines.has(error.line)) {
        errorLines.set(error.line, []);
      }
      errorLines.get(error.line)!.push({
        message: error.message,
        type: error.type,
        column: error.column,
      });
    }
  }

  return (
    <div className="flex flex-col items-center bg-linear-to-br from-red-200 via-red-100 to-red-300 mt-10 w-full">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-red-700 mb-2">Source Code Viewer</h1>
        {inputFile.filename && (
          <p className="text-red-500 text-sm">
            File: <span className="font-semibold">{inputFile.filename}</span>
          </p>
        )}
      </div>

      {/* Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Card header */}
        <div className="flex items-center justify-between px-5 py-3 bg-gray-900">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-400 text-xs font-mono ml-2">
              {inputFile.filename || "source.wpp"}
            </span>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full
            ${!result || result.length === 0
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"}`}>
            {!result
              ? "Not Parsed"
              : result.length === 0
              ? "✓ No Errors"
              : `${result.length} Error${result.length > 1 ? "s" : ""}`}
          </span>
        </div>

        {/* Non content state */}
        {!inputFile.content ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3 bg-gray-950">
            <span className="text-5xl">📂</span>
            <p className="text-lg font-medium">No file loaded</p>
            <p className="text-sm">Upload a file from the input page first</p>
          </div>
        ) : (
          <div className="bg-gray-950 overflow-x-auto">
            {lines.map((lineContent, index) => {
              const lineNo = index + 1;
              const lineErrors = errorLines.get(lineNo);
              const hasError = !!lineErrors && lineErrors.length > 0;

              return (
                <div key={index}>

                  {/* Code row */}
                  <div className={`flex group ${hasError ? "bg-red-950/60" : "hover:bg-gray-900/30"}`}>

                    {/* Line number */}
                    <span className={`select-none text-xs font-mono px-3 py-2 w-14 text-right border-r shrink-0
                      ${hasError
                        ? "text-red-400 border-red-800 bg-red-900/40"
                        : "text-gray-600 border-gray-800"}`}>
                      {lineNo}
                    </span>

                    {/* Error dot */}
                    <span className="w-6 shrink-0 flex items-center justify-center">
                      {hasError && (
                        <span className="text-red-500 text-xs">●</span>
                      )}
                    </span>

                    {/* Line content */}
                    <span className={`font-mono text-xs py-2 pr-6 whitespace-pre
                      ${hasError ? "text-red-300" : "text-gray-300"}`}>
                      {lineContent || " "}
                    </span>
                  </div>

                  {/* Errors messages below the line if any */}
                  {hasError && lineErrors.map((err, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-red-900/20 border-l-2 border-red-500 py-1.5 pl-20 pr-4"
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="font-mono text-xs text-red-400">
                          {"~".repeat(Math.max(1, err.column - 1))}^
                        </div>
                        <span className="text-xs text-red-300 font-medium">
                          {err.message}
                        </span>
                        <span className="text-xs text-red-500/70">
                          Col {err.column} · {err.type}
                        </span>
                      </div>
                    </div>
                  ))}

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorInCodeLine;