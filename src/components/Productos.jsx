import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Producto } from './Producto';

export const Productos = () => {

    const {productos} = useSelector (state => state.productos);
    
    return (
        <Fragment>
            <h2 className='text-center my-5'>Listado de Productos</h2>

            <table className='table table-striped'>
                <thead className='bg-primary table-dark '>
                    <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Precio</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map ( producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    )
}
