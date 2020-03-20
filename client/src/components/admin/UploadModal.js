import React, { useState } from "react";
import Dropzone from "react-dropzone";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import { Modal, Button } from "react-bootstrap";
import { addImage } from "../../actions/questionActions";

const UploadModal = props => {
  const [toUpload, setToUpload] = useState(null);
  const submitPhoto = e => {
    addImage(toUpload);
  };
  const handleChoose = e => {
    console.log(e.target.files[0]);
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
          class="file-upload"
          data-cloudinary-field="image_id"
          data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
          onChange={e => handleChoose(e)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={e => submitPhoto(e)}>Submit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadModal;
