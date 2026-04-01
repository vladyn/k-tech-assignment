import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState
} from '@ngrx/signals';
import {Boards, GameStatus} from "./enums/boards";

type AppStore = {
    board: Boards;
    isLoading: boolean;
    gameStatus: GameStatus;
    initialBoard: Boards;
    error: Error;
    boardStatus: string;
};

const initialState: AppStore = {
    board: { board: [[]] },
    isLoading: false,
    gameStatus: 'pending',
    initialBoard: { board: [[]] },
    error: new Error(),
    boardStatus: 'unsolved',
};

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(
        (store) => ({
            board: store.board,
        })
    ),
    withMethods((store) => ({
        updateCell(cellValue: number, rowIndex: number, cellIndex: number): void {
            // 👇 Updating state using the `patchState` function.
            patchState(store, (state) => {
                const currentBoard = state.board.board;
                const targetRow = currentBoard[rowIndex];

                const updatedRow = [...targetRow];
                updatedRow[cellIndex] = cellValue;

                const updatedBoard = [...currentBoard];
                updatedBoard[rowIndex] = updatedRow;

                return {
                    ...state,
                    board: {
                        ...state.board,
                        board: updatedBoard,
                    },
                };
            });
        },
        updateBoard(board: Boards): void{
            patchState(store, (state) => ({
                ...state,
                board: board,
            }));
        },
        setInitial(board: Boards): void{
            patchState(store, (state) => ({
                ...state,
                initialBoard: board,
            }));
        },
        setLoading(isLoading: boolean): void {
            patchState(store, (state) => ({
                ...state,
                isLoading,
            }))
        },
        setGameStatus(status: GameStatus): void {
            patchState(store, (state) => ({
                ...state,
                gameStatus: status,
            }))
        },
        setError(error: Error): void {
            patchState(store, (state) => ({
                ...state,
                error,
            }))
        },
        setBoardStatus(status: string): void {
            patchState(store, (state) => ({
                ...state,
                boardStatus: status,
            }))
        }
    }))
);