exports.errorResponse = (res, statusCode, message) =>
    res.status(statusCode).json({ message });
