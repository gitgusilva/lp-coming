import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sendToast = (message, error) => {
    let options = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    return !error ? toast.success(message, options) : toast.error(message, options);
}

const ToastBody = () => {
    return (
        <ToastContainer
            position="top-right" autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
    );
}

export {sendToast, ToastBody};
