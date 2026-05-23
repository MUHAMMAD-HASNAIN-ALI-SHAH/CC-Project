export const commentsCount = (content: string) => {
    const singleLineComments = content.match(/\/\/.*$/gm) || [];

    const multiLineComments = content.match(/\/\*[\s\S]*?\*\//g) || [];

    return {
        totalComments: singleLineComments.length + multiLineComments.length
    };
}