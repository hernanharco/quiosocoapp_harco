This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

para instalar next version 12
    npx create-next-app@12 nombre-del-proyecto
    
    npx create-next-app@latest
 
    yarn create next-app
 
    pnpm create next-app

    Ok to proceed? (y) y

Instalar la dependencia de desarrollo.
npm i -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
para crear el postcss.config.js y el tailwind.config.js

utilización de capa de conexión con la base de datos
prisma.io
    abrimos mysql
        mysql -u root -p
        creamos la base de datos
        create database quioscoapp;
    
    creamos la dependencias
    npm i -D prisma
    npm i @prisma/client
    npx prisma init
        con esto crea la variables de entorno ubicada en .env
        crea la carpeta  de  prisma
    
    extensiones
        Prisma con mas de 273.013 descargas

    se hacen cambios en la carpeta prisma-schema.prisma 
    en la parte 
        datasource db {
            provider = "xxxxx" -> colocamos la bd en esteproyecto es "mysql"
        }
    se modifica en la variable de entorno
    se encontraba 
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    queda -> DATABASE_URL="mysql://usuario:contraseña@localhost:3306/quioscoaapp"

    trabajamos en el archivo de schema.prisma en donde agregamos las tablas para este ejercicio
    creamos 
        model Producto {
            id Int @id @default(autoincrement())
            nombre String
            precio Float
            imagen String
            categoria Categoria @relation( fields: [categoriaId], references: [id] )
            categoriaId Int
        }

        model Categoria {
            id Int @id @default(autoincrement())
            nombre String
            icono String
            productos Producto[]
        }

    vamos a crear la migración
        npx prisma migrate dev - ** OJO se utiliza para crear la base de datos **
            se da un nombre
        new migration> categorias y productos

    utilizamos TablePlus -> para revisar como esta quedando nuestra base de datos

    vamos a crear otra table
        model Orden {
            id Int @id @default(autoincrement())
            nombre String
            icono String
            total Float
            pedido Json
        }

    Debemos hacer otra migración - tener presente para que funciones debemos
    hacer una  migracion primero
        npx prisma migrate dev
            se da un nombre en este caso estamos dando el nombre  de ordenes
        new migration> ordenes

    **Si queremos resetear la información de los datos en la tabla pero mantiene las migraciones anteriores
        npx prisma migrate reset
    
    ** Para utilizar una ventana en donde podemos visualizar los datos
        npx prisma studio

    *** Seeding a una base de datos Prisma - Vamos a ingresar información video 367
        en este video podemos ver como agregar la información que tenemos en un 
        archivo ***

    Como la información que estamos manejando es typescript debemos instalar una dependencia. es el node que soporta el typescript
        npm i ts-node -> la version de node que maneja typescrit
        si utilizamos yarn
        yarn add -D ts-node typescript @types/node
    
    para que ejecute el archivo que hemos creado debemos de agregar en el 
    package.json

    ejecutamos el comando
        npx prisma db seed 
            -> forma del profesor no me funciono
            "prisma": {
                "seed": "ts-node prisma/seed.ts"
            },
        
              
            -> forma de estudiante funciono correctamente   
        "prisma": {
            "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
        },     

    
    OJOOOOO
    el getServerSideProps -> debes escribirlo bien  o sino no funciona y no trae los  datos
    export const getServerSideProps = async () => {
        const prisma = new PrismaClient();

        const categorias = await prisma.categoria.findMany();

        console.log(categorias);

        return {
            props: {
            categorias,
            }
        }
    }

    otra forma de poder traer los datos es utilizando la forma que esta en la carpeta de api

    npm i axios

para que funcione el modal debemos hacer la siguiente instalación
    npm i react-modal
    en este archivo se esta trabajando en el archivo del Layout

    utilizacion de 
    npm i react-toastify para la ventanas modales de algun proceso

** Seccion 29 Crear Registros y Procesos
Creando el Endpoint en manejo de API
Lo encontramos en pages-api y se va hacer la clase de ordenes 
    GET -> para visitar un sitio
    POST -> para enviar datos a un sitio
    PUT & PATCH -> PARA actualizar un recurso
    DELETE -> Para eliminarlo

Conectando Provides con ordenes.js
 se puede  ver en QuioscoProvider en la linea 100 
    const {data} = await axios.post('/api/ordenes')
    vamos a ingresar los datos
Todo se hace  en QuioscoProvider en la parte de colocarOrden

** Area de Administración
1. pages
    clase -> admin.js
2. Layout
    clase -> AdminLayout.js
        copiamos un git que tiene el profesor en los materiales video 404
3. Se hizo un cambio en prisma se agrego el estado
    estado Boolean @default(false) valor por defecto false
    se abre una nueva terminal
    npx prisma migrate dev
    nombre -> estado
4. creando endpoint para obtener ordenes
    vamos pages/api/ordenes -> ordenes.js
    en la parte de //Obtener Ordenes

utilizando swr -- sirve para obtener los datos
    npm i swr
 se trabaja en admin.js

 import { toast } from "react-toastify" -> nos ayuda a ver si un mensaje en la parte lateral de la pantalla se utiliza para dar mensajes

 5. Para actualizar un ventana en tiempo real con useSWR

 6. Deployment del Proyecto

 *** Para subirlo a git ***
 echo "# criptos-react" >> README.md
git init
git add README.md -> cambiarlo por git add . (para que agregue todo)
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/hernanharco/criptos-react.git
git push -u origin main

*** Para actualizar el git ***
actualizar un archivo de en git - cargar otra información
git checkout  -b ******* main -> se hace una nueva rama
git add . -> para que agregue solo los archivos que hubieron cambios
git commit -m "texto texto texto"
git checkout main
git merge ****** -> se debe colocar el mismo nombre  que se coloco en  la primera linea
git branch -d ****** -> vamos a eliminar el branch

vamos a publicarlo nuevamente
git push -u origin main
si queremos ver los cambios le damos en History ubicados en github
para aprender busar pagina

atlassian.com/es/git/tutorials/using-branches



