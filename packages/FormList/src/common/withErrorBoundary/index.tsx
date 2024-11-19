import React from "react";

export const WithErrorBoundary = (Component: React.FunctionComponent<any>) => {
  return (props: any) => {
    try {
      return <Component {...props} />;
    } catch (ex) {
      console.log(ex, "--ex");
      if (typeof ex == "string") return <>{ex}</>;

      if (ex instanceof Error) return <>{ex.message}</>;
    }
  };
};
