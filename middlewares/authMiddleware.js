const jwt = require('jsonwebtoken');

exports.authenticateStudent = (req, res, next) => {
  // Extract token from request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student = decoded; // Attach student information to request object
    next();
  } catch (error) {
    console.error('Error authenticating student:', error);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};