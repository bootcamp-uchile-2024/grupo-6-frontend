import { ILibro } from "./ILibro";

interface ILibroPaginado {
    nroPagina: number;            
    totalPaginas: number;   
    totalProductos: number;      
    productos: ILibro[];
}

export type { ILibroPaginado };