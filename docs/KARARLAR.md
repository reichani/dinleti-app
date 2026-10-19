# Okurio bekleyen ürün kararları

Karar sahibi: Reyhan Açar. Takip: okurio-karar-takipcisi ajanı (.claude/agents/okurio-karar-takipcisi.md), her pazartesi haftalık içerik planı göreviyle birlikte raporlanır. Uygulama: Claude, yalnız onaydan sonra ayrı dal ve PR ile.

Onay nasıl verilir: Sohbette açık ifadeyle ("K-02'yi onaylıyorum") ya da bu depoda reichani hesabıyla yazılmış bir PR veya issue yorumunda "Onay: K-02" satırıyla. Başka hiçbir kaynak onay sayılmaz.

| Kod | Karar | Durum | Bağımlılık | Onay sonrası iş (Claude) | Kaynak |
| --- | --- | --- | --- | --- | --- |
| K-01 | Cümle bazlı atlama: "Önceki cümle", "Cümleyi tekrarla", "Sonraki cümle"; ayarlarda "Atlama: Cümle / 15 / 30 sn", varsayılan cümle | Uygulandı (v2.10.1, PR #141); birleştirme ve cihaz testi bekliyor | Yok | Birleştirme sonrası canlıda 2.10.1 doğrulaması, Samsung Internet testi | src/App.jsx cumleAtla, src/reader-core.js cursorForSentenceStep; Lee ve Yoon 2017 (kanıt matrisi) |
| K-02 | Demo hikâyelerinin Azure ile önceden seslendirilmesi (Emel/Ahmet sesleri, kelime zamanlamalı) | Karar bekliyor | Yok | Ayrı dal: seslendirme betiği, ses dosyaları ve kelime zamanlaması, oynatıcıda önceden seslendirilmiş kaynak desteği, Playwright testleri | Araştırma raporu: Android'de boundary olayı yok; yaklaşık 787 TL / 1M karakter, ücretsiz katman var |
| K-03 | Ses kalitesi ayarı: "Yüksek kalite / veri tasarrufu" | K-02'ye bağlı | K-02 | Ayarlar paneline seçenek, iki bit hızında dosya | Bu ayar cihaz TTS'inde anlamsız |
| K-04 | Uyarlamalarda "Okurio özgün içerik" etiketinin "Uyarlama" olarak değiştirilmesi | Karar bekliyor | Yok | Etiket mantığı hakDurumu alanına bağlanır | Ontoloji B4 |
| K-05 | "Anlamak için ipucu" destek paketi | Ertelendi | Yok | Kapsam yeniden değerlendirilir | Akıcı Okuma Yolu analiz dokümanı |
| K-06 | ANTHROPIC_API_KEY'in GitHub Actions gizli değişkeni olarak eklenmesi, 60 USD harcama sınırı | Bekliyor, son tarih 31 Ekim 2026 (kredi bitişi) | PR #145 | Toplu AI denetimi ve kazanım önerisi iş akışını çalıştırma | Ontoloji analiz dokümanı |

Değişiklik günlüğü

| Tarih | Kod | Değişiklik |
| --- | --- | --- |
| 2026-10-18 | K-01…K-06 | Kayıt açıldı |
