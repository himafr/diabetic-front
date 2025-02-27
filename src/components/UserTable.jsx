import React from 'react';
import UserList from './UserList';

const UserTable = ({bgm,header}) => {
  return (
    <div className="overflow-x-auto m-2 shadow-md">
    <table className="w-full">
        <thead className="bg-gray-100 rounded-sm">
            <tr>
                <th className="text-left">{header[0]}</th>
                <th className="text-left">{header[1]}</th>
                <th className="text-left">{header[2]}</th>
                <th className="text-left">{header[3]}</th>
                <th className="text-left">{header[4]}</th>
            </tr>
        </thead>

        <tbody>
        {bgm.reverse().slice(0, 8).map(e=><UserList key={e.bgm_id} bgm={e} type={"user"} />)}
            
           
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
