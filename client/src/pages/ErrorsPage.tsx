import { useRouteError } from "react-router-dom";
const ErrorsPage = () => {
  const error = useRouteError();

  return <div>{JSON.stringify(error)}</div>;
};

export default ErrorsPage;
