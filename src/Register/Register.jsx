import "./register.css";
import Modal from "../Modal/Modal";

export default function Register(props) {
  document.body.classList.remove("body--login");
  document.body.classList.add("body--register");

  const { handleChange, handleSubmit, handlePaging, showModal, setShowModal } =
    props;

  return (
    <>
      {showModal.isShow && (
        <Modal showModal={showModal} setShowModal={setShowModal} />
      )}
      <div className="background--register">
        <div className="shape--register"></div>
        <div className="shape--register"></div>
      </div>
      <form className="form--register" onKeyPress={(e) => handleSubmit(e)}>
        <h3>Register Here</h3>

        <label htmlFor="username" className="label--register">
          Username
        </label>
        <input
          className="input--register"
          placeholder="Username"
          type="text"
          name="userName"
          onChange={handleChange}
        />

        <label htmlFor="password" className="label--register">
          Password
        </label>
        <input
          className="input--register"
          placeholder="Password"
          type="password"
          name="passWord"
          onChange={handleChange}
        />

        <button className="button--register" onClick={(e) => handleSubmit(e)}>
          Register
        </button>
        <a
          style={{
            color: "#0096FF",
            textDecoration: "underline",
            textAlign: "center",
            display: "block",
          }}
          onClick={(e) => {
            handlePaging(e, "Login");
          }}
        >
          Back to login!
        </a>
      </form>
    </>
  );
}
