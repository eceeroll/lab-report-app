import Role from "../models/Role";

interface RoleResponse {
  status?: number;
  message?: string;
  roleId?: string;
}

export const getRoleId = async (roleName?: string): Promise<RoleResponse> => {
  if (roleName) {
    const existingRole = await Role.findOne({ name: roleName });
    if (existingRole) {
      return { roleId: existingRole._id.toString() };
    } else {
      return { status: 404, message: "Geçersiz Rol" };
    }
  } else {
    const defaultRole = await Role.findOne({ name: "user" });
    if (defaultRole) {
      return { roleId: defaultRole._id.toString() };
    } else {
      return { status: 500, message: "Varsayılan rol hatası" };
    }
  }
};
