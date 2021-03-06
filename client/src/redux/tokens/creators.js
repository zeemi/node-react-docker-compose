import ApiClient from '../../apiClient';
import {
  FETCH_TOKEN_STATISTIC_ERROR,
  FETCH_TOKEN_STATISTIC_REQUEST,
  FETCH_TOKEN_STATISTIC_SUCCESS,
  SET_WINDOWS_LIMIT,
  RESET_ALL
} from "./action";
import {getWindowsLimit} from "./selectors";

export const reset = () => {
  return {
    type: RESET_ALL
  }
};

export const setWindowsLimit = (length) => {
  return {
    type: SET_WINDOWS_LIMIT,
    payload: {length}
  }
};


const fetchTokenStatisticsRequest = (token) => {
  return {
    type: FETCH_TOKEN_STATISTIC_REQUEST,
    payload: {token}
  }
};

const fetchTokenStatisticsSuccess = (token, data) => {
  return {
    type: FETCH_TOKEN_STATISTIC_SUCCESS,
    payload: {token, data}
  }
};

const fetchTokenStatisticsError = (token, error) => {
  return {
    type: FETCH_TOKEN_STATISTIC_ERROR,
    payload: {token, error}
  }
};

export const fetchTokenStatistics = (token) => {
  return (dispatch, getState) => {
    dispatch(fetchTokenStatisticsRequest(token));
    new ApiClient().fetchTokenStatistics(token, getWindowsLimit(getState())).then(
      (data) => {
        dispatch(fetchTokenStatisticsSuccess(token, data));
      },
      (error) => {
        dispatch(fetchTokenStatisticsError(token, error));
      }
    )
  }
};
