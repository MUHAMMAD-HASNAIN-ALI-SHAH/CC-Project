// parser.ts

export type ErrorType =
  | "MISSING_SEMICOLON"
  | "INVALID_VARIABLE_NAME"
  | "INVALID_DECLARATION"
  | "INVALID_ASSIGNMENT"
  | "INVALID_IF"
  | "INVALID_ELSE"
  | "INVALID_WHILE"
  | "INVALID_FOR"
  | "INVALID_MAIN"
  | "UNMATCHED_BRACE"
  | "UNEXPECTED_TOKEN";

export interface ParseError {
  line: number;
  column: number;
  type: ErrorType;
  message: string;
  source: string;
}

export interface ParserResult {
  errors: ParseError[];
  success: boolean;
}

const KEYWORDS = new Set([
  "int",
  "float",
  "double",
  "char",
  "string",
  "bool",
  "void",
  "long",
  "if",
  "else",
  "while",
  "for",
  "do",
  "return",
  "main",
  "true",
  "false",
]);

// ---------------- REMOVE COMMENTS ----------------

function removeComments(code: string): string {
  code = code.replace(/\/\*[\s\S]*?\*\//g, "");
  code = code.replace(/\/\/.*$/gm, "");
  return code;
}

// ---------------- IDENTIFIER ----------------

function isValidIdentifier(name: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
}

// ---------------- EXPRESSION ----------------

function isValidExpression(expr: string): boolean {
  expr = expr.trim();

  if (!expr) return false;

  return /^[a-zA-Z0-9_\s+\-*/%().'":!&|<>=,\[\]\\]+$/.test(
    expr
  );
}

// ---------------- CONDITION ----------------

function isValidCondition(cond: string): boolean {
  cond = cond.trim();

  if (!cond) return false;

  return /^[a-zA-Z0-9_\s+\-*/%().'":!&|<>=,\[\]\\]+$/.test(
    cond
  );
}

// ---------------- SPLIT DECLARATIONS ----------------

function splitDeclarations(str: string): string[] {

  const result: string[] = [];

  let current = "";

  let inDouble = false;

  let inSingle = false;

  for (let i = 0; i < str.length; i++) {

    const ch = str[i];

    if (ch === '"' && !inSingle) {
      inDouble = !inDouble;
    }

    else if (ch === "'" && !inDouble) {
      inSingle = !inSingle;
    }

    if (ch === "," && !inDouble && !inSingle) {

      result.push(current.trim());

      current = "";
    }

    else {
      current += ch;
    }
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result;
}

// ---------------- MAIN PARSER ----------------

export function parseWPP(
  sourceCode: string
): ParserResult {

  const errors: ParseError[] = [];

  const cleaned = removeComments(sourceCode);

  const lines = cleaned.split("\n");

  const braceStack: number[] = [];

  const addError = (
    line: number,
    type: ErrorType,
    message: string,
    source: string
  ) => {

    errors.push({
      line,
      column: 1,
      type,
      message,
      source,
    });
  };

  // ---------------- LOOP ----------------

  for (let i = 0; i < lines.length; i++) {

    const raw = lines[i];

    const line = raw.trim();

    const lineNo = i + 1;

    if (!line) continue;

    // ---------------- BRACES ----------------

    for (const ch of raw) {

      if (ch === "{") {

        if (!line.includes("main(")) {
          braceStack.push(lineNo);
        }
      }

      if (ch === "}") {

        if (braceStack.length === 0) {

          addError(
            lineNo,
            "UNMATCHED_BRACE",
            "Unmatched closing brace",
            line
          );
        }

        else {
          braceStack.pop();
        }
      }
    }

    // ---------------- MAIN ----------------

    if (/main\s*\(/.test(line)) {

      if (
        !/^int\s+main\s*\(\s*\)\s*\{?$/.test(line)
      ) {

        addError(
          lineNo,
          "INVALID_MAIN",
          "Invalid main function",
          line
        );
      }

      continue;
    }

    // ---------------- IF ----------------

    if (/^if\b/.test(line)) {

      const match = line.match(
        /^if\s*\((.*?)\)\s*\{?$/
      );

      if (!match) {

        addError(
          lineNo,
          "INVALID_IF",
          "Invalid if statement",
          line
        );
      }

      else if (
        !isValidCondition(match[1])
      ) {

        addError(
          lineNo,
          "INVALID_IF",
          "Invalid if condition",
          line
        );
      }

      continue;
    }

    // ---------------- ELSE ----------------

    if (/^else\b/.test(line)) {

      const validElse =
        /^else\s*\{?$/.test(line);

      const validElseIf =
        /^else\s+if\s*\((.*?)\)\s*\{?$/.test(
          line
        );

      if (!validElse && !validElseIf) {

        addError(
          lineNo,
          "INVALID_ELSE",
          "Invalid else statement",
          line
        );
      }

      continue;
    }

    // ---------------- WHILE ----------------

    if (/^while\b/.test(line)) {

      const match = line.match(
        /^while\s*\((.*?)\)\s*\{?$/
      );

      if (!match) {

        addError(
          lineNo,
          "INVALID_WHILE",
          "Invalid while loop",
          line
        );
      }

      continue;
    }

    // ---------------- FOR ----------------

    if (/^for\b/.test(line)) {

      const match = line.match(
        /^for\s*\((.*?)\)\s*\{?$/
      );

      if (!match) {

        addError(
          lineNo,
          "INVALID_FOR",
          "Invalid for loop",
          line
        );
      }

      else {

        const parts = match[1].split(";");

        if (parts.length !== 3) {

          addError(
            lineNo,
            "INVALID_FOR",
            "For loop must contain 3 parts",
            line
          );
        }
      }

      continue;
    }

    // ---------------- PRINT ----------------

    if (/^print\b/.test(line)) {

      if (!line.endsWith(";")) {

        addError(
          lineNo,
          "MISSING_SEMICOLON",
          "Print statement missing semicolon",
          line
        );
      }

      continue;
    }

    // ---------------- RETURN ----------------

    if (/^return\b/.test(line)) {

      if (!line.endsWith(";")) {

        addError(
          lineNo,
          "MISSING_SEMICOLON",
          "Return statement missing semicolon",
          line
        );
      }

      continue;
    }

    // ---------------- VARIABLE DECLARATION ----------------

    const declMatch = line.match(
      /^(int|float|double|char|string|bool|void|long)\s+(.+)$/
    );

    if (declMatch) {

      const rest = declMatch[2];

      if (!line.endsWith(";")) {

        addError(
          lineNo,
          "MISSING_SEMICOLON",
          "Missing semicolon",
          line
        );
      }

      const withoutSemi =
        rest.replace(/;$/, "");

      const declarations =
        splitDeclarations(withoutSemi);

      for (const decl of declarations) {

        if (!decl) continue;

        // ---------------- WITH ASSIGNMENT ----------------

        if (decl.includes("=")) {

          const eqIndex =
            decl.indexOf("=");

          const varName = decl
            .slice(0, eqIndex)
            .trim();

          const value = decl
            .slice(eqIndex + 1)
            .trim();

          if (
            !isValidIdentifier(varName)
          ) {

            addError(
              lineNo,
              "INVALID_VARIABLE_NAME",
              `Invalid variable name '${varName}'`,
              line
            );
          }

          if (
            !isValidExpression(value)
          ) {

            addError(
              lineNo,
              "INVALID_DECLARATION",
              `Invalid expression '${value}'`,
              line
            );
          }
        }

        // ---------------- WITHOUT ASSIGNMENT ----------------

        else {

          if (
            !isValidIdentifier(decl)
          ) {

            addError(
              lineNo,
              "INVALID_VARIABLE_NAME",
              `Invalid variable name '${decl}'`,
              line
            );
          }
        }
      }

      continue;
    }

    // ---------------- ASSIGNMENT ----------------

    const assignMatch = line.match(
      /^([a-zA-Z_][a-zA-Z0-9_]*)\s*(=|\+=|-=|\*=|\/=)\s*(.*);?$/
    );

    if (assignMatch) {

      const varName =
        assignMatch[1];

      const value =
        assignMatch[3]
          .replace(/;$/, "")
          .trim();

      if (KEYWORDS.has(varName)) {

        addError(
          lineNo,
          "INVALID_ASSIGNMENT",
          "Cannot assign to keyword",
          line
        );
      }

      if (!line.endsWith(";")) {

        addError(
          lineNo,
          "MISSING_SEMICOLON",
          "Assignment missing semicolon",
          line
        );
      }

      if (!value) {

        addError(
          lineNo,
          "INVALID_ASSIGNMENT",
          "Empty assignment expression",
          line
        );
      }

      else if (
        !isValidExpression(value)
      ) {

        addError(
          lineNo,
          "INVALID_ASSIGNMENT",
          "Invalid assignment expression",
          line
        );
      }

      continue;
    }

    // ---------------- ++ / -- ----------------

    if (
      /^[a-zA-Z_][a-zA-Z0-9_]*(\+\+|--);$/.test(
        line
      ) ||

      /^(\+\+|--)[a-zA-Z_][a-zA-Z0-9_]*;$/.test(
        line
      )
    ) {
      continue;
    }

    // ---------------- BRACE ONLY ----------------

    if (
      line === "{" ||
      line === "}"
    ) {
      continue;
    }

    // ---------------- UNKNOWN ----------------

    if (
      !line.endsWith(";") &&
      !line.endsWith("{") &&
      !line.endsWith("}")
    ) {

      addError(
        lineNo,
        "UNEXPECTED_TOKEN",
        "Unexpected statement",
        line
      );
    }
  }

  // ---------------- OPEN BRACE CHECK ----------------

  for (const lineNo of braceStack) {

    addError(
      lineNo,
      "UNMATCHED_BRACE",
      "Opening brace not closed",
      "{"
    );
  }

  // ---------------- SORT ----------------

  errors.sort((a, b) => a.line - b.line);

  return {
    success: errors.length === 0,
    errors,
  };
}