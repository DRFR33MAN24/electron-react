const db = require("./../database");
const { DataTypes } = require("sequelize");

const User = db.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
      // allowNull defaults to true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false

      // allowNull defaults to true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
      // allowNull defaults to true
    }, phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false

      // allowNull defaults to true
    },
    balance: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    clicks: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    wallet: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true
    },

    register_date: {
      type: DataTypes.DATE,
      defaultValue: Date.now
      // allowNull defaults to true
    }
  },
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  }
);

module.exports = User;

// const mongoose = require("mongoose");
// const schema = mongoose.Schema;

// const UserSchema = new schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   register_date: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = User = mongoose.model("user", UserSchema);
