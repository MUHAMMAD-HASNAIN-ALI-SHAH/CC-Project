import { commentsCount } from "./commentsCount";

const categoryBreakdown = (tokens: any[], content: string) => {

    const commentCountResult = commentsCount(content);

    const breakdown: Record<string, number> = {};

    tokens.forEach(token => {
        const category = token.category;
        breakdown[category] = (breakdown[category] || 0) + 1;
    });

    breakdown['Comments'] = commentCountResult.totalComments;

    const result = Object.entries(breakdown).map(([category, count]) => ({
        category,
        count,
        percentage: parseFloat(((count / tokens.length) * 100).toFixed(2))
    }));

    return result;
};

export default categoryBreakdown;