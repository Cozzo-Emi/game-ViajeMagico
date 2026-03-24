/**
 * Lógica del juego: Valida la primera letra y la existencia real del objeto.
 */
const GameLogic = {
    validarObjetoReal: async function(nombre, objeto) {
        if (!nombre || !objeto) return { valido: false, razon: "vacio" };

        const letraNombre = nombre.trim().charAt(0).toLowerCase();
        const palabra = objeto.trim().toLowerCase();

        // Validación de letra inicial
        if (palabra.charAt(0) !== letraNombre) {
            return { valido: false, razon: "letra_incorrecta" };
        }

        // Validación de existencia 
        try {
            // API de diccionario 
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`);
            
            if (!response.ok) {
                return { valido: false, razon: "palabra_inexistente" };
            }

            const data = await response.json();
            
            // Verifica si es un sustantivo (noun) para asegurar que sea un "objeto"
            const esObjeto = data[0].meanings.some(m => m.partOfSpeech === "noun");
            
            return esObjeto 
                ? { valido: true } 
                : { valido: false, razon: "no_es_objeto" };

        } catch (error) {
            console.error("Error de red:", error);
            // Si la API falla, permitimos la lógica de letras para no romper la experiencia
            return { valido: true }; 
        }
    }
};