# Museum Showcase Interactive Mapper

Eine Vue 3 + TypeScript Anwendung zur interaktiven Erkundung von Museumsvitrinen.

## Funktionen

- Interaktive Vitrinenansicht mit klickbaren Objektmarkern
- Mehrsprachige Unterstützung (Deutsch, Englisch, Japanisch)
- Schema- und Foto-Ansichtsmodi
- Responsives Design mit elegantem Dark Theme

## Technologie-Stack

- Vue 3 mit Composition API
- TypeScript
- Vite
- TailwindCSS (via CDN)

## Erste Schritte

```bash
npm install
npm run dev
```

---

## So funktioniert es

### Approximative Platzierung

Die App nutzt relative Koordinaten (0–100%) für X und Y. Dies erlaubt eine skalierbare Darstellung, die unabhängig von der Bildschirmauflösung funktioniert. Durch `absolute` Positionierung innerhalb eines `relative` Containers bleiben die Marker exakt an ihrem logischen Ort, auch wenn das Fenster verkleinert wird.

### Daten bearbeiten (Vitrinen und Objekte)

Alle Inhalte stehen in zwei Tabellendateien, die mit OpenOffice/LibreOffice Calc oder Excel bearbeitet werden:

| Datei | Inhalt | Spalten (Zeile 1) |
|---|---|---|
| `public/data/vitrinen.ods` | Liste der Vitrinen | `id`, `name`, `imageUrl` |
| `public/data/objekte.ods` | alle Objekte aller Vitrinen | `vitrine_id`, `object_number`, `pos_x`, `pos_y`, `text_de`, `text_en`, `text_jp` |

Regeln:

- **Zeile 1 enthält die Spaltennamen** – diese nicht umbenennen. Die Reihenfolge der Spalten ist egal.
- Es wird nur das **erste Tabellenblatt** gelesen; weitere Blätter (z. B. für Notizen) werden ignoriert.
- `pos_x` / `pos_y` sind Prozentwerte (0–100) bezogen auf das Vitrinenbild.
- Ungültige Zeilen (z. B. fehlende `vitrine_id` oder Position) werden übersprungen und in der Browser-Konsole gemeldet.
- Statt `.ods` kann auch `.xlsx` verwendet werden – dann die Dateinamen oben in `src/data.ts` anpassen.

Die Dateien werden beim Start der App geladen. Nach dem Build liegen sie unter `dist/data/` und können dort **ohne neuen Build** ausgetauscht werden – Seite neu laden genügt.

### Neue Vitrine hinzufügen

1. In `vitrinen.ods` eine Zeile ergänzen, z. B. `4 | Vitrine 4 | museum4.jpg`.
2. Das Vitrinenbild nach `public/` legen (hier `public/museum4.jpg`).
3. Die Objekte in `objekte.ods` mit `vitrine_id` = `4` eintragen.
4. Detailbilder als `public/detailVitrine4/dtv4-<object_number>.png` ablegen.

> Hinweis: Die Daten werden per `fetch` geladen. Die App muss deshalb über einen Webserver laufen (`npm run dev`, `npm run preview` oder ein beliebiger Server) – ein Öffnen von `index.html` per Doppelklick funktioniert nicht.

---

## Projektstruktur

Dieses Projekt verwendet Vue 3 `<script setup>` SFCs. Mehr Informationen in der [Script Setup Dokumentation](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup).

Weitere Details zur empfohlenen Projekteinrichtung und IDE-Unterstützung findest du im [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
# museum-showcase-interactive-mapper
