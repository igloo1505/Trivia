import React, { useState } from "react";
import uuid from "uuid";
import { connect } from "react-redux";

import { Modal, Button } from "react-bootstrap";
import { addImage } from "../../actions/questionActions";

const UploadModal = ({ addImage, ...props }) => {
  const [toUpload, setToUpload] = useState(null);
  let id = uuid();
  const submitPhoto = (e) => {
    addImage(toUpload, id);
    props.onHide();
  };
  const handleChoose = (e) => {
    setToUpload(e.target.files[0]);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload ScreenShot
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          name="file"
          type="file"
          className="file-upload"
          data-cloudinary-field="image_id"
          data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
          onChange={(e) => handleChoose(e)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => submitPhoto(e)}>Submit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { addImage })(UploadModal);
