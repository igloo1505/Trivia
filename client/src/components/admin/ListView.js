import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getQuestions } from "../../actions/questionActions";

const ListView = ({
  user: {
    user: { adminStatus, organizationReference, organizationName }
  },
  getQuestions
}) => {
  console.log(adminStatus, organizationName, organizationReference);
  useEffect(() => {
    getQuestions(organizationReference);
  }, []);
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Header Two</h2>
      <p>calling getQuestions here</p>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { getQuestions })(ListView);
