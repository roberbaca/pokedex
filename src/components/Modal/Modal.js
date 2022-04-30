import React from 'react'
import ReactDom from 'react-dom'
import '../../styles/components/Modal.css';
import '../../styles/Global.css';

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ open, children, onClose }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div className='modal__card'>
        <div className='modal__header'>
          <h2 className='modal__title'>Info</h2>
          <button onClick={onClose} className='modal__button'>x</button>
        </div>

        <div className='modal__infocontainer'>
        {children}
        </div>    
      </div>
    </>,
    document.getElementById('portal')
  )
}