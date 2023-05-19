const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insurancePlansSchema = new Schema (
  {
    type: {
      type: String,
      default: "Life",
      enum: ["Life", "Accident", "Term"],
    },
    monthlyContribution: {
      type: Number,
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const investmentPlansSchema = new Schema (
  {
    type: {
      type: String,
      default: "Stocks",
      enum: ["Stocks", "Bonds", "Unit Trust", "Reit"],
    },
    monthlyContribution: {
      type: Number,
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const longTermSavingsPlansSchema = new Schema (
  {
    type: {
      type: String,
      default: "Long Term Savings",
      enum: ["Long Term Savings"],
    },
    monthlyContribution: {
      type: Number,
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const shortTermSavingsPlansSchema = new Schema (
  {
    type: {
      type: String,
      default: "Short Term Savings",
      enum: ["Short Term Savings"],
    },
    monthlyContribution: {
      type: Number,
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

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
    insurancePlans_id: [insurancePlanSchema],
    investmentPlans_id: [investmentPlanSchema],
    longTermSavingsPlans_id: [longTermSavingsPlansSchema],
    shortTermSavingsPlans_id: [shortTermSavingsPlansSchema],
    averageMonthlyExpenses_bills: {
      type: Number,
    },
    averageMonthlyExpenses_mortgage: {
      type: Number,
    },
    averageMonthlyExpenses_loans: {
      type: Number,
    },
    averageMonthlyExpenses_transport: {
      type: Number,
    },
    averageMonthlyExpenses_food: {
      type: Number,
    },
    averageMonthlyExpenses_others: {
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
