import "./Modal.css";
import userNotFound from "./userNotFound.png";
import wrongPass from "./wrongPass.png";

export default function Modal(props) {
  const { showModal, setShowModal } = props;

  return (
    <>
      {showModal.isShow && (
        <div className="modal--container">
          <div className="cookiesContent" id="cookiesPopup">
            <button
              className="close"
              onClick={() => setShowModal((prev) => !prev)}
            >
              ✖
            </button>
            {showModal.information == "User not found." ? (
              <img src={userNotFound} alt="cookies-img" />
            ) : (
              <img src={wrongPass} alt="cookies-img" />
            )}
            <p>
              {showModal.information} <br />"{showModal.userName}"
            </p>
            <button
              className="accept"
              onClick={() => setShowModal((prev) => !prev)}
            >
              Try again!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
