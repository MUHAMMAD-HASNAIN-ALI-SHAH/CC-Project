import { create } from 'zustand';
import { TokenizerMain } from '../lib/TokenizerMain';

interface FileState {
    inputFile: {
        filename: string;
        content: string;
    };
    inputFileData: (data: { filename: string; content: string }) => void;
    reset: () => void;
    output: {
        totalLines: number;
        codeLines: number;
        tokenCount: number;
        totalTokensTypes: number;
        categoryData: Array<{
            category: string;
            token_type: string;
            percentage: number;
            quantity: number;
            line: Array<number>;
        }> | null;
        identifierData: Array<{
            identifier: string;
            frequency: number;
            lines: number[];
        }> | null;
        literalsData: Array<{
            literal: string;
            frequency: number;
            type: string;
            lines: number[];
        }> | null;
        mostFrequentToken: {
            type: string,
            count: number
        },
        leastFrequentToken: {
            type: string,
            count: number
        },
        mostFrequentTokenInSingleLine: {
            count: number,
            line: number
        },
        leastFrequentTokenInSingleLine: {
            count: number,
            line: number
        },
        averageTokensPerLine: number,
        categoryBreakdownResult: Array<{
            category: string;
            count: number;
            percentage: number;
        }> | null;
    };
}

export const useFileStore = create<FileState>((set) => ({
    inputFile: {
        filename: '',
        content: '',
    },
    output: {
        totalLines: 0,
        codeLines: 0,
        tokenCount: 0,
        totalTokensTypes: 0,
        categoryData: null,
        identifierData: null,
        literalsData: null,
        mostFrequentToken: {
            type: '',
            count: 0
        },
        leastFrequentToken: {
            type: '',
            count: 0
        },
        mostFrequentTokenInSingleLine: {
            count: 0,
            line: 0
        },
        leastFrequentTokenInSingleLine: {
            count: 0,
            line: 0
        },
        averageTokensPerLine: 0,
        categoryBreakdownResult: null,
    },

    inputFileData: ({ filename, content }) => {

        const { getSummaryResult, getIdentifiersResult, getLiteralsResult, stats, categoryBreakdownResult } = TokenizerMain(content);

        set({
            inputFile: { filename, content },
        });

        set({
            output: {
                totalLines: stats.totalLines,
                codeLines: stats.codeLines,
                tokenCount: stats.tokens,
                totalTokensTypes: stats.totalTokensTypes,
                categoryData: getSummaryResult,
                identifierData: getIdentifiersResult,
                literalsData: getLiteralsResult,
                mostFrequentToken: stats.mostFrequentToken,
                leastFrequentToken: stats.leastFrequentToken,
                mostFrequentTokenInSingleLine: stats.mostFrequentTokenInSingleLine,
                leastFrequentTokenInSingleLine: stats.leastFrequentTokenInSingleLine,
                averageTokensPerLine: stats.averageTokensPerLine,
                categoryBreakdownResult: categoryBreakdownResult,
            }
        })
    },

    reset: () => set({
        inputFile: { filename: '', content: '' },
        output: {
            totalLines: 0,
            codeLines: 0,
            tokenCount: 0,
            totalTokensTypes: 0,
            categoryData: null,
            identifierData: null,
            literalsData: null,
            mostFrequentToken: {
                type: '',
                count: 0
            },
            leastFrequentToken: {
                type: '',
                count: 0
            },
            mostFrequentTokenInSingleLine: {
                count: 0,
                line: 0
            },
            leastFrequentTokenInSingleLine: {
                count: 0,
                line: 0
            },
            averageTokensPerLine: 0,
            categoryBreakdownResult: null,
        }
    }),
}));