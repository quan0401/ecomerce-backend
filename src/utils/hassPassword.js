import bcrypt from "bcryptjs";

const hassPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export default hassPassword;
