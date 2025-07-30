const db = require("../dbConfig/db");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

exports.adminModel = {
  create: asyncHandler(async (adminData) => {
    if (Array.isArray(adminData.phones)) {
      adminData.phones = JSON.stringify(adminData.phones);
    }
    if (adminData.password) {
      adminData.password = await bcrypt.hash(adminData.password, 12);
    }
    delete adminData.passwordConfirmation;
    await db("admin").insert(adminData);
    return adminData;
  }),
  getAll: asyncHandler(async () => {
    const result = await db("admin").select("*");
    result.forEach((admin) => {
      if (admin.phones) {
        try {
          admin.phones = JSON.parse(admin.phones);
        } catch (e) {
          admin.phones = [];
        }
      }
    });
    return result;
  }),
  getById: asyncHandler(async (adminId) => {
    const result = await db("admin").select("*").where({ id: adminId });
    result.forEach((admin) => {
      if (admin.phones) {
        try {
          admin.phones = JSON.parse(admin.phones);
        } catch (e) {
          admin.phones = [];
        }
      }
    });
    return result;
  }),
  update: asyncHandler(async (adminId, updateAdmin) => {
    const result = await db("admin").select("*").where({ id: adminId });
    if (!result || result.length === 0) {
      return null;
    }
    if (Array.isArray(updateAdmin.phones)) {
      updateAdmin.phones = JSON.stringify(updateAdmin.phones);
    }
    if (updateAdmin.password) {
      updateAdmin.password = await bcrypt.hash(updateAdmin.password, 12);
    }
    await db("admin").where({ id: adminId }).update(updateAdmin);
    return result;
  }),
  delete: asyncHandler(async (adminId) => {
    const result = await db("admin").where({ id: adminId });
    if (!result || result.length === 0) {
      return null;
    }
    await db("admin").where({ id: adminId }).del();
    return result;
  }),
  passwordChange: asyncHandler(async (adminId, updatePassword) => {
    return await db("admin")
      .where({ id: adminId })
      .update({
        password: await bcrypt.hash(updatePassword, 12),
        passwordChangedAt: new Date(),
      });
  }),
};
