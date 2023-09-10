import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "reactstrap";
import PropTypes from "prop-types";

// Actions
import { deleteQuestionnaire, closeModal } from "@/store/actions";

export const ModalDelete = ({ data }) => {
  const dispatch = useDispatch();

  const { type, show } = useSelector((state) => ({
    type: state.Modal.type,
    show: state.Modal.show,
  }));

  return (
    <Modal isOpen={type === "deleteQuestionnaire" && show} backdrop={"static"}>
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">
          Menghapus Kuesioner
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => dispatch(closeModal())}
          aria-label="Close"
        />
      </div>
      <div className="modal-body">
        <p>
          Data yang sudah dihapus tidak dapat dikembalikan lagi. Apakah anda
          yakin ingin menghapus data ini?
        </p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => dispatch(closeModal())}
        >
          Batalkan
        </button>
        <button
          type="submit"
          className="btn btn-danger"
          onClick={() => dispatch(deleteQuestionnaire(data))}
        >
          Ya, Hapus
        </button>
      </div>
    </Modal>
  );
};

ModalDelete.propTypes = {
  data: PropTypes.object,
};
