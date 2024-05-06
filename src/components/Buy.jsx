import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/authContext';
import { GiSellCard } from 'react-icons/gi';

function Buy() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    dateOfBuy: '',
    productName: '',
    quantity: '',
    factureId: '',
    price: '',
    note: '',
    providerName: '',
    userUID: currentUser.uid
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add data to Firestore
      const docRef = await addDoc(collection(firestore, 'purchases'), formData);
      console.log('Document written with ID: ', docRef.id);
      
      // Show toast notification
      toast.success('Purchase saved successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      // Reset form fields
      setFormData({
        dateOfBuy: '',
        productName: '',
        quantity: '',
        factureId: '',
        price: '',
        note: '',
        providerName: '',
        userUID: currentUser.uid
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Error saving purchase. Please try again later.');
    }
  };

  return (
    <div className='Sell'>
      <div className='sellAddHeader'>
        <GiSellCard/> Buy
      </div>
      <form onSubmit={handleSubmit} className='SellForm'>
        
        <div><label>Date of Buy</label>
        <input type="date" name="dateOfBuy" value={formData.dateOfBuy} onChange={handleChange} required /></div>
        
        <div><label>Product Name</label>
        <input type="text" name="productName" placeholder='Type Product Name' value={formData.productName} onChange={handleChange} required /></div>
        
        <div><label>Quantity</label>
        <input type="number" name="quantity" placeholder='Type Quantity' value={formData.quantity} onChange={handleChange} required /></div>
        
        <div><label>Facture ID</label>
        <input type="text" name="factureId" placeholder='Type Facture ID' value={formData.factureId} onChange={handleChange} required /></div>
        
        <div><label>Price</label>
        <input type="number" name="price" placeholder='Type Price' value={formData.price} onChange={handleChange} required /></div>
        
        <div><label>Note</label>
        <textarea name="note" placeholder='Type Note' value={formData.note} onChange={handleChange}></textarea></div>
        
        <div><label>Provider Name</label>
        <input type="text" placeholder='Type Provider Name' name="providerName" value={formData.providerName} onChange={handleChange} required /></div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Buy;