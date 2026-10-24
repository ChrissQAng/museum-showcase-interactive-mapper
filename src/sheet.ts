export type SheetRow = Record<string, unknown>;

// Loads a spreadsheet file (.ods or .xlsx) and returns the rows of its first sheet.
// Row 1 holds the column names, every following row becomes one object.
export async function loadSheet(url: string): Promise<SheetRow[]> {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`Datei konnte nicht geladen werden: ${url} (${response.status})`);
    }

    // SheetJS is large, so it is only loaded when data is actually needed
    const XLSX = await import('xlsx');
    const workbook = XLSX.read(await response.arrayBuffer());

    const firstSheetName = workbook.SheetNames[0];
    const sheet = firstSheetName ? workbook.Sheets[firstSheetName] : undefined;
    if (!sheet) {
        throw new Error(`Kein Tabellenblatt gefunden in: ${url}`);
    }

    return XLSX.utils.sheet_to_json<SheetRow>(sheet, { defval: '' });
}
