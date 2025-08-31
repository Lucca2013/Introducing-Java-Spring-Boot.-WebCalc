package com.calculator.WebCalculator.Service;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CalculatorService {

    public Float calculate(List<Float> terms, List<String> operators) {
        if (terms == null || terms.isEmpty()) {
            return null;
        }
        
        // Safety check for operators
        if (operators == null || operators.size() < terms.size() - 1) {
            throw new IllegalArgumentException("Insufficient number of operators for the provided terms");
        }
        
        Float result = terms.get(0);
        
        for (int i = 1; i < terms.size(); i++) {
            String operator = operators.get(i - 1);
            Float term = terms.get(i);
            
            switch (operator) {
                case "+":
                    result += term;
                    break;
                case "-":
                    result -= term;
                    break;
                case "×":
                    result *= term;
                    break;
                case "÷":
                    if (term != 0) {
                        result /= term;
                    } else {
                        throw new ArithmeticException("Division by zero is not allowed");
                    }
                    break;
                default:
                    throw new IllegalArgumentException("Invalid operator: " + operator);
            }
        }
        return result;
    }
}