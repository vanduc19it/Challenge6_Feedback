import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface Props {
  children: React.ReactNode;
}

function HelmetComponent({ children }: Props) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{children}</title>
        </Helmet>
      </HelmetProvider>
    </>
  );
}

export default HelmetComponent;
