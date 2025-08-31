package com.calculator.WebCalculator.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.calculator.WebCalculator.Service.CalculatorService;
import com.calculator.WebCalculator.Service.CalculationRequest;
import java.util.List;

@Controller
public class CalculatorController {
    @Autowired
    private CalculatorService calculatorService;
    private CalculationRequest calculationRequest;

    @GetMapping("/")
    public String render() {
        return "index";
    }

    @PostMapping("/calculate")
    @ResponseBody
    public float calculate(@RequestBody CalculationRequest request) {
        calculationRequest = request;
        List<Float> terms = calculationRequest.getTerms();
        List<String> operators = calculationRequest.getOperators();

        return calculatorService.calculate(terms, operators);
    }
}