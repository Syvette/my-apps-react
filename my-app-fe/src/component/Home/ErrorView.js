import { useRouteError } from 'react-router-dom';

function ErrorView() {
  const error = useRouteError();
  //   console.log(error);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, this project is not available or some error has occured!</p>
      <p>
        <i>
          <b>{`${error.status}`}</b>
          {` || ${error.statusText} || ${error.error.message}`}
        </i>
      </p>
    </div>
  );
}

export default ErrorView;
