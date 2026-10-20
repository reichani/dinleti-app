# Okurio içerik üretim ve kalite turu — 15 Eylül 2026

## Yönetici özeti ve delta

- Production `main` commit'i `5f867b5c678ceee0d77dab0786e7bd61b26c21dc`; son 24 saatte yeni `main` commit'i yok.
- Katalog 80 kayıt ve 27 raf boyunca yeniden tarandı: 62 tam okuma, 18 mikro alıştırma.
- Production'da 20 tam okuma hâlâ 20 saniye veya altında; 35 tam okuma yaş minimumunun altında.
- 11 tam okuma ve 18 mikro alıştırmada ilan edilen süre ile 155 kelime/dakika hesabı arasındaki fark yüzde 15'i aşıyor.
- Full-catalog audit 62 tam okumanın 62'sini de yayın engelli buluyor. Hazır taslaklar insan onayı olmadan production iyileşmesi sayılmadı.
- Dünkü PR #123, exact head `c9bb023c5a955624910f2509a920808b27a07477` üzerinde iki zorunlu CI hattını geçti.
- Bugün 6–7 yaş açığındaki `la-fontaine-fugue` için 348 kelimelik kısa uyarlama taslağı hazırlandı. Production kaydı değiştirilmedi.

## Yaş grubu görünümü

| Yaş | Hedef kelime | Okuma | Ortalama | Medyan | Minimum altı |
|---|---:|---:|---:|---:|---:|
| 3–4 | 150–300 | 3 | 285,7 | 291 | 0 |
| 5–6 | 200–400 | 1 | 203 | 203 | 0 |
| 6–7 | 250–500 | 15 | 166,6 | 69 | 10 |
| 7–8 | 350–650 | 9 | 218,1 | 351 | 4 |
| 8–10 | 500–900 | 10 | 200,7 | 47 | 7 |
| 10–12 | 700–1.200 | 14 | 304,7 | 56,5 | 9 |
| 12–14 | 900–1.600 | 7 | 333,1 | 86 | 5 |
| 14–16 | 1.200–2.000 | 0 | — | — | 0 kayıt |
| 16–18 | 1.500–2.500 | 1 | 1.502 | 1.502 | 0 |
| 18+ | 1.800–3.500 | 1 | 1.800 | 1.800 | 0 |

Ikarus'un 1.774 kelimelik production kaydı mevcut audit yaş eşlemesinde `unmapped` kalıyor. En büyük sayısal açık, minimumun altında 10 okumayla 6–7 yaş grubunda.

## 20 saniyelik envanter

Production'da 20 saniye veya altındaki 20 okumanın tamamı için genişletilmiş taslak vardır; hiçbiri insan onayı olmadan production'a bağlanmamıştır.

| Yaş | Production kayıtları (kelime / saniye) |
|---|---|
| 6–7 | Mino Nerede? 22/9; Ali ile Ela 23/9; Lili ile At 25/10; Oki El Ele 25/10; Oki’nin Ay Şiiri 26/11; Ela El Ele 29/12; Lili Ay Işığını Takip Ediyor 38/15 |
| 7–8 | Yağmur Tıp Tıp 23/9; Little Star Poem 30/12; Oki Ay'ı Gördü 34/14 |
| 8–10 | Gökyüzü Şiiri 36/14; Yıldız mı, Gezegen mi? 37/15; Bir Tohumun Yolculuğu 44/18; The Lion and the Mouse 45/18; The Fox and the Grapes 49/19; Moon Poem 36/14 |
| 10–12 | Space Poem 39/16; Arılar Neden Dans Eder? 43/17; The Moon Is Not a Star 44/18; Diyet 49/19 |

Bugün bu grupta production düzeltmesi: 0. Bugünkü çalışma, sonraki kısa kayıt katmanındaki 27 saniyelik La Fontaine derlemesini hedefledi.

## Bugünün içerik çıktısı

### La Fontaine'den Fabllar — 6–7 yaş

Production sürümü 69 kelime, 27 saniye ve üç çok kısa bölümden oluşuyor. Yeni taslak, üç fablı Oki, Lili ve Nana'nın okuma kartları çevresinde ilerleyen tek bir çerçeve anlatıya bağlıyor.

| Ölçüt | Sonuç |
|---|---:|
| Toplam kelime | 348 |
| 155 kelime/dakika süre | 135 saniye — 2:15 |
| Bölüm sayısı | 5 |
| Bölüm kelimeleri | 53 / 79 / 71 / 62 / 83 |
| Bölüm yüzdeleri | %15,2 / %22,7 / %20,4 / %17,8 / %23,9 |
| Cümle ortalaması / maksimum | 6,00 / 10 kelime |
| Görünür paragraf maksimumu | 3 cümle |
| Sözlük | 5 girdi |
| Structural-valid | true |
| Release-ready | false |

Anlatı akışı: `üç kapalı kart → sert fabl sonunu sorgulama → düzenli yarış → çıkar amaçlı övgü → tek ders olmadığını keşfetme`.

Ana tema tek ve açıktır: okur, eski bir öykünün düşüncesini sorgulayarak seçebilir. Çerçeve karakterleri, masa mekânı, kart sırası ve bakış açısı tutarlıdır. Her bölüm önceki kartın sonucundan doğar ve sonraki karta geçiş kurar. Giriş, üç gelişme/dönüm aşaması ve tamamlanmış sonuç vardır. Tek cümlelik bölüm yoktur.

6–7 yaş okuma yolunda `Ağustos böceği`, `Kaplumbağa` ve `La Fontaine` gibi zor sözcükler kaçınılmaz bir yük oluşturuyor. Beş girdilik sözlük bu yükü kısmen destekliyor; hece/harf dizisine uygunluk insan dil editörü kararı bekliyor.

## Source-of-truth, hak ve güvenlik

Kaynak kapsamı 15 Eylül 2026 tarihinde Project Gutenberg'deki [The Fables of La Fontaine](https://www.gutenberg.org/files/50316/50316-h/50316-h.htm) ile Fransızca Wikisource'taki [özgün baskı dizini](https://fr.wikisource.org/wiki/Fables_de_La_Fontaine_(%C3%A9dition_originale)) üzerinden karşılaştırıldı.

Taslak şiirlerin tam metni veya çevirisi değildir. Üç fabldan seçilmiş olayların modern Türkçeli kısa uyarlamasıdır; okuma kulübü çerçevesi özgündür. Açlık ve dışlama içeren ilk fabl, utandırıcı bir ders olarak sunulmadı; paylaşma ve hazırlık birlikte tartışıldı. Yine de kamu malı statüsü, ülkeye göre hak durumu, kaynak sadakati, açlık/alay/kandırma tonu ve yaş uygunluğu otomatik onaylanmadı.

## İnsan kalite kapısı

- `contentQualityReview.status=pending`
- `reviewerName`, `reviewedAt`, `reviewedCommit` ve `reviewNotes` boş.
- Sekiz evrensel checklist maddesi ve 6–7 okuma-yolu checklist'i `false`.
- Factual, originality/rights ve safeguarding/language review: `pending-human-review`.
- `releaseReady=false`; taslak aktif kataloğa bağlı değil.

İnsan incelemesinde özellikle anlatı çerçevesinin üç fablı yeterince bütünleştirip bütünleştirmediği, geleneksel sonların eleştirel yeniden çerçevelenmesi, zor sözcüklerin hece yükü ve hak kapsamı değerlendirilmelidir.

## Validator, test ve build

- Yeni taslak odak testleri: 2/2 PASS.
- Tüm içerik testleri: 128/128 PASS.
- AI kalite kapısı: 3/3 PASS.
- Production build: PASS. İlk deneme yeni worktree'de eksik `vite` bağımlılığı nedeniyle durdu; `npm ci --ignore-scripts` sonrasında aynı kilit dosyasıyla tekrarlandı ve geçti.
- Full-catalog audit: FAIL-CLOSED görünümü — 62/62 tam okuma blocker taşıyor.
- Başlıca production borçları: 35 yaş-minimum/çok kısa bölüm, 25 adet üçten az bölüm, 39 paragraf sınırı, 22 cümle ortalaması, 16 cümle maksimumu, 11 tam okuma süre farkı ve eksik insan incelemeleri.

## Dal, teslim ve riskler

- Dal: `content/2026-09-15-quality-turn`
- Değişiklik kapsamı: bir içerik taslağı, iki fail-closed test ve bu kalite raporu.
- PR: yalnız draft olarak açılacak.
- Merge, katalog bağlantısı, release ve deploy yapılmadı.

Blocker'lar: insan içerik kalitecisi onayı; 6–7 yaş harf/hece uygunluğu; kaynak/hak kararı; üç klasik sonun yeniden çerçevelenmesine editoryal karar; PR #106 publication gate ve Ikarus yaş eşleme düzeltmesi.

## Sonraki öncelikler

1. Açık taslakları isim, tarih, exact commit ve somut not içeren insan kalite incelemesine almak.
2. PR #106'daki tam katalog publication gate, mikro süre denetimi ve Ikarus yaş eşlemesini sonuçlandırmak.
3. 6–7 yaşta çakışmayan `Keloğlan Masalları` veya `Aesop's Fables` kaydını, derleme bütünlüğü ve kaynak kapsamını koruyarak tamamlamak.
