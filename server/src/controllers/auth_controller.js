require("dotenv").config({ path: ".env" });

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const MemberModel = require("../models/member")

module.exports = {
  async login(request, response) {
    const errorMessage =
      "The authentication failed. The credentials provided are invalid.";

    const { email, password } = request.body;

    const user = await MemberModel.findByEmail(email)

    if (user === undefined) {
      return response.status(401).json({ error: errorMessage });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return response.status(401).json({ error: errorMessage });
    }

    jwt.sign(
      { user: { id: user.id, email } },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: parseInt(process.env.TOKEN_EXPIRATION_TIME) },
      (error, token) => {
        const successMessage =
          "The credentials provided are valid. Succesfully logged in.";

        return response
          .status(200)
          .json({ token: token, message: successMessage });
      }
    );
  },
};
