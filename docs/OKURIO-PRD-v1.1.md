# OKURIO EVIDENCE-BASED PRODUCT REQUIREMENTS DOCUMENT (PRD) v1.2

## Document Status

Authoritative Source of Truth

Bu doküman Okurio MVP için temel ürün gereksinim kaynağıdır. `OKURIO-MANIFESTO-v1.0.md` ürün anayasasıdır; çelişki halinde manifesto esas alınır.

## 1. Product Vision

Okurio; ADHD, disleksi ve görsel okuma zorlukları yaşayan çocukların dijital içerikleri daha rahat, odaklı ve sürdürülebilir şekilde okuyabilmeleri için geliştirilmiş erişilebilirlik odaklı dijital okuma platformudur.

Okurio ayrıca duygu farkındalığı, empati, perspektif alma ve dürtü farkındalığı gibi sosyal-duygusal alanları yalnızca özgün hikâyeler ve okuma deneyimleri üzerinden destekleyebilir.

## 2. Product Positioning

Okurio bir dijital okuma koçu, erişilebilir okuma platformu ve reading accessibility tool'dur.

Okurio; sesli kitap platformu, podcast uygulaması, AI öğretmen, AI tutor, eğitim yönetim sistemi, davranış puanlama sistemi, klinik değerlendirme aracı, tanı koyma sistemi, terapi veya tedavi uygulaması değildir.

Onaylı konumlandırma:

> Okurio is an ADHD- and dyslexia-friendly accessible reading platform that supports language, attention and social-emotional awareness through original stories and thoughtful reading experiences.

## 3. Target Users

1. Disleksi
2. ADHD
3. Disleksi + ADHD
4. Görsel okuma zorluğu: astigmat, göz yorgunluğu, uzun ekran kullanımı ve kontrast hassasiyeti
5. Kısa, yapılandırılmış ve erişilebilir okuma deneyiminden fayda gören çocuklar

## 4. Product Principles

- Reading First
- Accessibility Before Feature Volume
- Story-Driven Learning
- No Clinical Claims
- Child Dignity First
- One primary developmental theme per story
- Optional reflection, never scoring or classification

## 5. MVP Success Criteria

- Reading Completion Rate: en az %60
- Average Reading Session: en az 10 dakika
- Weekly Active Readers: pilot kullanıcıların en az %50'si
- Accessibility Feature Adoption: en az %40
- Pilot feedback: kullanıcı veya ebeveynlerin çoğunluğu okumayı daha kolay bulduğunu belirtir
- Social-emotional stories: reflection prompt completion is optional and never a success condition for the child

## 6. Evidence-Based Feature Matrix

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

### A12 Contextual Word Support — High P1
Kullanıcı seçili hedef kelimenin kısa ve yaşa uygun anlamını okuma ekranından ayrılmadan görür.

Gereksinimler:
- Tap-to-define
- Yaşa uygun kısa tanım
- İsteğe bağlı kelime telaffuzu
- Okuma pozisyonunun korunması
- Aynı anda en fazla bir sözlük kartı
- Kelime telaffuzu seçilmedikçe TTS akışının bozulmaması
- Her yeni Okurio içeriğinde 3–8 Product Owner onaylı hedef kelime

### A13 Optional Story Reflection — P1
Sosyal-duygusal kapsamlı hikâyeler en fazla bir kısa ve isteğe bağlı düşünme sorusu içerebilir.

Örnekler:
- Sence Mino ne hissetti?
- Oki başka ne yapabilirdi?
- Önce ne sorabilirdi?

Kurallar:
- Cevap zorunlu değildir
- Doğru/yanlış puanlama yapılmaz
- Çocuk sınıflandırılmaz
- Klinik yorum üretilmez
- Okuma tamamlanması cevaba bağlanmaz

## 7. Story Content Requirements

- MVP story length: 2–5 dakika
- Sentence length: maksimum 12 kelime; hedef 6–10 kelime
- Paragraph length: maksimum 3 cümle
- Vocabulary complexity: yaşa uygun
- İçerikler özgün olmalı ve Okurio karakter evrenine uygun hazırlanmalıdır
- Her hikâyede tek bir ana gelişim teması bulunmalıdır
- Hikâye ders anlatımına dönüşmemelidir
- Klinik terim, tanı veya tedavi iddiası kullanılmamalıdır
- Hata yapan karakter utandırılmamalı veya etiketlenmemelidir

Karakter rolleri:
- Oki: merak eden ve keşfeden
- Lili: sakinleştiren ve dikkat eden
- Toto: hızlı davranan ama öğrenen
- Mino: duygusal ve gözlemci
- Nana: yönlendiren fakat öğretmen/tutor gibi konuşmayan

## 8. Pilot Catalog Structure

Pilot katalog hedefi 25 özgün hikâyedir:

1. İlk Okuma — 5
2. Dikkat ve Odak — 5
3. Duygu Tanıma ve İfade — 5
4. Empati ve Perspektif Alma — 5
5. Öz Düzenleme ve Dürtü Farkındalığı — 5

Sosyal-duygusal temalar yalnızca hikâye ve okuma deneyimi üzerinden işlenir:
- duyguyu tanıma
- duyguyu adlandırma ve ifade etme
- karşı tarafın duygusunu anlama
- empati ve perspektif alma
- bekleme ve sıra alma
- yanlış anlamayı onarma
- varsaymadan önce sorma
- tepki öncesinde durma
- hayal kırıklığıyla baş etme

## 9. Experience Leadership Council

### Accessibility Product Owner
Her release için erişilebilirlik onayı verir. Okunabilirliği düşüren release'i durdurabilir.

### Dyslexia Product Experience Lead
Okuma yükü, cümle yapısı, spacing, font davranışı, sözlük ve disleksi dostu içerik kontrolünü yönetir.

### ADHD Product Experience Lead
Dikkat yükü, ekran karmaşıklığı, akış, hikâye ritmi ve dikkat dağıtıcı unsurları denetler.

### Social-Emotional Reading Lead
Duygu temsili, empati, perspektif alma, dürtü farkındalığı, çocuk onuru ve klinik sınır kontrolünü yönetir.

### Content Product Owner
Hikâye kalitesi, karakter tutarlılığı, yaş uygunluğu, hedef kelimeler, özgünlük ve son editoryal onaydan sorumludur.

İlgili lider tarafından verilen çözülmemiş `changes required` kararı release'i bloke eder.

## 10. Technical Requirements

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

## 11. Analytics Requirements

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

A13 için yalnızca mahremiyet güvenli kullanım olayı kaydedilebilir:
- reflection_prompt_viewed

Çocuğun serbest metin cevabı, duygu seçimi veya klinik çıkarıma dönüşebilecek veri analytics'e gönderilmez.

Kullanıcının metni, dosya adı, tanı bilgisi veya sağlık verisi analytics'e gönderilmez.

## 12. Non-Functional Requirements

- İlk kullanımda kayıt gerekmez
- Kullanıcı 60 saniyeden kısa sürede okumaya başlayabilir
- Düşük seviye Android cihazlarda çalışır
- Son açılan hikâye için offline cache desteklenir

## 13. Strictly Out of Scope

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
- ADHD veya disleksi tarama testi
- Duygu veya davranış değerlendirmesi
- Klinik öneri veya tedavi yönlendirmesi
- Terapi egzersizi iddiası
- Çocuk davranış puanı
- Website Reader Extension — Phase 2
- Parent Dashboard — Phase 2
- Teacher Dashboard — Phase 3
- Psychologist Dashboard — Phase 3
- Social Features
- Marketplace
- Book Store

PDF Import A11 kapsamında sınırlı MVP desteğidir ve out-of-scope değildir.

## 14. Definition of Done

Bir özellik yalnızca aşağıdakilerin tamamı sağlandığında tamamlanmış sayılır:

- Mobile tested
- Tablet tested
- Desktop tested
- Accessibility reviewed
- Reading progress preserved
- Analytics event emitted where applicable
- No regression in reading experience
- Build successful
- Preview deployment successful
- P0 okuma özelliklerinde gerçek Samsung cihaz doğrulaması
- Relevant Experience Leadership Council approvals recorded
- Clinical-boundary review completed for social-emotional scope

## 15. Release and Content Governance

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
- Dyslexia Product Experience Lead onayı
- ADHD Product Experience Lead onayı
- Social-Emotional Reading Lead onayı veya `not applicable`
- Hikâye merkezli, klinik iddiasız ve çocuk onurunu koruyan anlatım
