import React from "react";
import { useState } from "react";
import axios from "axios";
import { BACKEND_ROUTES } from "../config/urls";

const Popup = ({ showModal, setShowModal, clearCookie, flag,setFlag, VoteHandler, item }) => {
  const handleClose = () => setShowModal(false);
  const handleFlag = () => setFlag(false);
  const handleShow = () => setShowModal(true);

  console.log(item);

  const handleLogout = async () => {
    // Add code to handle logout
    await axios.get(BACKEND_ROUTES.logout, { withCredentials: true });
    clearCookie("connect.sid");
    handleClose();
    window.location.reload();
  };

  const handleVote = async () =>{
    VoteHandler(item);
    handleFlag();
    handleClose();
  }

  const handleVoteCancel = () =>{
    handleFlag();
    handleClose();
  }


  return (
    <>
      {showModal && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-white rounded-lg p-8'>
              <div className='mb-4'>
                {flag == true ? <h1 className='font-bold text-xl'>Vote Confirmation</h1> :
                                <h1 className='font-bold text-xl'>Logout Confirmation</h1>
                }
                {flag == true ? <p className='text-gray-500'>Are you sure you want to change your vote?</p> :
                  <p className='text-gray-500'>Are you sure you want to log out?</p>
                }
              </div>
              <div className='flex justify-end'>
                <button
                  className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2'
                  onClick={handleVoteCancel}
                >
                  Cancel
                </button>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                  onClick={flag == true ? handleVote :handleLogout}
                >
                  {flag == true ? "Change Vote" : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
