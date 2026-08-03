# Okurio Pilot Five — 4-Eyes Review Packet

## Durum

Bu paket beş pilot hikâyenin yapısal olarak insan incelemesine hazır adaylarını içerir. Otomatik kontroller insan onayı değildir. Tüm hikâyeler `releaseReady=false` ve tüm rol incelemeleri `pending` durumundadır.

## Pilot adayları

| ID | Başlık | Yaş | Kelime | 155 kelime/dk süre | Bölümler |
|---|---|---:|---:|---:|---|
| OR-01 | Oki A Sesini Buluyor | 6–7 | 309 | 120 sn — 2:00 | 52 / 57 / 60 / 54 / 86 |
| OF-01 | Sessiz Ormandaki Ses | 8–10 | 567 | 220 sn — 3:40 | 110 / 107 / 106 / 110 / 134 |
| OE-01 | Mino Neden Üzüldü? | 7–8 | 354 | 138 sn — 2:18 | 46 / 40 / 49 / 48 / 82 / 89 |
| OP-01 | Oki Yanlış Anladı | 7–8 | 350 | 136 sn — 2:16 | 45 / 52 / 48 / 42 / 75 / 88 |
| OS-01 | Toto Bir An Durdu | 7–8 | 350 | 136 sn — 2:16 | 47 / 45 / 41 / 48 / 82 / 87 |

## Otomatik kanıt

- Beş exact başlık ve kimlik
- Yaş bandı kelime hedefleri
- 155 kelime/dk ile gerçek süre ve 2–5 dakika sınırı
- 3–8 anlamlı bölüm; bölüm başına en az 30 kelime ve iki cümle
- Cümle başına en fazla 12; hedef ortalama 6–10 kelime
- Görünür paragraf başına en fazla üç cümle
- Bölüm süreleri bölüm kelime sayısından türetilir; sapma en fazla %15'tir
- Hiçbir bölüm toplamın %35'inden fazlasını taşımaz
- TTS ritmini bozan otomatik noktalı virgül birleştirmesi yoktur
- Hikâye başına 4–5 sözlük girdisi
- İsteğe bağlı ve puansız düşünme sorusu
- Boş insan reviewer alanları ve `releaseReady=false` kapısı

## İnsan 4-eyes kapısı

Her hikâye için aşağıdaki roller ayrı kişi, tarih ve somut notla kayıt vermelidir:

1. Content Product Owner — anlatı yayı, yaş, karakter, dil ve editoryal kalite
2. Accessibility Product Owner — okunabilirlik, dokunma/klavye, odak ve mobil deneyim
3. Dyslexia Product Experience Lead — kod çözme yükü, cümle/paragraf ve sözlük
4. ADHD Product Experience Lead — ritim, bilişsel yük ve dikkat geçişleri
5. Social-Emotional Reading Lead — duygu temsili ve klinik/utandırıcı dil; uygun değilse gerekçeli `not applicable`

Üretici kendi çalışmasına ikinci göz olarak onay veremez. En az iki farklı isimli insan kaydı ve kapsam için zorunlu tüm kurul kararları tamamlanmadan içerik yayınlanamaz.

## Hikâye özel inceleme odağı

- OR-01: ses ve harf farkının pedagojik doğruluğu
- OF-01: seçici dikkatin performans testi gibi sunulmaması
- OE-01: üzüntü ve dışlanma varsayımının çocuğu utandırmadan onarılması
- OP-01: niyet okuma ve yanlış anlamayı onarma dilinin suçlayıcı olmaması
- OS-01: durmanın terapi veya kesin davranış tekniği gibi sunulmaması

## Release kapısı

İnsan onaylarından sonra ayrı bir release adayı hazırlanır. Exact SHA üzerinde tüm içerik testleri, build, viewport regresyonu ve preview çalıştırılır. Production deploy yalnız Release Manager kararı ve Reyhan Açar'ın gerçek Samsung cihaz kabulü sonrasında yapılır.
