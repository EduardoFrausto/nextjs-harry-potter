## Requisitos para ejecutar el proyecto

- Node.js 18.17 o posterior

## Instalar dependencias
Antes de iniciar el proyecto es necesario instalar las dependencias de node con el comando:
```bash
npm install
```

## Ejecutar el proyecto

Primero es necesario iniciar el servidor json-server con el comando:

```bash
npm run start-server
```

Esto iniciara el servido en el puerto [3001](http://localhost:3001/characters) y configurado para cargar el contenido del archivo
con los datos de los personajes

Con el servidor json-server ya en ejecución es posible iniciar la aplicación de Next con cualquiera de los comandos
estándar:

```bash
npm run dev
```

La aplicación estará lista en la url [http://localhost:3000](http://localhost:3000)

## Pruebas unitarias
La aplicación utiliza jest para realizar las pruebas unitarias, se puede iniciar directamente con el siguiente comando:
```bash
npm run test
```

## ¿Que más te gustó de tu desarrollo?
El haber implementado los estilos para el diseño en escritorio y móvil sin librerías de css como bootstrap o tailwind css
y la manera en que fui organizando los componentes para poderlos estar reutilizando a lo largo de la aplicación y no 
tener archivos tan grandes de código.

## Si hubieras tenido más tiempo ¿qué hubieras mejorado o qué más hubieras hecho?
Investigaría más acerca de los conceptos de testing. Es la primera vez que escribo pruebas unitarias para 
los componentes y a pesar de conocer las bases de como se realizan estas pruebas, al ser la primera vez tuve 
problemas para definir que aspectos someter a testing. 

También investigaría como agregar compatibilidad entre react-redux y jest, ya que por falta de conocimientos no pude
configurar la integración de estas librerías lo que me impidió agregar pruebas a componentes que dependen de redux.

## Descríbenos un pain point o bug con el que hayas encontrado y como lo solucionaste
Durante el desarrollo me surgieron errores menores relacionados con css, como por ejemplo al querer crear el modal 
mi intención desde un inicio era desactivar el scroll de la pantalla para que el modal quedase fijo en el centro,
u otros errores relacionados con la librería de json-server al no conocerla previamente y suponer como funcionaría.
Al final esos errores de css los resolví buscando en la documentación o en stackoverflow como poder realizar lo
que quería en css.
Para resolver los problemas cn json-server simplemente realice pruebas con Postman para conocer como se comportaba
la librería.
