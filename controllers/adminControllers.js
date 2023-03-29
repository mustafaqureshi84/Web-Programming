const login = (req, res) => {
    res.send("admin Login Page");
};

const dashboard = (req, res) => {
    res.send("admin Dashboard Page");
};

const addAdmin = (req, res) => {
    res.send("Add Admin user");
};

module.exports = { login, dashboard, addAdmin };