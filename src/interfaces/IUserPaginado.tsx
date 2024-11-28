import { IUser } from "./IUser";


interface IUserPaginado {
    usuarios: IUser[];
    totalPaginas: number;
}

export type { IUserPaginado };