const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    try {
        // Try getting the token from cookies or authorization header
        let token = req.cookies?.token; 

        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        // If no token is found, return 401 Unauthorized
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next(); // Proceed to the next middleware

    } catch (error) {
        return res.status(403).json({ message: "Forbidden - Invalid or Expired Token" });
    }
};
