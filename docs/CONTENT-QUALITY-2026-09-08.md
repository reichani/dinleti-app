# Okurio içerik kalite raporu — 8 Eylül 2026

## Yönetici özeti

- Production `main`: `5f867b5`; son 24 saatte yeni main commit'i yok.
- Katalog: 80 kayıt — 62 tam okuma, 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; 35 tam okuma yaş minimumunun altında.
- 11 tam okumada, ayrıca 18/18 mikro alıştırmada ilan edilen süre farkı yüzde 15'i aşıyor.
- Temiz main auditinde 62/62 tam okuma blocker taşıyor. İnsan incelemesi ve Ikarus yaş eşleme sorunu bu toplama dahildir.
- “Moon Poem” 36 kelimelik özetten 564 kelimelik tamamlanmış bilim-şiir hikâyesine dönüştürüldü.
- Taslak insan onayı olmadan kataloğa bağlanmadı; merge ve deploy yapılmadı.

Düne göre somut delta: tamamlanan kısa kayıt taslağı sayısı bir arttı. Production metriği değişmedi.

## Yaş grubu görünümü

| Yaş | Hedef | Hikâye | Ortalama | Medyan | Minimum altı |
|---|---:|---:|---:|---:|---:|
| 3–4 | 150–300 | 3 | 285,7 | 291 | 0 |
| 5–6 | 200–400 | 1 | 203 | 203 | 0 |
| 6–7 | 250–500 | 15 | 166,6 | 69 | 10 |
| 7–8 | 350–650 | 9 | 218,1 | 351 | 4 |
| 8–10 | 500–900 | 10 | 200,7 | 47 | 7 |
| 10–12 | 700–1.200 | 14 | 304,7 | 56,5 | 9 |
| 12–14 | 900–1.600 | 7 | 333,1 | 86 | 5 |
| 14–16 | 1.200–2.000 | 0 | — | — | — |
| 16–18 | 1.500–2.500 | 1 | 1.502 | 1.502 | 0 |
| 18+ | 1.800–3.500 | 1 | 1.800 | 1.800 | 0 |

1.774 kelimelik Ikarus, temiz main validatoründeki yaş eşleme eksikliği nedeniyle ayrıca `unmapped` kalıyor.

## 20 saniyelik içerik envanteri

Ela El Ele; Ali ile Ela; Lili ile At; Oki El Ele; Mino Nerede?; Diyet; The Fox and the Grapes; The Lion and the Mouse; The Moon Is Not a Star; Oki Ay'ı Gördü; Yıldız mı, Gezegen mi?; Lili Ay Işığını Takip Ediyor; Oki'nin Ay Şiiri; Yağmur Tıp Tıp; Gökyüzü Şiiri; Bir Tohumun Yolculuğu; Arılar Neden Dans Eder?; Little Star Poem; Moon Poem; Space Poem.

Dağılım: 6–7 yaş 7; 7–8 yaş 3; 8–10 yaş 6; 10–12 yaş 4. Bugünkü düzeltme onaylanmadığı için production'da Moon Poem 36 kelime ve 14 saniye olarak kalıyor.

## Bugünün içerik çıktısı

### Moon Poem — 8–10 yaş, İngilizce

| Ölçüt | Sonuç |
|---|---:|
| Gerçek kelime | 564 |
| Hesaplanan ve ilan edilen süre | 219 saniye — 3:39 |
| Bölüm | 5 |
| Bölüm kelimeleri | 92 / 109 / 114 / 112 / 137 |
| Bölüm payları | %16,3 / %19,3 / %20,2 / %19,9 / %24,3 |
| Ortalama cümle | 7,52 kelime |
| En uzun cümle | 11 kelime |
| Sözlük | 5 girdi |
| Structural-valid | true |
| Release-ready | false |

Anlatı akışı: tarihli Ay takvimi → yansıyan ışık modeli → bulut nedeniyle eksik gözlem → olgu ve şiir kartlarının ayrılması → tamamlanan şiir ve süren takvim.

Tek tema, anlatı yayı, neden-sonuç, karakter/mekân/zaman tutarlılığı, bölüm geçişleri, 12 kelimelik cümle ve üç cümlelik paragraf sınırı otomatik kontrolden geçti. Puanlanmayan, isteğe bağlı düşünme sorusu eklendi.

## Kaynak, hak ve insan incelemesi

Bilim kapsamı NASA Moon Phases ve NASA Space Place Moon Phases ile sınırlandı: Ay'ın kendi ışığını üretmemesi, Güneş ışığını yansıtması ve Dünya'dan görülen aydınlık bölümün konuma göre değişmesi. Lamba-top modeli, mesafe ve gözlemci engeli sınırlamalarıyla sunuldu.

Anlatı ve şiir dizeleri özgün Okurio taslağıdır; dış şiir, şarkı sözü, çeviri veya kamu malı metin kullanılmadı.

- `contentQualityReview.status=pending`
- Reviewer adı, tarih, commit ve notlar boş; checklist maddeleri false.
- İngilizce/yaş uygunluğu, bilimsel doğruluk, özgünlük/hak ve erişilebilirlik tonu insan incelemesi bekliyor.
- `releaseReady=false`; otomasyon insan onayı üretmedi.

## Validator, test ve build

- Odak taslak testleri: 3/3 PASS.
- Tüm içerik testleri: 129/129 PASS.
- AI kalite kapısı: 3/3 PASS.
- Production build/paket: PASS.
- Dar production validator: PASS; ancak yalnız üç Odysseia kaydını `belirsiz` yaşla taradığı için tam katalog kanıtı değildir.
- Full-catalog audit: FAIL-CLOSED — 62/62 mevcut production tam okuma blocker'lı.

## Branch ve teslim

- Branch: `content/2026-09-08-quality-turn`
- Draft PR: #117
- Merge: yapılmadı.
- Production deploy: yapılmadı.

## Riskler ve sonraki öncelikler

1. PR #97 ile boş 14–16 yaş bandını ve tamamlanan taslakları gerçek insan incelemesine almak.
2. PR #106'nın publication gate, yaş eşleme, mikro süre ve mevcut borç kontrollerini tamamlamak.
3. Kalan kısa kayıtlardan “Diyet” ve “The Moon Is Not a Star” için kaynak kapsamı açık tam sürüm hazırlamak.
