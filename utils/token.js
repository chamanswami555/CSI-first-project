const jwt = require("jsonwebtoken");
const ms = require("ms");

// Generate access & refresh tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { sub: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN } // e.g. "15m"
  );

  const refreshToken = jwt.sign(
    { sub: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN } // e.g. "7d"
  );

  return {
    access: {
      token: accessToken,
      expires: new Date(Date.now() + ms(process.env.ACCESS_TOKEN_EXPIRES_IN)),
    },
    refresh: {
      token: refreshToken,
      expires: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRES_IN)),
    },
  };
};

// Verify refresh token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

// Export both functions as named exports
module.exports = {
  generateTokens,
  verifyRefreshToken,
};
