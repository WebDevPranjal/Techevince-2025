import React, {useEffect} from 'react';
import { FRONTEND_URL } from '../config/urls';

const Redirect = () => {

  useEffect(() => {
    // get local storage
    const redirect = localStorage.getItem("redirect");
    localStorage.removeItem("redirect");
    console.log(redirect);
    if (redirect) {
      window.location.href = `${FRONTEND_URL}${redirect}`;
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.location.href = `${FRONTEND_URL}`;
    }, 5000);
  }, []);

  return (
    <div className='h-screen w-screen grid place-items-center font-5xl'>
      Loading....
    </div>
  );
}

export default Redirect;
