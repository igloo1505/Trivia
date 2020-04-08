import React, { useState } from "react";
import { Toast } from "react-bootstrap";

const InsufficientToast = () => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  return (
    <div>
      <Toast show={show} onClose={toggleShow}>
        <Toast.Header>
          <strong className="mr-auto">Woops</strong>
        </Toast.Header>
        <Toast.Body>
          It doesn't look like there's enough questions yet.
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default InsufficientToast;
