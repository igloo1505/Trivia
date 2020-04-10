import {
  CORRECT_ANSWER,
  WRONG_ANSWER,
  SET_PLAYSTATE,
  SET_LOADING,
  GET_LEADERS,
  SET_LEADER,
  PLAY_ERROR,
  GAME_FINISH,
  RESET_GAME_FINISH,
  PLAY_LOADING,
} from "../Types";
import store from "../../store";
import Axios from "axios";

let reduxState = store.getState();
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const setPlayState = (reference) => async (dispatch) => {
  //   !!! Dont forget to change this number when questions added
  setLoading();
  try {
    const res = await Axios.get(`questions/${reference}/randomize`);

    dispatch({
      type: SET_PLAYSTATE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PLAY_ERROR,
      payload: error,
    });
  }
};

export const correctAnswer = (ques) => (dispatch) => {
  console.log(reduxState);
  console.log("received at action: ", ques);
  dispatch({
    type: CORRECT_ANSWER,
    payload: ques,
  });
};
export const gameOver = () => (dispatch) => {
  dispatch({
    type: GAME_FINISH,
  });
};
export const resetStatus = () => (dispatch) => {
  dispatch({
    type: RESET_GAME_FINISH,
  });
};

export const wrongAnswer = (ques) => (dispatch) => {
  console.log("received at action: ", ques);
  dispatch({
    type: WRONG_ANSWER,
    payload: ques,
  });
};

export const getLeaders = (organizationReference) => async (dispatch) => {
  console.log("running get leaders");
  try {
    const res = await Axios.get(`/leaderboard/${organizationReference}`);
    console.log("leaders response: ", res);
    dispatch({
      type: GET_LEADERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PLAY_ERROR,
      payload: error,
    });
  }
};

export const setLeader = (leader) => async (dispatch) => {
  console.log(leader);
  try {
    const res = await Axios.post("/leaderboard", leader, config);
    dispatch({
      type: SET_LEADER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PLAY_ERROR,
      payload: error,
    });
  }
};

export const setLoading = () => {
  return {
    type: PLAY_LOADING,
  };
};