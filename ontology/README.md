# Okurio İçerik Ontolojisi

Bu klasör, Okurio içeriklerinin yaş, okuma yolu, MEB kademesi, kelime yükü ve yeni kelime katkısı üzerinden tanımlandığı modeli tutar. İçerik üretim ajanları (`.claude/agents/`) neyi üreteceklerine bu model ve son ölçüm anlık görüntüsü üzerinden karar verir.

Sahip: Reyhan Açar (sürüm onayı, dış kaynak ve lisans kararları). Bakımcı: Claude (ölçüm betiği, öneri PR'ları; onay vermez).

## Dosyalar

`okurio-ontology.v0.1.json` sınıfları, özellikleri, ilişkileri, metrik tanımlarını, olgunluk seviyelerini (O0-O4) ve açık boşlukları (B1-B7) içerir. `snapshots/catalog-metrics-<tarih>.json` katalogdaki her içerik için ölçülen değerleri ve okuma yolu özetini içerir; `node scripts/build-ontology-snapshot.mjs --date <tarih>` ile üretilir. `vocab/meb-kazanim.json` MEB TYMM Türkçe programının 1-8. sınıf okuma öğrenme çıktılarını (119 çıktı, 349 süreç bileşeni) kodlarıyla tutar; kaynak ve sınırlar `vocab/meb-kazanim-KAYNAK-NOTU.md` dosyasında. `mappings/icerik-kazanim-aday.json` içerik ile kazanım arasındaki kural tabanlı aday eşlemedir; `node scripts/build-curriculum-candidates.mjs` ile üretilir. Kelime sıklık bantları ile deyim ve atasözü listesi henüz yok (B1, B3).

## Güncelleme metodolojisi

Ontoloji üç farklı hızda değişir ve her biri ayrı bir kapıdan geçer.

Ölçüm döngüsü her içerik PR'ında çalışır. Yeni içerik eklendiğinde ya da metin değiştiğinde anlık görüntü yeniden üretilir ve PR'a eklenir. Bu döngü ontolojinin şemasını değiştirmez; yalnızca değerleri günceller. `tests/content/ontology-contract.spec.mjs` App.jsx'teki okuma yolu ve evre kimlikleri ile ontolojideki sözlüklerin uyuştuğunu denetler, uyuşmazlıkta CI kırılır.

Sözlük döngüsü haftalıktır. Ajanlar ölçüm anlık görüntüsünden yeni bir değer (yeni içerik türü, yeni hak durumu, yeni deyim) çıkarırsa bunu ontoloji JSON'una öneri olarak ekler, değişiklik günlüğüne yazar ve yama sürümünü artırır (0.1.0 → 0.1.1). Bu PR'ı Reyhan onaylar.

Şema döngüsü aylık ya da bir boşluk kapandığında çalışır. Yeni sınıf, yeni ilişki veya bir alanın olgunluk seviyesinin yükselmesi (ör. yeniKokKatkisi O2'den O3'e, dış sıklık listesine bağlandığında) küçük sürüm artışıdır (0.1 → 0.2). Bu PR'a kısa bir gerekçe notu eklenir ve Reyhan onaylar. Bir alanın kaldırılması veya anlamının değişmesi büyük sürümdür ve önce yazılı karar ister.

Olgunlaşma ölçütü her sınıf ve özellik için olgunluk seviyesidir. Hedef sıra şudur: v0.2'de Zemberek ile lemma (B5) ve yol başına yeni kök bandı (B6); v0.3'te MEB okuma kazanım kodları (B2) ve kalan 64 içeriğin hak durumu (B4); v0.4'te kelime sıklık bantları (B1) ve deyim/atasözü listesi (B3). Her sürüm notu kapanan boşluk kodlarını listeler.

## İnsan kapısı

Hiçbir ajan `contentQualityReview.reviewerName` veya `ownerApproval.ownerName` alanını doldurmaz, `releaseReady` değerini `true` yapmaz ve `main` dalına doğrudan yazmaz. Ajan çıktısı her zaman `content/*` veya `claude/*` dalında bir PR'dır. Kaynak: `docs/AI-ASSISTED-QUALITY-GATE-v1.0.md`.

## Metrik notları

Kelime sayımı `scripts/audit-full-catalog.mjs` ile aynı ifadeyi kullanır, bu yüzden iki rapor karşılaştırılabilir. Kök sayısı Türkçe için 5 harflik önek kesmedir (Can ve diğ., 2008, JASIST, F5 kök bulma); biçimbirim çözümleyici değildir ve yaklaşık değer olarak okunmalıdır. Yeni kök katkısı yalnız katalog içidir: bir içeriğin, kendi okuma yolundan önceki yollardaki aynı dilli içeriklerde görülmemiş kök sayısıdır. Mikro alıştırmalar (harf, hece, kelime kartı, tekerleme, bilmece) okuma yolu medyanlarına katılmaz.
