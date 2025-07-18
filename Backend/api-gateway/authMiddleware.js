const jwt = require('jsonwebtoken');
const JWT = 'supersecret123';

const requireAuthorization = (req, res, next) => {
  const head = req.headers.authorization;
  console.log("Incoming Auth Header:", head);

  if (!head || !head.startsWith('Bearer ')) {
    console.log("No token sent or wrong format");
    return res.status(401).json({ error: "Token not found" });
  }

  const token = head.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT);
    console.log("Token verified, decoded user:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};


const requireAuthentication = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Not Authenticated" });
  }
  next();
};

module.exports = {
  requireAuthorization,
  requireAuthentication
};
