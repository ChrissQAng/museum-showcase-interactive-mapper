export type Language = 'de' | 'en' | 'jp';

export interface MuseumObject {
    vitrine_id: string;
    object_number: number;
    pos_x: number; // 0-100
    pos_y: number; // 0-100
    text_de: string;
    text_en: string;
    text_jp: string;
}

export interface VitrineConfig {
    id: string;
    name: string;
    imageUrl?: string;
}
