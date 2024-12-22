export interface Product {
    ID: number
    IdCategoria: number
    Nombre: string
    IdMarca: string
    Precio: number
    Descuento: number
    Cantidaddescuento: number
    FechaInicioDesc: Date
    FechaFinDesc: Date
    IdServicio: number
    Descripcion: string
    Activo: number
    imagen: string
    Cantidad : number
}

export interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

export interface Factura {
    ID?: number
    Cantidad? : number
    DiaEntrega? : number
    Tiempo? : number
    HoraInicio? : string
    HoraFin? :string
    Precio? :number
    Imagen?: string
    Nombre?:string
}

export interface TipoIdentificacion{
    id : number
    tipo : string
}