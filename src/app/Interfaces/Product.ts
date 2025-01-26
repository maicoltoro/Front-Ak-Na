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
    Cantidad: number
}

export interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

export interface Factura {
    ID?: number
    Cantidad?: number
    DiaEntrega?: number
    Tiempo?: number
    HoraInicio?: string
    HoraFin?: string
    Precio?: number
    Imagen?: string
    Nombre?: string
}

export interface TipoIdentificacion {
    id: number
    tipo: string
}

export interface ImagenesProyecto {
    ID: number
    IdProyecto: number
    LugarImagen: string
    UrlImagen: string
}

export interface InformacionPedido {
    IdPedido: number
    NombreCompleto: string
    Direccion: string
    Correo: string
    Celular: number
    FechaPedido: Date
    ValorCompra: number
    Estado: string
    DiaEntrega : string
}

export interface Informacionfactura {
    IdPedido: number
    Nombre: string
    Imagen: string
    Cantidad: number
    DiaEntrega: string
    Precio : number
}