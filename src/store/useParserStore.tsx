import { create } from "zustand";
import { parseWPP } from "../lib/parser/parseWPP";

type ParseError = {
  message: string;
  line: number;
  column: number;
  type: string;
  source: string;
};

interface FileState {
  inputFile: {
    filename: string;
    content: string;
  };
  inputFileData: (data: { filename: string; content: string }) => void;
  reset: () => void;
  result: ParseError[] | null;  // ✅ ParseError[] type use karo
}

export const useParserStore = create<FileState>((set) => ({
  inputFile: {
    filename: "",
    content: "",
  },
  result: null,
  inputFileData: ({ filename, content }) => {
    set({
      inputFile: { filename, content },
    });

    const parserResult = parseWPP(content);

    set({
      result: parserResult.errors,
    });
  },

  reset: () =>
    set({
      inputFile: { filename: "", content: "" },
      result: null, // ✅ reset mein bhi clear karo
    }),
}));