export const BACKEND_URL = 'http://localhost:3000/api';
export const BACKEND_ROUTES = {
  auth: `${BACKEND_URL}/auth`,
  login: `${BACKEND_URL}/auth/azureadoauth2`,
  logout: `${BACKEND_URL}/auth/logout`,
  vote: `${BACKEND_URL}/vote`,
  project: `${BACKEND_URL}/project`,
  team: `${BACKEND_URL}/team`,
  gallery: `${BACKEND_URL}/gallery`,
  upload: `${BACKEND_URL}/upload`,
  judges: `${BACKEND_URL}/judges`,
};

export const FRONTEND_URL = 'http://localhost:5173';