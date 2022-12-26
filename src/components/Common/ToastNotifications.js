import React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastNotifications = () => {
    const notify = () => toast("Wow so easy!");
    return (
        <div>
            {/* <ThemeProvider theme={themes}> */}
            <button onClick={notify}>Notify!</button>
            <ToastContainer />
            {/* </ThemeProvider> */}
        </div>
    )
}
