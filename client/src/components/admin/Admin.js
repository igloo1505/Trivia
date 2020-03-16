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

  //   let DynamicArray = [];
  //   if (questions) {
  //     for (var i = 0; i < questions.length; i++) {
  //       var catOutput = questions[i].category;
  //       if (DynamicArray.indexOf(catOutput) === -1) {
  //         DynamicArray.push(catOutput);
  //       }
  //     }
  //   }
  const AdminDisplay = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "2rem"
  };

  return (
    <div style={AdminDisplay}>
      <div>
        <QuestionForm />
      </div>
      <div>
        <h1>Column 2</h1>
      </div>
    </div>
  );
};

export default Admin;
