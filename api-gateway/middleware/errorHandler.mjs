const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.isOperational) {
        // Operational error: send a user-friendly message
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Programmatic error: log the error and send a generic message
        console.error('ERROR 💥', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
        });
    }
};

export default errorHandler;