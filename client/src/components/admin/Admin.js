import React, { useEffect } from "react";
import { loadUser } from "../../actions/userActions";

import QuestionForm from "./QuestionSubmitForm";

const Admin = () => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  const AdminDisplay = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "2rem",
  };

  return (
    <div>
      <QuestionForm />
    </div>
  );
};

export default Admin;
