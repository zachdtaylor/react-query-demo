import React from "react";

const generatePDF = async (contents) => {
  // Generate PDF
  // ...
  // Returns a promise
};

const useAsync = () => {
  const [{ state, data, error }, dispatch] = React.useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    { state: "idle", data: null, error: null }
  );

  const run = React.useCallback((promise) => {
    dispatch({ state: "loading" });
    promise.then(
      (data) => dispatch({ data, state: "resolved" }),
      (error) => dispatch({ error, state: "rejected" })
    );
  }, []);

  return { state, data, error, run };
};

const PDF = ({ pdfContents }) => {
  const { run, ...pdf } = useAsync();

  React.useEffect(() => {
    run(generatePDF(pdfContents));
  }, [run, pdfContents]);

  if (pdf.state === "loading") {
    return <Spinner />;
  }

  if (pdf.state === "rejected") {
    return <Error message={pdf.error} />;
  }

  return <iframe title="PDF" src={pdf.data} />;
};

export default PDF;
