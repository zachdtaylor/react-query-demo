import React from "react";

const generatePDF = async (contents) => {
  // Generate PDF
  // ...
  // Returns a promise
};

const transition = (state, event, transitions) => {
  return transitions[state.state][event.type]
    ? transitions[state.state][event.type](event, state)
    : state;
};

const exec = (state, effects) =>
  effects[state.state] && effects[state.state](state);

const asyncReducer = (state, event) =>
  transition(state, event, {
    IDLE: {
      LOAD: (context) => ({ state: "LOADING", context }),
    },
    LOADING: {
      ASYNC_SUCCESS: ({ data }) => ({ state: "SUCCESS", data }),
      ASYNC_ERROR: ({ error }) => ({ state: "ERROR", error }),
    },
    SUCCESS: {
      LOAD: (context) => ({ state: "LOADING", context }),
    },
    ERROR: {
      LOAD: (context) => ({ state: "LOADING", context }),
    },
  });

const initalState = {
  state: "IDLE",
};

const useAsync = (fn) => {
  const reducer = React.useReducer(asyncReducer, initalState);
  const [async, dispatch] = reducer;

  React.useEffect(() => {
    exec(async, {
      LOADING: (state) =>
        fn(state)
          .then((data) => dispatch({ type: "ASYNC_SUCCESS", data }))
          .catch((error) => dispatch({ type: "ASYNC_ERROR", error })),
    });
  }, [async.state]);

  return reducer;
};

const usePDF = (pdfContents) => {
  const pdfReducer = useAsync(() => generatePDF(pdfContents));
  const [_, dispatch] = pdfReducer;

  React.useEffect(() => {
    dispatch({ type: "LOAD" });
  }, [pdfContents]);

  return pdfReducer;
};

const PDF = ({ pdfContents }) => {
  const [pdf, dispatch] = usePDF(pdfContents);

  return (
    <div>
      {pdf.state === "LOADING" ? (
        <Spinner />
      ) : pdf.state === "ERROR" ? (
        <Error message={pdf.error} />
      ) : pdf.state === "SUCCESS" ? (
        <iframe title="PDF" src={pdf.data} />
      ) : (
        <p>No PDF</p>
      )}
      <button onClick={() => dispatch({ type: "LOAD" })}>
        {pdf.state === "IDLE"
          ? "Load PDF"
          : pdf.state === "LOADING"
          ? "Loading..."
          : "Retry"}
      </button>
    </div>
  );
};

export default PDF;
