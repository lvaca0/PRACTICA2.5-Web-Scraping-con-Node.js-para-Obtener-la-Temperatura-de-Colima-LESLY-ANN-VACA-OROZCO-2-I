const axios = require("axios"); // [cite: 49]
const cheerio = require("cheerio"); // [cite: 50]

async function obtenerTemperatura() {
    try {
        // URL específica para Colima, México
        const url = "https://weather.com/es-MX/tiempo/hoy/l/5494ae521f143676e87cba7667966a9c48aee945d13a64871e758b7654b6b495"; // [cite: 53, 54]

        // Descargamos el HTML simulando un navegador real con un User-Agent
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        }); // [cite: 56, 59]

        // Cargamos el HTML en Cheerio
        const $ = cheerio.load(data); // [cite: 62]

        // Extraemos la temperatura actual
        const temperatura = $("[data-testid='TemperatureValue']").first().text(); // [cite: 63, 65]
        
        // Desafío Extra: Extraer sensación térmica
        const sensacionTermica = $("[data-testid='FeelsLikeSection'] [data-testid='TemperatureValue']").text(); // [cite: 90]

        if (temperatura) {
            console.log("====================================");
            console.log(`La temperatura en Colima es: ${temperatura}`); // [cite: 67, 68]
            if (sensacionTermica) {
                console.log(`Sensación térmica: ${sensacionTermica}`);
            }
            console.log("====================================");
        } else {
            console.log("No se encontró la temperatura en la página."); // [cite: 70]
        }

    } catch (error) {
        console.error("Error al obtener la temperatura:", error.message); // [cite: 74, 75]
    }
}

// Ejecutar la aplicación
obtenerTemperatura();