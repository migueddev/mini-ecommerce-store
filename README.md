# Mini tienda ecommerce con HTML, CSS y Javascript

Este repositorio contiene un ejemplo de un carrito de compras desarrollado con principios de Programación Orientada a Objetos (POO), utilizando únicamente HTML, CSS, y JavaScript vanilla. Además, se han integrado herramientas como Webpack, Babel, y PostCSS para mejorar el desarrollo y la compatibilidad del código.

## Tabla de contenido

- [Características](#características)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [API](#api)
- [Contacto](#contacto)
- [Licencia](#licencia)

## Características

- **Catálogo de productos**: Los productos se cargan desde una API externa.
- **Agregar productos**: Añade productos desde el botón agregar al carrito.
- **Gestión de cantidades**: Aumenta, disminuye o elimina productos directamente desde el carrito.
- **Interfaz sencilla**: Todo el código de interfaz está escrito en HTML y CSS sin frameworks adicionales.
- **Configuración moderna**: Se utiliza Webpack para la compilación, Babel para la compatibilidad de código JS, y PostCSS con Autoprefixer para manejar los estilos CSS.

## Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript Vanilla**
- **Webpack**: Para empaquetar y optimizar los archivos.
- **Babel**: Para asegurar compatibilidad con navegadores más antiguos.
- **PostCSS**: Con la librería Autoprefixer para manejar prefijos CSS automáticamente.
- **API de Fake Store**: Los productos se obtienen de [Fake Store API](https://fakestoreapi.com).

## Instalación

1. Clona este repositorio a tu máquina local:

```bash
git clone https://github.com/migueddev/mini-ecommerce-store.git
```
2. Navega al directorio del proyecto:

```bash
cd mini-ecommerce-store
```

3. Instala las dependencias:
```bash
npm install
``` 

4. Para desarrollar y observar los cambios en tiempo real:
```bash
npm run dev
``` 
5. Para construir la versión optimizada para producción:
```bash
npm run build
``` 

## Uso

1. **Cargar Productos**: Los productos se cargan automáticamente desde la [Fake Store API](https://fakestoreapi.com). Si deseas consultar la documentación completa de esta API, puedes acceder [aquí](https://fakestoreapi.com/docs).

2. **Agregar al Carrito**: Haz clic en el botón "Agregar al Carrito" en cualquier producto para añadirlo al carrito de compras.

3. **Gestionar Cantidades**: Una vez en el carrito, puedes aumentar, disminuir o eliminar los productos según sea necesario.

## API

Este proyecto utiliza la [Fake Store API](https://fakestoreapi.com) para obtener productos ficticios. La API ofrece un catálogo de productos con información detallada. Puedes consultar la documentación completa en el siguiente enlace: [Fake Store API Docs](https://fakestoreapi.com/docs).

## Contacto

Conéctate conmigo en:

- [LinkedIn](https://www.linkedin.com/in/miguel-duran-romero/)
- [GitHub](https://github.com/migueddev)

## Licencia

Este proyecto está licenciado bajo la Licencia ISC.
Consulta el archivo [LICENSE](./LICENSE)
