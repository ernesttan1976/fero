const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calculatorsSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    dob: {
      type: Date,
    },
    retirementAge: {
      type: Number,
      min: 50,
    },
    grossMonthlyIncome: {
      type: Number,
    },
    cpfOA:{
      type: Number,
    },
    expenses_food: {
      type: Number,
    },
    expenses_transport: {
      type: Number,
    },
    expenses_parents: {
      type: Number,
    },
    expenses_bills: {
      type: Number,
    },
    expenses_loans: {
      type: Number,
    },
    expenses_entertainment: {
      type: Number,
    },
    expenses_miscellaneous: {
      type: Number,
    },

  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Define a virtual property for grossYearlyIncome
calculatorsSchema.virtual("grossYearlyIncome").get(function () {
  if (this.grossMonthlyIncome) {
    return this.grossMonthlyIncome * 12;
  }
  return 0; // You can handle the case when grossMonthlyIncome is not set
});


let Calculator;

try {
  // Try to retrieve the existing model
  Calculator = mongoose.model("Calculator");
} catch (error) {
  // If the model doesn't exist, define and compile it
  Calculator = mongoose.model("Calculator", calculatorsSchema);
}

module.exports = mongoose.model("Calculator", calculatorsSchema);
