const cookieToken = (user, res, option) => {
  const token = user.createJWTToken();

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (option === "login") {
    return res.status(200).cookie("token", token, options);
  }
  user.password = undefined;
  res.status(200).cookie("token", token, options).json({
    status: 200,
    goto: "http://localhost:3000/api/user/",
  });
};

module.exports = cookieToken;
