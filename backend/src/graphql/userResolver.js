const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userResolver = {
  Query: {
    login: async (_, { usernameOrEmail, password }) => {
      try {
        const user = await User.findOne({
          $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
          throw new Error("Invalid credentials");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return {
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        };
      } catch (error) {
        throw new Error(`Error logging in: ${error.message}`);
      }
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({
          $or: [{ email }, { username }],
        });

        if (existingUser) {
          throw new Error(
            "User with this email or username already exists, please choose another"
          );
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = new User({
          username,
          email,
          password: hashedPassword,
        });

        await user.save();

        return {
          id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    },
  },
};

module.exports = { userResolver };
