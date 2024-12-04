const factoryResponse = (status, message) => ({ status, message });

export const isAuthenticated = (req, res, next) => {
  return req.isAuthenticated()
    ? next()
    : res.status(401).json(factoryResponse(401, "Unauthorized"));
};

export const authorizeRole = (role) => (req, res, next) => {
  return req.user.role === role
    ? next()
    : res.status(403).json(factoryResponse(403, "Forbidden"));
};