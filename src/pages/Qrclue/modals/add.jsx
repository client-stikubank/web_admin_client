import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "reactstrap";

// Actions
import { closeModal } from "@/store/actions";

// Form
import FormData from "../forms/data";

export const ModalAdd = () => {
  const dispatch = useDispatch();

  const { type, show } = useSelector((state) => ({
    type: state.Modal.type,
    show: state.Modal.show,
  }));

  return (
    <Modal isOpen={type === "addQrclue" && show} backdrop={"static"}>
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">
          Menambahkan QR Petunjuk (Clue)
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => dispatch(closeModal())}
          aria-label="Close"
        />
      </div>
      <FormData />
    </Modal>
  );
};
