# OKURIO EVIDENCE-BASED PRODUCT REQUIREMENTS DOCUMENT (PRD) v1.1

## Document Status

Authoritative Source of Truth

Bu doküman Okurio MVP için tek referans kaynaktır. Geliştirme, tasarım, içerik ve ürün ekipleri arasında çelişki olması durumunda bu doküman esas alınır.

## 1. Product Vision

Okurio; ADHD, disleksi ve görsel okuma zorlukları yaşayan bireylerin dijital içerikleri daha rahat, odaklı ve sürdürülebilir şekilde okuyabilmeleri için geliştirilmiş erişilebilirlik odaklı dijital okuma koçudur.

## 2. Product Positioning

Okurio bir dijital okuma koçu, erişilebilir okuma platformu ve reading accessibility tool'dur.

Okurio; sesli kitap platformu, podcast uygulaması, AI öğretmen, AI tutor, eğitim yönetim sistemi, klinik değerlendirme aracı, tanı koyma sistemi veya tedavi uygulaması değildir.

## 3. Target Users

1. Disleksi
2. ADHD
3. Disleksi + ADHD
4. Görsel okuma zorluğu: astigmat, göz yorgunluğu, uzun ekran kullanımı ve kontrast hassasiyeti

## 4. MVP Success Criteria

- Reading Completion Rate: en az %60
- Average Reading Session: en az 10 dakika
- Weekly Active Readers: pilot kullanıcıların en az %50'si
- Accessibility Feature Adoption: en az %40

## 5. Evidence-Based Feature Matrix

### A01 Reading Ruler — P0
Aktif satırın görsel olarak vurgulanması.

### A02 Line Focus Mode — P1
Diğer satırların kontrastının azaltılması.

### A03 Synchronized Read-Along — P0
Ses ve metnin eş zamanlı ilerlemesi. Word highlighting, sentence highlighting, pause, resume ve speed control zorunludur.

### A04 Adjustable Font Size — P0
14px–32px.

### A05 Adjustable Line Spacing — P0

### A06 Adjustable Letter Spacing — P0

### A07 Theme Selection — P1
White, Cream, Light Blue ve Light Yellow.

### A08 OpenDyslexic Font — P2
Optional user preference.

### A09 Bionic Reading — P2
Experimental. Varsayılan kapalıdır ve tanı/profil seçimiyle otomatik açılmaz.

### A10 Reading Progress Tracking — P0
Last position, reading time ve completed stories izlenir.

### A11 User Content Import — P0
Kullanıcı kendi metnini erişilebilir okuma görünümüne aktarabilir.

Desteklenen girişler:
- Copy-paste
- TXT
- DOCX
- Metin tabanlı PDF

İlk MVP dışında:
- Eski DOC
- DOCM
- Parola korumalı dosyalar
- Taranmış PDF/OCR
- El yazısı
- Karmaşık çok kolonlu PDF garantisi

Dosyalar mümkün olduğunda tarayıcıda işlenir. Metin ve dosya adı analytics'e gönderilmez. İçerik açık izin olmadan sunucuda kalıcı saklanmaz.

### A12 Contextual Word Support — P1
Kullanıcı seçili hedef kelimenin kısa ve yaşa uygun anlamını okuma ekranından ayrılmadan görür.

Gereksinimler:
- Tap-to-define
- Yaşa uygun kısa tanım
- İsteğe bağlı kelime telaffuzu
- Okuma pozisyonunun korunması
- Aynı anda en fazla bir sözlük kartı
- Kelime telaffuzu seçilmedikçe TTS akışının bozulmaması
- Her yeni Okurio içeriğinde 3–8 Product Owner onaylı hedef kelime

## 6. Story Content Requirements

- MVP story length: 2–5 dakika
- Sentence length: maksimum 12 kelime; hedef 6–10 kelime
- Paragraph length: maksimum 3 cümle
- Vocabulary complexity: yaşa uygun
- İçerikler özgün olmalı ve Okurio karakter evrenine uygun hazırlanmalıdır

Karakter rolleri:
- Oki: merak eden ve keşfeden
- Lili: sakinleştiren ve dikkat eden
- Toto: hızlı davranan ama öğrenen
- Mino: duygusal ve gözlemci
- Nana: yönlendiren fakat öğretmen/tutor gibi konuşmayan

## 7. Technical Requirements

- Responsive Web App
- Mobile, tablet ve desktop
- WCAG AA target
- Initial page load target: 2 saniyenin altında

Kanonik readingState en az şunları içerir:
- storyId
- currentPosition
- readingTime
- completionPercentage

Operasyonel alanlar eklenebilir; ancak tek ilerleme kaynağı korunur.

## 8. Analytics Requirements

Zorunlu olaylar:
- reading_started
- reading_completed
- reading_paused
- reading_resumed
- focus_mode_enabled
- theme_changed
- font_changed
- tts_started
- tts_completed

A12 için:
- dictionary_opened
- word_definition_viewed
- word_pronunciation_played

Kullanıcının metni, dosya adı, tanı bilgisi veya sağlık verisi analytics'e gönderilmez.

## 9. Non-Functional Requirements

- İlk kullanımda kayıt gerekmez
- Kullanıcı 60 saniyeden kısa sürede okumaya başlayabilir
- Düşük seviye Android cihazlarda çalışır
- Son açılan hikâye için offline cache desteklenir

## 10. Strictly Out of Scope

- AI Teacher
- AI Tutor
- Homework Assistance
- Question Solving
- Chatbot
- Voice Cloning
- Premium AI Voices
- Podcast Mode
- Background Listening
- Screen-Off Listening
- Website Reader Extension — Phase 2
- Parent Dashboard — Phase 2
- Teacher Dashboard — Phase 3
- Psychologist Dashboard — Phase 3
- Social Features
- Marketplace
- Book Store

PDF Import artık A11 kapsamında sınırlı MVP desteğidir ve out-of-scope değildir.

## 11. Definition of Done

Bir özellik yalnızca aşağıdakilerin tamamı sağlandığında tamamlanmış sayılır:

- Mobile tested
- Tablet tested
- Desktop tested
- Accessibility reviewed
- Reading progress preserved
- Analytics event emitted
- No regression in reading experience
- Build successful
- Preview deployment successful
- P0 okuma özelliklerinde gerçek Samsung cihaz doğrulaması

## 12. Release and Content Governance

Her planlı ürün release'inde Product Owner içerik paketini değerlendirir. Hotfix deployment'larında yeni içerik zorunlu değildir.

Yeni içerik ancak aşağıdaki kapıları geçerse pilot kataloğuna alınır:
- 2–5 dakika
- Maksimum 12 kelimelik cümle
- Maksimum 3 cümlelik paragraf
- Yaş grubu ve metadata eksiksiz
- 3–8 hedef kelime ve kısa sözlük tanımı
- Telif güvenliği
- Mobil, TTS ve highlight kontrolü
- Product Owner onayı
