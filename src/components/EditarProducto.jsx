import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { editarProducto } from '../features/productos/productoSlice';


export const EditarProducto = () => {

    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',

    })

    //Traigo el array del state
    const { productos } = useSelector(state => state.productos);

    //Dispatch
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const params = useParams() //params me sirve para ver el indice de la url

    //Lleno el state de los input con los datos 
    useEffect(() => {
        if (params.id) {
            setProducto(productos.find(producto => producto.id === params.id))
        }
    }, [params.id, productos])

    //Funcion HandleChange sirve para tomar los valores de los input
    const handleChange = (e) => {
        setProducto({           //setProducto es la funcion que hace cambiar al state
            ...producto,        //...Producto lo que hace es que copia todo el state anterior   
            [e.target.name]: e.target.value, //Toma los valores del inpunt y los setea a los name del state
        })
    };


    //Funcion HandlSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Desea guardar los cambios?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `No guardar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Los cambios fueron gurdados!', '', 'success')
                dispatch(editarProducto(producto));
                //Redirecciona al main
                setTimeout(() => {
                    navigate('/Crud-Redux');
                }, 1000);
            } else if (result.isDenied) {
                Swal.fire('Los cambios no fueron gurdados!', '', 'info')
                return;
            }
        })





    }


    return (
        <Fragment>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='text-center mb-4 font-weight-bold'>
                                Editar Producto
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label>Nombre Producto</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder='Nombre Producto'
                                        name='nombre'
                                        value={producto.nombre}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Precio Producto</label>
                                    <input
                                        type="number"
                                        className='form-control'
                                        placeholder='Precio Producto'
                                        name='precio'
                                        value={producto.precio}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                                >
                                    Guardar Cambios
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
