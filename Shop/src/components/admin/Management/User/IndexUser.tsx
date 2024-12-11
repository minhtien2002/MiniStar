import React, { useEffect, useState } from 'react';
import { message, Spin } from 'antd';
import API_ENDPOINTS from '../../../../services/apiConfig';
import { UserTable } from './UserTable';
import EditUserDrawer from './EditUserDrawer';
interface UserSummary {
  UserId: number;
  FullName: string;
  Username: string;
  Email: string;
  RoleName: string;
  PhoneNumber: string;
  Gender: string;
}

export const IndexUser = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<UserSummary | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.getAllUsers);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Something went wrong while fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

 const handleDeleteUser = async (userId: number) => {
  setLoading(true); // Hiển thị trạng thái tải
  try {
    const response = await fetch(`${API_ENDPOINTS.deleteUser(userId)}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    // Cập nhật danh sách user sau khi xóa thành công
    setUsers((users) => users.filter((user) => user.UserId !== userId));
    message.success('User deleted successfully');
  } catch (error) {
    console.error("Error deleting user:", error);
    message.error('Error deleting user');
  } finally {
    setLoading(false); // Tắt trạng thái tải
  }
};


  const handleEditUser = (user: UserSummary) => {
    setEditingUser(user);
    setDrawerVisible(true);
  };

  const handleUpdateUser = async (updatedUser: UserSummary) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.updateUser}/${updatedUser.UserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      setUsers(users.map((user) => (user.UserId === updatedUser.UserId ? updatedUser : user)));
          fetchUsers();

      message.success('User updated successfully');
    } catch (error) {
      message.error('Error updating user');
    } finally {
      setLoading(false);
      setDrawerVisible(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <UserTable users={users} onDeleteUser={handleDeleteUser} onEditUser={handleEditUser} />
      <EditUserDrawer
        visible={drawerVisible}
        user={editingUser}
        onClose={() => setDrawerVisible(false)}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
};
