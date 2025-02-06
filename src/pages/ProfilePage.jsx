import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/16/solid";
import CircleAvatar from "../components/CircleAvatar";
import  Badge  from "../components/Badge";
import { useAuth } from "../context/AuthContext";
function ProfilePage() {
  const {user}=useAuth();
  console.log(user);
  return (
    // <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 bg-amber-100">
    <div className="max-w-screen-xl mx-auto ">
      {/* <!-- User basic infos --> */}
      <div className="">
        {/* <!-- cover image --> */}
        <div>
          <img
            src="../videos/dash.png"
            className="object-cover min-h-80 max-h-120 w-full "
            alt=" "
          />
        </div>
        {/* <!-- cover image -->
            <!-- data holder --> */}
        <div className="flex flex-row-reverse justify-between h-20">
          {/* <!-- user photo and change it--> */}
          <div className="flex flex-row-reverse gap-10">
            <button
              style={{ all: "unset", position: "relative", bottom: "80px" }}
            >
              <CircleAvatar
                src={"../videos/dash.png"}
                imgClass={"w-40 h-40 "}
                style={{ border: "solid 4px white" }}
              />
            </button>
            <div className="flex flex-row-reverse justify-around text-right ">
              {/* <!-- user photo and change it-->
                <!-- user name and role --> */}
              <div>
                <h4>
                name
                </h4>
                <Badge classBg={"patient"=="patient"?"bg-yellow-300":"bg-green-300"} classColor="text-black">
                  span
                </Badge>
                             </div>
              {/* <!-- / user name and role --> */}
            </div>
          </div>

          <div>
            <div className="pt-5 flex flex-row-reverse">
              <div className=" ">
                اعجب بهذه الصفحه <span></span> 150
              </div>
              <div
                className="flex flex-row-reverse"
                style={{ color: " rgb(255, 0, 0)", fontSize: "29px" }}
              >

                <HeartIcon className="w-10"/>
                <HeartIconSolid className="w-12" />
              </div>
            </div>
          </div>

          <div className="relative left-10 bottom-20">
            <button
              data-toggle="modal"
              className=" bg-blue-500 text-white font-bold py-2 px-4 rounded"
              data-target="#change-cover-photo"
            >
              تغير صورة الغلاف
              <i className="fa-solid fa-camera-retro"></i>
            </button>
          </div>
        </div>
        {/* <!-- data holder --> */}
      </div>
      {/* <!-- // User basic infos --> */}
      {/* <!-- information --> */}
      <div className="information">
        <div className="about btmb">حول</div>
        <div className="stat">الاحصائيات</div>
      </div>
      {/* <!-- information --> */}
      <hr
        style={{
          marginTop: "1px",
          height: "1px",
          border: "none",
          color: "#555",
          backgroundColor: "#555",
          position: "relative",
          bottom: "1px",
        }}
      />
      <main className="content"></main>
    </div>
    // </div>
  );
}

export default ProfilePage;
