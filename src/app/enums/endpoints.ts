export interface boardEndpoints {
    solveBoard: string;
    getBoard: string;
    gradeBoard: string;
    validateBoard: string;
}

const sudokuTier: string = 'https://sugoku.onrender.com';

export const endpoints = {
    solveBoard: `${sudokuTier}/solve`,
    getBoard: `${sudokuTier}/board`,
    gradeBoard: `${sudokuTier}/grade`,
    validateBoard: `${sudokuTier}/validate`,
}