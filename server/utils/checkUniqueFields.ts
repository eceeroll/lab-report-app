import User from "../models/User";

export const checkUniqueFields = async ({
  email,
  tc_no,
  username,
}: {
  email: string;
  tc_no: string;
  username: string;
}) => {
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return { status: 400, message: "Bu E-Posta adresi sisteme kayıtlı!" };
  }

  const existingTcNo = await User.findOne({ tc_no });
  if (existingTcNo) {
    return { status: 400, message: "Bu TC Kimlik Numarası sisteme kayıtlı!" };
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return { status: 400, message: "Bu kullanıcı adı daha önceden alınmış!" };
  }

  return null;
};
