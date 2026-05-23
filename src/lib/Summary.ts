export const getSummary = (tokens: any[]) => {
    const map = new Map<string, {
        value: string;
        category: string;
        token_type: string;
        quantity: number;
        line: Set<number>;
    }>();

    const totalTokens = tokens.length;

    tokens.forEach(token => {
        const key = `${token.token_type}`;

        if (!map.has(key)) {
            map.set(key, {
                value: token.value,
                category: token.category,
                token_type: token.token_type,
                quantity: 0,
                line: new Set<number>()
            });
        }

        const item = map.get(key)!;
        item.quantity++;
        item.line.add(token.line);
    });

    return Array.from(map.values()).map(item => ({
        value: item.value,
        category: item.category,
        token_type: item.token_type,
        quantity: item.quantity,
        percentage: Number(((item.quantity / totalTokens) * 100).toFixed(2)),
        line: Array.from(item.line).sort((a, b) => a - b)
    }));
};