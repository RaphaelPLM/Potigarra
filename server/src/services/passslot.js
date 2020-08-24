const axios = require("axios");

module.exports = {
  async generatePass({ name, createdAt, expirationDate }) {
    const apiURL = process.env.PASSSLOT_URL;

    const config = {
      headers: {
        Authorization: process.env.PASSSLOT_KEY,
      },
    };

    const passData = {
      nome: name,
      createdAt: createdAt,
      expirationDate: expirationDate,
    };

    const apiResponse = await axios.post(apiURL, passData, config);

    return apiResponse.data;
  },
};
