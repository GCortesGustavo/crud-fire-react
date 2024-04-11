import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = () => {
    //Estados
    const [ description, setDescription ] = useState('')
    const [ stock, setStock ] = useState(0)

    const navigate = useNavigate()    
    const {id} = useParams()

    //Funcion para actualizar un producto
    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, "products", id)
        const data = {description: description, stock: stock}
        await updateDoc(product, data)
        navigate('/')
    }


    //Funcion para obtener un produtco por id
    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "products", id) )
        if(product.exists()) {
            //console.log(product.data())
            setDescription(product.data().description) // Actualizar la descripción del producto en el estado
            setStock(product.data().stock) // Actualizar el stock del producto en el estado
        }else{
            console.log('El producto no existe')
        }
    }

    useEffect( () => {
        getProductById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container" style={{ backgroundColor: '#ffebb2', padding: '20px', borderRadius: '10px' }}>
            <div className="row">
                <div className="col">
                    <h1 style={{ color: '#d862bc' }}>Editar Producto</h1>
                    <form onSubmit={update}>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: '#e59be9' }}>Descripción</label>
                            <input
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: '#8644a2' }}>Stock</label>
                            <input
                                value={stock}
                                onChange={e => setStock(e.target.value)}
                                type="number"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#d862bc', borderColor: '#d862bc' }}>Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit