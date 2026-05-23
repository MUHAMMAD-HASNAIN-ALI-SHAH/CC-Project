import ErrorInCodeLine from "../components/parser-output/ErrorInCodeLine"
import { useParserStore } from "../store/useParserStore"

const ERROR_TYPE_COLORS: Record<string, string> = {
  MISSING_SEMICOLON:     "bg-yellow-100 text-yellow-700",
  MISSING_CLOSING_BRACE: "bg-red-100 text-red-700",
  MISSING_OPENING_BRACE: "bg-red-100 text-red-700",
  MISSING_CLOSING_PAREN: "bg-orange-100 text-orange-700",
  MISSING_OPENING_PAREN: "bg-orange-100 text-orange-700",
  INVALID_VARIABLE_NAME: "bg-purple-100 text-purple-700",
  INVALID_DECLARATION:   "bg-purple-100 text-purple-700",
  INVALID_ASSIGNMENT:    "bg-pink-100 text-pink-700",
  INVALID_IF:            "bg-blue-100 text-blue-700",
  INVALID_ELSE:          "bg-blue-100 text-blue-700",
  INVALID_WHILE:         "bg-blue-100 text-blue-700",
  INVALID_FOR:           "bg-blue-100 text-blue-700",
  INVALID_MAIN:          "bg-red-100 text-red-700",
  UNMATCHED_BRACE:       "bg-red-100 text-red-700",
  UNEXPECTED_TOKEN:      "bg-gray-100 text-gray-700",
}

const ParserOutput = () => {
  const { result, inputFile } = useParserStore()

  return (
    <div className="min-h-screen flex flex-col items-center bg-linear-to-br from-green-200 via-green-100 to-green-300 p-8">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-green-700 mb-2">Parser Output</h1>
        {inputFile.filename && (
          <p className="text-green-600 text-sm">
            File: <span className="font-semibold">{inputFile.filename}</span>
          </p>
        )}
      </div>

      {/* Card */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6">

        {/* No file uploaded yet */}
        {result === null ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
            <span className="text-5xl">📂</span>
            <p className="text-lg font-medium">No file parsed yet</p>
            <p className="text-sm">Upload a file from the input page first</p>
          </div>

        ) : result.length === 0 ? (
          /* No errors */
          <div className="flex flex-col items-center justify-center py-16 text-green-500 gap-3">
            <span className="text-5xl">✅</span>
            <p className="text-lg font-semibold">No syntax errors found!</p>
            <p className="text-sm text-gray-400">Your W++ code looks clean</p>
          </div>

        ) : (
          /* Errors table */
          <>
            {/* Error count badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {result.length} Error{result.length > 1 ? "s" : ""}
              </span>
              <span className="text-sm text-red-500 font-medium">
                Syntax errors detected in your W++ code
              </span>
            </div>

            <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="py-3 px-4 text-left font-semibold w-10">#</th>
                    <th className="py-3 px-4 text-left font-semibold w-20">Line</th>
                    <th className="py-3 px-4 text-left font-semibold w-16">Col</th>
                    <th className="py-3 px-4 text-left font-semibold w-56">Type</th>
                    <th className="py-3 px-4 text-left font-semibold">Message</th>
                    <th className="py-3 px-4 text-left font-semibold">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((error, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors
                        ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      {/* Index */}
                      <td className="py-3 px-4 text-gray-400 font-medium">
                        {index + 1}
                      </td>

                      {/* Line */}
                      <td className="py-3 px-4">
                        <span className="bg-gray-800 text-white text-xs font-mono font-bold px-2 py-1 rounded">
                          L{error.line}
                        </span>
                      </td>

                      {/* Column */}
                      <td className="py-3 px-4 text-gray-500 font-mono text-xs">
                        {error.column}
                      </td>

                      {/* Error type */}
                      <td className="py-3 px-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap
                          ${ERROR_TYPE_COLORS[error.type] ?? "bg-gray-100 text-gray-700"}`}>
                          {error.type}
                        </span>
                      </td>

                      {/* Message */}
                      <td className="py-3 px-4 text-gray-700">
                        {error.message}
                      </td>

                      {/* Source */}
                      <td className="py-3 px-4">
                        <code className="bg-gray-100 text-red-600 text-xs font-mono px-2 py-1 rounded">
                          {error.source}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <ErrorInCodeLine />
    </div>
  )
}

export default ParserOutput