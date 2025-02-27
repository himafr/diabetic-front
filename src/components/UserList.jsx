import baseUrl from "../const/const";
import { useAuth } from "../context/AuthContext"

function UserList({bgm,type,setPatientId}) {
    const { user } = useAuth()
console.log(bgm.first_name)
    console.log(user)
    if(type=="user")return (
        <tr>
        <td>
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src={baseUrl+"get/"+user.photo}
                alt="" />
        </td>
        <td>{user.first_name}</td>
        <td>{bgm.bgm_num}</td>
        <td>{new Date(bgm.bgm_date).toDateString()}</td> 
        
        <td><span
                className={` ${bgm.bgm_num > 130?"bg-yellow-300" :bgm.bgm_num < 90 ?"bg-red-300":"bg-green-300" }  text-green-700 px-3 py-1 ring-1 ring-green-200 text-xs rounded-md `}>{bgm.bgm_num > 130?"عالي" :bgm.bgm_num < 90 ?"منخفض":"طبيعي" }</span>
        </td>
        
      
    </tr>
    
    )

    if(type=="pharm")return (
        <tr onClick={()=>setPatientId(bgm.user_id)}>
        <td>
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src={baseUrl+"get/"+user.photo}
                alt="" />
        </td>
        <td>{bgm.username}</td>
        <td>{bgm.email}</td>
        <td>{new Date(bgm.created_at).toDateString()}</td> 
        <td><span
                className="  bg-green-300 text-green-700 px-3 py-1 ring-1 ring-green-200 text-xs rounded-md"> free</span>
        </td>
        
      
    </tr>
    )
}

export default UserList
