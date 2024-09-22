import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { instance } from '../shared/api/instance';
import { API_ENDPOINTS } from '../shared/api/endpoints';

const Users = () => {
  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await instance.get(
        `${API_ENDPOINTS.USERS_ALL}?limit=10&offset=1`,
      );
      console.log(response.data);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Breadcrumb pageName="Users" />
    </>
  );
};

export default Users;
