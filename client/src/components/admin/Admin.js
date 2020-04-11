import React, { useEffect } from "react";
import { loadUser } from "../../actions/userActions";

import QuestionForm from "./QuestionSubmitForm";

const Admin = () => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <QuestionForm />
    </div>
  );
};

export default Admin;
