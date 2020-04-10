import {
  CORRECT_ANSWER,
  WRONG_ANSWER,
  SET_PLAYSTATE,
  SET_LOADING,
  SET_RESULT,
  PLAY_ERROR,
  GAME_FINISH,
  RESET_GAME_FINISH,
  PLAY_LOADING,
} from "../Types";
import store from "../../store";
import Axios from "axios";

let reduxState = store.getState();

export const setPlayState = (reference) => async (dispatch) => {
  //   !!! Dont forget to change this number when questions added
  setLoading();
  try {
    const res = await Axios.get(`questions/${reference}/randomize`);
    console.log("randomized returns : ", res);
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

export const setLoading = () => {
  return {
    type: PLAY_LOADING,
  };
};
