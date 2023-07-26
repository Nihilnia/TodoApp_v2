import "./Profile.css";
import defWoman from "./Girl-Workplace.svg";
export default function Profile(props) {
  const {
    setUserChoice,
    user,
    completedTodoCount,
    waitingTodoCount,
    allTodoCount,
  } = props;

  return (
    <>
      <section
        className="profile--section profile--about-section gray-bg"
        id="about"
      >
        <div className="profile--container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-lg-6">
              <div className="profile--about-text profile--go-to">
                <h3 className="profile--dark-color">{user.userName}</h3>
                <h6 className="profile--theme-color profile--lead">
                  A Lead UX &amp; UI designer based in Canada
                </h6>
                <p>
                  I <mark>design and develop</mark> services for customers of
                  all sizes, specializing in creating stylish, modern websites,
                  web services and online stores. My passion is to design
                  digital user experiences through the bold interface and
                  meaningful interactions.
                </p>
                <div className="row profile--about-list">
                  <div className="col-md-6">
                    <div className="media">
                      <label>Birthday</label>
                      <p>4th april 1998</p>
                    </div>
                    <div className="media">
                      <label>Age</label>
                      <p>22 Yr</p>
                    </div>
                    <div className="media">
                      <label>Residence</label>
                      <p>Canada</p>
                    </div>
                    <div className="media">
                      <label>Address</label>
                      <p>California, USA</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="profile--media">
                      <label>E-mail</label>
                      <p>info@domain.com</p>
                    </div>
                    <div className="profile--media">
                      <label>Phone</label>
                      <p>820-885-3321</p>
                    </div>
                    <div className="profile--media">
                      <label>Skype</label>
                      <p>skype.0404</p>
                    </div>
                    <div className="profile--media">
                      <label>Freelance</label>
                      <p>Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="profile--about-avatar"
                style={{ width: "520px", marginLeft: "60px" }}
              >
                <img src={defWoman} title="" alt="" />
              </div>
              <h6
                className="profile--theme-color profile--lead"
                style={{ marginLeft: "200px", marginTop: "15px" }}
              >
                <span style={{ color: "aliceblue" }}>User ID:</span> {user.id}
              </h6>
            </div>
          </div>
          <div className="profile--counter">
            <div className="row">
              <div className="col-6 col-lg-4">
                <div className="profile--count-data text-center">
                  <h6
                    className="profile--count h2"
                    data-to="500"
                    data-speed="500"
                  >
                    {allTodoCount}
                  </h6>
                  <p className="m-0px font-w-600">All todos</p>
                </div>
              </div>
              <div className="col-6 col-lg-4">
                <div className="profile--count-data text-center">
                  <h6
                    className="profile--count h2"
                    data-to="150"
                    data-speed="150"
                  >
                    {completedTodoCount}
                  </h6>
                  <p className="profile--m-0px font-w-600">Todos Completed</p>
                </div>
              </div>
              <div className="col-6 col-lg-4">
                <div className="profile--count-data text-center">
                  <h6
                    className="profile--count h2"
                    data-to="850"
                    data-speed="850"
                  >
                    {waitingTodoCount}
                  </h6>
                  <p className="profile--m-0px font-w-600">Waiting Todos</p>
                </div>
              </div>
              {/* <div className="col-6 col-lg-3">
                <div className="profile--count-data profile--text-center">
                  <h6
                    className="profile--count h2"
                    data-to="190"
                    data-speed="190"
                  >
                    190
                  </h6>
                  <p className="profile--m-0px profile--font-w-600">
                    Telephonic Talk
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
