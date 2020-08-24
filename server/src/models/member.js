const connection = require("../database/connection");

module.exports = {
  async findAll() {
    const members = await connection("members").select(
      "id",
      "username",
      "email",
      "cpf",
      "rg",
      "class_number",
      "gender",
      "phone_number",
      "birthdate"
    );

    const [{ count }] = await connection("members").count();

    return { members, count };
  },
  async findById(id) {
    const member = await connection("members")
      .select("username", "birthdate", "created_at")
      .where("id", id)
      .first();

    return member;
  },
  async create({
    username,
    email,
    passwordHash,
    cpf,
    rg,
    classNumber,
    gender,
    phoneNumber,
    birthdate,
  }) {
    const [id] = await connection("members")
      .insert({
        username: username,
        email: email,
        password: passwordHash,
        cpf: cpf,
        rg: rg,
        class_number: classNumber,
        gender: gender,
        phone_number: phoneNumber,
        birthdate: birthdate,
      })
      .returning("id");

    return id;
  },
};
