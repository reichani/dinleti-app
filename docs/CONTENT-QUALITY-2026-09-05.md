# Okurio günlük içerik kalite turu — 5 Eylül 2026

## Yönetici özeti

- Kaynak `main`: `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; son 24 saatte yeni main commit'i yok.
- 80 katalog kaydı: 62 tam okuma, 18 mikro alıştırma.
- 20 tam okuma 20 saniye veya altında; 35 tam okuma yaş minimumunun altında.
- 11 tam okumada ve 18/18 mikro alıştırmada ilan edilen süre ile 155 kelime/dk hesabı arasında yüzde 15 üzeri fark var.
- Temiz main auditinde 62/62 tam okuma en az bir yayın blocker'ı taşıyor.
- Dünkü PR #113 exact-head üzerinde iki GitHub CI hattını da geçti; insan incelemesi beklediği için draft kaldı.
- Bugün `Gökyüzü Şiiri` 36 kelimelik özetten 517 kelimelik tamamlanmış şiirli hikâye adayına dönüştürüldü.
- Yeni aday aktif kataloğa bağlanmadı; insan onayı, merge ve deploy yapılmadı.

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

Ikarus'un 1.774 kelimelik onaylı kaydı mevcut main validatoründe yaş eşlemesi yapılamadığı için bu tabloda ayrıca `unmapped` kalıyor. Eşleme düzeltmesi birleşmemiş PR #106'dadır.

## 20 saniyelik tam okuma envanteri

| Yaş | İçerik | Kelime | Süre |
|---|---|---:|---:|
| 6–7 | Ela El Ele | 29 | 12 sn |
| 6–7 | Ali ile Ela | 23 | 9 sn |
| 6–7 | Lili ile At | 25 | 10 sn |
| 6–7 | Oki El Ele | 25 | 10 sn |
| 6–7 | Mino Nerede? | 22 | 9 sn |
| 10–12 | Diyet | 49 | 19 sn |
| 8–10 | The Fox and the Grapes | 49 | 19 sn |
| 8–10 | The Lion and the Mouse | 45 | 18 sn |
| 10–12 | The Moon Is Not a Star | 44 | 18 sn |
| 7–8 | Oki Ay’ı Gördü | 34 | 14 sn |
| 8–10 | Yıldız mı, Gezegen mi? | 37 | 15 sn |
| 6–7 | Lili Ay Işığını Takip Ediyor | 38 | 15 sn |
| 6–7 | Oki’nin Ay Şiiri | 26 | 11 sn |
| 7–8 | Yağmur Tıp Tıp | 23 | 9 sn |
| 8–10 | Gökyüzü Şiiri | 36 | 14 sn |
| 8–10 | Bir Tohumun Yolculuğu | 44 | 18 sn |
| 10–12 | Arılar Neden Dans Eder? | 43 | 17 sn |
| 7–8 | Little Star Poem | 30 | 12 sn |
| 8–10 | Moon Poem | 36 | 14 sn |
| 10–12 | Space Poem | 39 | 16 sn |

Dağılım: 6–7 yaşta 7, 7–8 yaşta 3, 8–10 yaşta 6, 10–12 yaşta 4. Bugünkü Gökyüzü taslağı insan onayı beklediği için production envanterini henüz değiştirmez.

## Bugünün somut içerik çıktısı

### Gökyüzü Şiiri — 8–10 yaş

| Ölçüt | Sonuç |
|---|---:|
| Production sürümü | 36 kelime / 14 saniye |
| Yeni taslak | 517 kelime |
| 155 kelime/dk süre | 201 saniye — 3:21 |
| Bölüm sayısı | 5 |
| Bölüm kelimeleri | 89 / 95 / 106 / 108 / 119 |
| Bölüm payları | %17,2 / %18,4 / %20,5 / %20,9 / %23,0 |
| Ortalama cümle | 6,63 kelime |
| En uzun cümle | 9 kelime |
| Sözlük | 5 girdi |
| Structural-valid | true |
| Release-ready | false |

Anlatı akışı: `boş pano → gündüz gözlemleri → uçan kâğıt ve değişen gök → akşamı bekleme → zaman sıralı şiir panosu`.

Tek tema, giriş–gelişme–dönüm–sonuç, karakter/mekân/zaman tutarlılığı, neden-sonuç ve bölüm geçişleri otomatik ön kontrolden geçti. Her görünür paragraf en fazla üç cümle; her cümle en fazla dokuz kelimedir. Beş kısa sözlük girdisi ve isteğe bağlı, puansız düşünme sorusu bulunur.

Taslak kısa şiiri mekanik olarak uzatmaz. Özgün dizeleri olan tamamlanmış bir `şiirli hikâye` önerir. Bu tür ve raf değişikliği insan editör kararı olmadan production'a uygulanmamalıdır.

## Source-of-truth ve insan kalite kapısı

Kaynak önceliği: Manifesto → PRD → Pilot Catalog Plan → Release Checklist → katalog ve testler. PRD dosya adı `v1.1`, belge iç başlığı `v1.2` olduğundan sürüm farkı açık olarak tutuldu.

Yeni metin özgün Okurio kurmacasıdır. Dış şiir, çeviri veya kamu malı metin kullanılmadı. Parlak nokta yıldız ya da gezegen diye tanımlanmayarak doğrulanmamış bilim iddiasından kaçınıldı.

- `contentQualityReview.status=pending`
- `reviewerName`, `reviewedAt`, `reviewedCommit`, `reviewNotes`: boş
- Sekiz evrensel ve okuma-yolu checklist maddesi: `false`
- Factual review: `pending-human-review`
- Özgünlük/hak review: `pending-human-review`
- Safeguarding/erişilebilirlik review: `pending-human-review`
- `releaseReady=false`

İnsan incelemesinde şiirden şiirli hikâyeye geçiş, 8–10 yaş sözcük yükü, okulda akşama kalma bağlamı ve veranda/hava güvenliği özellikle değerlendirilmelidir.

## Tam katalog blocker kökleri

`62/62`, 62 bozuk metin anlamına gelmez. Aynı kayıtta birden fazla neden bulunabilir:

- 61 kayıtta insan onayı tamamlanmamış.
- 35 kayıtta yaş minimumu ve kısa bölüm sorunu var.
- 25 kayıtta yalnız iki bölüm var.
- 39 kayıtta görünür paragraf üç cümleyi aşıyor.
- 22 kayıtta hedef cümle ortalaması; 16 kayıtta 12 kelimelik üst sınır bozuluyor.
- 11 tam okumada süre farkı yüzde 15'i aşıyor.
- Ikarus'ta main üzerindeki yaş/okuma-yolu eşleme hatası var.

Structural-valid, candidate-ready ve publication-ready aynı ölçüm olarak kullanılmamalıdır. PR #106 bu ayrımı öneriyor; fakat mikro süre denetimi ve mevcut borca yeni hata eklenmesini güvenilir biçimde yakalayan kapı tamamlanmadan kök çözüm sayılmamalıdır.

## Validator, test ve build

- Yeni taslak testleri dahil tüm içerik testleri: 129/129 PASS
- Production build ve paket: PASS
- Full-catalog audit: FAIL-CLOSED — 62/62 blocker'lı
- PR #113 exact-head iki uzak CI hattı: PASS
- Yeni PR exact-head uzak CI sonucu: PR açıldıktan sonra doğrulanacak

Audit'in kırmızı kalması güvenli ve beklenen sonuçtur; yeni taslak onaysız olduğu için audit metriğine iyileşmiş production kaydı olarak yazılmadı.

## Açık PR ve teslim durumu

- Yeni branch: `content/2026-09-05-quality-turn`
- Yeni taslak, test ve bu rapor dışında runtime bağlantısı yok.
- Güncel inceleme kuyruğu: PR #97, #100–#113 ve bugünkü yeni PR.
- Eski tabanlı eş taslaklar doğrudan merge edilmemelidir.
- Main merge: yapılmadı.
- Production deploy: yapılmadı.

## Sonraki öncelikler

1. PR #97 ve güncel kısa içerik taslaklarını isim, tarih ve somut not içeren toplu insan incelemesine almak.
2. PR #106'nın publication gate, mikro süre ve borç-baseline açıklarını giderip mühendislik incelemesine sunmak.
3. Kalan kısa kayıtlardan `Diyet`, `Little Star Poem`, `Moon Poem` veya `Space Poem` için tür ve kaynak kapsamı açık tam sürüm hazırlamak.
