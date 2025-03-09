import React from "react";
import Layout from "../../components/Layout/Layout";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
      </div>
    </Layout>
  );
};

export default PageNotFound;
