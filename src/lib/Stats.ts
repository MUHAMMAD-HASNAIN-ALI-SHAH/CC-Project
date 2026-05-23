import { tokenizer } from "./Tokenizer";

const getMaxMinToken = (tokens: any) => {
    const map = new Map<string, number>();
    tokens.forEach((token: { token_type: string; }) => {
        const count = map.get(token.token_type) || 0;
        map.set(token.token_type, count + 1);
    });

    let maxTokenType = "";
    let maxCount = -Infinity;

    let minTokenType = "";
    let minCount = Infinity;

    map.forEach((count, tokenType) => {
        if (count > maxCount) {
            maxCount = count;
            maxTokenType = tokenType;
        }

        if (count < minCount) {
            minCount = count;
            minTokenType = tokenType;
        }
    });

    return { maxTokenType, maxCount, minTokenType, minCount };
};

const getMaxMinTokenInSingleLine = (tokens: any) => {
    const map = new Map<string, number>();

    tokens.forEach((token: { token_type: string; line: number; }) => {
        const key = `${token.line}`;
        const count = map.get(key) || 0;
        map.set(key, count + 1);
    });

    let maxCount = -Infinity;
    let maxTokenLine = 0;

    let minCount = Infinity;
        let minTokenLine = 0;

    map.forEach((count, key) => {
        if (count > maxCount) {
            maxCount = count;
            maxTokenLine = parseInt(key.split("-")[0]);
        }

        if (count < minCount) {
            minCount = count;
            minTokenLine = parseInt(key.split("-")[0]);
        }
    });

    return { maxCount, minCount, maxTokenLine, minTokenLine };
}

const getAverageTokensPerLine = (totalTokens: number, totalLines: number) => {
    return totalLines === 0 ? 0 : totalTokens / totalLines;
}

export const getStats = (content: string) => {
    const totalLines = content.split('\n').length;
    const commentLines = content.split('\n').filter(line => line.trim().startsWith('//')).length;
    const codeLines = totalLines - commentLines;

    const { tokens } = tokenizer(content);
    const totalTokensTypes = new Set(tokens.map(token => token.token_type)).size;


    const { maxTokenType, maxCount, minTokenType, minCount } = getMaxMinToken(tokens);

    const { maxCount: maxCountInSingleLine, minCount: minCountInSingleLine, maxTokenLine, minTokenLine } = getMaxMinTokenInSingleLine(tokens);

    const averageTokensPerLine = getAverageTokensPerLine(tokens.length, codeLines);

    return {
        totalLines,
        commentLines,
        codeLines,
        tokens: tokens.length,
        totalTokensTypes,
        mostFrequentToken: {
            type: maxTokenType,
            count: maxCount
        },
        leastFrequentToken: {
            type: minTokenType,
            count: minCount
        },
        mostFrequentTokenInSingleLine: {
            count: maxCountInSingleLine,
            line: maxTokenLine
        },
        leastFrequentTokenInSingleLine: {
            count: minCountInSingleLine,
            line: minTokenLine
        },
        averageTokensPerLine,
    }
}