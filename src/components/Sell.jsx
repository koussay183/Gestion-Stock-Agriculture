import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { GiSellCard } from "react-icons/gi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/authContext';

function Sell() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    dateOfSale: '',
    productName: '',
    quantity: '',
    factureId: '',
    price: '',
    note: '',
    clientName: '',
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
      const docRef = await addDoc(collection(firestore, 'sales'), formData);
      console.log('Document written with ID: ', docRef.id);

      // Show toast notification
      toast.success('Sale saved successfully!', {
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
        dateOfSale: '',
        productName: '',
        quantity: '',
        factureId: '',
        price: '',
        note: '',
        clientName: '',
        userUID: currentUser.uid
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Error saving sale. Please try again later.');
    }
  };

  return (
    <div className='Sell'>
      <div className='sellAddHeader'>
        <GiSellCard/> Sell
      </div>
      <form onSubmit={handleSubmit} className='SellForm'>
        
        <div><label>Date of Sale</label>
        <input type="date" placeholder='Type Date of Sale' name="dateOfSale" value={formData.dateOfSale} onChange={handleChange} required /></div>
        
       <div><label>Product Name</label>
        <input type="text" placeholder='Type Product Name' name="productName" value={formData.productName} onChange={handleChange} required /></div>
        
        <div><label>Quantity</label>
        <input type="number" placeholder='Type Quantity' name="quantity" value={formData.quantity} onChange={handleChange} required /></div>
        
        <div><label>Facture ID</label>
        <input type="text" placeholder='Type Facture ID' name="factureId" value={formData.factureId} onChange={handleChange} required /></div>
        
        <div><label>Price</label>
        <input type="number" placeholder='Type Price' name="price" value={formData.price} onChange={handleChange} required /></div>
        
        <div><label>Note</label>
        <textarea name="note" placeholder='Type Note' value={formData.note} onChange={handleChange}></textarea></div>
       
        <div> <label>Client Name</label>
        <input type="text" placeholder='Type Client Name' name="clientName" value={formData.clientName} onChange={handleChange} required /></div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Sell;