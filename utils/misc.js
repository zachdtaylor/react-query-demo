export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const range = (length) => {
  return Array.from(Array(length).keys());
};

export const useAsync = (initialData = null) => {
  const [{ state, data, error }, dispatch] = React.useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    { state: "idle", data: initialData, error: null }
  );

  const run = React.useCallback((promise) => {
    dispatch({ state: "loading" });
    promise.then(
      (data) => dispatch({ data, state: "resolved" }),
      (error) => dispatch({ error, state: "rejected" })
    );
  }, []);

  return {
    isSuccess: state === "resolved",
    isLoading: state === "loading",
    isError: state === "rejected",
    state,
    data,
    error,
    run,
  };
};
