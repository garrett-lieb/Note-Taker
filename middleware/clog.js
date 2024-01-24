function clog(req, res, next) {
    console.log(`[${req.method}] ${req.path}`);
    next();
}

module.exports = clog;
