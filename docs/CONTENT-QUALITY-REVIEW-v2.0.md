# Okurio Content Quality Review v2.0

## Amaç

İnsan içerik doğrulaması çalışan aday ortamında yapılır. Aday deploy teknik ve yapısal doğrulama tamamlandığında açılabilir; bu durum içeriğin production yayınına onaylandığı anlamına gelmez.

## İki ayrı kapı

- `candidateDeployReady`: Şema ve okuma yolu tanımlıdır. İnsan incelemesi `pending` olabilir.
- `publicationReady`: İnsan incelemesi `approved`; inceleyen kişi, tarih, incelenen commit, somut notlar, genel checklist ve okuma-yolu checklist'i eksiksizdir.

AI veya otomasyon `reviewerName`, `reviewedAt`, `reviewedCommit` dolduramaz ve `status=approved` yazamaz.

## Durumlar

- `pending`
- `approved`
- `changes_requested`
- `rejected`

Eski `pending-human-review` değeri ve kanıtsız `approved` kayıtları güvenli biçimde `pending` olarak değerlendirilir.

## Okuma yolu kapsamı

On evrenin her biri kendi yol kriterlerine sahiptir. Genel anlatı, yaş, bölüm, karakter, dil, doğruluk, özgünlük/hak ve erişilebilirlik kontrolleri bütün yollarda korunur. Yol checklist'i dinleme, ses-harf, hece, kısa cümle, paragraf, uzun-form, klasik, lise ve yetişkin okuma ihtiyaçlarını ayrı ayrı doğrular.

## Deploy sonrası insan doğrulaması

1. Branch preview deploy edilir.
2. İnceleyen kişi gerçek metni mobil/tablet/desktop ve uygun okuma modunda açar.
3. Genel ve yol-bazlı checklist doldurulur.
4. `reviewedCommit`, preview'un `release.json` commit değeriyle aynı olmalıdır.
5. Somut `reviewNotes` ve inceleyen kişinin gerçek adı kaydedilir.
6. Ancak bundan sonra `publicationReady=true` olabilir ve production merge değerlendirilir.
