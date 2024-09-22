export const getAccessToken = () => {
  return localStorage.getItem('accessTokenRqm');
};

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessTokenRqm', accessToken);
};

export const removeAccessToken = () => {
  localStorage.removeItem('accessTokenRqm');
};
