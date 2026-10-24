import { ref } from 'vue';
import type { MuseumObject, VitrineConfig } from './types';
import { loadSheet, type SheetRow } from './sheet';

// Spreadsheet files in public/data/ – they can be edited and replaced without rebuilding the app.
// .ods (OpenOffice/LibreOffice) and .xlsx (Excel) are both supported.
const VITRINEN_FILE = 'data/vitrinen.ods';
const OBJEKTE_FILE = 'data/objekte.ods';

export const vitrineConfigs = ref<VitrineConfig[]>([]);
export const allObjects = ref<MuseumObject[]>([]);

const text = (value: unknown): string => String(value ?? '').trim();

const isEmptyRow = (row: SheetRow): boolean => Object.values(row).every(v => text(v) === '');

// Spreadsheet row numbers start at 1 and row 1 is the header, so data row i is sheet row i + 2
const sheetRow = (index: number): number => index + 2;

function toVitrineConfigs(rows: SheetRow[]): VitrineConfig[] {
    const configs: VitrineConfig[] = [];

    rows.forEach((row, i) => {
        if (isEmptyRow(row)) return;

        const id = text(row.id);
        if (!id) {
            console.warn(`${VITRINEN_FILE}, Zeile ${sheetRow(i)}: Spalte "id" ist leer – Zeile übersprungen.`);
            return;
        }

        configs.push({
            id,
            name: text(row.name),
            imageUrl: text(row.imageUrl) || undefined
        });
    });

    return configs;
}

function toMuseumObjects(rows: SheetRow[]): MuseumObject[] {
    const objects: MuseumObject[] = [];

    rows.forEach((row, i) => {
        if (isEmptyRow(row)) return;

        const vitrine_id = text(row.vitrine_id);
        const numericCells = [row.object_number, row.pos_x, row.pos_y];
        // Number('') is 0, so empty cells have to be checked separately
        const invalidNumber = numericCells.some(v => text(v) === '' || Number.isNaN(Number(v)));

        if (!vitrine_id || invalidNumber) {
            console.warn(`${OBJEKTE_FILE}, Zeile ${sheetRow(i)}: vitrine_id, object_number, pos_x oder pos_y ungültig – Zeile übersprungen.`);
            return;
        }

        objects.push({
            vitrine_id,
            object_number: Number(row.object_number),
            pos_x: Number(row.pos_x),
            pos_y: Number(row.pos_y),
            text_de: text(row.text_de),
            text_en: text(row.text_en),
            text_jp: text(row.text_jp)
        });
    });

    return objects;
}

export async function loadData(): Promise<void> {
    const base = import.meta.env.BASE_URL;

    const [vitrinenRows, objekteRows] = await Promise.all([
        loadSheet(`${base}${VITRINEN_FILE}`),
        loadSheet(`${base}${OBJEKTE_FILE}`)
    ]);

    vitrineConfigs.value = toVitrineConfigs(vitrinenRows);
    allObjects.value = toMuseumObjects(objekteRows);
}
