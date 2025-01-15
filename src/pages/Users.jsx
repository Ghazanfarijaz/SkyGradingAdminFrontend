import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useGetAllUsersQuery, useUpdateUserMutation } from '../api/apiSlice'; // Import the update mutation

function Users() {
  const { data: users, error, isLoading } = useGetAllUsersQuery(); // Fetching users from the API
  const [updateUser] = useUpdateUserMutation(); // Hook to update user
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user's details

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle opening the modal and setting the selected user
  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the selected user's details
    setOpenModal(true); // Open the modal
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null); // Reset the selected user
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id: selectedUser.id, ...selectedUser }).unwrap();
      alert('User updated successfully!');
      handleCloseModal(); // Close the modal after successful update
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user.');
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return <Typography variant="h6">Loading users...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error fetching users</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={user.status === 'active' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleEditClick(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Edit User Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              name="firstName"
              value={selectedUser?.firstName || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              name="lastName"
              value={selectedUser?.lastName || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={selectedUser?.email || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              value={selectedUser?.phone || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Role"
              name="role"
              value={selectedUser?.role || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Status"
              name="status"
              value={selectedUser?.status || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Country"
              name="country"
              value={selectedUser?.country || ''}
              onChange={handleChange}
            />
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="submit" color="primary">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Users;