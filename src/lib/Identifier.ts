export const getIdentifiers = (tokens: any[]) => {
    const map = new Map<string, {
        identifier: string;
        frequency: number;
        lines: Set<number>;
    }>();

    const totalTokens = tokens.length;

    tokens.forEach(token => {
        if (token.category !== "IDENTIFIER") return;

        const key = `${token.value}`;

        if (!map.has(key)) {
            map.set(key, {
                identifier: token.value,
                frequency: 0,
                lines: new Set<number>()
            });
        }

        const item = map.get(key)!;
        item.frequency++;
        item.lines.add(token.line);
    });

    return Array.from(map.values()).map(item => ({
        identifier: item.identifier,
        frequency: item.frequency,
        percentage: Number(((item.frequency / totalTokens) * 100).toFixed(2)),
        lines: Array.from(item.lines).sort((a, b) => a - b)
    }));
};