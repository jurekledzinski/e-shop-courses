const { sessionName } = require("../configs/config");
const { ErrorHandler } = require("../errors/error");

const getUser = ({ session: { person } }, res) => {
  if (person) {
    return res.json(person);
  } else {
    return res.end();
  }
};

const logoutUser = ({ session }, res, next) => {
  const { person } = session;
  if (person) {
    session.destroy((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
      res.clearCookie(sessionName);
      return res.end("You are logged out");
    });
  }
};

module.exports = { getUser, logoutUser };
