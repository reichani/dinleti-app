# Okurio içerik kalite raporu — 9 Eylül 2026

## Yönetici özeti

- Production `main`: `5f867b5`; son 24 saatte yeni main commit'i yok.
- Katalog: 80 kayıt — 62 tam okuma, 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; 35 tam okuma yaş minimumunun altında.
- 11 tam okumada ve 18/18 mikro alıştırmada süre farkı yüzde 15'i aşıyor.
- Temiz main auditinde 62/62 tam okuma blocker taşıyor.
- “The Moon Is Not a Star” 44 kelimelik özetten 797 kelimelik tamamlanmış bilim hikâyesine dönüştürüldü.
- 20 kısa production kaydının 19'u için tam metin taslağı hazırlandı. Kalan tek kısa kayıt “Diyet”.
- Taslak insan onayı olmadan kataloğa bağlanmadı; merge ve deploy yapılmadı.

Düne göre somut delta: tamamlanan kısa kayıt taslağı sayısı 18'den 19'a yükseldi. PR #117'nin iki exact-head CI hattı da başarıyla tamamlandı. Production metrikleri değişmedi.

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

Dağılım: 6–7 yaş 7; 7–8 yaş 3; 8–10 yaş 6; 10–12 yaş 4. Bugünkü taslak onaylanmadığı için production'da “The Moon Is Not a Star” 44 kelime ve 18 saniye olarak kalıyor.

Hazır tam metin taslakları 19 kaydı kapsıyor. Yalnız “Diyet” henüz güncel kalite sözleşmesiyle tamamlanmadı.

## Bugünün içerik çıktısı

### The Moon Is Not a Star — 10–12 yaş, İngilizce

| Ölçüt | Sonuç |
|---|---:|
| Gerçek kelime | 797 |
| Hesaplanan ve ilan edilen süre | 309 saniye — 5:09 |
| Bölüm | 6 |
| Bölüm kelimeleri | 103 / 125 / 128 / 127 / 134 / 180 |
| Bölüm payları | %12,9 / %15,7 / %16,1 / %15,9 / %16,8 / %22,6 |
| Ortalama cümle | 8,39 kelime |
| En uzun cümle | 12 kelime |
| Sözlük | 6 girdi |
| Structural-valid | true |
| Release-ready | false |

Anlatı akışı: yanlış “silver star” etiketi → yıldızın özellikleri → Ay'ın doğal uydu oluşu → modelin sınırları → bilim ve yaratıcı dilin ayrılması → kaynaklı sergi ve yeni sorular.

Tek tema, giriş–gelişme–dönüm–sonuç, neden-sonuç, karakter/mekân sürekliliği, bölüm geçişleri, 12 kelimelik cümle ve üç cümlelik paragraf sınırı otomatik kontrolden geçti. Yanlış cevap utandırılmadan araştırma ve revizyon fırsatına dönüştürüldü. Puanlanmayan, isteğe bağlı düşünme sorusu eklendi.

## Source-of-truth, factual ve hak durumu

Bilim kapsamı NASA Moon Facts ve NASA Stars kaynaklarıyla sınırlandı: Ay'ın Dünya'nın doğal uydusu olması, kayalık yüzeyi, ince ekzosferi ve yansıyan ışığı; yıldızların çoğunlukla hidrojen ve helyumdan oluşması ve merkezlerinde füzyonla enerji üretmesi.

Anlatı ve yaratıcı cümleler özgün Okurio taslağıdır. Kaynak metin çevrilmedi; dış hikâye, şiir veya şarkı sözü kullanılmadı.

- `contentQualityReview.status=pending`
- Reviewer adı, tarih, commit ve notlar boş; checklist maddeleri false.
- İngilizce/yaş uygunluğu, bilimsel doğruluk, özgünlük/hak ve erişilebilirlik tonu insan incelemesi bekliyor.
- `releaseReady=false`; otomasyon insan onayı üretmedi.

## Validator, test ve build

- Odak taslak testleri: 3/3 PASS.
- Tüm içerik testleri: 129/129 PASS.
- AI kalite kapısı: 3/3 PASS.
- Production build/paket: PASS.
- Dar production validator: PASS; yalnız üç Odysseia kaydını `belirsiz` yaşla taradığı için tam katalog kanıtı değildir.
- Full-catalog audit: FAIL-CLOSED — 62/62 mevcut production tam okuma blocker'lı.
- PR #117 exact-head CI: 2/2 PASS.

## Branch ve teslim

- Branch: `content/2026-09-09-quality-turn`
- Draft PR: #118
- Merge: yapılmadı.
- Production deploy: yapılmadı.

## Riskler ve sonraki öncelikler

1. Son kısa kayıt “Diyet”in kamu malı/kaynak kapsamını kesinleştirip yaş hedefine uygun tam sürümünü hazırlamak.
2. PR #97 ile boş 14–16 yaş bandını ve 19 hazır taslağı gerçek insan incelemesine almak.
3. PR #106'nın publication gate, yaş eşleme, mikro süre ve mevcut borç kontrollerini tamamlamak.
