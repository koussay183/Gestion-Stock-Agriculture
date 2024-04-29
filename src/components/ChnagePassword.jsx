import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { doPasswordChange } from '../firebase/auth';

function ChnagePassword() {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setPasswords(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    const saveChanges = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwords;

        // Validate if passwords match
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match');
            return;
        }
        const res = await doPasswordChange(currentPassword,newPassword)
        if( res.success ) {
            toast.success('Password updated successfully');
        }
    };
  return (
    <div className='ChnagePassword'>
        <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={"Bounce"}
    />
    <ToastContainer />
    <div className="passwordChangeHolder">
        <div>
            <label htmlFor="currentPassword">Current Password</label>
            <input type="password" id="currentPassword" value={passwords.currentPassword} onChange={handleInputChange} />
        </div>
        <div>
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" value={passwords.newPassword} onChange={handleInputChange} />
        </div>
        <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" value={passwords.confirmPassword} onChange={handleInputChange} />
        </div>
    </div>
    <div className='navigationFromChange'>
        <Link to="/dashboard/profile">Cancel</Link>
        <button onClick={saveChanges}>Save</button>
    </div></div>
  )
}

export default ChnagePassword