import { endpoints } from './endpoints';
describe('Endpoints', () => {
    it('should have correct endpoints', () => {
        expect(endpoints).toEqual({
            solveBoard: 'https://sugoku.onrender.com/solve',
            getBoard: 'https://sugoku.onrender.com/board',
            gradeBoard: 'https://sugoku.onrender.com/grade',
            validateBoard: 'https://sugoku.onrender.com/validate',
        });
    })
})