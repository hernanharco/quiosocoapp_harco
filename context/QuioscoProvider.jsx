
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();


const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter();

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data);
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce(
            (total, producto) => (producto.precio * producto.cantidad) + total, 0)

        setTotal(nuevoTotal);
    }, [pedido])


    const handleClickCategoria = id => {
        // console.log(id);
        const categoria = categorias.filter(cat => cat.id === id)
        // console.log(categoria);
        setCategoriaActual(categoria[0]);

        router.push('/');
    }

    const handleSetProducto = producto => {
        setProducto(producto);
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }

    const handleAgregarPedido = ({ categoriaId, ...producto }) => {

        if (pedido.some(productoState => productoState.id === producto.id)) {
            //Actualizar la cantidad que se tiene
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado);
            // console.log('El producto ya existe')

            toast.success('Guardado Correctamente')
        } else {
            //Agrega el pedido
            // console.log(producto)
            setPedido([...pedido, producto]);
            // console.log('El producto no existe')
            toast.success('Agregado al pedido')
        }

        setModal(false);

    }

    const handleEditarCantidades = id => {
        // console.log(id);
        const productoActulizar = pedido.filter(producto => producto.id === id)

        setProducto(productoActulizar[0])

        setModal(!modal);
    }

    const handleEliminarProducto = id => {
        const pedidoActulizar = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActulizar)
    }

    const colocarOrden = async (e) => {
        e.preventDefault();
        // console.log('Enviando Orden...');

        try {
            const { data } = await axios.post('/api/ordenes', {
                pedido, nombre, total,
                fecha: Date.now().toString()
            })
            // console.log(data);            
            setCategoriaActual(categorias[0]);            
            setPedido([]);
            setNombre('');
            setTotal(0);

            //para mostrar el mensaje
            toast.success('Pedido Realizado Correctamente')

            setTimeout(() => {
                router.push('/');
            }, 3000);

        } catch (error) {
            console.log(error);
        }

        // console.log(pedido);
        // console.log(nombre);
        // console.log(total);
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total

            }}
        >
            {children}
        </QuioscoContext.Provider>

    )
}

export {
    QuioscoProvider
}

export default QuioscoContext

