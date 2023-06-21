import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


export function Notify(type='toast',message='',icon=''){
    // icon = error, info, success, warning

    switch (type) {
        case 'toast': toast(message, {type: icon}); break;
        case 'alert': Swal.fire(message,'',icon); break;
        default: break; 
    }
}


export function Notifications(){
    return <ToastContainer position="top-right" hideProgressBar={true}/>
}