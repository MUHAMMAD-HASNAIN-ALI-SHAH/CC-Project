import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Parser = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleLog = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        // inputFileData({
        //   filename: selectedFile.name,
        //   content: content as string,
        // });
      };
      reader.onerror = () => {
        console.error("Error reading the file.");
      };
      reader.readAsText(selectedFile);
    } else {
      console.log("No file selected yet.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-200 via-blue-100 to-blue-300 p-8">
      <h1 className="text-5xl font-bold text-blue-700 mb-2">File Upload</h1>
      <p className="text-lg text-blue-400 mb-8">
        Select your source file to analyze
      </p>

      <div className="bg-white rounded-2xl shadow-lg px-10 py-10 w-full max-w-md flex flex-col gap-4">
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm text-gray-500
                        file:mr-4 file:py-1.5 file:px-4
                        file:rounded-md file:border file:border-gray-300
                        file:text-sm file:font-medium file:bg-white file:text-gray-600
                        hover:file:bg-gray-50 focus:outline-none"
        />

        {selectedFile && (
          <>
            <p className="text-xs text-gray-400 text-center">
              Ready to read: {selectedFile.name}
            </p>
            <button
              onClick={() => {
                handleLog();
                navigate("/parser-output");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors text-sm"
            >
              Read and Analyze File
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Parser
