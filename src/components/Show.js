import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Show = () => {
  //1 - configuramos los hooks
    const [products, setProducts] = useState( [] )

    //2 - referenciamos a la DB firestore
    const productsCollection = collection(db, "products")

    //3 - Funcion para mostrar TODOS los docs
    const getProducts = async ()   => {
    const data = await getDocs(productsCollection)
    //console.log(data.docs)
    setProducts(
        data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
    )
    //console.log(products)
    }


    //4 - Funcion para eliminar un doc
    const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id)
    await deleteDoc(productDoc)
    getProducts()
    }

    
    //5 - Funcion de confirmacion para Sweet Alert 2
    const confirmDelete = (id) => {
        MySwal.fire({
        title: '¿Elimina el producto?',
        text: "Segura? No se va a poder revertir la eleccion :/",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) { 
            //llamamos a la fcion para eliminar   
            deleteProduct(id)               
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
        }
        })    
    }
    
    useEffect( () => {
        getProducts()
        // eslint-disable-next-line
    }, [] )
    
    return (
        <>
        <div className='container'>
        <div className='row'>
            <div className='col'>                
                <table className='table table-bordered table-hover' style={{ backgroundColor: '#ffebb2' }}>
                    <thead style={{ color: '#e59be9' }}>
                    <tr>
                        <th>Descripcion</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    { products.map( (product) => (
                        <tr key={product.id}>
                        <td>{product.description}</td>
                        <td>{product.stock}</td>
                        <td>
                            <Link to={`/edit/${product.id}`} className="btn btn-light me-2"><i className="fa-solid fa-pencil"></i></Link>
                            <button onClick={ () => { confirmDelete(product.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                        </td>
                        </tr>                
                    )) }
                    </tbody>
                </table>
                <div className="d-grid gap-2">
                    <Link to="/create" className='btn btn-secondary mt-2 mb-2' style={{ backgroundColor: '#d862bc' }}>Crear nuevo Producto</Link>    
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Show