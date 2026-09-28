# Okurio içerik kalite raporu — 14 Eylül 2026

## Yönetici özeti ve dünden fark

`main` SHA `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; 13 Eylül 05:46 UTC sonrasındaki main commit sorgusu boş. Önceki günün draft PR #122 exact-head CI 2/2 başarılı. Bugün 61 kelime/24 saniye olan Oki ve Labirentin İzi için 722 kelimelik özgün hikâye taslağı hazırlandı. Bu, 20 saniye üzerindeki başka bir yetersiz okumanın taslakla ele alınmasıdır; aktif katalogda yayınlanmış düzeltme sayısı bugün **0**. Daha önceki 20 çok kısa kayıt için taslak kapsamı 20/20 olarak sürüyor.

## Tam katalog, raflar ve yaş dağılımı

Kaynaklar öncelik sırasıyla `docs/OKURIO-MANIFESTO-v1.0.md`, `docs/OKURIO-PRD-v1.1.md` (dosya içi başlık v1.2), `docs/PILOT-CATALOG-PLAN-v1.0.md`, `docs/RELEASE-CHECKLIST.md`, ardından `src/content`, `src/App.jsx`, `tests/content` olarak incelendi. Önceki tam raf taramasındaki 27 raf ve tüm yaş yolları için değişmeyen main temel alındı. Katalog auditinde **80 kayıt; 62 tam okuma, 18 mikro alıştırma** bulunuyor. Aşağıdaki sayılar yalnız tam okumalar içindir; 1.774 kelimelik Ikarus mevcut validator tarafından `unmapped` bırakılır.

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

20 saniye ve altındaki **20 production okuma** (kelime/süre): Ela El Ele 29/12; Ali ile Ela 23/9; Lili ile At 25/10; Oki El Ele 25/10; Mino Nerede? 22/9; Diyet 49/19; The Fox and the Grapes 49/19; The Lion and the Mouse 45/18; The Moon Is Not a Star 44/18; Oki Ay'ı Gördü 34/14; Yıldız mı, Gezegen mi? 37/15; Lili Ay Işığını Takip Ediyor 38/15; Oki’nin Ay Şiiri 26/11; Yağmur Tıp Tıp 23/9; Gökyüzü Şiiri 36/14; Bir Tohumun Yolculuğu 44/18; Arılar Neden Dans Eder? 43/17; Little Star Poem 30/12; Moon Poem 36/14; Space Poem 39/16. Production'da bugün hiçbiri düzelmedi. Yaş minimumu altında **35** tam okuma; gerçek süre ile ilan edilen süre arasında **>%15 fark** taşıyan 11 tam okuma ve 18 mikro alıştırma var. Tam katalog yayın denetimi **FAIL-CLOSED — 62/62 blocker**.

## Bugünün hikâyesi: Oki ve Labirentin İzi

- Mevcut production: **61 kelime / hesaplanan 24 saniye / iki kısa bölüm (32/29 kelime)**. Süre metadata'sı kendi içinde uyumlu olsa da 10–12 yaş hedefi 700–1.200 kelimedir.
- Yeni, yayın dışı taslak: **722 kelime / 155 kelime-dakika ile 280 saniye (4:40)**; ilan edilen süre de 280 saniye, fark **%0**.
- Altı anlamlı bölüm: **127 / 125 / 118 / 115 / 119 / 118** kelime; payları **%17,6 / %17,3 / %16,3 / %15,9 / %16,5 / %16,3**.
- Cümle ortalaması **6,02** kelime, en uzun cümle **9** kelime, paragraf üst sınırı **3** cümle; **6** sözlük girdisi, isteğe bağlı ve puansız soru.
- Structural-valid: **true (ölçülebilir yerel kurallar açısından)**; release-ready: **false**.

Akış: `kütüphanede katlanmış çizim → Ariadne ipi düşüncesi → yanlış kavşak ve yanıltıcı yıldız → kâğıdın altındaki yol → ziyaretçiyle sergi denemesi → girişe dönüşün anlamı`. Tek tema, bir izin geri dönüşü de göstermesidir. Oki, Lili ve Nana aynı kütüphane çalışmasında kalır. Yanlış ilk deneme yeni bilgi üretir; küçük yıldız dönüm noktası, girişe geri dönüş sonuçtur. Sergi ziyareti olayları somutlaştırır. Yine de erken okuma düzeyi ve bölüm akışı için insan editör kararı gereklidir.

## Kaynak ve zorunlu insan kalite kapısı

Oki, Lili ve Nana'nın hikâyesi özgün kurmacadır; antik bir eserin tam metni veya uyarlaması değildir. Ariadne'nin ip motifine ilişkin tarihsel bağlam [1911 Encyclopædia Britannica'nın Vikikaynak metninde](https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ariadne) 14 Eylül 2026'da karşılaştırıldı. Mit varyantları ve kullanımdaki doğruluk insan factual incelemesi bekliyor. Modern bir yayın metninden kopya kullanılmadı; buna rağmen özgünlük/hak incelemesi otomatik onaylanmadı.

`contentQualityReview.status=pending`: reviewerName, reviewedAt, reviewedCommit ve somut reviewNotes yok; sekiz evrensel ve okuma-yolu checklist maddeleri onaysız. Factual, mit/özgünlük-hak, yaş ve erişilebilirlik dili incelemeleri `pending-human-review`; `releaseReady=false`. Taslak aktif kataloğa bağlanmaz, PR insan kararı olmadan draft kalır.

## Test, blocker ve takip

Odak testleri **2/2 PASS**; tüm içerik testleri **128/128 PASS**; AI kapısı **3/3 PASS**; build **PASS** (500 kB üzeri paket uyarısı var). Tam katalog auditinin 62/62 kırmızı kalması beklenen güvenli sonuçtur. `npm run validate:production-catalog` yalnız üç Odysseia kaydını `belirsiz` yaş altında sayar; tam katalog taraması değildir. PR #106'daki gerçek yayın kapısı ve Ikarus yaş eşleme sorunu açık. PR #97 ve içerik taslaklarının insan içerik/hak/güvenlik incelemesi beklenir.

Sonraki işler: (1) hazır taslakları insan kalitecisinin somut notlarına sunmak; (2) PR #106 tam katalog kapısı ve yaş eşlemesini düzeltmek; (3) 6–7 yaşın en kısa, kaynak kapsamı açık bir sonraki kaydını tür/raf kararını açıkça işaretleyerek ele almak. Merge ve production deploy yapılmadı.
