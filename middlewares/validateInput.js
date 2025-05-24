module.exports = function (req, res, next) {
    const { email, password, name } = req.body;
    if (!email || !password || (req.path === "/register" && !name)) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
};
