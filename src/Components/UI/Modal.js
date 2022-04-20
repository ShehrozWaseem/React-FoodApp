import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop}  onClick={props.onhideCartHandler}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {/* {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )} */}
      <Backdrop  onhideCartHandler={props.onhideCartHandler} />
      <ModalOverlay >{props.children}</ModalOverlay>
    </Fragment>
  );
};

export default Modal;