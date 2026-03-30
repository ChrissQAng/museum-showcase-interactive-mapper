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

### Neue Vitrinen hinzufügen

Um neue Vitrinen hinzuzufügen:

1. **CSV-Daten erweitern**: Neue Zeilen in die CSV-Struktur einfügen (mit der entsprechenden `vitrine_id`)
2. **Konfiguration hinzufügen**: In `src/data.ts` eine neue Vitrine-Konfiguration mit ID und optionalem Hintergrundbild ergänzen:

```typescript
export const vitrineConfigs: VitrineConfig[] = [
  { id: "1", name: "Vitrine 1", imageUrl: "/museum1.jpg" },
  { id: "2", name: "Neue Vitrine", imageUrl: "/neue-vitrine.jpg" }, // NEU
];
```

3. Das Interface erkennt die neue ID automatisch.

---

## Projektstruktur

Dieses Projekt verwendet Vue 3 `<script setup>` SFCs. Mehr Informationen in der [Script Setup Dokumentation](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup).

Weitere Details zur empfohlenen Projekteinrichtung und IDE-Unterstützung findest du im [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
# museum-showcase-interactive-mapper
