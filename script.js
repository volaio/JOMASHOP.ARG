document.addEventListener('DOMContentLoaded', () => {

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

    const calculatorForm = document.getElementById('calculator-form');
    const urlInput = document.getElementById('product-url');
    const categoryInput = document.getElementById('product-category');
    const priceInput = document.getElementById('product-price');
    const resultContainer = document.getElementById('result-container');
    const resultValue = document.getElementById('result-value');
    const errorMessage = document.getElementById('error-message');
    const whatsappBtn = document.getElementById('whatsapp-btn');

    priceInput.addEventListener('input', (e) => {
        let value = e.target.value;
        let numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue) {
            e.target.value = new Intl.NumberFormat('es-AR').format(numericValue);
        } else {
            e.target.value = '';
        }
    });

    calculatorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        errorMessage.textContent = '';
        resultContainer.style.display = 'none';
        whatsappBtn.style.display = 'none';

        const priceStringWithDots = priceInput.value;
        const priceString = priceStringWithDots.replace(/\./g, '');
        const categoryKey = categoryInput.value;

        if (!priceString || !categoryKey || !urlInput.value) {
            errorMessage.textContent = 'Por favor completá todos los campos.';
            return;
        }

        const price = parseFloat(priceString);
        if (isNaN(price) || price <= 0) {
            errorMessage.textContent = 'Por favor ingresá un precio válido.';
            return;
        }

        const category = categoriesData[categoryKey];
        const shippingRate = 58;
        const flatFee = 20;
        const multiplier = 1.65;
        const basePrice = (price * multiplier) + flatFee;

        const minShippingCost = category.min * shippingRate;
        const maxShippingCost = category.max * shippingRate;

        const minFinalPrice = basePrice + minShippingCost;
        const maxFinalPrice = basePrice + maxShippingCost;

        // --- SECCIÓN CORREGIDA ---
        // 1. Formatear cada precio por separado.
        const formattedMinPrice = new Intl.NumberFormat('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(minFinalPrice);
        const formattedMaxPrice = new Intl.NumberFormat('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(maxFinalPrice);
        
        // 2. Construir el texto final del rango.
        let priceRangeText = `$${formattedMinPrice} - $${formattedMaxPrice}`;
        
        // 3. Añadir la nota del seguro si es necesario.
        if (category.type === 'Especial') {
            priceRangeText += ' + Seguro especial a confirmar';
        }

        // 4. Mostrar el resultado final.
        resultValue.textContent = priceRangeText;
        
        resultContainer.style.display = 'flex';
        whatsappBtn.style.display = 'block';

        setupWhatsAppLink(priceRangeText);
    });

    function setupWhatsAppLink(finalQuoteText) {
        const yourPhoneNumber = '5491126310568'; 
        const productURL = urlInput.value;
        const categoryName = categoriesData[categoryInput.value].name;

        const message = `¡Hola! Quisiera continuar con la cotización de este producto:\n\n- Categoría: ${categoryName}\n- Link: ${productURL}\n- Rango de cotización: ${finalQuoteText}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${yourPhoneNumber}?text=${encodedMessage}`;
        whatsappBtn.href = whatsappURL;
    }
});
