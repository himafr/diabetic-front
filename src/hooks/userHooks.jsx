import baseUrl from "../const/const";

export default function useUser(){
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }    
async function getUserById(id){
  try{
        const response= await fetch(`${baseUrl}api/v1/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.jwt_token}`,
                },
            })
            const res= await response.json()
            
                if (res.status == "success") {
                    return res.data
                }
            }catch(e){
                throw new Error(e);
            }
        };
async function  changeUserData (e){
    e.preventDefault();
  const  [fname, lname, email, phone, address, birth] = [
      e.fname,
      e.lname,
      e.email,
      e.phone,
      e.address,
      e.birth,
    ];
    let dataToBeSent = {
      ...(fname != "" && { first_name: fname }),
      ...(lname != "" && { last_name: lname }),
      ...(email != "" && { email: email }),
      ...(phone != "" && { number: phone }),
      ...(address != "" && { address: address }),
      ...(birth != "" && { date_of_birth: birth }),
    };
  
    if (isEmpty(dataToBeSent)) throw new Error("No data to be sent")
        try{
        const response= await fetch(`${baseUrl}api/v1/users/id`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.jwt_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToBeSent),
            })
            const res= await response.json()
            
                if (res.status == "success") {
                    return res.data
                }
            }catch(e){
                throw new Error(e);
            }
        };
  
 async function changePhoto(type) {
    const formData = new FormData();
    formData.append(
      type,
      document.getElementById(`input_${type}_photo`).files[0]
    );
try{


const response=await   fetch(`${baseUrl}api/v1/users/${type}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.jwt_token}`,
      },
      body: formData,
    })
 const res=await response.json()
        if (res.status == "success") {
          window.location.reload();
        } else {
          alert(res.message);
        }
      }catch(error) {
        alert(error);
      };
    }

      return{
        changeUserData,
        changePhoto,
        getUserById,
      }
  }
  
