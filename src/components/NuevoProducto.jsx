import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';
import { agregarProducto } from '../features/productos/productoSlice';

export const NuevoProducto = () => {

    //State del componente donde doy las caracteristica del objeto Producto
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        id:'',
    });

    //Dispatch para disparar los reducers del ProductoSlice
    const dispatch = useDispatch();

    //useNavigate para que al precionar el botron de agregar vuelva a la pagina del listado de productos
    const navigate = useNavigate();


    //Funcion HandleSubmit sirve para mandar los datos del formulario
    const handleSubmit = (e) =>{
        
        //Previene el default de recargar la pagina
        e.preventDefault();

        //Valido el formulario
        if(producto.nombre.trim() === '' || producto.precio<= 0){
            //Es un cartel de sweetalert que aparece si dejan un campo sin rellenar
             Swal.fire({
                 icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios!',
               })
              return;
        }

        //Agrega un producto nuevo
        dispatch(agregarProducto({
            ...producto,
            id: uuid(),
        }))

        Swal.fire({
            
            icon: 'success',
            title: 'Producto registrado',
            showConfirmButton: false,
            timer: 1500
          })

        //Redirecciona al main
        navigate('/Crud-Redux');

    };

    //Funcion HandleChange sirve para tomar los valores de los input
    const handleChange = (e) =>{
        setProducto({           //setProducto es la funcion que hace cambiar al state
            ...producto,        //...Producto lo que hace es que copia todo el state anterior   
            [e.target.name]: e.target.value, //Toma los valores del inpunt y los setea a los name del state
        })
    };

    return (
        <Fragment>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='text-center mb-4 font-weight-bold'>
                                Agregar Nuevo Producto
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                            >
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
                                    Agregar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
