import React, { useEffect } from "react";
import { loadUser } from "../../actions/userActions";
// import Questions from "../questions/Questions";
import QuestionForm from "./QuestionSubmitForm";
// import QuestionFilter from "../questions/QuestionFilter";

const Admin = () => {
  useEffect(() => {
    console.log(
      "Add graphql query call here to return questions based on search, and paginate"
    );
    loadUser();
    // eslint-disable-next-line
  }, []);
  const AdminDisplay = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "2rem"
  };

  return (
    <div>
      <QuestionForm />
    </div>
  );
};

export default Admin;
