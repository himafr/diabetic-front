import { HeartIcon as HeartIconSolid } from "@heroicons/react/16/solid";
import CircleAvatar from "../../components/CircleAvatar";
import Badge from "../../components/Badge";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import DialogUserModal from "../../components/Usermodal";
import useUser from "../../hooks/userHooks";
import baseUrl from "../../const/const";
import UserPopover from "../../components/UserPopover";
function ProfilePage() {
  const { user } = useAuth();
  const [myUser, setMyUser] = useState();
  const [rating, setRating] = useState([{ review_rating: 10 }]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopover, setShowPopover] = useState(false);
  const [showPopoverPhoto, setShowPopoverPhoto] = useState(false);
  const [showPopoverCover, setShowPopoverCover] = useState(false);
  const { changePhoto, getUserById, handleFilesChange } = useUser();

  console.log(user);

  useEffect(() => {
    async function loadUser() {
      setIsLoading(true);
      try {
        const data = await getUserById(user.userId);
        setMyUser(data.user);
        if (data.review.length != 0) setRating(data.review);
      } catch {
        console.log("error");
      }
      setIsLoading(false);
    }
    loadUser();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="max-w-screen-xl mx-auto ">
      <div className="mb-10">
        <div>
          <img
            src={baseUrl + "get/" + myUser?.cover_photo}
            className="object-cover min-h-80 max-h-120 w-full"
            alt="cover image"
          />
        </div>
        <div className="flex flex-row-reverse justify-between h-20">
          <div className="flex flex-row-reverse gap-10">
            <UserPopover
              btnStyle={{ all: "unset", position: "relative", bottom: "80px" }}
              element={
                <CircleAvatar
                  src={baseUrl + "get/" + myUser?.photo}
                  imgClass={"w-40 h-40 "}
                  style={{ border: "solid 4px white" }}
                />
              }
              setShowPopover={setShowPopoverPhoto}
              showPopover={showPopoverPhoto}
              className={"fixed top-1/5 left-1/4  w-1/2 "}
            >
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="mt-5">
                  <label
                    htmlFor="input-address"
                    className="block text-sm font-medium"
                  >
                    تغير صورة الملف الشخصي
                  </label>
                  <input
                    onChange={(e) => handleFilesChange(e)}
                    name="photo"
                    className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="file"
                  />
                </div>

                <div className="flex justify-around space-x-2">
                  <button
                    onClick={() => changePhoto("photo")}
                    className="px-4 h-10 py-2 bg-blue-500 text-white rounded-md w-1/3 "
                  >
                    change now{" "}
                  </button>
                  <button
                    onClick={() => {
                      setShowPopoverPhoto((val) => !val);
                    }}
                    className="px-4 h-10 py-2 bg-red-500 text-white rounded-md w-1/3"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </UserPopover>
            <div className="flex flex-row-reverse justify-around text-right ">
              <div>
                <h4>{myUser.first_name + " " + myUser.last_name}</h4>
                <Badge
                  classBg={
                    myUser.role == "patient" ? "bg-yellow-300" : "bg-green-300"
                  }
                  classColor="text-black"
                >
                  {myUser.role}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <div className="pt-5 flex flex-row-reverse ">
              <div className=" ">
                متوسط الاعجابات بهذه الصفحه{" "}
                <span className="mr-1">
                  {rating?.reduce(
                    (total, num) => total.review_rating + num.review_rating
                  ) / rating?.length || 0}
                  /10
                </span>
              </div>
              <div
                className="flex flex-row-reverse"
                style={{
                  color: " rgb(255, 0, 0)",
                  fontSize: "29px",
                  position: "relative",
                  bottom: "16px",
                }}
              >
                <HeartIconSolid className="w-12" />
              </div>
            </div>
          </div>
          <div className="relative left-10 bottom-20">
            <UserPopover
              btnStyle={{ all: "unset", position: "relative" }}
              element={
                <button
                  data-toggle="modal"
                  className=" bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  data-target="#change-cover-photo"
                >
                  تغير صورة الغلاف
                  <i className="fa-solid fa-camera-retro"></i>
                </button>
              }
              setShowPopover={setShowPopoverCover}
              showPopover={showPopoverCover}
              className={"fixed top-1/5 left-1/4  w-1/2 "}
            >
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="mt-5">
                  <label
                    htmlFor="input-address"
                    className="block text-sm font-medium"
                  >
                    تغير صورة الغلاف
                  </label>
                  <input
                    onChange={(e) => handleFilesChange(e)}
                    name="cover_photo"
                    className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="file"
                  />
                </div>

                <div className="flex justify-around space-x-2">
                  <button
                    onClick={() => changePhoto("cover")}
                    className="px-4 h-10 py-2 bg-blue-500 text-white rounded-md w-1/3 "
                  >
                    change now{" "}
                  </button>
                  <button
                    onClick={() => {
                      setShowPopoverCover((val) => !val);
                    }}
                    className="px-4 h-10 py-2 bg-red-500 text-white rounded-md w-1/3"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </UserPopover>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="information">
        <div className="about float-right relative bottom-8">حول</div>
      </div>
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
      <main className="content ">
        <div className="user_information" id="user_information" dir="rtl">
          <div className="w-full">
            <div className="mb-3 bg-white shadow-md rounded-lg">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium float-right">الاسم</h6>
                  </div>
                  {/* <!-- full name filled by Backend --> */}
                  <div className="text-gray-700" id="user_full_name">
                    <div className=" h-4">
                      {myUser.first_name + "  " + myUser.last_name}
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium float-right">
                      البريد الالكتروني
                    </h6>
                  </div>
                  <div className="text-gray-700 lowercase" id="user_email">
                    <div className=" h-4">{myUser.email}</div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium float-right">رقم الهاتف</h6>
                  </div>
                  <div className="text-gray-700" id="user_phone">
                    <div className=" h-4">{myUser.number}</div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium float-right">العنوان</h6>
                  </div>
                  <div className="text-gray-700" id="user_address">
                    <div className=" h-4">{myUser.address}</div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium float-right">تاريخ الميلاد</h6>
                  </div>
                  <div className="text-gray-700" id="date_of_birth">
                    <div className=" h-4">
                      {new Date(myUser.date_of_birth).toDateString()}
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium float-right">تاريخ الانضمام</h6>
                  </div>
                  <div className="text-gray-700" id="join_date">
                    <div className=" h-4">
                      {new Date(myUser.created_at).toDateString()}
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="grid grid-cols-1">
                  <UserPopover
                    btnStyle={{ all: "unset", position: "relative" }}
                    element={
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        id="btn-login"
                      >
                        تعديل بيانات الملف الشخصي
                      </button>
                    }
                    setShowPopover={setShowPopover}
                    showPopover={showPopover}
                    className={"fixed top-1/5 left-1/4  w-1/2 "}
                  >
                    <PopoverUserBody setShowPopover={setShowPopover} />
                  </UserPopover>
                </div>
              </div>
            </div>
          </div>
          <div className="user_stat hidden" id="user_stat">
            stat
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;

function PopoverUserBody({ setShowPopover }) {
  const [isLoading, setIsLoading] = useState(true);

  const { changePhoto, changeUserData, getUserById, handleChange } = useUser();

  function changeMyUserData() {}
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="mt-5">
        <label htmlFor="input-fname" className="block text-sm font-medium">
          اسم المستخدم
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name="first_name"
          className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="input-fname"
          type="text"
          minLength="4"
          placeholder="اسم المستخدم"
        />
      </div>
      <div>
        <label htmlFor="input-lname" className="block text-sm font-medium">
          اسم العائله
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name="last_name"
          className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="input-lname"
          type="text"
          minLength="4"
          placeholder="اسم العائله"
        />
      </div>

      <div>
        <label htmlFor="input-email" className="block text-sm font-medium">
          الايمال
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name="email"
          className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="input-email"
          type="email"
          minLength="5"
          placeholder="الايمال"
        />
      </div>
      <div>
        <label htmlFor="input-phone" className="block text-sm font-medium">
          رقم الهاتف
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name="number"
          className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="input-phone"
          type="text"
          minLength="5"
          placeholder="رقم الهاتف"
        />
      </div>
      <div>
        <label htmlFor="input-address" className="block text-sm font-medium">
          العنوان
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name="address"
          className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="input-address"
          type="text"
          minLength="3"
          placeholder="العنوان"
        />
      </div>
      <div>
        <label htmlFor="input-birth-date" className="block text-sm font-medium">
          تاريخ الميلاد
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name="date_of_birth"
          className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="input-birth-date"
          type="date"
          minLength="3"
          placeholder="تاريخ الميلاد"
        />
      </div>
      <div className="flex justify-around space-x-2">
        <button
          onClick={(e) => changeUserData(e)}
          className="px-4 h-10 py-2 bg-blue-500 text-white rounded-md w-1/3 "
        >
          change now
        </button>
        <button
          onClick={() => {
            setShowPopover((val) => !val);
          }}
          className="px-4 h-10 py-2 bg-red-500 text-white rounded-md w-1/3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
