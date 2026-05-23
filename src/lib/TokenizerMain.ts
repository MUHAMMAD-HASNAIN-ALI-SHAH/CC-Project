import categoryBreakdown from "./categoryBreakdown";
import { getIdentifiers } from "./Identifier";
import { getLiterals } from "./Literals";
import { getStats } from "./Stats";
import { getSummary } from "./Summary";
import { tokenizer } from "./Tokenizer";

export const TokenizerMain = (content: string) => {
    const { tokens } = tokenizer(content);

    const getSummaryResult = getSummary(tokens);
    const getIdentifiersResult = getIdentifiers(tokens);
    const getLiteralsResult = getLiterals(tokens);
    const stats = getStats(content);
    const categoryBreakdownResult = categoryBreakdown(tokens, content);

    return {
        stats,
        getSummaryResult,
        getIdentifiersResult,
        getLiteralsResult,
        categoryBreakdownResult,
    }
}