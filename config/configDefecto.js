export const CONFIG_DEFECTO = {
    urlUsuario: '',
    mostrarCartel: true,
    navbar: {
        colorTexto: "#000",
        colorFondo: "#ffff"
    },
    perfil: {
        titulo: "Nombre y apellido",
        colorTitulo: "#000",
        colorFondo: "#7fb89e",
        colorTexto: "#000",
        colorBorde: "#000",
        anchoBorde: "1",
        descripcion: "Información personal",
        imagen: "../img/perfil.jpg",
        redesSociales : [
            {
                icono: "fa-facebook",              
                url : "www.facebook.com",
                colorIcono: "#fff",
                colorFondo: "#178cff"
            }
        ]       
    },
    conocimientos: {
        id: "1",
        orden: 1,
        activo: true,
        titulo: "Módulo C",
        alineacionTitulo: "center",
        colorTitulo: "#000",
        colorFondo: "#965959",
        conocimientos: [
            {
                imagen: "../img/conocimiento-defecto.png",
                texto: "Texto",
                colorFondo: "#e6e6e6",
                colorTexto: "#000"
            }
        ]      
    },
    experiencia: {
        id: "2",
        orden: 0,
        activo: false,
        titulo: "Módulo E",
        alineacionTitulo: "center",
        colorTitulo: "#000",
        colorFondo: "#b6c9e3",      
        tarjetas: [
            {
                puesto: "Título ejemplo",
                empresa: "Subtítulo ejemplo",
                tiempo: "Texto1 - Texto2",
                descripcion: "Descripcion ejemplo",
                colorTexto: "#000",
                colorFondo: "#ffff"
            }
        ]
    },
    proyectos: {
        id: "3",
        activo: false,
        orden: 0,
        titulo: "Módulo P",
        alineacionTitulo: "center",
        colorTitulo: "#000",
        colorFondo: "#598096",               
        proyectos: [
            {
                titulo: "Título",
                colorBoton: "#1a5fad",  
                colorTexto: "#fff",
                colorFondoEtiqueta: "#1a5fad",           
                imagenFondo: "../img/defecto.png",
                etiquetas: [
                    {
                        texto: "Etiqueta",                                           
                    },
                    {
                        texto: "Etiqueta",                                            
                    }     
                ],
                colorFondoImagenes:"#ccc",
                colorFondoTexto:"#1c2c2c",
                imagenes: [
                    {
                        url: "../img/proyecto-defecto.png"
                    },
                    {
                        url: "../img/defecto.png"
                    }
                ],
                descripcion: "Descripción",
                botones: [
                    {
                        imagen: "../img/descargar.png",
                        texto: "Descargar",
                        color: "#07e71b",
                        url: "www."
                    }
                ]
            }
        ]
    },
    contacto: {
        id: "4",
        activo: false,
        orden: 0,
        titulo: "Contacto",
        alineacionTitulo: "center",
        colorTitulo: "#000",
        email: "",
        colorFondo: "#ffff",
        colorBoton: "#1a5fad",
        colorTextoBoton: "#ffff",
        colorBordes: "#000"
    }
}