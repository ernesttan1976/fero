import {ICalculator} from "../../../models"
import Calculator from "../models/Calculator";

export async function addCalculatorEntry(email: string, calculator: ICalculator) {

        const res = await Calculator.create(calculator);
    
        if (!res) throw new Error('Failed to save calculator entry');
        return res;    
}

export async function getCalculatorEntry(email: string) {

  const res = await Calculator.findOne({"email": email});

  if (!res) throw new Error('Failed to get calculator entry');
  return res;    
}