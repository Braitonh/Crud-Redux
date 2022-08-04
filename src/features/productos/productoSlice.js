import { createSlice } from '@reduxjs/toolkit';

export const productoSlice = createSlice({
    name: 'producto',
    initialState: {
        productos: [
          {
            nombre: 'Papas Fritas',
            precio: '500',
            id:'1',
          }
        ],
    },
    reducers: {
          //Crea un nuevo producto y lo agrega al state principal
          agregarProducto:(state, action) =>{
            state.productos.push(action.payload);
          },
          //El action trae un id y si un producto tiene mismo id es eliminado
          borrarProducto:(state,action) =>{
            const productoEncontrado = state.productos.find(producto => producto.id === action.payload );
            if(productoEncontrado){
              state.productos.splice(state.productos.indexOf(productoEncontrado),1);
            }
          },
          editarProducto:(state, action) =>{
            const {id, nombre, precio} = action.payload;
            const productoEncontrado = state.productos.find(producto => producto.id === id);
            if(productoEncontrado){
              productoEncontrado.nombre = nombre;
              productoEncontrado.precio = precio;
            }

          }
    },
});


export const { agregarProducto, borrarProducto,editarProducto } = productoSlice.actions;
export default productoSlice.reducer;