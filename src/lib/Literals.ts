export const getLiterals = (tokens: any[]) => {

    const map = new Map<string, {
        literal: string;
        type: string;
        frequency: number;
        lines: Set<number>;
    }>();

    const totalTokens = tokens.length;

    tokens.forEach(token => {
        // only consider literals
        if (token.category !== "LITERAL") return;

        const key = `${token.value}`;

        if (!map.has(key)) {
            const type = token.token_type.split('_')[1] || "UNKNOWN";
            map.set(key, {
                literal: token.value,
                type,
                frequency: 0,
                lines: new Set<number>()
            });
        }

        const item = map.get(key)!;
        item.frequency++;
        item.lines.add(token.line);
    });

    return Array.from(map.values()).map(item => ({
        literal: item.literal,
        type: item.type,
        frequency: item.frequency,
        percentage: Number(((item.frequency / totalTokens) * 100).toFixed(2)),
        lines: Array.from(item.lines).sort((a, b) => a - b)
    }));
};