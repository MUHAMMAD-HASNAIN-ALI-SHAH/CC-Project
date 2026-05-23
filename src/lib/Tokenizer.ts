const KEYWORDS = [
    "int", "float", "double", "char", "string",
    "if", "else", "while", "for", "return",
    "print", "read", "true", "false"
];

const OPERATORS = {
    "=": "OPERATOR_ASSIGN",
    "+": "OPERATOR_PLUS",
    "-": "OPERATOR_MINUS",
    "*": "OPERATOR_MULT",
    "/": "OPERATOR_DIV",
    "<": "OPERATOR_LT",
    ">": "OPERATOR_GT",
    "<=": "OPERATOR_LE",
    ">=": "OPERATOR_GE",
    "==": "OPERATOR_EQ",
    "!=": "OPERATOR_NE",
    "&&": "OPERATOR_AND",
    "||": "OPERATOR_OR"
};

const SEPARATORS = {
    ";": "SEPARATOR_SEMICOLON",
    ",": "SEPARATOR_COMMA",
    "(": "SEPARATOR_LPAREN",
    ")": "SEPARATOR_RPAREN",
    "{": "SEPARATOR_LBRACE",
    "}": "SEPARATOR_RBRACE"
};

export const tokenize = (code: string) => {
    // Regex breakdown:
    // 1. Strings: "(.*?)"
    // 2. Chars: '(\\.|[^\\'])'
    // 3. Multi-char operators: <=|>=|==|!=|&&|\|\|
    // 4. Single-char ops/seps: [=+\-*/<>;,(){}]
    // 5. Identifiers/Keywords: \b[a-zA-Z_][a-zA-Z0-9_]*\b
    // 6. Literals (Float/Int): \b\d+(?:\.\d+)?\b
    return code.match(
        /"(.*?)"|'(\\.|[^\\'])'|<=|>=|==|!=|&&|\|\||[=+\-*/<>;,(){}]|\b[a-zA-Z_][a-zA-Z0-9_]*\b|\b\d+(?:\.\d+)?\b/g
    ) || [];
};

const getType = (token: string) => {
    // find keywords
    if (KEYWORDS.includes(token)) return { category: "KEYWORD", type: `KEYWORD_${token.toUpperCase()}` };

    // find operators
    if (OPERATORS[token as keyof typeof OPERATORS]) {
        return { category: "OPERATOR", type: OPERATORS[token as keyof typeof OPERATORS] };
    }

    // find separators
    if (SEPARATORS[token as keyof typeof SEPARATORS]) {
        return { category: "SEPARATOR", type: SEPARATORS[token as keyof typeof SEPARATORS] };
    }

    // find identifiers
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token)) return { category: "IDENTIFIER", type: "IDENTIFIER" };

    // find literals
    if (/^-?\d+$/.test(token)) return { category: "LITERAL", type: "LITERAL_INTEGER" };
    if (/^-?\d+\.\d+$/.test(token)) return { category: "LITERAL", type: "LITERAL_FLOAT" };
    if (/^'.*'$/.test(token)) return { category: "LITERAL", type: "LITERAL_CHAR" };
    if (/^".*"$/.test(token)) return { category: "LITERAL", type: "LITERAL_STRING" };

    return { category: "UNKNOWN", type: "UNKNOWN" };
}

export const tokenizer = (content: string) => {
    const data = content.split('\n').filter(line => line.trim() !== '' && !line.trim().startsWith('//'))

    const result: {
        value: string
        category: string;
        token_type: string;
        line: number;
    }[] = [];

    data.forEach((line, index) => {
        const tokens = tokenize(line);

        tokens.forEach((token) => {
            const { category, type } = getType(token);
            result.push({
                value: token,
                category,
                token_type: type,
                line: index + 1
            })
        })
    });

    return {
        tokens: result
    }
}