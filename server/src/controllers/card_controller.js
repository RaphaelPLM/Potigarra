const format = require("date-fns/format");

const CardModel = require("../models/card");
const MemberModel = require("../models/member");
const PassslotService = require("../services/passslot");

module.exports = {
  async index(request, response) {
    const { cards, count } = await CardModel.findAll();

    response.header("X-Total-Count", count);

    return response.status(200).json(cards);
  },
  async generatePass(request, response) {
    const { memberId } = request.body;

    // Get data of the member whose card will be activated
    const { username, created_at } = await MemberModel.findById(memberId);

    const formattedCreatedAt = format(created_at, "dd/MM/yyyy");
    const expirationDate = "01/01/2021";

    try {
      const { passUrl, passSerialNumber } = await PassslotService.generatePass({
        username,
        formattedCreatedAt,
        expirationDate,
      });

      const updatedCard = await CardModel.updateByMemberId(memberId, {
        url: passUrl,
        status: "Active",
        serial_number: passSerialNumber,
      });

      return response.status(200).json({
        card: updatedCard,
        message: "Your card was successfully generated.",
      });
    } catch (err) {
      return response
        .status(500)
        .json({ error: "An error has occured. Try again." });
    }
  },
};
