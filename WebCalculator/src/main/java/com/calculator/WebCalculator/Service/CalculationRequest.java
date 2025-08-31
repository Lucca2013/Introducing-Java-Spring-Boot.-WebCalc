package com.calculator.WebCalculator.Service;

import java.util.List;

public class CalculationRequest {
    private List<Float> terms;
    private List<String> operators;

    public List<Float> getTerms() {
        return terms;
    }

    public void setTerms(List<Float> terms) {
        this.terms = terms;
    }

    public List<String> getOperators() {
        return operators;
    }

    public void setOperators(List<String> operators) {
        this.operators = operators;
    }
}
