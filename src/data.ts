import type { MuseumObject, VitrineConfig } from './types';

// The raw CSV data provided by the user
const rawCSV = `vitrine_id,object_number,pos_x,pos_y,text_de,text_en,text_jp
1,1,22,35,"Porträt des Fürstbischofs Georg Carl v. Fechenbach (reg. 1795-1802) Ölgemälde/ Dr Walther M. Brot (Nachlass)","Portrait of the prince bishop Georg Carl von Fechenbach (1795-1802), Oil painting/ Dr. Walther M. Brot (asset)","ゲオルグ・カール・フォン・フェッヘンバッハの画像(1795年-1802年在位) 油彩画　Dr.ウワ－ルテル･ブロト"
1,2,41,20,"Stadtplan von Würzburg im Jahr 1835 Die Stadt erstrecke sich zu beiden Seiten des Maines. Außerhalb der alten Stadtmauern, aber innerhalb der Befestigungen fallen die Großbauten von Juliusspital und Residenz ins Auge. Nachdruck des lithographierten Originals durch das bayerische Vermessungsamt, München 1990/ Institut für Geschichte der Medizin der Universität Würzburg.","Map of the town of Würzburg in 1835 The town extends on both banks of the river Main. Beyond the ancient town walls, but within the fortifications, the large buildings of the Julius-Hospital and the Residence catch the eye. Reprint of the original litography by the Bavarian surveyor's office, Munich 1990/ Institute of the History of Medicine of the University of Würzburg.","1835年ヴュルツブルク市街地図 街はマイン川の両側にまで伸びている。旧市街の外壁と要塞の間にあるユリウスシュピタール病院とレジデンツの大きな建物は目を引く。 オリジナルのリトグラフをバイエルン測量所により複写1990年ミュンヘン ヴュルツブルク大学医学部医学史研究所"
1,3,58,20,"Grundrissplan des Anatomiepavillons um 1788 Kupferstich/ Fotokopie, aus C.C. Siebolds Rede zur Einweihung des Anatomiepavillons nach dem Umbau 1788. Privatbesitz (Mettenleiter)","Ground plan of the Anatomy-pavilion about 1788 Copper-engraving/ photocopy, from C. C. Siebold's speech at the inauguration of the Anatomy-pavilion after the reconstruction in 1788. private ownership (Mettenleiter)","1788年頃の半面図の解剖学パビリオン 写真複写1788年の改築後、解剖学パビリオン落成式でのカール・カスパー・シーボルトの式辞の銅版画より A.メッテンライター個人所蔵"
1,4,75,20,"Fassade des Anatomiepavillons um 1788 Kupferstich/ Fotokopie, aus C.C. Siebolds Rede zur Einweihung des Anatomiepavillons nach dem Umbau 1788. Privatbesitz (Mettenleiter)","Frontage of the Anatomy-pavilion about 1788 Copper-engraving/ photocopy, from C. C. Siebold's speech at the inauguration of the Anatomy-pavilion after the reconstruction in 1788. private ownership (Mettenleiter)","1788年頃の表構えの解剖学パビリオン 写真複写1788年の改築後、解剖学パビリオン落成式でのカール・カスパー・シーボルトの式辞の銅版画より A.メッテンライター個人所蔵"
1,5,39,43,"Ölgemälde von Georg Christoph Stang (1703-1779) Juliusspitälischer Oberwundarzt und Schwiegervater Siebolds.","Oil-painting of Georg Christoph Stang (1703-1779) Chief-surgeon of the Julius-Hospital and Siebold's father-in-law.","ゲオルグ・クリストフ・シュタング(1703年-1779年)の油彩画 ユリウスシュピタール病院主任外科医でシーボルトの義父"
1,6,51,40,"Carl Caspar v. Siebold Kupferstich von Elias Haid nach L.H. Hessel, 1788.","Carl Caspar von Siebold Copper-engraving by Elias Haid after L.H. Hessel, 1788.","カール・カスパー・フォン・シーボルト 銅版画1788年L.H.ヘッセル作の絵をエリアス・ハイドが銅版画化"
1,7,63,41,"Adelsdiplom für Carl Caspar Siebold (1801) Für seine Verdienste um die Versorgung der Verwundeten nach der Schlacht von Würzburg im September 1796 wurde Carl Caspar Siebold der erbliche Adelstitel verliehen. Das Wappenbild zeigt im oberen Feld eine Hand, die ein Skalpell hält. Siebold-Archiv Mittelbiberbach/ Burg Brandenstein.","Patent of nobility for Carl Caspar Siebold (1801) In 1801, Carl Caspar (now von) Siebold was ennobled by the Emperor for his services to the wounded soldiers after the battle of Würzburg in September, 1796. Note, in the blazon, the hand holding a lancet. Siebold archives Mittelbiberach/ Burg Brandenstein.","カール・カスパー・フォン・シーボルトの叙爵書(1801年) カール・カスパー・フォン・シーボルトは、1796年9月ヴュルツブルクの戦いの後、傷病兵の献身的な看護を行った功績に対し、1801年、神聖ローマ皇帝フランツ2世から爵位を与えられた。紋章の意匠の盾面の下部分に外科用メスを持った手が描かれている。この証書は金属製ケースに入れて届けられた。 ミッテルビーベラッハ/ブルク・ブランデンシュタインシーボルト資料館"
1,8,80,42,"Das Würzburger Juliusspital. Ansicht des Fürstenbaus vom Hof aus. Durch den Umbau des Südflügels schuf Franz Ludwig von Erthal ein modernes Armenkrankenhaus, in dem die jungen Kliniken ein breites Spektrum von Krankheiten für den Studentenunterricht vorfanden. Kolorierter Stahlstich von Johann Poppel, um 1850/ Privatbesitz (Mettenleiter)","The Julius-Hospital in Würzburg. View of the Fürstenbau from the courtyard. By rebuilding the southern wing, Franz Ludwig von Erthal created a modern hospital for the poor. There, the university clinics found a broad range of diseases for the bedside-teaching. Colored steel-engraving of Johann Poppel, about 1850/ private ownership (Mettenleiter)","ユリウスシュピタール病院中庭から見た領主館 フランツ・ルートヴィヒ・フォン・エルタールはユリウスシュピタール病院の南翼を改築し、近代的な施療病院を建設した。若い医学実習生は臨床授業で幅広い多様な疾患を目の当たりにした。 ヨハン・ポッペル彩色鋼版画1850年頃A.メッテンライター個人所蔵"
1,9,19,58,"Unter Siebolds Ägide verteidigte Dissertation von Joseph Schmieg über Fiebersymptome, Würzburg 1788 Privatbesitz","Joseph Schmieg's medical thesis on the symptoms of fever, defended under Siebold's supervision, Würzburg 1788 Private ownership","ヨーゼフ・シュミークによる発熱症候群についての博士学位請求論文はシーボルト指導の下で審査に合格した。(1788年ヴュルツブルク) 個人所蔵"
1,10,30,59,"Die Rokoko-Apotheke sw-Fotopostkarte/ Privatbesitz (Mettenleiter)","Interior of the Rococo pharmacy Postcard/ private ownership (Mettenleiter)","ロココ時代の薬局 白黒写真の絵葉書A.メッテンライター個人所蔵"
1,11,40,59,"Ansicht der Residenz sw-Fotopostkarte/ Privatbesitz (Mettenleiter)","View of the Würzburg Residence Postcard/ private ownership (Mettenleiter)","ヴュルツブルク・レジデンツの眺め 白黒写真の絵葉書A.メッテンライター個人所蔵"
1,12,77,62,"Chirurgisches Tagebuch von Carl Caspar Siebold.","Surgical diary of Carl Caspar Siebold.","カール・カスパー・シーボルトの外科日誌"
1,13,90,18,"Alte medizinische Bibliothek Einblick in die Sammlung historischer Schriften.","Ancient medical library Glimpse into the collection of historical writings.","古い医学図書館 歴史的な著作のコレクションの紹介"
1,14,11,46,"Säbel eines Chirurgen aus der Zeit um 1800.","Surgeon's saber from around 1800.","1800年頃の外科医のサーベル"
2,1,10,35,"Vollhonk"
2,2,18,20,"Rolf"
2,3,50,35,"Nena Kerner"
2,4,75,15,"Arne Augustin"
2,5,95,15,"Dorfdepp"
3,1,30,30,"Vitrine 3 Objekt 1 – Beschreibung DE","Vitrine 3 Object 1 – Description EN","ビトリーネ3オブジェクト1 – 説明JP"
3,2,60,50,"Vitrine 3 Objekt 2 – Beschreibung DE","Vitrine 3 Object 2 – Description EN","ビトリーネ3オブジェクト2 – 説明JP"

`;

export function parseMuseumCSV(csv: string): MuseumObject[] {
    const lines = csv.trim().split('\n');

    return lines.slice(1).map(line => {
        // Simple CSV parser that handles quotes for commas inside strings
        const values: string[] = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());

        return {
            vitrine_id: values[0] || '',
            object_number: parseInt(values[1] || '0', 10),
            pos_x: parseFloat(values[2] || '0'),
            pos_y: parseFloat(values[3] || '0'),
            text_de: values[4] || '',
            text_en: values[5] || '',
            text_jp: values[6] || ''
        };
    });
}

export const allObjects = parseMuseumCSV(rawCSV);

export const vitrineConfigs: VitrineConfig[] = [
    {
        id: "1",
        name: "",
        imageUrl: "/museum1.jpg"
    },
    {
        id: "2",
        name: "",
        imageUrl: "/museum2.jpg"
    },
    {
        id: "3",
        name: "",
        imageUrl: "/museum3.jpg"
    }
];
