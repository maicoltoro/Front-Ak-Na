export interface GraficaMesCantidadVentas {
    Mes: string
    CantidadPedidos: number
}

export interface GraficaProductosMasVendidos {
    IdProducto: number
    Nombre: string
    Imagen: string
    Cantidad: number
    Precio : number
}

export interface GraficaProductosPorCategoria {
    Categoria: string
    TotalVenta: number
    CantidadPedidos: number
}

export interface GraficaClientesFrecuentes {
    Cliente: string
    CantidadPedidos: number
    TotalGastado: number
}

export interface GraficaDiasVenta {
    DiaSemana: string
    CantidadPedidos: number
}

export interface Sp_traerInventario{
    ID : number
    Nombre : string
    Cantidad : number
    NombreCategoria : string
    Descuento : number
    FechaInicioDesc : Date
    FechaFinDesc: Date
    Precio : number
    NombreMarca : string
    Descripcion : string
    Imagen : string
    Activo: string
}