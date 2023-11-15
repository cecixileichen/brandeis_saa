const mongoose = require("mongoose")

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
          },
    
          description: {
            type: String,
            required: true,
          },

          location: {
            type: String,
            required: true,
          },
    
          startDate: {
            type: Date,
            required: true,
          },

          endDate: {
            type: Date,
            required: true,
          },
    
          isOnLine: {
            type: Boolean,
            default: false,
          },

          registrationLink: {
            type: String,
          },

          organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
          },

          attendees: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          }],

    },

    {
        timestamps: true,
    }

)

module.exports = mongoose.model("Event", eventSchema)


