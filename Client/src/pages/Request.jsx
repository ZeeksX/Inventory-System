import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Brand from "../components/brand/Brand";
import RequestService from "../components/modals/RequestService";
import RegistrationModal from '../components/modals/RegistrationModal';
import PurchaseProduct from "../components/modals/PurchaseProduct";
import LoginUser from '../components/LoginUser'; // Import the Login component
import { useAuth } from "../components/Auth"; // Assuming you have an Auth context

const Request = ({ sidebarOpen, toggleSidebar }) => {
  const [item, setItem] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    customerName: '',
    customerEmail: '',
    phoneNumber: '',
    phoneModel: '',
    issueDescription: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // New state for registration
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  const auth = useAuth(); // Use the Auth context to check the user's state

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const navItems = ["Home", "About", "Contact"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRegistrationClose = () => {
    setOpen(false);
    setIsRegistered(true);
  };

  const handleRegistrationSuccess = () => {
    setIsRegistered(true); // Update registration state on success
    setOpen(false); // Close registration modal
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      customerName: username,
      customerEmail: email,
      phoneNumber: newRequest.phoneNumber,
      item: item,
      totalPrice: 200.00,
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/request/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitService = async (e) => {
    e.preventDefault();
    if (
      newRequest.customerName &&
      newRequest.customerEmail &&
      newRequest.phoneNumber &&
      newRequest.phoneModel &&
      newRequest.issueDescription
    ) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/request/service', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRequest),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Service Request Success:', result);
        closeModal();
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('All fields are required');
    }
  };

  const openModal = (type) => {
    setFormType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setNewRequest({ customerName: '', customerEmail: '', phoneNumber: '', phoneModel: '', issueDescription: '' });
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login status on successful login
  };

  return (
    <>
      <div className="flex flex-col items-center lg:justify-normal justify-center gap-2 lg:gap-12 p-4 w-full min-h-screen bg-[#f4f4f4]">
        <nav className="flex flex-col w-full p-2 lg:p-8 mb-0 lg:mb-4">
          <div className="hidden lg:flex flex-row items-center w-full h-8 justify-between">
            <Brand />
            <div className="flex flex-row gap-8 justify-between">
              <ul className="flex flex-row gap-8">
                {navItems.map((item) => (
                  <li key={item} className="text-[black] hover:text-[darkgrey] text-xl cursor-pointer">{item}</li>
                ))}
              </ul>
              <button onClick={handleClickOpen} className="rounded bg-blue-700 text-xl hover:bg-[green] text-white py-1 px-3 border border-transparent transition-all focus:outline-none focus:ring-2">
                Register
              </button>
            </div>
          </div>

          <div className="lg:hidden flex justify-center items-center p-2">
            <Brand />
          </div>
        </nav>

        {isLoggedIn ? (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-xl font-semibold mb-4">Choose an Option</h2>
            {isRegistered ? (
              <div className="flex gap-4">
                <Button
                  variant="contained"
                  sx={{ '&:hover': { backgroundColor: 'green' } }}
                  onClick={() => openModal('purchase')}
                >
                  Purchase an Item
                </Button>
                <Button
                  variant="contained"
                  sx={{ '&:hover': { backgroundColor: 'green' } }}
                  onClick={() => openModal('service')}
                >
                  Submit a Service Request
                </Button>
              </div>
            ) : (
              <p className="text-lg">Please register to access purchase and service options.</p>
            )}
          </div>
        ) : (
          <LoginUser onSuccess={handleLoginSuccess} /> // Render the Login component if not logged in
        )}

        <Modal open={modalOpen} onClose={closeModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 5
          }}>
            {formType === 'purchase' ? (
              <PurchaseProduct
                username={username}
                email={email}
                item={item}
                setUsername={setUsername}
                setEmail={setEmail}
                setItem={setItem}
                handleSubmit={handleSubmit}
              />
            ) : (
              <RequestService
                newRequest={newRequest}
                handleInputChange={handleInputChange}
                handleSubmitService={handleSubmitService}
                closeModal={closeModal}
              />
            )}
          </Box>
        </Modal>
        <RegistrationModal open={open} onClose={handleRegistrationClose} onSuccess={handleRegistrationSuccess} />
      </div>
    </>
  );
}

export default Request;