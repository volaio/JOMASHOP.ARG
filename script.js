document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.getElementById('calculator-form');
    const priceInput = document.getElementById('product-price');
    const resultContainer = document.getElementById('result-container');
    const resultValue = document.getElementById('result-value');
    const errorMessage = document.getElementById('error-message');

    calculatorForm.addEventListener('submit', (event) => {
        // Prevent the form from submitting and reloading the page
        event.preventDefault();

        // Hide previous messages
        errorMessage.style.display = 'none';
        resultContainer.style.display = 'none';

        const priceString = priceInput.value;

        // Validate the input
        if (priceString === '' || isNaN(parseFloat(priceString)) || parseFloat(priceString) <= 0) {
            errorMessage.textContent = 'Por favor ingresá un precio válido.';
            errorMessage.style.display = 'block';
            return;
        }

        // Perform the calculation
        const priceUSD = parseFloat(priceString);
        const flatFee = 20;
        const multiplier = 1.65;
        const finalPrice = (priceUSD * multiplier) + flatFee;

        // Display the result
        resultValue.textContent = `$${finalPrice.toFixed(2)}`;
        resultContainer.style.display = 'block';
    });
});
