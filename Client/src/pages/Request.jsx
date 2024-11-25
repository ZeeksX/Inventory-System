import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Brand from "../components/brand/Brand";
import RequestService from "../components/modals/RequestService";
import RegistrationModal from '../components/modals/RegistrationModal';
import PurchaseProduct from "../components/modals/PurchaseProduct";
import LoginUser from '../components/LoginUser';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Request = () => {
  const [item, setItem] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
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
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleRegistrationClose = () => {
    setOpen(false);
    setIsRegistered(true);
  };

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username,
      email,
      phoneNumber,
      itemToPurchase: item,
      quantity,
      totalCost,
    };

    if (!username || !email || !phoneNumber || !item || quantity < 1) {
      alert('Please fill out all required fields.');
      return;
    }

    console.log('Data being sent for purchase:', data);

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
      console.log('Purchase Success:', result);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitService = async (event) => {
    event.preventDefault();
    const serviceData = {
      customerName: newRequest.customerName,
      customerEmail: newRequest.customerEmail,
      phoneNumber: newRequest.phoneNumber,
      phoneModel: newRequest.phoneModel,
      issueDescription: newRequest.issueDescription,
    };

    console.log('Data being sent for service request:', serviceData);

    try {
      const response = await fetch('http://localhost:3000/api/v1/request/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Service Request Success:', result);
      setAlertMessage('Service request has been submitted successfully!');
      setAlertSeverity('success');
      setSnackbarOpen(true);
      setModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {

      console.error('Error:', error);
      setAlertMessage('Failed to submit the service request. Please try again.');
      setAlertSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  const openModal = (type) => {
    setFormType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setNewRequest({ customerName: '', customerEmail: '', phoneNumber: '', phoneModel: '', issueDescription: '' });
    setQuantity(1);
    setTotalCost(0);
    setUsername('');
    setEmail('');
    setPhoneNumber('');
    setItem('');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <div className="flex flex-col items-center lg:justify-normal justify-center gap-2 lg:gap-8 p-4 w-full min-h-screen bg-[#f4f4f4]">
        <nav className="flex flex-col w-full p-2 lg:p-8 mb-0 lg:mb-4">
          <div className="hidden lg:flex flex-row items-center w-full h-8 justify-center">
            <Brand />
          </div>
          <div className="lg:hidden flex justify-center items-center p-2">
            <Brand />
          </div>
        </nav>

        {isLoggedIn ? (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-xl font-semibold mb-4">Choose an Option</h2>
            {isRegistered || isLoggedIn ? (
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
          <LoginUser onSuccess={handleLoginSuccess} />
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
                itemToPurchase={item}
                quantity={quantity}
                phoneNumber={phoneNumber}
                setUsername={setUsername}
                setEmail={setEmail}
                setItem={setItem}
                setQuantity={setQuantity}
                setPhoneNumber={setPhoneNumber}
                handleSubmit={handleSubmit}
                totalCost={totalCost}
                setTotalCost={setTotalCost}
              />
            ) : (
              <RequestService
                newRequest={newRequest}
                handleInputChange={handleInputChange}
                handleSubmitService={handleSubmitService}
                closeModal={closeModal}
                snackbarOpen={snackbarOpen}
                handleSnackbarClose={handleSnackbarClose}
                alertMessage={alertMessage}
                alertSeverity={alertSeverity}
              />
            )}
          </Box>
        </Modal>
        <RegistrationModal open={open} onClose={handleRegistrationClose} onSuccess={handleRegistrationSuccess} />

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Request;