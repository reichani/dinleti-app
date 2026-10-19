# Okurio bekleyen ürün kararları

Karar sahibi: Reyhan Açar. Takip: okurio-karar-takipcisi ajanı (.claude/agents/okurio-karar-takipcisi.md), her pazartesi haftalık içerik planı göreviyle birlikte raporlanır. Uygulama: Claude, yalnız onaydan sonra ayrı dal ve PR ile.

Onay nasıl verilir: Sohbette açık ifadeyle ("K-02'yi onaylıyorum") ya da bu depoda reichani hesabıyla yazılmış bir PR veya issue yorumunda "Onay: K-02" satırıyla. Başka hiçbir kaynak onay sayılmaz.

| Kod | Karar | Durum | Bağımlılık | Onay sonrası iş (Claude) | Kaynak |
| --- | --- | --- | --- | --- | --- |
| K-01 | Cümle bazlı atlama: "Önceki cümle", "Cümleyi tekrarla", "Sonraki cümle"; ayarlarda "Atlama: Cümle / 15 / 30 sn", varsayılan cümle | Uygulandı (v2.10.1, PR #141); PR #141 açık ve main ile çakışmalı (2026-10-19), canlı sürüm 2.9.2; birleştirme ve cihaz testi bekliyor | Yok | Birleştirme sonrası canlıda 2.10.1 doğrulaması, Samsung Internet testi | src/App.jsx cumleAtla, src/reader-core.js cursorForSentenceStep; Lee ve Yoon 2017 (kanıt matrisi) |
| K-02 | Demo hikâyelerinin Azure ile önceden seslendirilmesi (Emel/Ahmet sesleri, kelime zamanlamalı) | Karar bekliyor | Yok | Ayrı dal: seslendirme betiği, ses dosyaları ve kelime zamanlaması, oynatıcıda önceden seslendirilmiş kaynak desteği, Playwright testleri | Araştırma raporu: Android'de boundary olayı yok; yaklaşık 787 TL / 1M karakter, ücretsiz katman var |
| K-03 | Ses kalitesi ayarı: "Yüksek kalite / veri tasarrufu" | K-02'ye bağlı | K-02 | Ayarlar paneline seçenek, iki bit hızında dosya | Bu ayar cihaz TTS'inde anlamsız |
| K-04 | Uyarlamalarda "Okurio özgün içerik" etiketinin "Uyarlama" olarak değiştirilmesi | Karar bekliyor | Yok | Etiket mantığı hakDurumu alanına bağlanır | Ontoloji B4 |
| K-05 | "Anlamak için ipucu" destek paketi | Ertelendi | Yok | Kapsam yeniden değerlendirilir | Akıcı Okuma Yolu analiz dokümanı |
| K-06 | ANTHROPIC_API_KEY'in GitHub Actions gizli değişkeni olarak eklenmesi, 60 USD harcama sınırı | Bekliyor, son tarih 31 Ekim 2026 (kredi bitişi); PR #145 açık, çakışmasız (2026-10-19) | PR #145 | Toplu AI denetimi ve kazanım önerisi iş akışını çalıştırma | Ontoloji analiz dokümanı |
| K-07 | Ölçümde içeriğin ana okuma yolunun nasıl seçileceği: şu an "segmentlerin işaret ettiği en erken yol"; seçenekler: uygulamadaki rafı kaynak almak, ilk segmenti ana yol saymak, ICERIK_METADATA'ya açık anaYol alanı eklemek | Karar bekliyor | Yok | Seçilen kuralı scripts/build-ontology-snapshot.mjs anaYol ve uzunluk denetimine uygulamak, anlık görüntüyü yenilemek, içerik testi eklemek | docs/content-plans/2026-10-19.md; ontology/karar-kayitlari.json acikSorular (B7, sessiz-saatler) |

Değişiklik günlüğü

| Tarih | Kod | Değişiklik |
| --- | --- | --- |
| 2026-10-18 | K-01…K-06 | Kayıt açıldı |
| 2026-10-19 | K-01 | PR #141 hâlâ açık, main ile çakışmalı; canlı release.json 2.9.2 (commit 08cb30f). Durum değişmedi |
| 2026-10-19 | K-06 | PR #145 açık ve çakışmasız; son tarihe 12 gün |
| 2026-10-19 | K-02…K-06 | reichani hesabından "Onay: K-xx" yorumu bulunmadı (issue, PR ve inceleme yorumları, 2026-10-01 sonrası) |
| 2026-10-19 | K-07 | Kayıt açıldı (haftalık içerik planı bulgusu, PR #157) |
