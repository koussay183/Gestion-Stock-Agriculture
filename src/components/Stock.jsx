import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useAuth } from '../contexts/authContext';
import { IoCubeOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import Loader from './Loader';
function Stock() {
    const { currentUser } = useAuth();
    const [movements, setMovements] = useState([]);
    const [editedMovement, setEditedMovement] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('product'); // Default filter type
    const [loading, setloading] = useState(true)
    useEffect(() => {
        const fetchMovements = async () => {
            
            if (currentUser) {
                const q = query(collection(firestore, 'movements'), where('user', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);
                const movementsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMovements(movementsData);
                setloading(false)
            }
        };
        fetchMovements();
    }, [currentUser]);

    const deleteMovement = async (movementId) => {
        try {
            await deleteDoc(doc(firestore, 'movements', movementId));
            setMovements(prevMovements => prevMovements.filter(movement => movement.id !== movementId));
        } catch (error) {
            console.error('Error deleting movement: ', error);
        }
    };

    const editMovement = (movement) => {
        setEditedMovement({ ...movement });
    };

    const saveMovement = async () => {
        try {
            await updateDoc(doc(firestore, 'movements', editedMovement.id), editedMovement);
            setEditedMovement(null);
            
            // Refetch movements after saving changes
            const q = query(collection(firestore, 'movements'), where('user', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            const movementsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMovements(movementsData);
        } catch (error) {
            console.error('Error saving movement: ', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEditedMovement(prevMovement => ({
            ...prevMovement,
            [id]: value
        }));
    };

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const filteredMovements = movements.filter(movement =>
        movement[filterType].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='Stock'>
            {loading && <Loader/>}
            <span className='shades' id='shade1'></span>
        
            <div className='StockHeader'>
                <div>
                    <IoCubeOutline/> Stock
                </div>
                <Link to="/dashboard/add-to-stock"><IoIosAddCircleOutline/>Stock</Link>
            </div>

            <div className='StockHolder'>
                <div className="filterOptions">
                    <label>
                        <input
                            type="radio"
                            value="product"
                            checked={filterType === 'product'}
                            onChange={handleFilterChange}
                        />
                        Product
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="date"
                            checked={filterType === 'date'}
                            onChange={handleFilterChange}
                        />
                        Date
                    </label>
                    {/* Add more radio buttons for other filter options */}
                </div>
                <div className='searchBarHolderInStock'>
                    <input
                        placeholder={`Search by ${filterType}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <label><FaSearch/></label>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Provider Name</th>
                            <th>Provider Contact</th>
                            <th>Note</th>
                            <th style={{textAlign : "center"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovements.map(movement => (
                            <tr key={movement.id}>
                                <td>{editedMovement && editedMovement.id === movement.id ? <input type="date" id="date" value={editedMovement.date} onChange={handleInputChange} /> : movement.date}</td>
                                <td>{editedMovement && editedMovement.id === movement.id ? <input type="text" id="product" value={editedMovement.product} onChange={handleInputChange} /> : movement.product}</td>
                                <td>{editedMovement && editedMovement.id === movement.id ? <input type="number" id="price" value={editedMovement.price} onChange={handleInputChange} /> : movement.price}</td>
                                <td>{editedMovement && editedMovement.id === movement.id ? <input type="number" id="quantity" value={editedMovement.quantity} onChange={handleInputChange} /> : movement.quantity}</td>
                                <td>{editedMovement && editedMovement.id === movement.id ? <input type="text" id="providerName" value={editedMovement.providerName} onChange={handleInputChange} /> : movement.providerName}</td>
                                <td>{editedMovement && editedMovement.id === movement.id ? <input type="text" id="providerContact" value={editedMovement.providerContact} onChange={handleInputChange} /> : movement.providerContact}</td>
                                <td>{editedMovement && editedMovement.id === movement.id ? <textarea id="note" value={editedMovement.note} onChange={handleInputChange}></textarea> : movement.note}</td>
                                <td style={{display : "flex" , justifyContent : 'center'}}>
                                    {editedMovement && editedMovement.id === movement.id ? (
                                        <button onClick={saveMovement}>Save</button>
                                    ) : (
                                        <>
                                            <button onClick={() => deleteMovement(movement.id)} style={{backgroundColor : '#DC3545',color : "white"}}>Delete</button>
                                            <button onClick={() => editMovement(movement)}>Update</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Stock;
