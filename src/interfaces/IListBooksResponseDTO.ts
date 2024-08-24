import { BookDTO } from "./BookDTO";

interface IListBooksResponseDTO {
    total: number,
    books: BookDTO[],
}

export type { IListBooksResponseDTO};