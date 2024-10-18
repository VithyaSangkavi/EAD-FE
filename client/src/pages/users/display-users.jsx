import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap'; // Import Modal
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../../components/admin-header';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedUser, setSelectedUser] = useState(null); // To store the selected user for toggle

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
  const toggleUserState = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        'http://localhost:5296/api/UserManagement/update-user-state',
        { Email: selectedUser.email },
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
        user.email === selectedUser.email
          ? { ...user, state: user.state === 'active' ? 'inactive' : 'active' }
          : user
      );
      setUsers(updatedUsers);
      setShowModal(false); // Close the modal after update
    } catch (error) {
      console.error('Error updating user state:', error);
      toast.error('Failed to update user state', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Open the confirmation modal
  const openConfirmationModal = (user) => {
    setSelectedUser(user); // Set the user to be toggled
    setShowModal(true); // Show the modal
  };

  // Close the modal without any action
  const handleCloseModal = () => {
    setShowModal(false); // Close modal without making changes
    setSelectedUser(null); // Clear selected user
  };

  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <h2 className="text-left pb-3" style={{ paddingBottom: '20px' }}>
          Manage Users
        </h2>
        <ToastContainer />
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
                    className="button-width"
                    variant={user.state === 'active' ? 'danger' : 'success'}
                    onClick={() => openConfirmationModal(user)} // Open modal on click
                  >
                    {user.state === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <>
              Are you sure you want to{' '}
              {selectedUser.state === 'active' ? 'deactivate' : 'activate'}{' '}
              {selectedUser.userName}?
            </>
          ) : (
            'Loading...'
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={toggleUserState}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManageUsers;
