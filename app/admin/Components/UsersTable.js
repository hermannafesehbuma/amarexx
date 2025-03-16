'use client';

import { deleteUser } from '@/app/api/supabaseapi';
import ErrorBox from '@/app/dashboard/Components/ErrorBox';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import UpdateUsersMenu from './UpdateUsersMenu';
import Loading from '../loading';
import MessageLog from './MessageLog';

function UsersTable({ data, error }) {
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleDeleteUser(userId) {
    console.log(userId);
    const error = await deleteUser(userId);

    if (error) {
      setErrMessage('This User Failed to Delete, Try Again');
    } else {
      setSuccessMessage('User has been deleted successfully');
    }
  }

  function handleEditUser(user) {
    setEditMenuOpen(true);
    setActiveUser(user);
  }

  return (
    <div className="bg-white mt-10 p-10 shadow text-sm">
      {errMessage ? (
        <MessageLog
          message={errMessage}
          setMessage={setErrMessage}
          value={false}
        />
      ) : (
        <MessageLog
          message={successMessage}
          setMessage={setSuccessMessage}
          value={true}
        />
      )}
      {editMenuOpen && (
        <UpdateUsersMenu
          editMenuOpen={editMenuOpen}
          setEditMenuOpen={setEditMenuOpen}
          activeUser={activeUser}
        />
      )}
      <div className="w-full overflow-x-auto">
        <table className="w-[100%]">
          <thead>
            <tr>
              <th className="text-left pb-5 border-b border-primary">
                User&apos;s Names
              </th>
              <th className="text-left pb-5 border-b border-primary">Email</th>
              <th className="text-left pb-5 border-b border-primary">
                Phone Number
              </th>
              <th className="text-left pb-5 border-b border-primary">
                Address
              </th>
              <th className="text-left pb-5 border-b border-primary">Action</th>
              <th className="text-left pb-5 border-b border-primary">Delete</th>
            </tr>
          </thead>

          <tbody>
            {error ? (
              <ErrorBox message={error.message} />
            ) : (
              data.map((user) => (
                <tr key={user.user_id}>
                  <td className="text-left font-bold text-blue-500 py-5 border-b">
                    {user.name}
                  </td>
                  <td className="text-left py-5 border-b">{user.email}</td>
                  <td className="text-left py-5 border-b">
                    {user.phone_number}
                  </td>
                  <td className="text-left py-5 border-b">{user.address}</td>
                  <td className="py-5 border-b">
                    <FaEdit
                      className="text-green-600 cursor-pointer"
                      onClick={() => handleEditUser(user)}
                    />
                  </td>
                  <td className="py-5 border-b">
                    <MdDelete
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDeleteUser(user.user_id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
