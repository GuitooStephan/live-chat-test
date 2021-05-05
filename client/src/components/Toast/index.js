import { Toast } from 'react-bootstrap';


const ToastComponent = props => {
    return (
        <Toast className={ props.type } delay={3000} autohide>
            <Toast.Body>{ props.text }</Toast.Body>
        </Toast>
    )
}

export default ToastComponent;
