import "./FailView.css";

const FailureView = ({ message, buttonText, handleClick }) => {
  return (
    <section className="fail_container">
      <img src="/public/list-creation-failure-lg-output.png" alt="failView" />
      <h1>{message}</h1>
      <button className="fail_button" onClick={handleClick}>{buttonText}</button>
    </section>
  );
};

export default FailureView;
