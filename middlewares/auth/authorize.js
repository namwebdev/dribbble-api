const authorize = (arrayType) => (req, res, next) => {
  try {
    const { user } = req;
    if (arrayType.includes(user.type)) next();
    else res.status(403).json({ message: "Forbidden" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { authorize };
