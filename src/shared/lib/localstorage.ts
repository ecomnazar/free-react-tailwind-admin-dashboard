import { IAdmin } from './interfaces';

export const getAdminLS = () =>
  localStorage.getItem('adminRqm')
    ? JSON.parse(localStorage.getItem('adminRqm')!)
    : (null as IAdmin | null);

export const setAdminLS = (admin: IAdmin) =>
  localStorage.setItem('adminRqm', JSON.stringify(admin));

export const removeAdminLS = () => localStorage.removeItem('adminRqm');
