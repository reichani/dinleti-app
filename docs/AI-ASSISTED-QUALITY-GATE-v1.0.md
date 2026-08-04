# Okurio AI Destekli İçerik Kalite Kapısı v1.0

Bu kapı tek ürün sahibine sekiz perspektifte bağımsız hazırlık kanıtı sunar. AI incelemesi insan 4-eyes onayı değildir ve insan kimliğiyle kaydedilemez.

## Sıra

1. Üretici içerik taslağını hazırlar.
2. Yapısal testler kelime, süre, bölüm, cümle, paragraf ve kaynak alanlarını doğrular.
3. Üreticiden ayrı AI kalite denetçisi sekiz kontrolü `PASS`, `FAIL`, `BLOCKED` veya `NOT_RUN` olarak kaydeder.
4. Playwright ses/vurgu/kaydırma ve mobil görünürlük kanıtını exact commit üzerinde üretir.
5. Ürün sahibi aynı commit'i okuyup isimli, tarihli ve somut notlu karar verir.
6. Factual, hak, çocuk güvenliği, klinik veya hukuki uzmanlık gerekiyorsa dış inceleme tamamlanır.

## Sekiz kontrol

- Hikâye tamamlanmış mı?
- Yaşa uygun mu?
- Bölümler doğal mı?
- Ses, vurgu ve kaydırma uyumlu mu?
- Factual iddialar kaynaklarla örtüşüyor mu?
- Hak ve özgünlük durumu açık mı?
- Utandırıcı, klinik veya baskıcı dil var mı?
- Telefonda içerik görünür ve kullanılabilir mi?

`releaseReady` yalnız bütün kontroller `PASS`, insan içerik incelemesi `approved`, ürün sahibi onayı isimli ve aynı commit'e bağlı olduğunda true olabilir. AI hiçbir zaman `contentQualityReview.reviewerName` veya `ownerApproval.ownerName` alanını doldurmaz.
