import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { setToastClose } from 'redux_store/actions';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    const toast = useSelector(state => state.toast)
    const dispatch = useDispatch()


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setToastClose())
    };

    return (

        <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={toast.type} sx={{ width: '100%' }}>
                {toast.message}
            </Alert>
        </Snackbar>
    );
}