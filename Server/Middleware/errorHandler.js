// not found

export const notFound = (req,res,next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.send(404);
    next(error);
}

// error handling

export const errorHandler = (err, req, res, next) => {
    
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err?.messae,
        stack: err?.stack,
    })
}