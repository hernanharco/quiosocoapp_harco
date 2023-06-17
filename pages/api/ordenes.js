import { PrismaClient } from "@prisma/client";


export default async function handler(req, res) {

    const prisma = new PrismaClient();

    //Obtener Ordenes
    const ordenes = await prisma.orden.findMany({
        where:{
            estado:false
        }
    })
    res.status(200).json(ordenes);

    //Crear Ordenes
    if(req.method === "POST") {
        const orden = await prisma.orden.create({
            data: {
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                fecha: req.body.fecha,
            },
        });

        // console.log(req.body);//se ve en el servidor
        // res.json({ metod: "POST!!!" });
        res.status(200).json(orden);
    }
    // } else {
    //     res.json({ metodo: "GET!!!" });
    // }
    
}