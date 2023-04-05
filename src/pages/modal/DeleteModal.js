import React from "react";
import { Modal } from "react-bootstrap";

const DeleteModal = (props) => {
  return (
    <>
      <Modal.Header className="border-0">
        <div className="modal-hdr text-center w-100">
          <h4 className="">{props.headerString}</h4>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className=" modal-data-body text-center">
          <p className="mb-0">{props.bodyString}</p>
          <div className="col-12 mt-4">
            <div className="d-flex">
              <button className="comn-btn-class w-100 me-4" type="submit" onClick={() => props.callApi()}>
                Yes
              </button>
              <button className="comn-btn-class cancle-btn-class w-100" type="submit" onClick={() => props.closeModal()}>
                No
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default DeleteModal;
