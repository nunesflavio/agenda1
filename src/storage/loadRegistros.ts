import { registros as initialRegistros } from "../data/dataRegistro"


export function loadRegistros() {
    const storedRegistros = localStorage.getItem('registros');
    if (storedRegistros) {
        try {
            const parsedRegistros = JSON.parse(storedRegistros);
            // Verifica se o JSON parseado é um array válido
            return Array.isArray(parsedRegistros) ? parsedRegistros : initialRegistros;
        } catch (error) {
            console.error("Erro ao parsear JSON do localStorage:", error);
            return initialRegistros;
        }
    }
}
