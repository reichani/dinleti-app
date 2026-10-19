# Okurio Uzunluk Denetimi · 2026-10-18

Kaynak: scripts/optimize-content-length.mjs, politika src/content/lengthOptimizationPolicy.js. Eşik: her okuma yolu × evre için en az 3 rafta görünen tam okuma.

## Kapsama

| Yol | Evre | Raf | Kitap | İngilizce | Durum |
|---|---|---|---|---|---|
| okul_oncesi_3_4 | dinleme | 3 | 4 | 0 | OK |
| okumaya_hazirlik_5_6 | dinleme | 4 | 6 | 0 | OK |
| okumaya_hazirlik_5_6 | ses_harf | 1 | 3 | 0 | OK |
| ilk_harfler_6_7 | ses_harf | 3 | 3 | 0 | OK |
| ilk_harfler_6_7 | hece_kelime | 5 | 7 | 1 | OK |
| ilk_cumleler_7_8 | hece_kelime | 2 | 3 | 0 | OK |
| ilk_cumleler_7_8 | kisa_cumle | 5 | 6 | 1 | OK |
| okuma_guveni_8_10 | kisa_cumle | 4 | 4 | 1 | OK |
| okuma_guveni_8_10 | paragraf | 6 | 6 | 1 | OK |
| akici_okuma_10_12 | paragraf | 8 | 10 | 3 | OK |
| akici_okuma_10_12 | uzun_metin | 7 | 9 | 2 | OK |
| genc_okurlar_12_14 | paragraf | 3 | 3 | 0 | OK |
| genc_okurlar_12_14 | uzun_metin | 5 | 5 | 1 | OK |
| klasiklere_hazirlik_14_16 | uzun_metin | 3 | 4 | 1 | OK |
| klasiklere_hazirlik_14_16 | akademik_klasik | 3 | 4 | 1 | OK |
| lise_okuma_16_18 | uzun_metin | 3 | 4 | 0 | OK |
| lise_okuma_16_18 | akademik_klasik | 3 | 4 | 0 | OK |
| yetiskin_odak_18 | uzun_metin | 2 | 4 | 0 | OK |
| yetiskin_odak_18 | okumaya_donus | 2 | 4 | 0 | OK |

## Düzeltme gereken içerikler

| İçerik | Yaş | Kelime | Karar | Bulgular |
|---|---|---|---|---|
| okurio-1-grup-ses-bahcesi | 6-7 yaş | 601 | uzun | Toplam 601 kelime; ilk_harfler_6_7 için en çok 500. |
| okurio-lili-kayip-tohum-haritasi | 6-7 yaş | 606 | uzun | Toplam 606 kelime; ilk_harfler_6_7 için en çok 500. |
| oki-ses-a | 6-7 yaş | 26 | kisa | Toplam 26 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Sesi Dinle" 15 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Harf ve Hece" 11 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-ses-n | 6-7 yaş | 35 | kisa | Toplam 35 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Sesi Dinle" 16 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Heceye Geç" 19 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-heceler-1 | 6-7 yaş | 30 | kisa | Toplam 30 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Hece Kartları" 15 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Tekrar" 15 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-kelimeler-1 | 6-7 yaş | 23 | kisa | Toplam 23 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Kelime Kartları" 13 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Kısa Cümle" 10 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| ela-el-ele | 6-7 yaş | 29 | kisa | Toplam 29 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Mini Hikâye" 17 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Birlikte Tekrar" 12 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-ses-e | 6-7 yaş | 29 | kisa | Toplam 29 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Sesi Dinle" 16 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Harf ve Hece" 13 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-ses-t | 6-7 yaş | 33 | kisa | Toplam 33 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Sesi Dinle" 14 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Heceye Geç" 19 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-ses-i | 6-7 yaş | 27 | kisa | Toplam 27 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Sesi Dinle" 14 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Harf ve Hece" 13 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-ses-l | 6-7 yaş | 35 | kisa | Toplam 35 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Sesi Dinle" 14 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Heceye Geç" 21 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-heceler-2 | 6-7 yaş | 25 | kisa | Toplam 25 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Hece Kartları" 12 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Tekrar" 13 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-el-ele | 6-7 yaş | 25 | kisa | Toplam 25 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Mini Hikâye" 13 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Birlikte Tekrar" 12 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| mino-nerede | 6-7 yaş | 22 | kisa | Toplam 22 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Mini Hikâye" 13 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Birlikte Tekrar" 9 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| kurk-mantolu-madonna | 13+ yaş | 124 | kisa | Toplam 124 kelime; genc_okurlar_12_14 için en az 900. · Bölüm 1 "Birinci Bölüm" 23 kelime; en az 120. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "İkinci Bölüm" 18 kelime; en az 120. Komşu bölümle birleştir veya genişlet. · Bölüm 3 "Üçüncü Bölüm" 14 kelime; en az 120. Komşu bölümle birleştir veya genişlet. · Bölüm 4 "Dördüncü Bölüm" 18 kelime; en az 120. Komşu bölümle birleştir veya genişlet. · Bölüm 5 "Beşinci Bölüm" 18 kelime; en az 120. Komşu bölümle birleştir veya genişlet. · Bölüm 6 "Altıncı Bölüm" 17 kelime; en az 120. Komşu bölümle birleştir veya genişlet. · Bölüm 7 "Son Bölüm" 16 kelime; en az 120. Komşu bölümle birleştir veya genişlet. |
| calikusu | 12+ yaş | 86 | kisa | Toplam 86 kelime; genc_okurlar_12_14 için en az 900. · Bölüm 1 "Birinci Kısım" 17 kelime; en az 120. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "İkinci Kısım" 15 kelime; en az 120. Komşu bölümle birleştir veya genişlet. · Bölüm 3 "Üçüncü Kısım" 13 kelime; en az 120. Komşu bölümle birleştir veya genişlet. · Bölüm 4 "Dördüncü Kısım" 15 kelime; en az 120. Komşu bölümle birleştir veya genişlet. · Bölüm 5 "Beşinci Kısım" 12 kelime; en az 120. Komşu bölümle birleştir veya genişlet. · Bölüm 6 "Son Kısım" 14 kelime; en az 120. Komşu bölümle birleştir veya genişlet. |
| yuksek-okceler | 10+ yaş | 53 | kisa | Toplam 53 kelime; akici_okuma_10_12 için en az 700. · Bölüm 1 "Hikâyenin Başı" 19 kelime; en az 110. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Gelişme" 17 kelime; en az 110. Komşu bölümle birleştir veya genişlet. · Bölüm 3 "Son" 17 kelime; en az 110. Komşu bölümle birleştir veya genişlet. |
| diyet | 10+ yaş | 49 | kisa | Toplam 49 kelime; akici_okuma_10_12 için en az 700. · Bölüm 1 "Demirci Koca Ali" 16 kelime; en az 110. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "İftira" 16 kelime; en az 110. Komşu bölümle birleştir veya genişlet. · Bölüm 3 "Bedel" 17 kelime; en az 110. Komşu bölümle birleştir veya genişlet. |
| andersen-masallari | 8-10 yaş | 689 | pasaj-duzeltme | Bölüm 2 "Kibritçi Kız" 232 kelime; en çok 220. Anlam sınırında ikiye böl. · Bölüm 3 "Kralın Yeni Giysileri" 261 kelime; en çok 220. Anlam sınırında ikiye böl. |
| peter-rabbit-en | 7-12 yaş | 972 | pasaj-duzeltme | Bölüm 2 en uzun cümle 48 kelime; sınır 20. · Bölüm 3 en uzun cümle 25 kelime; sınır 20. · Bölüm 4 en uzun cümle 29 kelime; sınır 20. · Bölüm 5 en uzun cümle 26 kelime; sınır 20. · Bölüm 6 en uzun cümle 24 kelime; sınır 20. |
| fox-and-grapes-en | 8-10 yaş | 49 | kisa | Toplam 49 kelime; okuma_guveni_8_10 için en az 500. · Bölüm 1 "The Grapes" 25 kelime; en az 90. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "The Choice" 24 kelime; en az 90. Komşu bölümle birleştir veya genişlet. |
| lion-and-mouse-graded-en | 8-10 yaş | 45 | kisa | Toplam 45 kelime; okuma_guveni_8_10 için en az 500. · Bölüm 1 "The Little Mouse" 21 kelime; en az 90. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "The Net" 24 kelime; en az 90. Komşu bölümle birleştir veya genişlet. |
| alice-rabbit-hole-en | 10-12 yaş | 52 | kisa | Toplam 52 kelime; akici_okuma_10_12 için en az 700. · Bölüm 1 "A White Rabbit" 28 kelime; en az 110. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Down the Hole" 24 kelime; en az 110. Komşu bölümle birleştir veya genişlet. |
| oki-ayi-gordu | 6-8 yaş | 34 | kisa | Toplam 34 kelime; ilk_cumleler_7_8 için en az 350. · Bölüm 1 "Ay'a Bakıyorum" 19 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Birlikte Düşün" 15 kelime; en az 70. Komşu bölümle birleştir veya genişlet. |
| yildiz-mi-gezegen-mi | 8-10 yaş | 37 | kisa | Toplam 37 kelime; okuma_guveni_8_10 için en az 500. · Bölüm 1 "Parlayan Noktalar" 20 kelime; en az 90. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Küçük Bilgi" 17 kelime; en az 90. Komşu bölümle birleştir veya genişlet. |
| lili-ay-isigi | 5-8 yaş | 38 | kisa | Toplam 38 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Ay Işığı" 20 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Yol" 18 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-pegasus | 8-10 yaş | 54 | kisa | Toplam 54 kelime; okuma_guveni_8_10 için en az 500. · Bölüm 1 "Kanatlı At" 27 kelime; en az 90. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Cesaret" 27 kelime; en az 90. Komşu bölümle birleştir veya genişlet. |
| english-hello-card | 5-8 yaş | 18 | kisa | Toplam 18 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Hello" 9 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Please" 9 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| english-sky-words-card | 6-8 yaş | 26 | kisa | Toplam 26 kelime; ilk_cumleler_7_8 için en az 350. · Bölüm 1 "Sky Words" 12 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Look Up" 14 kelime; en az 70. Komşu bölümle birleştir veya genişlet. |
| english-colors-card | 6-8 yaş | 25 | kisa | Toplam 25 kelime; ilk_cumleler_7_8 için en az 350. · Bölüm 1 "Colors" 13 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "I See" 12 kelime; en az 70. Komşu bölümle birleştir veya genişlet. |
| toto-tak-tak-dedi | 3-5 yaş | 24 | kisa | Toplam 24 kelime; okul_oncesi_3_4 için en az 150. · Bölüm 1 "Tak Tak" 13 kelime; en az 40. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Ses Oyunu" 11 kelime; en az 40. Komşu bölümle birleştir veya genişlet. |
| nana-ritim-oyunu | 4-6 yaş | 25 | kisa | Toplam 25 kelime; okumaya_hazirlik_5_6 için en az 200. · Bölüm 1 "La La" 16 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Sıra Bende" 9 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-hop-hop | 5-7 yaş | 18 | kisa | Toplam 18 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Hop Hop" 10 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Top Nerede?" 8 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| oki-ay-siiri | 5-8 yaş | 26 | kisa | Toplam 26 kelime; ilk_harfler_6_7 için en az 250. · Bölüm 1 "Ay" 12 kelime; en az 50. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Sessiz Işık" 14 kelime; en az 50. Komşu bölümle birleştir veya genişlet. |
| yagmur-tip-tip-siiri | 6-8 yaş | 23 | kisa | Toplam 23 kelime; ilk_cumleler_7_8 için en az 350. · Bölüm 1 "Tıp Tıp" 12 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Pıt Pıt" 11 kelime; en az 70. Komşu bölümle birleştir veya genişlet. |
| gokyuzu-siiri | 8-10 yaş | 36 | kisa | Toplam 36 kelime; okuma_guveni_8_10 için en az 500. · Bölüm 1 "Yukarı Bak" 18 kelime; en az 90. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Yıldız Defteri" 18 kelime; en az 90. Komşu bölümle birleştir veya genişlet. |
| ay-bilmecesi | 6-9 yaş | 20 | kisa | Toplam 20 kelime; ilk_cumleler_7_8 için en az 350. · Bölüm 1 "Kimim Ben?" 12 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Cevap" 8 kelime; en az 70. Komşu bölümle birleştir veya genişlet. |
| yildiz-bilmecesi | 7-10 yaş | 22 | kisa | Toplam 22 kelime; okuma_guveni_8_10 için en az 500. · Bölüm 1 "Uzak Işık" 11 kelime; en az 90. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Cevap" 11 kelime; en az 90. Komşu bölümle birleştir veya genişlet. |
| tohum-bilmecesi | 8-10 yaş | 27 | kisa | Toplam 27 kelime; okuma_guveni_8_10 için en az 500. · Bölüm 1 "Küçük Başlangıç" 15 kelime; en az 90. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Cevap" 12 kelime; en az 90. Komşu bölümle birleştir veya genişlet. |
| mino-nerede-sahnesi | 6-8 yaş | 364 | pasaj-duzeltme | Bölüm 1 "Sahne 1 — Saklambaç Başlıyor" 45 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Sahne 2 — Oki Bahçeye Baktı" 37 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 3 "Sahne 3 — İpucu Bulundu" 37 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 4 "Sahne 4 — Sıra Bende" 44 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 5 "Sahne 5 — Yeni Saklanma Yeri" 54 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 6 "Sahne 6 — Herkes Bir Arada" 67 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 7 en uzun cümle 17 kelime; sınır 14. |
| little-star-poem-en | 6-8 yaş | 30 | kisa | Toplam 30 kelime; ilk_cumleler_7_8 için en az 350. · Bölüm 1 "Star" 15 kelime; en az 70. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Night" 15 kelime; en az 70. Komşu bölümle birleştir veya genişlet. |
| moon-poem-en | 8-10 yaş | 36 | kisa | Toplam 36 kelime; okuma_guveni_8_10 için en az 500. · Bölüm 1 "Moon" 22 kelime; en az 90. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Look" 14 kelime; en az 90. Komşu bölümle birleştir veya genişlet. |
| space-poem-en | 10-12 yaş | 39 | kisa | Toplam 39 kelime; akici_okuma_10_12 için en az 700. · Bölüm 1 "Question" 25 kelime; en az 110. Komşu bölümle birleştir veya genişlet. · Bölüm 2 "Answer" 14 kelime; en az 110. Komşu bölümle birleştir veya genişlet. |
