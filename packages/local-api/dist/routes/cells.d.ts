export interface ErrorFs extends Error {
    code?: string;
}
export declare const createCellsRouter: (filename: string, dir: string) => import("express-serve-static-core").Router;
