# Proyecto de Inscripción de Alumnos

## Objetivo

El propósito de este proyecto es inscribir a un número determinado de alumnos en diferentes cursos utilizando una plataforma externa. La meta es crear un sistema que procese inscripciones de manera eficiente, teniendo en cuenta las limitaciones y requisitos específicos.

## Consideraciones Clave

- **API Externa**: No tenemos control sobre la API externa. Es crucial leer y entender la documentación adjunta para comprender su funcionamiento.
- **Datos Duplicados**: El archivo JSON proporcionado contiene registros duplicados. Se recomienda eliminar los duplicados antes de procesarlos.
- **Base de Datos NOSQL**: Por ahora, nos centraremos solo en la persistencia de datos, sin entrar en detalles sobre la conexión o la lectura de la base de datos.

## Objetivos Secundarios

- Resolver errores durante el desarrollo para obtener un ejemplo funcional.
- Fomentar el trabajo en equipo y la comunicación para encontrar soluciones creativas y efectivas. Todas las ideas son bienvenidas y consideradas valiosas.

## Tecnologías

- Node.js
- TypeScript
- MongoDB

## API de Inscripción

### Método POST para Inscripciones

- **Path**: `/inscripción`
- **RequestBody**:
  ```json
  [
    {
      "curso": "string",
      "email": "string",
      "nombre": "string",
      "apellido": "string",
      "dni": "string",
      "telefono": "string"
    },
    // otros registros
  ]
**Response**: Devuelve el objeto inscrito junto con un ID de inscripción y un ID de curso.

## API de Cursos

Leer la documentación de la API de Cursos en [Link](https://enroll-course-thirdparty.vercel.app/) para más detalles.