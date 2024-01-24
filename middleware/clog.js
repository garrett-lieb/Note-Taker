function clog(req, res, next) {
    console.log(`[${req.method}] ${req.path}`);
    next();
}

exports.clog = clog;
