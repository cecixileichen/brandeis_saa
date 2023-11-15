const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        enum: ["student", "alumni"],
        default: "student",
        required: true,
      },

      graduationYear: {
        type: Number,
        required: true,
      },

      job: {
        type: String,
      },

      company: {
        type: String,
      },

      city: {
        type: String,
      },

      state: {
        type: String,
      },

      country: {
        type: String,
      },

      zipCode: {
        type: Number,
        min: [10000, "Zip code is too short"],
        max: [99999, "Zip code is too long"],
      },

      bio: {
        type: String,
      },

      interest: [{type: String}],

      //associate to other models
      //courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

    },

    {
      timestamps: true,
    }

  )

  module.exports = mongoose.model("User", userSchema)

