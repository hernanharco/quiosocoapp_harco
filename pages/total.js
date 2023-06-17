
import { useEffect } from "react";
import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

    const comprobarPedido = () => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3;
    }

    useEffect(() => {
      comprobarPedido();
    }, [pedido, nombre])
      
    return (
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className="text-4xl font black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu Pedido a Continuación</p>

            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label 
                        htmlfor="nombre"
                        className="block uppercase text-slate-800 font-bold" 
                    >
                        Nombre
                    </label>

                    <input 
                        id="nombre"
                        type="text" 
                        name="" 
                        value={nombre}  
                        className="bg-gray-200 w-full lg:-1/3 mt-3 p-2 rounded-md"                  
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                  <p className="text-2xl">Total a Pagar{''} <span className="font-bold">
                    
                    {formatearDinero(total)}
                    </span></p>  
                </div>

                <div className="mt-5">
                    <input 
                        type="submit" 
                        name="" 
                        className={`${comprobarPedido() 
                            ? 'bg-indigo-100' 
                            : 'bg-indigo-600 hover:bg-indigo-800'} 
                        w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                        value="Confirmar Pedido"
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )
}