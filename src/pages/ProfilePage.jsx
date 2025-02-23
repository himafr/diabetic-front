import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/16/solid";
import CircleAvatar from "../components/CircleAvatar";
import  Badge  from "../components/Badge";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import DialogUserModal from "../components/Usermodal";
import useUser from "../hooks/userHooks";
import baseUrl from "../const/const";
function ProfilePage() {
  const {user}=useAuth();
  const [myUser,setMyUser]=useState();
  const [rating, setRating] = useState([{review_rating:10}]);
  const {changePhoto,changeUserData,getUserById}=useUser();
  console.log(user);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
   
  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open);
 useEffect(() =>{
  async function loadUser(){
    const data=await getUserById(user.userId)
    setMyUser(data.user)
    if(data.review.length!=0)setRating(data.review);
  }
  loadUser()
   },[])
  // const handlePhotoChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   const formData = new FormData();
  //   formData.append("photo", file);
  //   try {
  //     await changePhoto(formData);
  //   } catch (error) {
  //     setError("Error uploading photo");
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await changeUserData({
  //       username: e.target.username.value,
  //       email: e.target.email.value,
  //       password: e.target.password.value,
  //       password_confirmation: e.target.password_confirmation.value,
  //     });
  //   } catch (error) {
  //     setError("Error updating user data");
  //   }
  // };
  // if (loading) return <div>Loading...</div>;
 
  return (
    // < className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 bg-amber-100">
    <div className="max-w-screen-xl mx-auto ">
    <DialogUserModal type={"1"} key={1} handleOpen={handleOpen} open={open}/>
    <DialogUserModal type={"2"} key={2} handleOpen={handleOpen2} open={open2}/>
      {/* <!-- User basic infos --> */}
      <div className="">
        {/* <!-- cover image --> */}
        <div>
          <img
            src={baseUrl+"get/"+myUser.cover_photo}
            className="object-cover min-h-80 max-h-120 w-full"
            alt="cover image"
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
                src={baseUrl+"get/"+myUser.photo}
                imgClass={"w-40 h-40 "}
                style={{ border: "solid 4px white" }}
              />
            </button>
            <div className="flex flex-row-reverse justify-around text-right ">
              {/* <!-- user photo and change it-->
                <!-- user name and role --> */}
              <div>
                <h4>
                {myUser.first_name+" "+myUser.last_name}
                </h4>
                <Badge classBg={myUser.role=="patient"?"bg-yellow-300":"bg-green-300"} classColor="text-black">
                  {myUser.role}
                </Badge>
                             </div>
              {/* <!-- / user name and role --> */}
            </div>
          </div>

          <div>
            <div className="pt-5 flex flex-row-reverse ">
              <div className=" ">
                متوسط الاعجابات بهذه الصفحه <span className="mr-1">
                 {rating?.reduce((total,num)=> total.review_rating+num.review_rating)/rating?.length||0}/10
                </span>

              </div>
              <div
                className="flex flex-row-reverse"
                style={{ color: " rgb(255, 0, 0)", fontSize: "29px" ,position: "relative",bottom:"16px" }}
              >
        
                <HeartIconSolid className="w-12" />
              </div>
            </div>
          </div>

          <div className="relative left-10 bottom-20">
            <button
            onClick={handleOpen}
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
  );
}

export default ProfilePage;
