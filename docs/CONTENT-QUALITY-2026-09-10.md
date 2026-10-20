# Okurio içerik kalite raporu — 10 Eylül 2026

## Yönetici özeti

- Production `main` değişmedi: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`.
- Katalog 80 kayıt içeriyor: 62 tam okuma ve 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; 35 tam okuma yaş minimumunun altında.
- Tam katalog denetimi güvenli biçimde kırmızı: 62/62 tam okuma en az bir yayın blocker'ı taşıyor.
- Son kısa kayıt olan **Diyet**, 14–16 yaş için 1.200 kelimelik, grafik olmayan kısa uyarlama taslağına dönüştürüldü.
- Böylece 20 kısa production kaydının 20'si için tam metin adayı hazır. Hiçbiri insan incelemesi olmadan production'a bağlanmadı.
- 9 Eylül tarihli PR #118'in iki zorunlu CI hattı da geçti.

## Yaş grubu görünümü

| Yaş | Hedef kelime | Adet | Ortalama | Medyan | Minimum altı |
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

1.774 kelimelik Ikarus, mevcut `main` yaş eşleme hatası nedeniyle bu tabloda `unmapped` kalıyor.

## 20 saniyelik envanter

Production dağılımı değişmedi: 6–7 yaşta 7, 7–8 yaşta 3, 8–10 yaşta 6, 10–12 yaşta 4 kısa kayıt. Önceki turlarda 19'u için aday hazırlanmıştı. Bugün Diyet'in tamamlanmasıyla taslak kapsamı 19/20'den 20/20'ye çıktı.

Production kaydı hâlâ yaklaşık 49 kelime ve 19 saniyedir. Yeni taslak insan onayı almadığı için mevcut kaydı otomatik değiştirmez.

## Bugünün içeriği: Diyet

| Ölçüt | Sonuç |
|---|---:|
| Hedef yaş | 14–16, klasiklere hazırlık |
| Toplam kelime | 1.200 |
| Hesaplanan/ilan edilen süre | 465 saniye — 7:45 |
| Bölüm | 8 |
| Bölüm kelimeleri | 151 / 145 / 148 / 151 / 140 / 156 / 151 / 158 |
| Bölüm payları | %12,6 / %12,1 / %12,3 / %12,6 / %11,7 / %13,0 / %12,6 / %13,2 |
| Ortalama cümle | 6,67 kelime |
| En uzun cümle | 10 kelime |
| Sözlük | 7 girdi |
| Structural-valid | true |
| Release-ready | false |

Anlatı akışı: `usta ve gece devriyesi → suçlama → diyet teklifi → zorunlu hizmet → kamusal hakaret → geri verilen bedel → eleştirel değerlendirme → sessiz sonuç`.

Uyarlama, Ömer Seyfettin'in ana olay örgüsünü korur; tam metin değildir. Bedensel zarar grafik ayrıntıyla anlatılmaz ve kendine zarar verme bir çözüm veya örnek davranış olarak sunulmaz. Tarihsel adalet düzenindeki eşitsizlik, modern bir hukuk modeli gibi onaylanmaz.

## Uçtan uca kalite ve açık sorunlar

- Yaş hedefi, bölüm sayısı ve bölüm derinliği geçti.
- Cümle başına en fazla 12 kelime, 6–10 ortalama ve paragraf başına en fazla üç cümle sınırı geçti.
- Giriş, gelişme, dönüm noktası ve sonuç var; karakter, mekân, zaman ve bakış açısı korunuyor.
- 7 kısa sözlük girdisi ve isteğe bağlı, puansız düşünme sorusu var.
- Açık riskler: kendine zarar verme, bedensel ceza, zorunlu hizmet ve tarihsel hukuk bağlamı.
- Eski `10+` etiketinden 14–16 bandına geçiş insan editör kararı gerektiriyor.

## Source-of-truth, hak ve insan incelemesi

- Kaynak kapsamı: Ömer Seyfettin, **Diyet**; Vikikaynak tam metni olay örgüsü karşılaştırması için kullanıldı.
- Statü: `public-domain-short-adaptation`; tam metin veya eksiksiz sadeleştirme değildir.
- Kamu malı, baskı bağımsızlığı ve uyarlama hakkı nihai hukuk/hak incelemesi bekliyor.
- `contentQualityReview.status=pending`; reviewer adı, tarih ve notlar boş, sekiz checklist maddesi `false`.
- Factual, originality/rights ve safeguarding incelemeleri `pending-human-review`.
- `releaseReady=false`; taslak aktif kataloğa bağlı değil.

## Doğrulama

- Odak testleri: 3/3 PASS.
- Tüm içerik testleri: 129/129 PASS.
- Production validator: PASS; ancak yalnız üç Odysseia kaydını tarayan dar kapsam sorunu sürüyor.
- Production build/paket: PASS.
- Full-catalog audit: FAIL-CLOSED — 62/62 blocker.
- Vite büyük chunk uyarısı verdi; build hatası değildir.

## Teslim ve sonraki işler

- Branch: `content/2026-09-10-quality-turn`
- Merge/deploy: yapılmadı.
- İnsan onayı olmadan PR draft kalmalıdır.

Sonraki öncelikler:

1. PR #97 ve kısa içerik adaylarını isim, tarih ve somut not içeren toplu insan incelemesine almak.
2. PR #106'daki publication gate, yaş eşleme ve tam katalog kapsamını sonuçlandırmak.
3. Onay alan taslakları tekil production kimlikleriyle bağlayıp süreleri gerçek kelime sayısından üretmek; ardından 35 yaş-altı kaydın kalanlarını düzeltmek.
