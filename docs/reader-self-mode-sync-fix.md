# Kendim Okuyorum konum senkronizasyonu

## Kök neden

`Kendim Okuyorum` modunda ses kapalı olduğu için Web Speech `boundary` olayları oluşmuyordu. Oynatıcı zamanı ilerliyor ancak `kelimeIx` güncellenmediğinden ilk kelime ve ilk cümle ekranda sabit kalıyordu. Scroll katmanı doğru çalışsa bile takip edeceği aktif kelime değişmiyordu.

## Düzeltme

Tarayıcıdaki geçen/kalan süre değişimi ortak ilerleme çubuğuna geri uygulanır. Bu, mevcut `vurguHizala` yolunu tetikleyerek kelime ve cümle konumunu ses olmadan da günceller. Yalnız Kendim Okuyorum modu çalışırken devrededir.

## Kabul

- 20 saniye sonra ilk kelime aktif kalmamalı.
- Cümle odağı metin boyunca ilerlemeli.
- Pause durumunda konum değişmemeli.
- İleri/geri sarma mevcut hizalama yolunu kullanmalı.
