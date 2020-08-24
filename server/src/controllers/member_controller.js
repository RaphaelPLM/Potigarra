const connection = require("../database/connection");
const bcrypt = require("bcrypt");
const CardsController = require("./card_controller");
const MemberModel = require("../models/member.js");
const CardModel = require("../models/card");

module.exports = {
  async index(request, response) {
    const { members, count } = await MemberModel.findAll();

    count;

    response.header("X-Total-Count", count);

    return response.json(members);
  },
  async create(request, response) {
    const {
      username,
      email,
      password,
      cpf,
      rg,
      classNumber,
      gender,
      phoneNumber,
      birthdate,
    } = request.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
      const id = await MemberModel.create({
        username,
        email,
        passwordHash,
        cpf,
        rg,
        classNumber,
        gender,
        phoneNumber,
        birthdate,
      });

      await CardModel.create(id);
    } catch (err) {
      if (err.constraint === "members_email_unique") {
        return response
          .status(422)
          .json({ error: "This email is already in use." });
      } else {
        return response
          .status(500)
          .json({ error: "An error occurred while registering. Try again." });
      }
    }

    return response
      .status(200)
      .json({ message: "User registered with success." });
  },
};
