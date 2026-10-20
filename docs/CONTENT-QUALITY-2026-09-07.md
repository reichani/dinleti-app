# Okurio günlük içerik kalite turu — 7 Eylül 2026

## Yönetici özeti

- Main `5f867b5`; son 24 saatte yeni main commit'i yok.
- 80 kayıt: 62 tam okuma, 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; 35 kayıt yaş minimumunun altında.
- 11 tam okumada ve 18/18 mikro alıştırmada süre farkı yüzde 15'i aşıyor.
- Temiz main auditinde 62/62 tam okuma blocker taşıyor.
- PR #115 exact-head üzerinde iki zorunlu uzak CI hattını geçti.
- Bugün `Space Poem` 39 kelimelik özetten 813 kelimelik İngilizce bilim-şiir hikâyesine dönüştürüldü.
- İnsan onayı, runtime bağlantısı, merge ve deploy yapılmadı.

## Yaş görünümü

| Yaş | Hedef | Adet | Ortalama | Medyan | Minimum altı |
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

Ikarus 1.774 kelime olmasına rağmen main yaş eşlemesinde `unmapped` kalıyor.

## 20 saniyelik içerikler

Dağılım: 6–7 yaş 7; 7–8 yaş 3; 8–10 yaş 6; 10–12 yaş 4. Production envanteri bugün değişmedi. Space Poem'in 39 kelime/16 saniyelik özeti insan onayına kadar korunuyor.

## Bugünün çıktısı — Space Poem

| Ölçüt | Sonuç |
|---|---:|
| Yaş/dil | 10–12 / İngilizce |
| Kelime | 813 |
| Tahmini süre | 315 saniye — 5:15 |
| Bölüm | 6 |
| Bölüm kelimeleri | 112 / 120 / 120 / 143 / 134 / 184 |
| Bölüm payları | %13,8 / %14,8 / %14,8 / %17,6 / %16,5 / %22,6 |
| Ortalama cümle | 7,67 kelime |
| En uzun cümle | 12 kelime |
| Sözlük | 6 girdi |
| Structural-valid | true |
| Release-ready | false |

Akış: `eksik şiir → kuyruklu yıldız araştırması → yıldız araştırması → hatalı model → bilim/şiir ayrımı → kaynaklı sunum ve açık soru`.

Anlatı yayı, neden-sonuç, karakter/mekân/zaman tutarlılığı ve bölüm geçişleri geçti. Her paragraf en fazla üç cümledir. Düşünme sorusu isteğe bağlı ve puansızdır.

## Kaynak ve factual kapsam

- NASA Comets: https://science.nasa.gov/solar-system/comets/
- NASA Star Basics: https://science.nasa.gov/universe/stars/

Metin; kuyruklu yıldızların donmuş gaz, kaya ve toz içermesi, Güneş çevresindeki hareketi, Güneş'e yaklaşınca etkinleşmesi ve kuyruğun genel olarak Güneş'ten uzağa yönelmesi ile yıldızlarda enerji üretimi iddialarını bu kaynaklarla sınırlar.

Anlatı ve şiir dizeleri özgündür; NASA metni çevrilmedi veya yeniden üretilmedi. Bilim kartları ile yaratıcı dizeler görünür şekilde ayrıldı.

## İnsan kalite kapısı

- `contentQualityReview.status=pending`
- Reviewer adı, tarih, commit ve notlar boş.
- Evrensel ve okuma-yolu checklist maddeleri `false`.
- İngilizce/A2 yaş uygunluğu, bilimsel doğruluk, özgünlük/hak ve erişilebilirlik incelemeleri pending.
- `releaseReady=false`.

İnsan bilim incelemesinde kuyruk yönü, yıldız füzyonu ve kütle-ömür ilişkisi; dil incelemesinde `nucleus`, `fusion`, `gravity` yükü değerlendirilmelidir.

## Test ve teslim

- İçerik testleri: 129/129 PASS.
- Production build/paket: PASS.
- Full-catalog audit: FAIL-CLOSED — 62/62.
- PR #115 CI: 2/2 PASS.
- Bugünkü exact-head CI: PR açıldıktan sonra doğrulanacak.
- Main merge/deploy: yapılmadı.

## Sonraki öncelikler

1. PR #97 ve tamamlanan taslaklar için gerçek insan incelemesi.
2. PR #106 publication gate, mikro süre ve baseline düzeltmeleri.
3. Kalan kısa kayıtlardan `Diyet` veya `Moon Poem` için tam metin.
