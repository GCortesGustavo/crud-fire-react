import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
    //Estados del componente
    const [ description, setDescription ] = useState('')
    const [ stock, setStock ] = useState(0)
    // Obtener la función de navegación de React Router
    const navigate = useNavigate()
    // Crear una referencia a la colección de productos en Firebase
    const productsCollection = collection(db, "products")
    
    // Función para almacenar un nuevo producto en la base de datos
    const store = async (e) => {
        e.preventDefault()  // Evitar que el formulario se envíe automáticamente
        await addDoc( productsCollection, { description: description, stock: stock } )
        navigate('/') //Dirige a la pagina principal
        //console.log(e.target[0].value)
}

return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Crear Producto</h1>
                <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Descripción</label>
                        <input
                            value={description}
                            onChange={ (e) => setDescription(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Stock</label>
                        <input
                            value={stock}
                            onChange={ (e)=> setStock(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>  
                    <button type='submit' className='btn btn-primary'>Guardar</button>
                </form>   
            </div>
        </div>
    </div> 
)
}

export default Create