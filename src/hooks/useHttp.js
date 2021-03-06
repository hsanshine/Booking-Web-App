import { useReducer, useCallback } from "react";

const SEND = "SEND";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
export const STATUS_PENDING = "PENDING";
export const STATUS_COMPLETED = "COMPLETED";

function httpReducer(state, action) {
  if (action.type === SEND) {
    return {
      data: null,
      error: null,
      status: STATUS_PENDING,
    };
  }
  if (action.type === SUCCESS) {
    return {
      data: action.responseData,
      error: null,
      status: STATUS_COMPLETED,
    };
  }
  if (action.type === ERROR) {
    return {
      data: null,
      error: action.errorMessage,
      status: STATUS_COMPLETED,
    };
  }
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? STATUS_PENDING : null,
    data: null,
    error: null,
  });
  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: SEND });
      try {
        const response = await requestFunction(requestData);
        dispatch({ type: SUCCESS, responseData: response });
      } catch (err) {
        dispatch({
          type: ERROR,
          errorMessage: err.message || "Something went wrong",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
