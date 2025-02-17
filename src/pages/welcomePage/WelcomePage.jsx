import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import styles from './welcomePage.module.css'

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
    return (
      <div>
       {/* <!-- Start Header --> */}
    <div className={styles.header} id="header">
      <div className={styles.container}>
        <a href="#" className={styles.logo}>DIABETES</a>
        <ul className={styles.main_nav}>
          <li><a href="#articles">Articles</a></li>
          <li><a href="#features">Features</a></li>
          
          <li>
            <a href="#">Other Links</a>
            {/* <!-- Start Megamenu --> */}
            <div className={styles.mega_menu}>
              <div className={styles.image}>
                <img src="imgs/megamenu.png" alt="" />
              </div>
              <ul className={styles.links}>
                {/* <!-- <li>
                  {/* <a href="#testimonials"><i className={styles.far fa-comments ${styles.fa-fw}"></i> Testimonials</a> 
                </li> --> */}
                <li><a href="#gallery">Gallery</a></li>
                <li>
                  <a href="#team">
                  {/* <i className={`${styles.far} ${styles.fa-user} ${styles.fa-fw}`}></i> */}
                   Team Members</a>
                </li>
                <li>
                  <a href="#services">
                  {/* <i className={`${styles.far} ${styles.fa-building} ${styles.fa-fw}`}></i>  */}
                  Services</a>
                </li>
                
                <li>
                  <a href="#work-steps">
                  {/* <i className={`${styles.far} ${styles.fa-clipboard} ${styles.fa-fw}`}></i>  */}
                  How It Works</a>
                </li>
              </ul>
            </div>
            {/* <!-- End Megamenu --> */}
          </li>
          <li><a onClick={() => navigate("/signup")} className={`cursor-pointer`}>Sign up</a></li>
          <li><a  onClick={() => navigate("/login")} className={`cursor-pointer`}>Login</a></li>
        </ul>
      </div>
    </div>
    {/* <!-- End Header --> */}
    {/* <!-- Start Landing --> */}
    <div className={styles.landing}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h1>مرحبا بكم في موقع مساعدة مريض السكري</h1>
          <p> يهدف هذا الموقع يهدف إلى مساعدة مريض السكري في الحصول على المعلومات والخدمات اللازمة لتحسين صحتهم </p>
        </div>
        <div className={styles.image}>
          <img className="relative bottom-10" src="imgs/pang 1.jpg" alt="" />
        </div>
      </div>
      <a href="#articles" className={styles.go_down}>
        {/* <i className={`${styles.fas} ${styles.fa-angle-double-down} ${styles.fa_2x}`}></i> */}
      </a>
    </div>
    {/* <!-- End Landing --> */}
    {/* <!-- Start Articles --> */}
    <div className={styles.articles} id="articles">
      <h2 className={styles.main_title}>Articles</h2>
      <div className={styles.container}>
        <div className={styles.box}>
          <img src="imgs/cat-01.jpg" alt="" />
          <div className={styles.content}>
            <h3>Test Title</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit</p>
          </div>
          <div className={styles.info}>
            <a onClick={() => navigate("/login")} className={`cursor-pointer`}>Read More</a>
            {/* <i className={styles.fas fa-long-arrow-alt-right"></i> */}
          </div>
        </div>
        <div className={styles.box}>
          <img src="imgs/cat-02.jpg" alt="" />
          <div className={styles.content}>
            <h3>Test Title</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit</p>
          </div>
          <div className={styles.info}>
            <a onClick={() => navigate("/login")} className={`cursor-pointer`}>Read More</a>
            {/* // <i className={styles.fas fa-long-arrow-alt-right"></i> */}
          </div>
        </div>
        <div className={styles.box}>
          <img src="imgs/cat-03.jpg" alt="" />
          <div className={styles.content}>
            <h3>Test Title</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit</p>
          </div>
          <div className={styles.info}>
            <a onClick={() => navigate("/login")} className={`cursor-pointer`}>Read More</a>
            {/* // <i className={styles.fas fa-long-arrow-alt-right"></i> */}
          </div>
        </div>
        <div className={styles.box}>
          <img src="imgs/cat-04.jpg" alt="" />
          <div className={styles.content}>
            <h3>Test Title</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit</p>
          </div>
          <div className={styles.info}>
            <a onClick={() => navigate("/login")} className={`cursor-pointer`}>Read More</a>
            {/* <i className={styles.fas fa-long-arrow-alt-right"></i> */}
          </div>
        </div>
        <div className={styles.box}>
          <img src="imgs/cat-05.jpg" alt="" />
          <div className={styles.content}>
            <h3>Test Title</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit</p>
          </div>
          <div className={styles.info}>
            <a onClick={() => navigate("/login")} className={`cursor-pointer`}>Read More</a>
            {/* // <i className={styles.fas fa-long-arrow-alt-right"></i> */}
          </div>
        </div>
        <div className={styles.box}>
          <img src="imgs/cat-06.jpg" alt="" />
          <div className={styles.content}>
            <h3>Test Title</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit</p>
          </div>
          <div className={styles.info}>
            <a onClick={() => navigate("/login")} className={`cursor-pointer`}>Read More</a>
            {/* // <i className={styles.fas fa-long-arrow-alt-right"></i> */}
          </div>
        </div>
        <div className={styles.box}>
          <img src="imgs/cat-07.jpg" alt="" />
          <div className={styles.content}>
            <h3>Test Title</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit</p>
          </div>
          <div className={styles.info}>
            <a onClick={() => navigate("/login")} className={`cursor-pointer`}>Read More</a>
            {/* // <i className={styles.fas fa-long-arrow-alt-right"></i> */}
          </div>
        </div>
        <div className={styles.box}>
          <img src="imgs/cat-08.jpg" alt="" />
          <div className={styles.content}>
            <h3>Test Title</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit</p>
          </div>
          <div className={styles.info}>
            <a onClick={() => navigate("/login")} className={`cursor-pointer`}>Read More</a>
            {/* <i className={styles.fas fa-long-arrow-alt-right"></i> */}
          </div>
        </div>
      </div>
    </div>
    <div className={styles.spikes}></div>
    {/* <!-- End Articles --> */}
    {/* <!-- Start Gallery --> */}
    <div className={styles.gallery} id="gallery">
      <h2 className={styles.main_title}>Gallery</h2>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.image}>
            <img src="imgs/gallery-01.png" alt="" />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.image}>
            <img src="imgs/gallery-02.png" alt="" />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.image}>
            <img src="imgs/gallery-03.jpg" alt="" />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.image}>
            <img src="imgs/gallery-04.png" alt="" />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.image}>
            <img src="imgs/gallery-05.jpg" alt="" />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.image}>
            <img src="imgs/gallery-06.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    {/* <!-- End Gallery --> */}
    {/* <!-- Start Features --> */}
    <div className={styles.features} id="features">
      <h2 className={styles.main_title}>Features</h2>
      <div className={styles.container}>
        <div className={`${styles.box} ${styles.quality}`}>
          <div className={styles.img_holder}><img src="imgs/features-01.jpg" alt="" /></div>
          <h2>Quality</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit harum hic veniam eligendi minima</p>
          <a onClick={() => navigate("/login")} className={`cursor-pointer`}>More</a>
        </div>
        <div className={`${styles.box} ${styles.time}`}>
          <div className={styles.img_holder}><img src="imgs/features-02.jpg" alt="" /></div>
          <h2>Time</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit harum hic veniam eligendi minima</p>
          <a onClick={() => navigate("/login")} className={`cursor-pointer`}>More</a>
        </div>
        <div className={`${styles.box} ${styles.passion}`}>
          <div className={styles.img_holder}><img src="imgs/features-03.jpg" alt="" /></div>
          <h2>Passion</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit harum hic veniam eligendi minima</p>
          <a onClick={() => navigate("/login")} className={`cursor-pointer`}>More</a>
        </div>
      </div>
    </div>
    {/* <!-- End Features --> */}
    
    {/* <!-- Start Services --> */}
    <div className={styles.services} id="services">
      <h2 className={styles.main_title}>الخدمات</h2>
      <div className={styles.container}>
        <div className={styles.box}>
          {/* <i className={styles.fas fa-user-shield fa-4x"></i> */}
          <h3>الأمان</h3>
          <div className={styles.info}>
            <a href="#">التفاصيل</a>
          </div>
        </div>
        <div className={styles.box}>
          {/* // <i className={styles.fas fa-tools fa-4x"></i> */}
          <h3>حل المشكلات</h3>
          <div className={styles.info}>
            <a href="#">التفاصيل</a>
          </div>
        </div>
        <div className={styles.box}>
          {/* <i className={styles.fas fa-map-marked-alt fa-4x"></i> */}
          <h3>الموقع</h3>
          <div className={styles.info}>
            <a href="#">التفاصيل</a>
          </div>
        </div>
        <div className={styles.box}>
          {/* // <i className={styles.fas fa-laptop-code fa-4x"></i> */}
          <h3>البرمجة</h3>
          <div className={styles.info}>
            <a href="#">التفاصيل</a>
          </div>
        </div>
        <div className={styles.box}>
          {/* <i className={styles.fas fa-palette fa-4x"></i> */}
          <h3>الخصوصية</h3>
          <div className={styles.info}>
            <a href="#">التفاصيل</a>
          </div>
        </div>
        <div className={styles.box}>
          {/* // <i className={styles.fas fa-bullhorn fa-4x"></i> */}
          <h3>التسويق</h3>
          <div className={styles.info}>
            <a href="#">التفاصيل</a>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- End Services --> */}

    {/* <!-- Start Work Steps --> */}
    <div className={styles.work_steps} id="work-steps">
      <h2 className={styles.main_title}>How It Works ?</h2>
      <div className={styles.container}>
        <img src="imgs/work-steps.png" alt="" className={styles.image} />
        <div className={styles.info}>
          <div className={styles.box}>
            <img src="imgs/work-steps-1.png" alt="" />
            <div className={styles.text}>
              <h3>Business Analysis</h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur</p>
            </div>
          </div>
          <div className={styles.box}>
            <img src="imgs/work-steps-2.png" alt="" />
            <div className={styles.text}>
              <h3>Architecture</h3>
               <p> Lorem, ipsum dolor sit amet consectetur </p>
            </div>
          </div>
          <div className={styles.box}>
            <img src="imgs/work-steps-3.png" alt="" />
            <div className={styles.text}>
              <h3>Developement</h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- End Work Steps --> */}

    
    {/* <!-- Start Team --> */}
    <div className={styles.team} id="team">
      <h2 className={styles.main_title}>Team Members</h2>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.data}>
            <img src="imgs/team-01.jpg" alt="" />
            <div className={styles.social}>
              <a href="#">
                {/* <i className={styles.fab fa-facebook-f"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-twitter"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-linkedin-in"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-youtube"></i> */}
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <h3>HEMA</h3>
            <p>Simple Short Description</p>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.data}>
            <img src="imgs/team-02.jpg" alt="" />
            <div className={styles.social}>
              <a href="#">
                {/* <i className={styles.fab fa-facebook-f"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-twitter"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-linkedin-in"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-youtube"></i> */}
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <h3>Mahmoud Atef</h3>
            <p>Simple Short Description</p>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.data}>
            <img src="imgs/team-03.jpg" alt="" />
            <div className={styles.social}>
              <a href="#">
                {/* // <i className={styles.fab fa-facebook-f"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-twitter"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-linkedin-in"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-youtube"></i> */}
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <h3>Ahmed Ibrahem</h3>
            <p>Simple Short Description</p>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.data}>
            <img src="imgs/team-04.jpg" alt="" />
            <div className={styles.social}>
              <a href="#">
                {/* <i className={styles.fab fa-facebook-f"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-twitter"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-linkedin-in"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-youtube"></i> */}
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <h3>Abdallh</h3>
            <p>Simple Short Description</p>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.data}>
            <img src="imgs/team-05.png" alt="" />
            <div className={styles.social}>
              <a href="#">
                {/* // <i className={styles.fab fa-facebook-f"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-twitter"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-linkedin-in"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-youtube"></i> */}
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <h3>Abdo</h3>
            <p>Simple Short Description</p>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.data}>
            <img src="imgs/team-06.png" alt="" />
            <div className={styles.social}>
              <a href="#">
                {/* <i className={styles.fab fa-facebook-f"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-twitter"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-linkedin-in"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-youtube"></i> */}
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <h3>Fayad</h3>
            <p>Simple Short Description</p>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.data}>
            <img src="imgs/team-07.jpg" alt="" />
            <div className={styles.social}>
              <a href="#">
                {/* // <i className={styles.fab fa-facebook-f"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-twitter"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-linkedin-in"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-youtube"></i> */}
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <h3>Saif</h3>
            <p>Simple Short Description</p>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.data}>
            <img src="imgs/team-08.jpg" alt="" />
            <div className={styles.social}>
              <a href="#">
                {/* <i className={styles.fab fa-facebook-f"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-twitter"></i> */}
              </a>
              <a href="#">
                {/* <i className={styles.fab fa-linkedin-in"></i> */}
              </a>
              <a href="#">
                {/* // <i className={styles.fab fa-youtube"></i> */}
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <h3>Asmaa</h3>
            <p>Simple Short Description</p>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.spikes}></div>
    {/* <!-- End Team --> */}
    
    {/* <!-- Start Footer --> */}
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.box}>
          <h3>DIABETES</h3>
          <ul className={styles.social}>
            <li>
              <a href="#" className={styles.facebook}>
                {/* // <i className={styles.fab fa-facebook-f"></i>*/}
                 </a> 
            </li>
            <li>
              <a href="#" className={styles.twitter}>
                {/* // <i className={styles.fab fa-twitter"></i>  */}

                </a>
            </li>
          </ul>
          <p className={styles.text}>
            
          </p>
        </div>
        <div className={styles.box}>
          <ul className={styles.links}>
            <li><a href="#">Important Link 1</a></li>
            <li><a href="#">Important Link 2</a></li>
            <li><a href="#">Important Link 3</a></li>
            <li><a href="#">Important Link 4</a></li>

          </ul>
        </div>
        <div className={styles.box}>
          
          <div className={styles.line}>
            {/* // <i className={styles.fas fa-phone-volume ${styles.fa-fw}"></i> */}
            <div className={styles.info}>
              <span>+20123456789</span>
              <span>+20198765432</span>
            </div>
          </div>
        </div>
       
      </div>
      <p className={styles.copyright}> &copy;{new Date().getFullYear()} موقع مساعدة مريض السكر</p>
    </div>
    {/* <!-- End Footer --> */}
      </div>
    );
}

export default WelcomePage;
