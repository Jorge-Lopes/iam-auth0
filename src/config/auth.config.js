const authConfig = {
  authRequired: process.env.AUTH_REQUIRED,
  auth0Logout: process.env.AUTH0_LOGOUT,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET,
  session: {
    cookie: {
      secure: false, // XXX: other approach is postman interceptor
    },
  },
};

export default authConfig;
