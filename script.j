document.addEventListener('DOMContentLoaded', () => {

    // --- BASE DE DATOS DE CATEGORÍAS ---
    const categoriesData = {
        'carteras':  { name: 'Carteras / Bolsos', min: 0.7, max: 2.5, type: 'Estándar' },
        'lentes':    { name: 'Lentes de Sol', min: 0.3, max: 0.7, type: 'Estándar' },
        'perfumes':  { name: 'Perfumes / Fragancias', min: 0.4, max: 1.0, type: 'Estándar' },
        'zapatos':   { name: 'Zapatos', min: 0.8, max: 2.0, type: 'Estándar' },
        'ropa':      { name: 'Ropa / Indumentaria', min: 0.3, max: 1.8, type: 'Estándar' },
        'lapiceras': { name: 'Lapiceras / Plumas', min: 0.3, max: 0.8, type: 'Estándar' },
        'joyas':     { name: 'Joyas', min: 0.2, max: 0.7, type: 'Especial' },
        'relojes':   { name: 'Relojes', min: 0.5, max: 1.2, type: 'Especial' }
    };

    // --- ELEMENTOS DEL DOM ---
    const calculatorForm = document.getElementById('calculator-form');
    const urlInput = document.getElementById('product-url');
    const categoryInput = document.getElementById('product-category');
    const priceInput = document.getElementById('product-price');
    
    const resultContainer = document.getElementById('result-container');
    const resultValue = document.getElementById('result-value');
    const errorMessage = document.getElementById('error-message');
    const whatsappBtn = document.getElementById('whatsapp-btn');

    // --- LÓGICA DEL CÁLCULO ---
    calculatorForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Ocultar mensajes previos
        errorMessage.style.display = 'none';
        resultContainer.style.display = 'none';
        whatsappBtn.style.display = 'none';

        const priceString = priceInput.value;
        const categoryKey = categoryInput.value;

        // Validar que todos los campos estén completos
        if (!priceString || !categoryKey || isNaN(parseFloat(priceString)) || parseFloat(priceString) <= 0) {
            errorMessage.textContent = 'Por favor completá todos los campos con valores válidos.';
            errorMessage.style.display = 'block';
            return;
        }

        // --- Iniciar cálculos ---
        const category = categoriesData[categoryKey];
        const priceUSD = parseFloat(priceString);
        
        // 1. Calcular costo de envío
        const avgWeight = (category.min + category.max) / 2;
        const shippingRate = 58; // Tu precio de venta por kg en USD
        const shippingCost = avgWeight * shippingRate;

        // 2. Calcular total
        const flatFee = 20;
        const multiplier = 1.65;
        const finalPrice = (priceUSD * multiplier) + flatFee + shippingCost;
        
        // 3. Formatear texto del resultado
        let resultText = `$${finalPrice.toFixed(2)}`;
        if (category.type === 'Especial') {
            resultText += ' + Seguro especial a confirmar';
        }
        resultValue.textContent = resultText;
        
        // 4. Mostrar el resultado y el botón de WhatsApp
        resultContainer.style.display = 'flex'; 
        whatsappBtn.style.display = 'block';

        // 5. Configurar el link de WhatsApp
        setupWhatsAppLink(resultText);
    });

    function setupWhatsAppLink(finalQuoteText) {
        // NÚMERO DE TELÉFONO ACTUALIZADO
        const yourPhoneNumber = '5491126310568'; 

        const productURL = urlInput.value;
        const categoryName = categoriesData[categoryInput.value].name;

        // Crear el mensaje pre-llenado
        const message = `¡Hola! Quisiera continuar con la cotización de este producto:\n\n- Categoría: ${categoryName}\n- Link: ${productURL}\n- Cotización inicial: ${finalQuoteText}`;
        
        // Codificar el mensaje para la URL
        const encodedMessage = encodeURIComponent(message);
        
        // Crear el link final y asignarlo al botón
        const whatsappURL = `https://wa.me/${yourPhoneNumber}?text=${encodedMessage}`;
        whatsappBtn.href = whatsappURL;
    }
});
