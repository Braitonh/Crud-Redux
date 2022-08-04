import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import { borrarProducto } from '../features/productos/productoSlice';

export const Producto = ({producto}) => {
  
  //Destrocturo el objeto producto para accercer a sus elementos
  const { nombre, precio, id } = producto;

  //useDispatch
  const dispatch = useDispatch();

  //UseNavigate
  const navigate = useNavigate();


  //Funcion handleDelete para borrar un producto
  const handleDelete = (id) =>{
    Swal.fire({
      title: 'Estas seguro que quieres eliminar?',
      text: "Esta accion no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
          dispatch(borrarProducto(id));
        Swal.fire(
          'Borrado!',
          'El producto ha sido eliminado correctamente',
          'success'
        )
      }
    })
  }

  const handleEdit = (e) =>{
    navigate(`/productos/editar/${id}`)
  }



  return (
    <tr>
    <td>{nombre}</td>
    <td><span className="font-weight-bold"> $ {precio} </span></td>
    <td className="acciones">
        <button 
            type="button"
            className="btn btn-primary mr-2"
            onClick={() => handleEdit(id)}
            >
            Editar
        </button>
        <button 
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(id)}
        >Eliminar </button>
    </td>
    </tr>
  )
}
