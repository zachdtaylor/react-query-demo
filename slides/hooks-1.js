import React from "react";

const generatePDF = async (contents) => {
  // Generate PDF
  // ...
  // Returns a promise
};

const PDF = ({ pdfContents }) => {
  const [pdf, dispatch] = React.useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    { state: "idle", data: null, error: null }
  );

  React.useEffect(() => {
    dispatch({ state: "loading" });
    generatePDF(pdfContents).then(
      (data) => dispatch({ data, state: "resolved" }),
      (error) => dispatch({ error, state: "rejected" })
    );
  });

  if (pdf.state === "loading") {
    return <Spinner />;
  }

  if (pdf.state === "rejected") {
    return <Error message={pdf.error} />;
  }

  return <iframe title="PDF" src={pdf.data} />;
};

export default PDF;
