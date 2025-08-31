let firstOperand = true;
      let terms = [];
      let numbersOfTerms = 0;
      let operators = [];
      let numbersOfOperators = 0;

      const button1 = document.getElementById("1_btn");
      const button2 = document.getElementById("2_btn");
      const button3 = document.getElementById("3_btn");
      const button4 = document.getElementById("4_btn");
      const button5 = document.getElementById("5_btn");
      const button6 = document.getElementById("6_btn");
      const button7 = document.getElementById("7_btn");
      const button8 = document.getElementById("8_btn");
      const button9 = document.getElementById("9_btn");
      const button0 = document.getElementById("0_btn");

      button1.addEventListener("click", () => appendToExpression("1"));
      button2.addEventListener("click", () => appendToExpression("2"));
      button3.addEventListener("click", () => appendToExpression("3"));
      button4.addEventListener("click", () => appendToExpression("4"));
      button5.addEventListener("click", () => appendToExpression("5"));
      button6.addEventListener("click", () => appendToExpression("6"));
      button7.addEventListener("click", () => appendToExpression("7"));
      button8.addEventListener("click", () => appendToExpression("8"));
      button9.addEventListener("click", () => appendToExpression("9"));
      button0.addEventListener("click", () => appendToExpression("0"));

      buttonDot = document.getElementById("dot_btn");
      buttonDot.addEventListener("click", () => appendToExpression("."));

      buttonInvert = document.getElementById("invert_btn");
      buttonInvert.addEventListener("click", () => invertExpression());

      buttonClear = document.getElementById("clear_btn");
      buttonClear.addEventListener("click", () => clearExpression());

      buttonpercentage = document.getElementById("percentage_btn");
      buttonpercentage.addEventListener("click", () => percentage());

      function appendToExpression(value) {
        if (firstOperand) {
          const expr = document.getElementById("expr");
          expr.textContent = value;
          firstOperand = false;
        } else {
          const expr = document.getElementById("expr");
          const currentValue = `${expr.textContent}${value}`;
          expr.textContent = currentValue;
        }
      }

      function invertExpression() {
        const expr = document.getElementById("expr");
        let currentValue = expr.textContent.trim();

        if (currentValue === "" || currentValue === "0") return;

        if (!isNaN(currentValue)) {
          expr.textContent = parseFloat(currentValue) * -1;
        } else {
          let parts = currentValue.split(" ");
          let last = parts[parts.length - 1];

          if (!isNaN(last)) {
            parts[parts.length - 1] = parseFloat(last) * -1;
            expr.textContent = parts.join(" ");
          }
        }
      }

      function percentage() {
        const expr = document.getElementById("expr");
        let currentValue = expr.textContent.trim();

        if (currentValue === "" || currentValue === "0") return;

        if (!isNaN(currentValue)) {
          expr.textContent = parseFloat(currentValue) / 100;
        } else {
          let parts = currentValue.split(" ");
          let last = parts[parts.length - 1];

          if (!isNaN(last)) {
            parts[parts.length - 1] = parseFloat(last) / 100;
            expr.textContent = parts.join(" ");
          }
        }
      }

      function clearExpression() {
        const expr = document.getElementById("expr");
        expr.textContent = "";
        firstOperand = true;
        terms = [];
        operators = [];
        numbersOfTerms = 0;
        numbersOfOperators = 0;
      }

      const plusButton = document.getElementById("plus_btn");
      plusButton.addEventListener("click", () => chooseOperator("+"));

      const minusButton = document.getElementById("minus_btn");
      minusButton.addEventListener("click", () => chooseOperator("−"));

      const multiplyButton = document.getElementById("multiply_btn");
      multiplyButton.addEventListener("click", () => chooseOperator("×"));

      const divideButton = document.getElementById("divide_btn");
      divideButton.addEventListener("click", () => chooseOperator("÷"));

      function chooseOperator(operator) {
        if (!firstOperand) {
          const expr = document.getElementById("expr");
          expr.textContent = `${expr.textContent} ${operator} `;

          numbersOfOperators++;
          numbersOfTerms++;
          for (let i = 0; i < numbersOfTerms; i++) {
            terms[i] = document.getElementById("expr").textContent.split(" ")[
              i * 2
            ];
            console.log(terms);
          }

          for (let i = 0; i < numbersOfOperators; i++) {
            operators[i] = document
              .getElementById("expr")
              .textContent.split(" ")[i * 2 + 1];
            console.log(operators);
          }
        }
      }

      const equalsButton = document.getElementById("equals_btn");
      equalsButton.addEventListener("click", () => equals_btn());

      function equals_btn() {
        if (!firstOperand) {
          numbersOfTerms++;
          for (let i = 0; i < numbersOfTerms; i++) {
            terms[i] = document.getElementById("expr").textContent.split(" ")[
              i * 2
            ];
            console.log(terms);
          }

          fetch("/calculate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              terms: terms.map((t) => parseFloat(t)),
              operators: operators,
            }),
          })
            .then((response) => response.text())
            .then((data) => {
              const expr = document.getElementById("expr");
              console.log(data);
              expr.textContent = data;
            });
        }
      }