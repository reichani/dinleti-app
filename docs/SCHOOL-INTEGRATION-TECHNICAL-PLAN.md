# Okurio School Integration — Technical Plan

## 1. Hedef mimari

Okurio, okul sistemlerinin yerine geçmez; onların kimlik, sınıf ve ödev verilerini güvenli biçimde kullanan ayrı bir SaaS katmanı olur.

Temel bileşenler:

1. **Identity Gateway** — OIDC/OAuth 2.0, SAML 2.0 ve gerektiğinde magic-link.
2. **Roster Sync Service** — okul, sınıf, öğretmen ve öğrenci eşleştirmesi.
3. **Assignment Connector** — Okurio içeriğini LMS veya sınıf sisteminde ödev olarak yayınlama.
4. **Learning Event Service** — başlama, tamamlama, süre ve tercih edilen okuma modu gibi olayları toplama.
5. **School Admin Console** — bağlantı, veri kapsamı, senkron geçmişi ve hata yönetimi.
6. **Tenant Isolation** — her okul için ayrı tenant_id, rol ve veri sınırı.

## 2. Entegrasyon katmanları

### Seviye A — En hızlı pilot

- Okul alan adı bazlı tenant.
- Öğretmen daveti veya CSV ile sınıf listesi.
- Öğrenci için tek kullanımlık kod ya da okul e-postasıyla giriş.
- Okurio bağlantıları öğretmen tarafından okul sistemine manuel eklenir.

Bu seviye, okul sunumundan sonra 2–4 haftalık pilot için yeterlidir.

### Seviye B — SSO + otomatik roster

- Google Workspace for Education: OAuth/OIDC + Google Classroom API.
- Microsoft 365 Education: Entra ID OIDC + Microsoft Graph Education API.
- Diğer sistemler: SAML 2.0 veya OIDC.
- OneRoster 1.2 CSV veya REST ile okul/sınıf/üyelik aktarımı.

### Seviye C — LMS içinden çalışma

- LTI 1.3 / LTI Advantage launch.
- Öğretmen LMS içinden Okurio içeriği seçer.
- Öğrenci LMS içinden tek tıkla Okurio okuyucusuna geçer.
- İlerleme gerekiyorsa yalnız açıkça tanımlanmış sonuç alanları geri gönderilir.

## 3. Desteklenecek bağlayıcılar

### Google Classroom

İlk kapsam:
- sınıfları listeleme,
- öğretmen ve öğrenci roster'ını alma,
- Okurio içeriğini courseWork veya courseWorkMaterial olarak paylaşma,
- dış bağlantı üzerinden öğrenciyi doğru içerik ve sınıf bağlamıyla açma.

### Microsoft 365 / Teams for Education

İlk kapsam:
- Entra ID ile SSO,
- school/class/user/teacher/student roster okuma,
- sınıf ve öğretmen eşleştirmesi,
- sonraki fazda assignment lifecycle entegrasyonu.

### Moodle ve diğer LMS'ler

Öncelik LTI 1.3 olmalıdır. Platform LTI desteklemiyorsa:
- OIDC/SAML SSO,
- REST web service,
- OneRoster CSV,
- imzalı deep-link fallback.

### Özel okul bilgi sistemleri

Her ürün için özel entegrasyon yazmak yerine ortak adaptör sözleşmesi kullanılmalıdır:

```text
SchoolConnector
  authenticate()
  listSchools()
  listClasses()
  listTeachers()
  listStudents()
  listEnrollments()
  publishAssignment()
  syncStatus()
```

## 4. Canonical veri modeli

Okurio içinde sağlayıcıdan bağımsız veri modeli:

- tenant
- school
- academic_term
- class
- user
- role
- enrollment
- assignment
- content_resource
- learning_session
- progress_summary

Her kayıtta:
- internal_id
- tenant_id
- provider
- external_id
- source_updated_at
- sync_status

E-posta adresi birincil anahtar olarak kullanılmamalı; sağlayıcının değişmez external_id değeri kullanılmalıdır.

## 5. Kimlik ve yetkilendirme

Roller:
- school_admin
- teacher
- counselor_readonly
- student
- parent_optional
- okurio_support_limited

Kurallar:
- Öğretmen yalnız kendi sınıflarını görür.
- Rehberlik rolü öğrenci bazlı ayrıntıya ancak okul politikasıyla erişir.
- Okul yöneticisi tenant düzeyinde bağlantı ve yetki yönetir.
- Destek personeli varsayılan olarak öğrenci içeriğini göremez.

OAuth izinleri minimum tutulur. İlk sürümde roster için read-only izin tercih edilir; yazma izinleri yalnız ödev yayınlama özelliği etkinleştirildiğinde istenir.

## 6. Senkronizasyon modeli

- İlk tam senkron: bağlantı kurulduğunda.
- Artımlı senkron: her 6 saatte veya sağlayıcının webhook/değişiklik bildirimiyle.
- Gece uzlaştırması: günde bir kez.
- Silme: önce inactive/tombstone, sonra saklama politikasına göre fiziksel silme.
- Idempotency: provider + external_id benzersiz anahtar.
- Retry: exponential backoff ve dead-letter queue.
- Admin panelinde son başarılı senkron, hata sayısı ve etkilenen kayıtlar gösterilir.

## 7. Okurio deep-link sözleşmesi

Örnek:

```text
https://app.okurio.com/launch/{resourceId}?class={classId}&assignment={assignmentId}
```

Bağlam query string'e açık öğrenci verisi koymadan, kısa ömürlü imzalı launch token ile taşınır.

Token içeriği:
- tenant_id
- user_id
- class_id
- assignment_id
- resource_id
- role
- exp
- nonce

## 8. Öğrenme verisi

İlk pilotta tutulabilecek minimum olaylar:
- session_started
- session_completed
- active_seconds
- last_position
- reading_mode_selected
- accessibility_preferences_used

Varsayılan olarak tutulmaması gerekenler:
- serbest metin içeriğinin tamamı,
- sağlık/teşhis etiketi,
- öğrencinin zorlandığı kelimelerden hassas profil çıkarımı,
- gereksiz cihaz parmak izi.

## 9. Güvenlik gereksinimleri

- TLS zorunlu.
- Tenant düzeyinde veri izolasyonu.
- At-rest encryption.
- Secret manager içinde OAuth client secret saklama.
- Audit log: bağlantı, yetki, roster sync ve yönetici işlemleri.
- Rate limiting ve webhook signature validation.
- Kısa ömürlü access token; refresh token şifreli saklama.
- Her entegrasyon için veri işleme envanteri ve kapatma/geri alma prosedürü.

## 10. Uygulama sırası

### Sprint 1 — Entegrasyonsuz pilot altyapısı
- tenant ve school modeli
- teacher/student roller
- sınıf ve öğrenci CSV import
- okul yönetici ekranı
- imzalı Okurio assignment linki

### Sprint 2 — Google School Connector
- Google OIDC
- Classroom course/class roster read
- sınıf eşleştirme ekranı
- içerik bağlantısını courseWorkMaterial olarak paylaşma

### Sprint 3 — Microsoft School Connector
- Entra ID OIDC
- Graph Education roster read
- okul/sınıf/öğretmen eşleştirmesi

### Sprint 4 — OneRoster
- OneRoster 1.2 CSV import
- doğrulama raporu
- artımlı tekrar yükleme
- sonraki aşamada REST connector

### Sprint 5 — LTI 1.3
- platform registration
- OIDC login initiation
- id_token validation
- resource-link launch
- deep linking
- isteğe bağlı assignment and grade services

## 11. Okul keşif toplantısında sorulacak teknik sorular

1. Google Workspace mı Microsoft 365 mi kullanılıyor?
2. LMS veya okul bilgi sisteminin adı ve sürümü nedir?
3. LTI 1.3, OneRoster, SAML veya OIDC desteği var mı?
4. Öğrenci roster'ının source of truth sistemi hangisi?
5. Okul e-postası tüm öğrencilerde var mı?
6. Öğretmenler ödevleri hangi sistemden yayınlıyor?
7. IT güvenlik/onay sürecinin sahibi kim?
8. Veri barındırma, saklama ve silme beklentileri nedir?
9. Pilot sınıf, öğrenci ve öğretmen sayısı nedir?
10. Okul yalnız SSO mu, roster mı, yoksa ödev/sonuç entegrasyonu da mı istiyor?

## 12. Sunum için önerilen teknik teklif

Okula üç seçenek sunulmalıdır:

- **Pilot:** entegrasyonsuz, CSV veya davet kodu, 2–4 hafta.
- **Connected:** Google/Microsoft SSO + otomatik sınıf listeleri.
- **Embedded:** LTI 1.3 ile LMS içinden Okurio kullanımı.

İlk okul için öneri: Pilot ile başla, aynı anda okulun Google/Microsoft ortamını keşfet; ikinci fazda SSO + roster, üçüncü fazda LTI veya ödev entegrasyonu.