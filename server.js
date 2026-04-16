const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/clima', async (req, res) => {
    try {
        const url = "https://weather.com/es-MX/tiempo/hoy/l/5494ae521f143676e87cba7667966a9c48aee945d13a64871e758b7654b6b495";
        
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const temperatura = $("[data-testid='TemperatureValue']").first().text();

        if (temperatura) {
            res.json({ temp: temperatura });
        } else {
            res.status(404).json({ error: "No se encontró el dato" });
        }
    } catch (error) {
        console.error("Error al obtener datos:", error.message);
        res.status(500).json({ error: "Error de conexión" });
    }
});

app.listen(3000, () => {
    console.log("Servidor encendido en http://localhost:3000");
});