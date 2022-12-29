const logger = (req, res, next) => {
    req.userId = "aejfgu34534645654654";
    console.log(`${req.method} ${req.protocol}://${req.host} ${req.originalUrl}`);
    next();
};

module.exports = logger;