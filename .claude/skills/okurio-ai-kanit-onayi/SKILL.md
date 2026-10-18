---
name: okurio-ai-kanit-onayi
description: Okurio kataloğundaki bir veya daha fazla içeriği prototip fazının onay modeliyle (K-2026-10-18-07) AI kanıt denetiminden geçirir; gözetim ajanının beş denetimini ve PubMed/Consensus kanıt denetimini koşar, ontology/reviews/ai-kanit/<id>.json kaydını yazar, anlık görüntüyü yeniler ve PR açar. "AI onayı", "kanıt denetimi", "içerikleri AI onayından geçir", "demo setini onayla" isteklerinde kullanılır. İnsan onayı vermez.
---
# Okurio AI kanıt onayı

Prototip fazında Okurio içerikleri insan editör yerine kayıtlı bir AI kanıt denetiminden geçer (karar K-2026-10-18-07, ontology/karar-kayitlari.json). Bu onay insan onayı değildir. Gelir modeli başladığında insan onayı (contentQualityReview, şema 2.0) bu kaydın üstüne eklenir.

## Kesin kurallar

- contentQualityReview, reviewerName, ownerApproval, ownerName ve releaseReady alanlarına dokunma. AI kaydı bu alanları içeremez; doğrulayıcı reddeder.
- Kamuya açık ifade yalnız şudur: "AI destekli kanıt denetiminden geçti". "Uzman onaylı", "insan onaylı", "editör onaylı" veya "bilimsel olarak kanıtlanmış" yazma ve sunuma da yazdırma.
- Görmediğin kaynağı uydurma. Doğrulanamayan iddia engelleyicidir.
- Metin değişirse kayıt geçersizleşir (contentFingerprint); düzeltmeden sonra denetimi yeniden koş.
- main'e doğrudan yazma; çıktı `claude/ai-kanit-<tarih>` dalında bir PR'dır.

## Adımlar

1. Kapsamı belirle. Kullanıcı içerik listesi vermediyse demo seti için her okuma yolundan bir tam okuma seç: `node scripts/build-ontology-snapshot.mjs --stdout` çıktısında `aiKanitOnayi.durum` "yok" olan, uzunluk denetiminde (`node scripts/optimize-content-length.mjs --json`) "uygun" olan içerikler.
2. Girdiyi üret: `node scripts/build-ontology-snapshot.mjs --icerik <id>` (metin, yol, sözlük, dil profili, parmak izi).
3. Beş denetim: okurio-gozetim-ajani rolünü uygula (dil seviyesi, güvenlik, hak-özgünlük, müfredat ve gerekiyorsa erişilebilirlik). Her denetim için checks.<ad> = { sonuc: "gecti" | "uygulanmaz" | "bulgu", ajan, not }. Erişilebilirlik yalnız okuma güçlüğü veya destek aracı temasında uygulanır, aksi hâlde "uygulanmaz".
4. Kanıt denetimi: okurio-kanit-denetcisi rolü iddiaları çıkarır ve PubMed/Consensus ile doğrular; checks.olgusalKanit ve iddialar dizisini döndürür.
5. Engelleyici varsa (herhangi bir "bulgu", "desteklenmiyor" veya "dogrulanamadi"): status "ai-duzeltme-gerekli". İçerik taslak dosyasındaysa yazar düzeltir ve 2. adıma dönülür (en fazla 3 tur). Düzeltme App.jsx gerektiriyorsa Reyhan'ın sohbetteki açık onayını bekle. Üçüncü turda hâlâ engel varsa status "ai-durdur".
6. Engel yoksa kaydı yaz: ontology/reviews/ai-kanit/<id>.json (şablon: ontology/reviews/ai-kanit/SABLON.json). model alanına çalışan modelin kimliğini, reviewedCommit alanına `git rev-parse HEAD` değerini, reviewedAt alanına ISO tarihini yaz. insanOnayi her zaman "bekliyor".
7. Doğrula: `node --test tests/content/ai-evidence-review.spec.mjs` ve `node scripts/build-ontology-snapshot.mjs --date <bugün>`; kapsam.aiKanitOnayli artmalı.
8. PR aç. Açıklamada her içerik için sonuç, iddia sayısı, kanıt listesi ve insan kararı gerektiren konular (ör. ölüm teması yaşa uygunluğu, kamu malı teyidi) olsun. Bu konular AI onayı ile kapatılmaz; kayıtta checks.guvenlik.not altında "insan kararı gerekli" olarak kalır ve status yine "ai-onayli" olabilir, çünkü karar ürün sahibine aittir.

## Sınırlar

AI kanıt denetimi metnin edebî niteliğini, çocuk gelişimi uzmanlığını veya hukuki hak durumunu garanti etmez. PubMed ve Consensus yalnız olgusal ve pedagojik iddiaları sınar; kurgunun kendisini sınamaz. Bu sınır her kaydın "sinirlar" alanında yazılıdır.
