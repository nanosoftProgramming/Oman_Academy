import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function CustomModel({show,handleClose,ModalBody,ModalFooter}) {
  return (
    <>

          <Modal show={show} onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
          >
{ModalBody}
  {ModalFooter}
      </Modal>

      
    </>
  )
}

export default CustomModel
