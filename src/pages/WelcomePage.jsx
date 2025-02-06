import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
function WelcomePage() {
  const navigate = useNavigate();
  const { logged, isAuthenticated } = useAuth();
  useEffect(
    function () {
      if (!isAuthenticated) {
        if (localStorage.jwt_token) {
          console.log("start");
          try {
            const user = jwtDecode(localStorage.jwt_token);
            console.log(user);
            if (user) {
              logged(user);
              navigate("/app", { replace: true });
            }
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, logged, navigate]
  );
  if (window.innerWidth > 400) {
    return (
      <div>
        <main
          onClick={() => navigate("/login")}
          className="w-screen h-screen fixed bottom-0.5"
        >
          <section className="hero" id="hero">
            <div className="heroText">
              <h1
                className="text-white mt-5 mb-lg-4"
                data-aos="zoom-in"
                data-aos-delay="800"
              >
                Diabetic Care
              </h1>

              <p
                className="text-secondary-white-color "
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                متابعة و التحكم في نظام{" "}
                <strong className="custom-underline">
                  متابعة و علاج مرضي السكري{" "}
                </strong>
                <br />
                <br />
                <hima style={{ color: "rgb(205, 204, 204);" }}>
                  {" "}
                  اضغط في اي مكان للبدء{" "}
                </hima>
              </p>
            </div>

            <div className="videoWrapper">
              <video
                autoPlay
                loop
                muted
                className="custom-video"
                poster="../videos/tech.png"
              >
                <source src="../videos/tech.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="overlay"></div>
          </section>
        </main>
      </div>
    );
  } else {
    return (
      <div>
        <main
          onClick={() => navigate("/login")}
          className="w-screen h-screen fixed"
        >
          <section id="hero">
            <div className="heroText">
              <h1
                className="text-white mt-5 mb-lg-4"
                data-aos="zoom-in"
                data-aos-delay="800"
              >
                Diabetic Care
              </h1>

              <p
                className="text-secondary-white-color"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                متابعة و التحكم في نظام{" "}
                <strong className="custom-underline">
                  متابعة و علاج مرضي السكري{" "}
                </strong>
                <br />
                <br />
                <hima style={{ color: "rgb(205, 204, 204);" }}>
                  {" "}
                  اضغط في اي مكان للبدء{" "}
                </hima>
              </p>
            </div>

            {/* <div className="videoWrapper ">
            <video autoPlay loop muted className="custom-video" poster="../videos/dash.png">
                <source src="../videos/.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div> */}
            <img src="../videos/dash.png" />
            <div className="overlay"></div>
          </section>
        </main>
      </div>
    );
  }
}

export default WelcomePage;
