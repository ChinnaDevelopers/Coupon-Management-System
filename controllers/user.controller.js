exports.register = (req, res) => {
  const { name, organization, email, password } = req.body;

  if (!name) throw new Error("Name is required");
  if (!organization) throw new Error("Organization is required");
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  res.status(200).json({
    message: "User registered successfully",
  });
};

exports.login = (req, res) => {
  res.status(200).json({
    message: "User logged in successfully",
  });
};
