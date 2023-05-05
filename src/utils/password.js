import bcrypt from "bcryptjs";

const hassPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, hassPassword) => {
  return bcrypt.compareSync(password, hassPassword);
};

export { hassPassword, comparePassword };
