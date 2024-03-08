import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc} from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const MySwal = withReactContent(Swal)


const Show = () => {
    //hooks
    const [products, setProducts] = useState( [] )

    //Referencias a DB
    const productsCollection = collection(db, "products")

    //Funcion para mostrar todos los docs
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        // console.log(data.docs);

        setProducts(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        )
        console.log(products);
    }

    //Funcion para eliminar doc
    const deleteProduct = async (id) => {
        const productsDoc = doc(db, "products",id)
        deleteDoc(productsDoc)
        getProducts()
    }
    //Funcion pde confirmacion para sweet aler

    //Usamos use effect
    useEffect(() => {
        getProducts()
        // eslint-disabled-next-line
    },[])

    //Devolvemos vista de nuestro componente

    return (
        <div>Show</div>
    )
}

export default Show