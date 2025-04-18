import { Link } from "react-router-dom";

export default function Header({ user }) {
  const submitLogoutForm = () => {
    // Handle logout logic here
    // document.getElementById("logoutForm").submit();
  };

  return (
    <>
      <header className="elk-header">
        <div className="header-parent">
          <div className="logo-fu-rus-1">
            <Link to="#">
              <img
                className="logo-fu-rus-1-icon"
                loading="lazy"
                alt=""
                src="/assets/logo.png"
              />
            </Link>

            <div className="logo-line">
              <img className="frame-child" alt="" src="/assets/logo-line.svg" />
            </div>

            <div className="constructor-wrapper">
              <Link to="#" className="elk">
                <h3 className="constructor-full">Единый Личный Кабинет</h3>
              </Link>
              <Link to="#" className="elk">
                <h3 className="constructor-mini">ЕЛК</h3>
              </Link>
            </div>
          </div>

          {user?.isAuthenticated && (
            <>
              <div className="blockBanner">
                <img className="imgBanner" alt="" src="/assets/rr5.png" />
              </div>

              <div className="header-profile-and-icons">
                <div className="frame-parent2">
                  <div className="base-instance-wrapper">
                    <Link to="#" className="profile-link">
                      <div className="base-instance">
                        <div className="blockPhoto">
                          <img
                            className="button-profile-icon"
                            loading="lazy"
                            alt=""
                            src={
                              user?.profile?.sex === "Ж"
                                ? "/assets/avatar-girl.jpg"
                                : "/assets/avatar-boy.png"
                            }
                          />
                        </div>
                        <div className="badge-instance">
                          <b className="clayton-santos">Алхажа Омран</b>
                          <b className="line4"></b>
                          <b className="positionPerson">
                           ЦРПО
                          </b>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <form
                    id="logoutForm"
                    method="post"
                    action="/logout"
                    style={{ display: "none" }}
                  >
                    {/* CSRF token will be handled by backend */}
                  </form>

                  <div className="notification-button-parent">
                    <a
                      href="login"
                      className="block-exit"
                      onClick={submitLogoutForm}
                    >
                      <svg
                        className="close-button-icon"
                        width="30px"
                        height="30px"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <clipPath id="clip-lock2">
                            <rect width="32" height="32" />
                          </clipPath>
                        </defs>
                        <g id="lock2" clipPath="url(#clip-lock2)">
                          <g
                            id="Group_2276"
                            data-name="Group 2276"
                            transform="translate(-208 -312)"
                          >
                            <g id="Group_2272" data-name="Group 2272">
                              <g id="Group_2271" data-name="Group 2271">
                                <g id="Group_2270" data-name="Group 2270">
                                  <path
                                    id="Path_3825"
                                    data-name="Path 3825"
                                    d="M233.667,323.6a4.726,4.726,0,0,0-2.479-.627H216.927a7.191,7.191,0,0,1,3.554-5.958,7.051,7.051,0,0,1,9.682,2.317,1.25,1.25,0,1,0,2.152-1.271,9.55,9.55,0,0,0-13.1-3.2,9.68,9.68,0,0,0-4.783,8.684c-.032.019-.065.032-.1.053a4.373,4.373,0,0,0-2.13,3.749v10.784a4.382,4.382,0,0,0,4.376,4.376h14.846a4.382,4.382,0,0,0,4.376-4.376V327.348A4.37,4.37,0,0,0,233.667,323.6Zm-.368,14.533a1.878,1.878,0,0,1-1.876,1.875H216.577a1.877,1.877,0,0,1-1.876-1.875V327.348a1.878,1.878,0,0,1,1.876-1.876h14.846a1.879,1.879,0,0,1,1.876,1.876Z"
                                    fill="currentColor"
                                  />
                                </g>
                              </g>
                            </g>
                            <g id="Group_2275" data-name="Group 2275">
                              <g id="Group_2274" data-name="Group 2274">
                                <g id="Group_2273" data-name="Group 2273">
                                  <path
                                    id="Path_3826"
                                    data-name="Path 3826"
                                    d="M226.343,331.569a2.344,2.344,0,1,0-3.789,1.832l-.428,4.073a.312.312,0,0,0,.311.345h3.126a.046.046,0,0,0,.012,0,.311.311,0,0,0,.289-.431l-.42-3.987A2.329,2.329,0,0,0,226.343,331.569Z"
                                    fill="currentColor"
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span className="textExit">Выход</span>
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}

          {!user?.isAuthenticated && (
            <div className="notification-button-parent">
              <Link to="/login" className="block-exit">
                <svg
                  className="close-button-icon"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 10H6C4.89543 10 4 10.8954 4 12V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V12C20 10.8954 19.1046 10 18 10H16M8 10V7C8 4.79086 9.79086 3 12 3V3C14.2091 3 16 4.79086 16 7V10M8 10H16M12 14V17"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span className="textExit">Вход</span>
              </Link>
            </div>
          )}
        </div>
      </header>
      <div className="line"></div>
    </>
  );
}
