const connection = require("../database/connection");

module.exports = {
  async findAll() {
    const cards = await connection("cards")
      .join("members", "members.id", "=", "cards.member_id")
      .select(
        "cards.*",
        "members.username",
        "members.cpf",
        "members.rg",
        "members.phone_number",
        "members.class_number",
        "members.gender",
        "members.birthdate",
        "members.created_at"
      );

    const [{ count }] = await connection("cards").count();

    return { cards, count };
  },
  async findByMemberId(id) {
    const member = await connection("cards")
      .select("*")
      .where({ member_id: id })
      .first();

    return member;
  },
  async create(memberId) {
    const cardData = await connection("cards").insert({
      member_id: memberId,
    });

    return cardData;
  },
  async updateByMemberId(memberId, { url, status, serial_number }) {
    await connection("cards").where("member_id", memberId).update({
      url,
      status,
      serial_number,
    });

    const updatedCard = await module.exports.findByMemberId(memberId);

    return updatedCard;
  },
};
