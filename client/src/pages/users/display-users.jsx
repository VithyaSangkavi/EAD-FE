import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../../components/admin-header';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5296/api/UserManagement/all-users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  // Handle the activation/deactivation of users
  const toggleUserState = async (email) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        'http://localhost:5296/api/UserManagement/update-user-state',
        { Email: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.Message, {
        position: 'top-right',
        autoClose: 3000,
      });

      // Refresh the user list after updating
      const updatedUsers = users.map((user) =>
        user.email === email
          ? { ...user, state: user.state === 'active' ? 'inactive' : 'active' }
          : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user state:', error);
      toast.error('Failed to update user state', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <h2>Manage Users</h2>
        <ToastContainer />{' '}
        {/* Toast notifications for success/error messages */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.userName}</td>
                <td>{user.state === 'active' ? 'Active' : 'Inactive'}</td>
                <td>
                  <Button
                    variant={user.state === 'active' ? 'danger' : 'success'}
                    onClick={() => toggleUserState(user.email)}
                  >
                    {user.state === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ManageUsers;
