import { useState } from 'react';
import { useFileStore } from '../store/store';

const InputComponent = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { inputFileData } = useFileStore();

    const handleLog = () => {
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target?.result;
                inputFileData({ filename: selectedFile.name, content: content as string });
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
        <div className="flex flex-col items-center justify-center p-6 mt-10">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                    Upload Your File
                </h1>

                <div className="flex flex-col gap-4">
                    <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
                       file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />

                    <button
                        onClick={handleLog}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition-colors"
                    >
                        Read and Console Data
                    </button>
                </div>

                {selectedFile && (
                    <p className="mt-3 text-xs text-gray-400 text-center">
                        Ready to read: {selectedFile.name}
                    </p>
                )}
            </div>
        </div>
    )
}

export default InputComponent
