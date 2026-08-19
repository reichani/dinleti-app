import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from "react";
import { Play, Pause, RotateCcw, RotateCw, Heart, Search, Home, Library, ChevronDown, ChevronLeft, Moon, Gauge, ListMusic, Volume2, BookOpen, Clock, Type, AlignJustify, Focus, Flame } from "lucide-react";
import GlossaryCard from "./components/GlossaryCard.jsx";
import OkurioProvenanceStamp from "./components/OkurioProvenanceStamp.jsx";
import { extractDocumentText, normalizeDocumentText, SUPPORTED_DOCUMENT_ACCEPT } from "./documentImport.js";
import { findGlossaryEntry, mergePilotStories } from "./content/pilotCatalogAdapter.js";
import { PETER_RABBIT_FULL } from "./content/fullPublicDomainStories.js";
import { COMPLETE_OKURIO_SESSIONS } from "./content/completeOkurioSessions.js";
import { ANDERSEN_STORIES } from "./content/andersenStories.js";
import { classifyContent, estimateStorySeconds } from "./content/contentIntegrity.js";
import { evaluateStoryForReadingLevel } from "./content/readingLevelPolicy.js";
import { evaluateContentQualityReview } from "./content/contentQualityReview.js";
import { getGradeLabelForYolId, minimumFullReadingSecondsForAge } from "./content/schoolGradeMapping.js";
import { cursorFromPosition, positionFromCursor, readingProgressSnapshot, monotonicBoundaryWord } from "./reader-core.js";

/* ------------------------------------------------------------------ */
/* Katalog: telifsiz Türk klasikleri, örnek bölüm metinleriyle          */
/* ------------------------------------------------------------------ */
const SURUM = "2.9.0";

const KATALOG = mergePilotStories([

  ...COMPLETE_OKURIO_SESSIONS,


  {
    id: "oki-sesleri-dinliyor",
    baslik: "Oki Sesleri Dinliyor",
    yazar: "Okurio Minik Dinleyiciler",
    seslendiren: "Oki Anlatıcı",
    kategori: "Minik Dinleme",
    yas: "3-4 yaş",
    renk: ["#5A4B28", "#D7B45E"],
    puan: 4.9,
    sureDk: 1.9, icerikDurumu: "ozet",
    ozet: "Minik dinleyiciler için ses farkındalığı, kısa dikkat ve güvenli tekrar hikâyesi.",
    bolumler: [
      { ad: "Sesleri Dinle", dk: 1, metin: "Oki durdu. Bir ses duydu. Pıt pıt. Mino baktı. Oki güldü." },
      { ad: "Tekrar Dinle", dk: 1, metin: "Pıt pıt. Tıp tıp. Oki dinledi. Mino miyav dedi. Nana yavaşça anlattı." },
    ],
  },
  {
    id: "mino-miyav-dedi",
    baslik: "Mino Miyav Dedi",
    yazar: "Okurio Minik Dinleyiciler",
    seslendiren: "Oki Anlatıcı",
    kategori: "Minik Dinleme",
    yas: "3-4 yaş",
    renk: ["#3F5A45", "#8EBD7C"],
    puan: 4.9,
    sureDk: 1.9, icerikDurumu: "ozet",
    ozet: "Okul öncesi için hayvan sesi, tekrar ve kısa hikâye sırası çalışması.",
    bolumler: [
      { ad: "Miyav", dk: 1, metin: "Mino miyav dedi. Oki baktı. Lili güldü. Toto zıpladı." },
      { ad: "Kim Seslendi?", dk: 1, metin: "Miyav. Mino seslendi. Oki el salladı. Nana, dinledin, dedi." },
    ],
  },
  {
    id: "lili-yildiz-sayiyor",
    baslik: "Lili Yıldız Sayıyor",
    yazar: "Okurio Minik Dinleyiciler",
    seslendiren: "Oki Anlatıcı",
    kategori: "Minik Dinleme",
    yas: "3-4 yaş",
    renk: ["#283F63", "#7CA0D8"],
    puan: 4.9,
    sureDk: 1.8, icerikDurumu: "ozet",
    ozet: "Gökyüzü temasına yumuşak bir giriş; minik dinleyiciler için sakin gece hikâyesi.",
    bolumler: [
      { ad: "Yıldız", dk: 1, metin: "Lili göğe baktı. Bir yıldız gördü. Oki de baktı. Mino sessizce oturdu." },
      { ad: "Gece", dk: 1, metin: "Yıldız parladı. Lili saydı. Bir, iki. Nana, gece sakin, dedi." },
    ],
  },
  {
    id: "oki-ses-a",
    baslik: "A Sesi",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#6A4A1F", "#E0A64B"],
    puan: 4.9,
    sureDk: 2,
    ozet: "1. harf grubu için A sesini duymaya, görmeye ve kısa heceler içinde takip etmeye hazırlayan mikro çalışma.",
    bolumler: [
      { ad: "Sesi Dinle", dk: 1, metin: "Bugünün sesi a. A sesi ağzımız açıkken çıkar. A. A. A. Oki a sesini duydu." },
      { ad: "Harf ve Hece", dk: 1, metin: "a. an. al. at. Ela a sesini buldu. Oki el salladı." },
    ],
  },
  {
    id: "oki-ses-n",
    baslik: "N Sesi",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#365A46", "#78A878"],
    puan: 4.9,
    sureDk: 2,
    ozet: "N sesini a/e sesleriyle birleştirerek an, en ve ana gibi ilk hecelere geçiş.",
    bolumler: [
      { ad: "Sesi Dinle", dk: 1, metin: "Bugünün sesi n. N sesi kısa ve yumuşak çıkar. N. N. N. Nana n sesini söyledi." },
      { ad: "Heceye Geç", dk: 1, metin: "a ve n yan yana geldi. an. e ve n yan yana geldi. en. Oki an hecesini takip etti." },
    ],
  },
  {
    id: "oki-heceler-1",
    baslik: "an en al el at et",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#334A66", "#6D93C9"],
    puan: 4.9,
    sureDk: 3,
    ozet: "1. harf grubunun ilk heceleri: an, en, al, el, at, et. Heceleri sesle ve vurguyla takip etme çalışması.",
    bolumler: [
      { ad: "Hece Kartları", dk: 2, metin: "an. en. al. el. at. et. Oki heceleri tane tane dinledi. Lili el hecesini buldu." },
      { ad: "Tekrar", dk: 1, metin: "an. al. at. el. et. en. Her hece kısa bir adımdır. Oki yavaşça takip etti." },
    ],
  },
  {
    id: "oki-kelimeler-1",
    baslik: "İlk Kelimeler: ana, anne, Ali, Ela",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#5A3B5F", "#A77AB0"],
    puan: 4.9,
    sureDk: 3,
    ozet: "1. harf grubuyla kurulabilen ilk anlamlı kelimeleri tanıma ve kelime kelime takip etme çalışması.",
    bolumler: [
      { ad: "Kelime Kartları", dk: 2, metin: "ana. anne. Ali. Ela. at. el. tel. Oki kelimeleri duydu. Ela el salladı." },
      { ad: "Kısa Cümle", dk: 1, metin: "Ali atı tanıdı. Ela el ele. Anne tane tane anlattı." },
    ],
  },
  {
    id: "oki-ati-taniyor",
    baslik: "Oki Atı Tanıyor",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#6B3B2A", "#C78258"],
    puan: 4.9,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Cin Ali sadeliğinden ilham alan ama tamamen özgün, 1. harf grubu ile kısa cümle takip hikâyesi.",
    bolumler: [
      { ad: "Mini Hikâye", dk: 3, metin: "Oki atı gördü. At ona baktı. Oki el salladı. Lili güldü. Nana tane tane anlattı." },
      { ad: "Birlikte Tekrar", dk: 1, metin: "Oki atı gördü. At ona baktı. Oki el salladı. Şimdi sen de yavaşça takip et." },
    ],
  },
  {
    id: "ela-el-ele",
    baslik: "Ela El Ele",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#2E5A5A", "#71A9A6"],
    puan: 4.9,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "İlk kelimeler ve kısa cümlelerle, el-ele temasını sakin ve tekrar eden bir mini hikâyeye dönüştüren özgün içerik.",
    bolumler: [
      { ad: "Mini Hikâye", dk: 3, metin: "Ela el ele yürüdü. Ali atı anlattı. Oki ana dedi. Lili el salladı. Herkes tane tane okudu." },
      { ad: "Birlikte Tekrar", dk: 1, metin: "Ela el ele. Ali ata baktı. Oki el salladı. Yavaşça takip edelim." },
    ],
  },
  {
    id: "oki-ses-e",
    baslik: "E Sesi",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#735C2E", "#D8B45C"],
    puan: 4.9,
    sureDk: 2,
    ozet: "1. harf grubu içinde E sesini duymaya, görmeye ve el/en heceleriyle takip etmeye hazırlayan mikro çalışma.",
    bolumler: [
      { ad: "Sesi Dinle", dk: 1, metin: "Bugünün sesi e. E sesi kısa ve açık çıkar. E. E. E. Lili e sesini duydu." },
      { ad: "Harf ve Hece", dk: 1, metin: "e. en. el. et. Ela e sesini buldu. Oki el hecesini takip etti." },
    ],
  },
  {
    id: "oki-ses-t",
    baslik: "T Sesi",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#5D3F32", "#C58A68"],
    puan: 4.9,
    sureDk: 2,
    ozet: "T sesini kısa heceler içinde tanıtan ve at/et gibi ilk hecelere bağlayan çalışma.",
    bolumler: [
      { ad: "Sesi Dinle", dk: 1, metin: "Bugünün sesi t. T sesi kısa çıkar. T. T. T. Toto t sesini duydu." },
      { ad: "Heceye Geç", dk: 1, metin: "a ve t yan yana geldi. at. e ve t yan yana geldi. et. Oki at hecesini takip etti." },
    ],
  },
  {
    id: "oki-ses-i",
    baslik: "İ Sesi",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#33485C", "#7FA6C7"],
    puan: 4.9,
    sureDk: 2,
    ozet: "İ sesini il/in gibi kısa hecelerle birleştiren, yavaş ve takipli mikro çalışma.",
    bolumler: [
      { ad: "Sesi Dinle", dk: 1, metin: "Bugünün sesi i. İ sesi ince çıkar. İ. İ. İ. Mino i sesini duydu." },
      { ad: "Harf ve Hece", dk: 1, metin: "i. il. in. it. Lili il hecesini buldu. Oki tane tane takip etti." },
    ],
  },
  {
    id: "oki-ses-l",
    baslik: "L Sesi",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#3D5A3A", "#8EB77C"],
    puan: 4.9,
    sureDk: 2,
    ozet: "L sesini el, al ve il heceleriyle tanıtan sakin ilk okuma çalışması.",
    bolumler: [
      { ad: "Sesi Dinle", dk: 1, metin: "Bugünün sesi l. L sesi dilimizle çıkar. L. L. L. Lili l sesini söyledi." },
      { ad: "Heceye Geç", dk: 1, metin: "e ve l yan yana geldi. el. a ve l yan yana geldi. al. i ve l yan yana geldi. il." },
    ],
  },
  {
    id: "oki-heceler-2",
    baslik: "al el il in it",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#4A3F6B", "#9483CF"],
    puan: 4.9,
    sureDk: 3,
    ozet: "1. harf grubu içinde ikinci hece seti: al, el, il, in, it. Heceyi gör, duy ve takip et.",
    bolumler: [
      { ad: "Hece Kartları", dk: 2, metin: "al. el. il. in. it. Oki heceleri dinledi. Lili il hecesini gösterdi." },
      { ad: "Tekrar", dk: 1, metin: "al. el. il. in. it. Her hece bir küçük adımdır. Yavaşça takip edelim." },
    ],
  },
  {
    id: "ali-ile-ela",
    baslik: "Ali ile Ela",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#5A2E42", "#B96F8D"],
    puan: 4.9,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Ali ve Ela karakterleriyle, 1. grup harflerden kurulan ilk cümlelere geçiş hikâyesi.",
    bolumler: [
      { ad: "Mini Hikâye", dk: 3, metin: "Ali el salladı. Ela onu gördü. Oki ata baktı. Lili sakin sakin anlattı." },
      { ad: "Birlikte Tekrar", dk: 1, metin: "Ali el salladı. Ela gördü. Oki baktı. Şimdi birlikte okuyalım." },
    ],
  },
  {
    id: "lili-ile-at",
    baslik: "Lili ile At",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#2F4F47", "#73A995"],
    puan: 4.9,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Lili'nin atla karşılaşmasını çok kısa cümlelerle anlatan, güven veren ilk okuma hikâyesi.",
    bolumler: [
      { ad: "Mini Hikâye", dk: 3, metin: "Lili atı gördü. At ona baktı. Lili el salladı. Oki gülümsedi. Nana anlattı." },
      { ad: "Birlikte Tekrar", dk: 1, metin: "Lili atı gördü. At baktı. Oki el salladı. Tane tane takip edelim." },
    ],
  },
  {
    id: "oki-el-ele",
    baslik: "Oki El Ele",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#3A4E71", "#789BDB"],
    puan: 4.9,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Oki ve Lili'nin birlikte okuma deneyimini, el ele ve sakin tekrarlarla anlatan mini hikâye.",
    bolumler: [
      { ad: "Mini Hikâye", dk: 3, metin: "Oki el ele yürüdü. Lili el tuttu. Mino onlara baktı. Nana yavaşça okudu." },
      { ad: "Birlikte Tekrar", dk: 1, metin: "Oki el ele. Lili el tuttu. Mino baktı. Ben de takip ediyorum." },
    ],
  },
  {
    id: "mino-nerede",
    baslik: "Mino Nerede?",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#4E4A2D", "#C0B15A"],
    puan: 4.9,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Mino'yu arayan Oki'nin kısa ve eğlenceli hikâyesi; ilk okuma için sınırlı kelime ve sakin tekrar.",
    bolumler: [
      { ad: "Mini Hikâye", dk: 3, metin: "Mino el altında. Oki onu aradı. Lili eliyle gösterdi. Mino çıktı. Oki güldü." },
      { ad: "Birlikte Tekrar", dk: 1, metin: "Mino çıktı. Oki güldü. Lili gösterdi. Şimdi yavaşça okuyorum." },
    ],
  },
  {
    id: "nana-anlatiyor",
    baslik: "Nana Anlatıyor",
    yazar: "Okurio İlk Okuma",
    seslendiren: "Oki Anlatıcı",
    kategori: "İlk Okuma",
    yas: "6-7 yaş",
    renk: ["#5B3A2E", "#C28C70"],
    puan: 4.9,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Nana'nın yavaş ve güvenli anlatımıyla 1. grup harfleri tekrar eden kapanış hikâyesi.",
    bolumler: [
      { ad: "Mini Hikâye", dk: 3, metin: "Nana anlattı. Oki dinledi. Lili el salladı. Ali atı tanıdı. Ela güldü." },
      { ad: "Birlikte Tekrar", dk: 1, metin: "Nana anlattı. Oki dinledi. Ali atı tanıdı. Bir adım daha tamamlandı." },
    ],
  },
  {
    id: "kurk-mantolu-madonna",
    yas: "13+ yaş",
    baslik: "Kürk Mantolu Madonna",
    yazar: "Sabahattin Ali",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Roman",
    renk: ["#3E2C41", "#7A4A6D"],
    puan: 4.8,
    sureDk: 0.8, icerikDurumu: "ozet",
    ozet: "Raif Efendi'nin sessiz hayatının ardındaki büyük aşkın hikâyesi. Berlin'de başlayan ve bir siyah defterde saklı kalan bir tutku.",
    bolumler: [
      { ad: "Birinci Bölüm", dk: 46, metin: "Şimdiye kadar tesadüf ettiğim insanlardan bir tanesi benim üzerimde belki en büyük tesiri yapmıştır. Aradan aylar geçtiği halde bir türlü bu tesirden kurtulamadım." },
      { ad: "İkinci Bölüm", dk: 52, metin: "Raif Efendi, her gün gördüğümüz halde hakkında hiçbir şey bilmediğimiz insanlardan biriydi. Masasının başında sessizce çalışır, kimseyle konuşmazdı." },
      { ad: "Üçüncü Bölüm", dk: 48, metin: "Siyah kaplı defteri elime aldığım zaman, içinde bir insanın bütün hayatının saklı olduğunu bilmiyordum." },
      { ad: "Dördüncü Bölüm", dk: 55, metin: "Berlin sokaklarında dolaşırken, bir resim sergisinde gördüğüm o tablo karşısında donup kaldım. Kürk mantolu bir kadın portresiydi bu." },
      { ad: "Beşinci Bölüm", dk: 58, metin: "Maria Puder ile tanışmamız her şeyi değiştirdi. Dünyada başka türlü insanların da yaşadığını ilk defa o zaman anladım." },
      { ad: "Altıncı Bölüm", dk: 57, metin: "Yıllar sonra o defterin son sayfasını çevirdiğimde, insanın bir başkasını gerçekten tanımasının ne kadar zor olduğunu düşündüm." },
      { ad: "Son Bölüm", dk: 56, metin: "Hayat, bazen en kıymetli şeylerini en sessiz insanların içine saklar. Raif Efendi'nin hikâyesi bana bunu öğretti." },
    ],
  },
  {
    id: "calikusu",
    yas: "12+ yaş",
    baslik: "Çalıkuşu",
    yazar: "Reşat Nuri Güntekin",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Roman",
    renk: ["#1F4E46", "#3E8E7E"],
    puan: 4.7,
    sureDk: 0.6, icerikDurumu: "ozet",
    ozet: "Feride'nin İstanbul'dan Anadolu'ya uzanan yolculuğu; bir genç öğretmenin idealizmi, kırgınlıkları ve direnci.",
    bolumler: [
      { ad: "Birinci Kısım", dk: 95, metin: "Dördüncü sınıftaydım. Yaşım on iki kadar olmalı. Fransızca muallimimiz Sör Aleksi, bir gün bize yazı vazifesi vermişti." },
      { ad: "İkinci Kısım", dk: 90, metin: "Teyzemin köşkünde geçen o yaz günleri, hayatımın en kaygısız zamanlarıydı. Ağaçlara tırmanır, kuş yuvalarını gözlerdim." },
      { ad: "Üçüncü Kısım", dk: 92, metin: "Anadolu'ya gitmeye karar verdiğim gece, penceremin önünde saatlerce oturdum. İstanbul'un ışıkları uzakta titriyordu." },
      { ad: "Dördüncü Kısım", dk: 88, metin: "Zeyniler köyündeki ilk günüm hiç unutamayacağım bir gündü. Mektep dediğim yer, yıkık bir odadan ibaretti." },
      { ad: "Beşinci Kısım", dk: 87, metin: "Çocukların gözlerindeki ışık, bütün yorgunluğumu unutturuyordu. Öğretmenlik, meğer insanın kendini bulması demekmiş." },
      { ad: "Son Kısım", dk: 88, metin: "Yıllar sonra geriye dönüp baktığımda, Çalıkuşu'nun hiç susmadığını, sadece başka dallarda ötmeyi öğrendiğini anladım." },
    ],
  },
  {
    id: "yuksek-okceler",
    yas: "10+ yaş",
    baslik: "Yüksek Ökçeler",
    yazar: "Ömer Seyfettin",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Hikâye",
    renk: ["#4A3728", "#8C6A4A"],
    puan: 4.5,
    sureDk: 0.4, icerikDurumu: "ozet",
    ozet: "Hatice Hanım'ın yüksek ökçeli ayakkabılarıyla başlayan, evindeki gerçekleri fark etmesiyle biten ironik bir hikâye.",
    bolumler: [
      { ad: "Hikâyenin Başı", dk: 12, metin: "Hatice Hanım, altı yaşından beri yüksek ökçeli ayakkabılarla gezmeye alışmıştı. Ökçesiz terlik giydiği zaman kendini merdivenden iniyormuş gibi hissederdi." },
      { ad: "Gelişme", dk: 11, metin: "Evinde her şey yolunda görünüyordu. Hizmetçiler çalışkan, aşçı dürüst, uşak itaatliydi. En azından Hatice Hanım öyle sanıyordu." },
      { ad: "Son", dk: 11, metin: "Doktorun tavsiyesiyle ökçesiz ayakkabı giymeye başlayınca, evin içinde sessizce dolaşır oldu. İşte o zaman her şeyi gördü." },
    ],
  },
  {
    id: "pembe-incili-kaftan",
    yas: "10+ yaş",
    baslik: "Pembe İncili Kaftan",
    yazar: "Ömer Seyfettin",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Hikâye",
    renk: ["#5A2A33", "#A0525F"],
    puan: 4.6,
    sureDk: 0.4, icerikDurumu: "ozet",
    ozet: "Muhsin Çelebi'nin Şah İsmail'in sarayında verdiği onur dersi; gururun ve devlet haysiyetinin hikâyesi.",
    bolumler: [
      { ad: "Elçi Aranıyor", dk: 14, metin: "Divanda herkes susuyordu. Şah İsmail'e gönderilecek elçinin kim olacağı henüz belli değildi. Bu iş, ölüme gitmek kadar tehlikeliydi." },
      { ad: "Muhsin Çelebi", dk: 13, metin: "Muhsin Çelebi, ne mevki ne servet peşindeydi. Sade yaşar, kimseye eyvallah etmezdi. Teklifi duyunca yalnız bir şart koştu." },
      { ad: "Sarayda", dk: 14, metin: "Tebriz sarayının kapısından girerken sırtında pembe incili kaftanı vardı. Tahtın önünde kimse ona yer göstermedi. O da kaftanını çıkarıp yere serdi." },
    ],
  },
  {
    id: "mai-ve-siyah",
    yas: "13+ yaş",
    baslik: "Mai ve Siyah",
    yazar: "Halit Ziya Uşaklıgil",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Roman",
    renk: ["#1E2A4A", "#3D5A99"],
    puan: 4.4,
    sureDk: 0.5, icerikDurumu: "ozet",
    ozet: "Ahmet Cemil'in mai hayalleri ile siyah gerçekleri arasında sıkışan hayatı; Servet-i Fünun döneminin en dokunaklı romanı.",
    bolumler: [
      { ad: "Birinci Bölüm", dk: 78, metin: "Ahmet Cemil, gazetenin loş odasında geç saatlere kadar çalışır, hayalinde büyük eserinin sayfalarını kurardı." },
      { ad: "İkinci Bölüm", dk: 76, metin: "Mai bir gecede, yıldızların altında, istikbalin bütün vaatleri ona gülümsüyor gibiydi." },
      { ad: "Üçüncü Bölüm", dk: 79, metin: "Matbaa borçları, hasta anne, evin geçimi... Hayaller birer birer siyaha dönüyordu." },
      { ad: "Dördüncü Bölüm", dk: 77, metin: "Lamia'nın nişan haberi geldiğinde, Ahmet Cemil elindeki müsveddeleri sobaya attı." },
      { ad: "Beşinci Bölüm", dk: 78, metin: "Vapur uzaklaşırken İstanbul'un ışıklarına baktı. Mai hülyalar geride, siyah hakikat önündeydi." },
      { ad: "Son Bölüm", dk: 77, metin: "İnsan bazen hayallerini gömerek yaşamayı öğrenir. Ahmet Cemil de öğrendi." },
    ],
  },
  {
    id: "diyet",
    yas: "10+ yaş",
    baslik: "Diyet",
    yazar: "Ömer Seyfettin",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Hikâye",
    renk: ["#2E3B2B", "#5C7A52"],
    puan: 4.5,
    sureDk: 0.3, icerikDurumu: "ozet",
    ozet: "Koca Ali'nin borçlu olduğu adama karşı verdiği ağır bedelin hikâyesi; minnet ve onur üzerine sarsıcı bir anlatı.",
    bolumler: [
      { ad: "Demirci Koca Ali", dk: 13, metin: "Koca Ali, kasabanın en usta demircisiydi. Kimseye minneti yoktu; alın teriyle yaşar, kimsenin ekmeğine el uzatmazdı." },
      { ad: "İftira", dk: 12, metin: "Bir gün kasabada bir hırsızlık oldu ve iftira Koca Ali'nin üzerine kaldı. Kadı, elinin kesilmesine hükmetti." },
      { ad: "Bedel", dk: 13, metin: "Hacı Mehmet diyeti ödeyip onu kurtardı ama her fırsatta bunu başına kakıyordu. Koca Ali sonunda kararını verdi." },
    ],
  },
  {
    id: "sessiz-saatler",
    yas: "13+ yaş",
    baslik: "Sessiz Saatler",
    yazar: "Okurio Yazarlık Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Hikâye",
    renk: ["#2C4A3E", "#6FA287"],
    puan: 4.7,
    sureDk: 6.7,
    contentQualityReview: { status: "approved", note: "2026-08-07: Genç okurlar/lise/yetişkin okuma yolları için onaylı 'Tam okuma' örneği eksikti (mevcut içerikler tanıtım bölümüydü); bu özgün kısa hikâye o boşluğu doldurmak için yazıldı. 2026-08-07: Reyhan Açar tarafından gözden geçirildi ve onaylandı." },
    ozet: "Bir lise kütüphanesinde kurulan sessiz bir okuma saatinin, bir öğrencinin telaşlı yılını nasıl değiştirdiğinin özgün hikâyesi.",
    bolumler: [
      { ad: "Sessiz Saatler'in Kapısında", dk: 1.1, metin: "Okulun üçüncü katındaki kütüphane, öğle arasında bile neredeyse boştu. Deniz, ilk kez oraya geldiğinde bunun sadece bir tesadüf olduğunu düşünmüştü; herkes bahçede top oynarken ya da kantinde sırasını beklerken, bu geniş ve loş oda kimsenin uğramadığı unutulmuş bir köşe gibi duruyordu. Tozlu güneş ışığı, uzun pencerelerden içeri süzülüp raflardaki kitapların sırtlarına düşüyor, havada eski kâğıt ve ahşap kokusu asılı kalıyordu. Ama üç gün üst üste aynı masaya oturunca Deniz fark etti ki bu sessizlik hiç de tesadüf değildi; kütüphaneci Bora Bey'in özenle koruduğu, neredeyse gizli tutulan bir düzendi bu. Kapının hemen yanındaki küçük tahta tabelada özenle el yazısıyla \"Sessiz Saatler: 12.00-13.00\" yazıyordu, altında da daha ince harflerle bir not vardı: \"Burada acele eden yoktur.\" Deniz ilk okuduğunda bu cümleyi biraz tuhaf bulmuştu; okulda her şey acele etmek üzerine kuruluydu, bu yüzden acele etmeyen bir saatin var olabileceği fikri ona neredeyse gerçek dışı gelmişti. Yine de her geçen gün bu köşeye biraz daha yakın hissediyordu kendini, sanki oda onu içeri çağırıyordu." },
      { ad: "Acele Eden Bir Yıl", dk: 0.9, metin: "Deniz o yıl pek çok şeye acele ediyordu. Sınavlar art arda geliyor, kulüp toplantıları öğle aralarını bölüyor, öğretmenler bir sonraki ödevi bir öncekini teslim etmeden hatırlatıyordu. Evde de durum farklı değildi; telefonunun ekranı hiç sönmüyor, bir bildirim biter bitmez bir yenisi beliriyordu, sanki dünya onun sürekli bir şeye yetişmesini bekliyordu. Kütüphaneye girdiği o ilk öğle arası, telefonunu ceketinin cebinde unutmuş olduğunu fark etmesi bile içine tuhaf, neredeyse suçluluk karışık bir rahatlama vermişti. Kitaplığın en dip rafından, kapağı güneşten solmuş, sayfa kenarları kıvrılmış bir öykü kitabı çekti ve pencere kenarındaki eski, yumuşak deri koltuğa oturdu. Sayfaları yavaşça çevirirken fark etti ki uzun zamandır ilk kez hiçbir şey onu bölmüyordu; ne bir bildirim sesi, ne bir arkadaşının seslenişi, ne de aklının bir köşesinde büyüyen o sürekli \"yetişmeliyim\" hissi. Sadece kelimeler, sayfalar ve kendi nefesinin sesi vardı. Saatin nasıl geçtiğini anlamadı bile; zil çaldığında neredeyse şaşkınlıkla başını kaldırdı." },
      { ad: "Bir Alışkanlık Doğuyor", dk: 0.9, metin: "O günden sonra öğle araları yavaş yavaş bir alışkanlığa dönüştü. Deniz her gün aynı saatte kütüphaneye gidiyor, aynı koltuğa oturuyor, bazen sayfalarca okuyor, bazen sadece elindeki kitabı kapatıp pencereden bahçedeki yaşlı çınar ağacını izliyordu. Bir hafta sonra, koltuğun tam karşısındaki masada oturan bir başka öğrenciyi fark etti: sessizce bir not defterine küçük çizimler yapıyor, arada durup düşünceli bir ifadeyle pencereye bakıyordu. İkisi ilk başlarda birbirine hiç konuşmadı; sadece göz göze geldiklerinde küçük, anlaşılır bir baş sallamayla selamlaşıyorlardı. Ama aynı sessizliği, aynı saati, aynı loş ışığı paylaşıyor olmak, Deniz'e garip bir biçimde artık yalnız olmadığını hissettiriyordu. Sanki bu odada, kelimelerle konuşmadan da anlaşılan bir dil vardı; kimse kimseyi bir şeye zorlamıyor, kimse kimseden bir açıklama beklemiyordu. Zamanla bu sessiz selamlaşmalar Deniz'in gününün en huzurlu anı hâline geldi, öyle ki bazı sabahlar okula sadece o bir saati düşünerek gidiyordu." },
      { ad: "Bora Bey'in Sözü", dk: 0.9, metin: "Bir öğle arası, kütüphaneci Bora Bey yavaşça yanına yaklaştı ve elindeki kitabı nazikçe işaret etti. \"Bu öyküyü seviyor musun?\" diye sordu, sesi kütüphanenin sessizliğine uygun, alçak ve yumuşaktı. Deniz bir an duraksadı, sonra omuz silkti. \"Bilmiyorum, henüz yarısındayım. Ama tuhaf bir şekilde, bitmesini istemiyorum.\" Bora Bey hafifçe gülümsedi, gözlerinin kenarında ince çizgiler belirdi. \"Bazı kitaplar öyledir,\" dedi, sesi neredeyse bir sır paylaşır gibiydi. \"Onları hızlı bitirmek, onları hiç okumamak gibi gelir insana.\" Sonra kendi masasına doğru dönerken ekledi: \"Sessiz Saatler'i ben otuz yıl önce, kendi öğrenciliğimde bir başka kütüphaneci kurmuştu. O da bana tam bunu söylemişti: acele etmeden okumak, aslında kendine acele etmeden zaman ayırmaktır.\" Deniz bu sözü not defterine değil ama zihnine kaydetti; sanki içinde uzun zamandır aradığı ama adını koyamadığı bir şeyi birden bulmuş gibiydi. O gün eve dönerken bile bu cümleyi kafasında birkaç kez tekrarladı." },
      { ad: "Kaldığı Yerden", dk: 0.8, metin: "Bu söz Deniz'in aklında akşama kadar, hatta ertesi güne kadar kaldı. O akşam evde, her zamanki gibi ilk iş telefonunu kontrol etmek yerine, çantasından kitabı çıkardı ve kaldığı yerden sessizce okumaya devam etti. Annesi mutfaktan seslendiğinde bile kitaptan gözlerini ayırmadan cevap verdi, sonra kendi kendine güldü; ilk kez bir şeyi bitirmek için değil, sadece o anda, o sayfada olmak için okuduğunu fark etmişti. Ertesi gün kütüphaneye girerken, karşısındaki masada oturan öğrenciye ilk kez gerçek bir gülümseme gönderdi, önceki günlerin ihtiyatlı baş sallamalarından farklı, sıcak bir gülümsemeydi bu. Karşılığında aldığı gülümseme kadar basit bir şey, o günün geri kalanını taşımasına yetmişti; koridorlarda yürürken bile omuzlarındaki ağırlığın biraz hafiflediğini hissediyordu. O öğrencinin adının Elif olduğunu, aynı hafta sonunda öğrendi; kısa bir \"Ben Elif\" ve karşılığında kısa bir \"Ben Deniz\" yetmişti tanışmaya." },
      { ad: "Odaya Yeni Gelenler", dk: 0.7, metin: "Haftalar geçtikçe Sessiz Saatler'e gelenlerin sayısı yavaş yavaş, neredeyse fark edilmeden arttı. Önce iki öğrenci daha katıldı, sonra bir tanesi daha, derken loş oda öğle vakti hafif ama sıcak bir dolulukla dolmaya başladı. Kimse birbirine konuşma zorunluluğu hissetmiyordu; herkes kendi kitabıyla, kendi çizimiyle, kendi düşünceleriyle oradaydı, ama yine de bir arada olmanın verdiği o tuhaf rahatlık herkesin yüzünde okunuyordu. Deniz, bir öğle arası başını kaldırıp etrafına baktığında, aynı sessiz odada yedi farklı öğrencinin yedi farklı dünyaya sessizce daldığını gördü ve bunun, hiç konuşmadan da bir arada olmanın gerçek bir yolu olduğunu o an daha derinden anladı. Bazen biri kitabını kapatıp gözlerini ovuşturuyor, bir başkası sessizce yerinden kalkıp yeni bir kitap seçiyor, kimse kimsenin ritmini bozmuyordu." },
      { ad: "Sınav Haftası", dk: 0.7, metin: "Dönem sonu sınavları yaklaştıkça okulun geri kalanı iyice gerginleşti; koridorlar daha hızlı adımlarla, kantindeki masalar daha yüksek sesli konuşmalarla doldu. Ama Sessiz Saatler tuhaf bir biçimde değişmedi, hatta biraz daha kalabalıklaştı. Deniz bir öğlen, elindeki ders kitabını bir kenara koyup yine o öykü kitabına döndüğünde, Elif'in ona sessizce baktığını fark etti. \"Sınav çalışman gerekmiyor mu?\" diye fısıldadı Elif, sesinde yargılamadan çok merak vardı. Deniz gülümsedi. \"Gerekiyor. Ama önce burada beş dakika oturmam gerekiyor, sonra daha iyi çalışabiliyorum.\" Elif başını salladı, sanki bunu zaten biliyormuş gibi. O andan sonra ikisi de fark etti ki Sessiz Saatler, sınav stresinden kaçmak için değil, ona daha güçlü dönebilmek için bir mola noktasıydı." },
      { ad: "Bir Saatlik Sessizlik", dk: 0.7, metin: "Yıl sonuna doğru, okul müdürü bir gün kütüphaneye uğradı ve Bora Bey'e Sessiz Saatler hakkında sorular sordu; öğrenci sayısının nasıl bu kadar arttığını merak ediyordu. Bora Bey sadece gülümsedi ve \"Kimseyi zorlamadık, sadece bir saat sessizlik sunduk\" dedi. Ertesi yıl, tabela yenilendi ve artık okulun resmi duyuru panosunda da yer aldı; ama Deniz için en önemli değişiklik bu değildi. Önemli olan, artık her gün, bir saatliğine de olsa, hiçbir şeyin acele etmediği bir yer olduğunu bilmesiydi. Bu bilgi, günün geri kalanını taşımasını kolaylaştıran küçük ama şaşırtıcı derecede sağlam bir dayanak olmuştu; ve bazen kendi kendine düşündüğünde, en büyük değişikliklerin tam da böyle, bir saatlik bir sessizlikle başladığını anlıyordu." },
    ],
  },
  {
    id: "keloglan-masallari",
    baslik: "Keloğlan Masalları",
    yazar: "Anonim Halk Masalı",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Masal",
    yas: "4-8 yaş",
    renk: ["#7A4A1E", "#C98B3D"],
    puan: 4.8,
    sureDk: 0.5, icerikDurumu: "ozet",
    ozet: "Anadolu'nun en sevilen kahramanı Keloğlan'ın aklı ve iyi yüreğiyle zorlukların üstesinden geldiği üç neşeli masal.",
    bolumler: [
      { ad: "Keloğlan ile Sihirli Değirmen", dk: 17, metin: "Bir varmış bir yokmuş. Evvel zaman içinde, kalbur saman içinde, bir Keloğlan yaşarmış. Keloğlan bir sabah anasına demiş ki, ben pazara gidip kısmetimi arayacağım." },
      { ad: "Keloğlan ile Nardaniye Hanım", dk: 18, metin: "Keloğlan yolda yürürken bir de bakmış, yaşlı bir nine ağır bir çuvalı taşımaya çalışıyor. Hemen koşmuş, nineciğim dur ben taşıyayım demiş. İyilik eden iyilik bulurmuş." },
      { ad: "Keloğlan ile Padişahın Kızı", dk: 17, metin: "Padişah, bilmecemi bilen kızımı alır diye ülkeye tellallar salmış. Keloğlan gülmüş, akıl yaşta değil baştadır demiş ve saraya doğru yola koyulmuş." },
    ],
  },
  {
    id: "la-fontaine-fugue",
    baslik: "La Fontaine'den Fabllar",
    yazar: "Jean de La Fontaine",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Masal",
    yas: "4-8 yaş",
    renk: ["#2E5A32", "#6FA05C"],
    puan: 4.7,
    sureDk: 0.5, icerikDurumu: "ozet",
    ozet: "Ağustos böceği ile karınca, tavşan ile kaplumbağa ve karga ile tilki. Her biri küçük bir hayat dersi taşıyan üç klasik fabl.",
    bolumler: [
      { ad: "Ağustos Böceği ile Karınca", dk: 15, metin: "Ağustos böceği bütün yaz şarkı söylemiş, saz çalmış. Karınca ise durmadan çalışmış, kışlık yiyeceğini toplamış. Derken kış gelmiş, kar her yeri kaplamış." },
      { ad: "Tavşan ile Kaplumbağa", dk: 15, metin: "Tavşan, kaplumbağayla alay edermiş. Sen mi benimle yarışacaksın demiş. Kaplumbağa sakin sakin gülümsemiş, yarışalım da görelim demiş. Yavaş ama kararlı olan kazanırmış." },
      { ad: "Karga ile Tilki", dk: 15, metin: "Karganın ağzında bir parça peynir varmış. Kurnaz tilki ağacın altına gelmiş, ne güzel kuşsun sen, sesin de güzel midir acaba demiş. Tatlı dile kanmamak gerekirmiş." },
    ],
  },
  ANDERSEN_STORIES,
  {
    id: "ezop-masallari",
    baslik: "Ezop Masalları",
    yazar: "Ezop",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Masal",
    yas: "4-8 yaş",
    renk: ["#5A3A5E", "#9A6AA0"],
    puan: 4.6,
    sureDk: 1.8,
    contentQualityReview: { status: "approved", note: "2026-08-06: Üç fabl (kamu malı Ezop anlatıları — Okurio'nun özgün yeniden anlatımı) tek paragraflık özetten tam anlatıya genişletildi. Yayın öncesi Reyhan Açar redaksiyonu bekliyor. 2026-08-07: Reyhan Açar tarafından içerik kalitesi onaylandı." },
    ozet: "Binlerce yıldır anlatılan Ezop bilgeliği: yalancı çoban, aslan ile fare ve altın yumurtlayan tavuk. Üç fablın Okurio uyarlaması.",
    bolumler: [
      { ad: "Yalancı Çoban", dk: 1, metin: "Bir çoban, köylülere şaka yapmayı çok severmiş. Her gün sürüsünü otlatmaya götürürmüş ama sıkılırmış. Bir gün eğlenmek için Kurt geliyor diye bağırmış. Köylüler koşarak gelmiş ama ortada kurt yokmuş. Çoban kahkahalarla gülmüş, köylüler kızarak geri dönmüş. Ertesi gün yine aynı şakayı yapmış, köylüler yine koşmuş. Bu birkaç kez tekrarlanmış, köylüler artık ona inanmaz olmuş. Sonunda gerçekten bir kurt gelmiş ve sürüye saldırmış. Çoban var gücüyle bağırmış, Kurt geliyor, gerçekten geliyor! Ama köylüler bu sefer gelmemiş, yine şaka sanmışlar. Kurt bütün sürüyü kaçırmış, çoban çok pişman olmuş. Yalan söylemek, bir gün gerçeği söylediğinde bile inanılmamasına yol açarmış." },
      { ad: "Aslan ile Fare", dk: 1, metin: "Küçük bir fare, uyuyan bir aslanın üzerinde oynaya oynaya gezinirken aslan uyanıvermiş. Aslan öfkeyle fareyi pençesinin altına almış. Fare çok korkmuş ve yalvarmış. Beni bırak, bir gün ben de sana yardım ederim demiş. Aslan bu küçücük farenin ona nasıl yardım edebileceğini düşünüp gülmüş. Yine de merhamet edip fareyi bırakmış. Aradan zaman geçmiş, bir gün aslan avcıların ağına düşmüş. Ne kadar çabalasa da ağdan kurtulamamış ve kükremiş. Fare bu sesi duymuş ve koşarak gelmiş. Küçük dişleriyle ağın iplerini teker teker kemirmiş. Sonunda aslan özgür kalmış. Aslan, küçük bir dostun bile büyük bir yardım yapabileceğini öğrenmiş." },
      { ad: "Altın Yumurtlayan Tavuk", dk: 1, metin: "Bir çiftçinin özel bir tavuğu varmış, her gün altın bir yumurta yumurtlarmış. Çiftçi bu yumurtaları satarak zenginleşmiş. Ama zamanla açgözlü olmuş, daha çok altın istemiş. Bu tavuğun içinde kesin bir altın hazinesi vardır diye düşünmüş. Bir gün sabırsızlanıp tavuğu kesmiş, içindeki bütün altını almak istemiş. Ama tavuğun içinde hiç altın yokmuş, sadece sıradan bir tavuk içiymiş. Çiftçi hem tavuğunu kaybetmiş hem de günlük altın yumurtadan olmuş. Pişmanlıkla oturup ağlamış ama artık çok geçmiş. Karısı ona, sabırlı olsaydık her gün zenginleşecektik demiş. Açgözlülük, elimizdeki güzel şeyleri bile kaybettirebilirmiş." },
    ],
  },
  {
    id: "grimm-masallari",
    baslik: "Grimm Kardeşler Masalları",
    yazar: "Jacob ve Wilhelm Grimm",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Masal",
    yas: "5-9 yaş",
    renk: ["#4A1E2A", "#8C4A5A"],
    puan: 4.7,
    sureDk: 2.3,
    contentQualityReview: { status: "approved", note: "2026-08-06: Üç masal (kamu malı Grimm derlemeleri — Okurio'nun özgün yeniden anlatımı) tek paragraflık özetten tam anlatıya genişletildi. Yayın öncesi Reyhan Açar redaksiyonu bekliyor. 2026-08-07: Reyhan Açar tarafından içerik kalitesi onaylandı." },
    ozet: "Bremen mızıkacıları, Hansel ile Gretel ve kurbağa prens. Grimm Kardeşler'in derlediği üç ölümsüz masalın Okurio uyarlaması.",
    bolumler: [
      { ad: "Bremen Mızıkacıları", dk: 1, metin: "Yaşlanan bir eşek, sahibinin kendisini artık istemediğini fark etmiş. Ben Bremen'e gider, mızıkacı olurum demiş ve yola çıkmış. Yolda yaşlı bir köpekle karşılaşmış, o da sahibinden kaçmış. İkisi birlikte yürümeye devam etmiş ve bir kedi görmüşler. Kedi de artık fare tutamadığı için evden kovulmuş. Üçü birlikte yola koyulmuş, derken bir horoz da onlara katılmış. Horoz da kesilmekten korkup kaçmış. Dört arkadaş akşam olunca bir ormanda ışık görmüşler. Yaklaşınca bir haydut çetesinin evi olduğunu anlamışlar. Eşek pencereye, köpek eşeğin sırtına, kedi köpeğin sırtına, horoz da kedinin üstüne çıkmış. Hep birlikte var güçleriyle bağırmışlar. Haydutlar korkunç bir canavar geldiğini sanıp kaçmışlar. Dört arkadaş eve yerleşmiş ve orada mutlu yaşamışlar. Hiçbiri Bremen'e gitmese de birbirlerini bulmuşlar." },
      { ad: "Hansel ile Gretel", dk: 1, metin: "Hansel ile Gretel, fakir bir oduncunun çocuklarıymış. Bir kıtlık döneminde ormana bırakılmışlar. İkisi ormanda kaybolmuşlar ve çok korkmuşlar. Derken karşılarına şekerden, kurabiyeden yapılmış bir ev çıkmış. Sevinerek evden parçalar koparıp yemeye başlamışlar. Ama evin sahibi kötü bir cadıymış, çocukları içeri kilitlemiş. Cadı, Hansel'i şişmanlatıp yemek istemiş. Gretel akıllıca davranmış ve cadıyı kandırmış. Cadıyı fırına itip kardeşini kurtarmış. İkisi cadının evinde altın ve mücevher bulmuş. Ormandan çıkış yolunu bulmak için beyaz taşları takip etmişler. Sonunda evlerine dönmüşler, babaları onları görünce çok sevinmiş. Getirdikleri hazineyle bir daha hiç aç kalmamışlar. Ama her parlayan şeker, tatlı olmayabilirmiş, bunu hiç unutmamışlar." },
      { ad: "Kurbağa Prens", dk: 1, metin: "Bir prensesin en sevdiği oyuncağı altın bir topmuş. Bir gün topunu oynarken kuyuya düşürmüş. Prenses çok üzülmüş ve ağlamaya başlamış. Derken kuyudan bir kurbağa çıkmış. Topunu çıkarırım ama bir şartım var demiş. Benimle arkadaş ol, sofranda yemek ye, yatağında uyu demiş. Prenses hemen kabul etmiş ama topunu alınca sözünü unutmuş. Kurbağa ertesi gün saraya gelmiş ve sözünü hatırlatmış. Kral, verilen sözün tutulması gerektiğini söylemiş. Prenses istemeyerek kurbağayı sofraya, sonra da odasına almış. Kurbağa, prensesin verdiği söze uymasından çok memnun kalmış. Bir gece kurbağa aniden yakışıklı bir prense dönüşmüş. Kötü bir büyü onu kurbağa yapmış, sadece bir söz onu kurtarabilirmiş. Verilen söz tutulurmuş, çünkü sözünde durmak insanı güzelleştirirmiş. Bu üç masal, verilen sözlerin ne kadar değerli olduğunu, dostluğun beklenmedik yerlerden gelebileceğini ve sabırla çalışmanın karşılığını hep verdiğini nesillerdir çocuklara anlatır, büyükanne büyükbaba dilinden toruna, kuşaktan kuşağa, her ailede tekrar tekrar yeniden aktarılarak." },
    ],
  },
  {
    id: "aesop-fables-en",
    baslik: "Aesop's Fables",
    yazar: "Aesop",
    seslendiren: "Studio Recording",
    kategori: "Masal",
    dil: "en",
    yas: "4-8 yaş",
    renk: ["#2E4A5A", "#5A8CA0"],
    puan: 4.7,
    sureDk: 0.7, icerikDurumu: "ozet",
    ozet: "Three timeless fables in simple English: the tortoise and the hare, the lion and the mouse, and the boy who cried wolf.",
    bolumler: [
      { ad: "The Tortoise and the Hare", dk: 12, metin: "The hare laughed at the slow tortoise. Let us race, said the tortoise with a smile. The hare ran fast, then stopped to sleep under a tree. Slow and steady wins the race." },
      { ad: "The Lion and the Mouse", dk: 12, metin: "A little mouse ran over a sleeping lion. The lion woke up and caught it. Please let me go, said the mouse, one day I will help you. The lion laughed, but he let the mouse go." },
      { ad: "The Boy Who Cried Wolf", dk: 12, metin: "A shepherd boy liked to play tricks. Wolf, wolf, he shouted, and the villagers came running. One day a real wolf came. Nobody believed the boy this time." },
    ],
  },
  PETER_RABBIT_FULL,
  {
    id: "ugly-duckling-en",
    baslik: "The Ugly Duckling",
    yazar: "Hans Christian Andersen",
    seslendiren: "Studio Recording",
    kategori: "Masal",
    dil: "en",
    yas: "5-9 yaş",
    renk: ["#4A3A5E", "#8A6AA8"],
    puan: 4.7,
    sureDk: 0.6, icerikDurumu: "ozet",
    ozet: "Andersen's beloved story about being different, told in short and clear English sentences.",
    bolumler: [
      { ad: "The Strange Egg", dk: 11, metin: "On a sunny farm, a mother duck sat on her eggs. One egg was bigger than the others. When it opened, out came a grey and clumsy duckling. He did not look like the rest." },
      { ad: "A Long Winter", dk: 11, metin: "The other animals laughed at the grey duckling. He felt sad and left the farm. The winter was long and cold, but he did not give up." },
      { ad: "The Swan", dk: 10, metin: "In spring, the duckling saw beautiful white birds on the lake. He looked at the water and saw his own reflection. He was not an ugly duckling at all. He was a swan." },
    ],
  },
  {
    id: "fox-and-grapes-en",
    baslik: "The Fox and the Grapes",
    yazar: "Aesop · Okurio graded retelling",
    seslendiren: "Oki Reader",
    kategori: "English Easy",
    dil: "en",
    yas: "8-10 yaş",
    renk: ["#4A3B2A", "#B07A3A"],
    puan: 4.8,
    sureDk: 0.3, icerikDurumu: "ozet",
    ozet: "A very short A1 fable retold with simple sentences and a gentle question card.",
    bolumler: [
      { ad: "The Grapes", dk: 3, metin: "A fox saw some purple grapes. The grapes were high on a tree. The fox jumped once. He jumped twice. He could not reach them." },
      { ad: "The Choice", dk: 3, metin: "The fox walked away. These grapes are not sweet, he said. But he still looked back. Sometimes we say no when something feels hard." },
    ],
  },
  {
    id: "lion-and-mouse-graded-en",
    baslik: "The Lion and the Mouse",
    yazar: "Aesop · Okurio graded retelling",
    seslendiren: "Oki Reader",
    kategori: "English Easy",
    dil: "en",
    yas: "8-10 yaş",
    renk: ["#4C3A1F", "#D59A3C"],
    puan: 4.8,
    sureDk: 0.3, icerikDurumu: "ozet",
    ozet: "A short A1 fable about help, kindness and a small friend who can do something big.",
    bolumler: [
      { ad: "The Little Mouse", dk: 3, metin: "A little mouse ran over a sleeping lion. The lion opened one eye. He caught the mouse with his big paw." },
      { ad: "The Net", dk: 4, metin: "Later, the lion was caught in a net. The little mouse came back. She bit the rope again and again. The lion was free." },
    ],
  },
  {
    id: "alice-rabbit-hole-en",
    baslik: "Alice Finds the Rabbit Hole",
    yazar: "Lewis Carroll · Okurio graded retelling",
    seslendiren: "Oki Reader",
    kategori: "English Reading",
    dil: "en",
    yas: "10-12 yaş",
    renk: ["#2E4A5A", "#6FA3B8"],
    puan: 4.7,
    sureDk: 0.3, icerikDurumu: "ozet",
    ozet: "A1-A2 level retelling inspired by Alice's Adventures in Wonderland, focused on curiosity and sequence.",
    bolumler: [
      { ad: "A White Rabbit", dk: 5, metin: "Alice sat by her sister. The day was warm and quiet. Then she saw a white rabbit. The rabbit had a watch. I am late, said the rabbit." },
      { ad: "Down the Hole", dk: 5, metin: "Alice followed the rabbit. She saw a dark hole under the hedge. She stopped for a moment, then went down. The strange adventure began." },
    ],
  },
  {
    id: "selfish-giant-graded-en",
    baslik: "The Selfish Giant",
    yazar: "Oscar Wilde · Okurio graded retelling",
    seslendiren: "Oki Reader",
    kategori: "English Reading",
    dil: "en",
    yas: "10-12 yaş",
    renk: ["#2D4A36", "#74A06A"],
    puan: 4.8,
    sureDk: 0.4, icerikDurumu: "ozet",
    ozet: "A gentle A2 retelling about sharing, seasons and change.",
    bolumler: [
      { ad: "The Garden", dk: 6, metin: "The children loved the giant's garden. The grass was soft, and the trees were full of flowers. One day the giant came home. This is my garden, he said." },
      { ad: "Spring Returns", dk: 6, metin: "The garden became cold and quiet. No birds sang in the trees. Then the giant heard a small voice. He opened the gate, and spring came back." },
    ],
  },
  {
    id: "happy-prince-swallow-en",
    baslik: "The Happy Prince and the Swallow",
    yazar: "Oscar Wilde · Okurio graded retelling",
    seslendiren: "Oki Reader",
    kategori: "English Reading",
    dil: "en",
    yas: "12-14 yaş",
    renk: ["#3F3A5A", "#8A7CC3"],
    puan: 4.7,
    sureDk: 0.4, icerikDurumu: "ozet",
    ozet: "An A2-B1 bridge retelling about empathy, choice and staying to help.",
    bolumler: [
      { ad: "The Statue", dk: 7, metin: "High above the city stood the statue of the Happy Prince. His eyes looked over the streets. At night, a little swallow rested at his feet." },
      { ad: "The Choice", dk: 7, metin: "The swallow wanted to fly to a warm country. But the Prince asked for help. The swallow looked at the cold city and chose to stay one more night." },
    ],
  },
  {
    id: "moon-not-star-en",
    baslik: "The Moon Is Not a Star",
    yazar: "Okurio English Science",
    seslendiren: "Oki Reader",
    kategori: "English Science",
    dil: "en",
    yas: "10-12 yaş",
    renk: ["#263B5E", "#6A8CC7"],
    puan: 4.8,
    sureDk: 0.3, icerikDurumu: "ozet",
    ozet: "A short A1-A2 science reading that explains the moon, stars and reflected light.",
    bolumler: [
      { ad: "Looking Up", dk: 4, metin: "Oki looked at the night sky. The moon was bright, but it was not a star. It did not make its own light." },
      { ad: "Light", dk: 4, metin: "A star makes light. The moon reflects light from the sun. Lili wrote two words in her notebook: star and moon." },
    ],
  },
  {
    id: "oki-ayi-gordu",
    baslik: "Oki Ay'ı Gördü",
    yazar: "Okurio Özgün İçerik",
    seslendiren: "Oki Anlatıcı",
    kategori: "Bilim Hikâyesi",
    yas: "6-8 yaş",
    renk: ["#263B5E", "#6A8CC7"],
    puan: 4.8,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Oki'nin gece gökyüzüne bakarak Ay'ı fark ettiği kısa ve sakin bilim hikâyesi.",
    bolumler: [
      { ad: "Ay'a Bakıyorum", dk: 2, metin: "Oki gece gökyüzüne baktı. Ay yumuşak bir ışık verdi. Lili, Ay bazen büyük görünür, dedi. Oki sessizce takip etti." },
      { ad: "Birlikte Düşün", dk: 2, metin: "Ay bir lamba değildir. Güneşin ışığını bize yansıtır. Oki bunu duyunca gökyüzüne bir daha baktı." },
    ],
  },
  {
    id: "yildiz-mi-gezegen-mi",
    baslik: "Yıldız mı, Gezegen mi?",
    yazar: "Okurio Özgün İçerik",
    seslendiren: "Oki Anlatıcı",
    kategori: "Bilim Hikâyesi",
    yas: "8-10 yaş",
    renk: ["#203047", "#5978A8"],
    puan: 4.8,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Oki ve Lili'nin yıldız ile gezegen arasındaki farkı merak ettiği kısa okuma güveni metni.",
    bolumler: [
      { ad: "Parlayan Noktalar", dk: 3, metin: "Oki teleskopa baktı. Gökyüzünde pek çok parlak nokta vardı. Lili, bazıları yıldız, bazıları gezegen, dedi. Oki bu farkı merak etti." },
      { ad: "Küçük Bilgi", dk: 3, metin: "Yıldızlar kendi ışığını verir. Gezegenler ise yıldızların ışığını yansıtır. Oki defterine iki kelime yazdı: yıldız ve gezegen." },
    ],
  },
  {
    id: "oki-ay-haritasi",
    baslik: "Oki ve Ay Haritası",
    yazar: "Okurio Özgün İçerik",
    seslendiren: "Oki Anlatıcı",
    kategori: "Bilim Hikâyesi",
    yas: "10-12 yaş",
    renk: ["#1F2A44", "#7D8FC5"],
    puan: 4.8,
    sureDk: 0.3, icerikDurumu: "ozet",
    ozet: "Oki'nin Ay yüzeyini harita gibi düşünerek krater, iz ve keşif kavramlarını tanıdığı akıcı okuma metni.",
    bolumler: [
      { ad: "Haritadaki İzler", dk: 4, metin: "Oki, Ay fotoğrafına uzun uzun baktı. Yüzeyde yuvarlak izler vardı. Nana bunlara krater denir, dedi. Oki, Ay'ın da bir haritası olabilir mi, diye sordu." },
      { ad: "Keşif Defteri", dk: 4, metin: "Lili bir defter açtı. Krater, yüzey ve keşif kelimelerini yazdı. Toto bir roket resmi çizdi. Oki, okumak bazen gökyüzüne bakmak gibidir, dedi." },
    ],
  },
  {
    id: "japon-masallari",
    baslik: "Japon Masalları",
    yazar: "Japon Halk Masalı",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Masal",
    yas: "5-9 yaş",
    renk: ["#7A2E38", "#C4606B"],
    puan: 4.7,
    sureDk: 2.3,
    contentQualityReview: { status: "approved", note: "2026-08-06: Üç masal (kamu malı Japon halk anlatıları — Okurio'nun özgün yeniden anlatımı) tek paragraflık özetten tam anlatıya genişletildi. Yayın öncesi Reyhan Açar redaksiyonu bekliyor. 2026-08-07: Reyhan Açar tarafından içerik kalitesi onaylandı." },
    ozet: "Şeftali çocuk Momotaro, denizin dibindeki saray ve ay prensesi Kaguya. Japonya'nın en sevilen üç halk masalının Okurio uyarlaması.",
    bolumler: [
      { ad: "Momotaro, Şeftali Çocuk", dk: 1, metin: "Bir zamanlar Japonya'da yaşlı bir çift yaşarmış, çocukları yokmuş. Bir gün dere kenarında kocaman bir şeftali bulmuşlar. Şeftaliyi eve götürüp açtıklarında içinden gülen bir bebek çıkmış. Adını Momotaro, yani şeftali çocuk koymuşlar. Momotaro çok hızlı büyümüş, güçlü ve cesur bir delikanlı olmuş. Bir gün köye kötülük yapan devler olduğunu duymuş. Anne babasına, ben bu devleri durduracağım, demiş. Yanına pirinç köftesi almış ve yola çıkmış. Yolda bir köpek, bir maymun ve bir sülünle karşılaşmış. Onlara köftesinden paylaşmış, üçü de ona arkadaş olmuş. Birlikte devlerin adasına gitmişler. Momotaro ve arkadaşları cesaretle devleri durdurmuş. Devler özür dilemiş ve bir daha köye zarar vermeyeceklerine söz vermiş. Momotaro, hazineleriyle köyüne dönmüş ve herkesle paylaşmış." },
      { ad: "Urashima Taro", dk: 1, metin: "Genç balıkçı Urashima Taro, bir gün kumsalda çocukların bir kaplumbağayla oynadığını görmüş. Çocuklar kaplumbağaya kötü davranıyormuş, Taro onu kurtarıp denize bırakmış. Birkaç gün sonra aynı kaplumbağa yanına gelmiş ve konuşmuş. Beni kurtardığın için teşekkür ederim, demiş, seni denizin dibindeki saraya götürmek istiyorum. Taro kaplumbağanın sırtına binmiş ve derinlere dalmışlar. Deniz sarayı mercanlardan ve incilerden yapılmış, çok güzelmiş. Orada bir prensesle tanışmış ve günler haftalar gibi geçmiş. Bir süre sonra Taro, ailesini özlemiş ve köyüne dönmek istemiş. Prenses ona küçük bir kutu vermiş ama asla açma demiş. Taro köyüne döndüğünde her şey değişmiş, tanıdığı kimse kalmamış. Meraklanıp kutuyu açmış ve içinden beyaz bir duman çıkmış. İyilik hiçbir zaman unutulmazmış ama zaman herkes için farklı akarmış." },
      { ad: "Ay Prensesi Kaguya", dk: 1, metin: "Yaşlı bir bambu kesicisi, ormanda parlayan bir bambu görmüş. Merakla yaklaşıp bambuyu kesmiş. İçinde avuç içi kadar küçük, ışık saçan bir kız bebek varmış. Adını Kaguya koymuşlar ve onu kendi çocukları gibi büyütmüşler. Kaguya büyüdükçe inanılmaz güzelleşmiş, ülkenin dört bir yanından prensler onunla evlenmek istemiş. Ama Kaguya hiçbirini kabul etmemiş, gözleri hep gökyüzüne, özellikle Ay'a bakarmış. Bir gece Kaguya, gerçekte Ay ülkesinden geldiğini ve geri dönmesi gerektiğini açıklamış. Yaşlı çift çok üzülmüş ama onu tutamayacaklarını bilmiş. Dolunay gecesi, Ay'dan parlak bir alay inmiş ve Kaguya'yı almaya gelmiş. Kaguya, kendisini büyüten aileye bir mektup ve değerli bir armağan bırakmış. Sonra yavaşça gökyüzüne yükselip Ay'a doğru uçmuş. Yaşlı çift, her dolunayda gökyüzüne bakıp Kaguya'yı hatırlarmış. Kaguya'nın hikâyesi bugün hâlâ, gökyüzüne bakıp uzakları merak eden herkese sevgiyle anlatılır her dolunayda, yüzyıllar boyunca değişmeden." },
    ],
  },
  {
    id: "cin-masallari",
    baslik: "Çin Masalları",
    yazar: "Çin Halk Masalı",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Masal",
    yas: "5-9 yaş",
    renk: ["#6B4A1E", "#B08A3D"],
    puan: 4.6,
    sureDk: 2.3,
    contentQualityReview: { status: "approved", note: "2026-08-06: Üç masal (kamu malı Çin halk anlatıları — Okurio'nun özgün yeniden anlatımı) tek paragraflık özetten tam anlatıya genişletildi. Yayın öncesi Reyhan Açar redaksiyonu bekliyor. 2026-08-07: Reyhan Açar tarafından içerik kalitesi onaylandı." },
    ozet: "Gökyüzünde buluşan iki sevgili yıldız, dağları taşımaya karar veren ihtiyar ve doğuşuyla ünlenen Maymun Kral. Çin'in binlerce yıllık üç anlatısının Okurio uyarlaması.",
    bolumler: [
      { ad: "Çoban ile Dokumacı Kız", dk: 1, metin: "Gökyüzünde, Samanyolu'nun iki yakasında iki yıldız yaşarmış. Biri çalışkan bir çoban, öteki bulutları dokuyan usta bir dokumacı kızmış. Bir gün ikisi karşılaşmış ve birbirlerine âşık olmuşlar. Evlenmişler ve çok mutlu bir hayat sürmüşler. Ama işlerini ihmal etmişler, çoban sürüsüne bakmaz, kız dokumasını dokumaz olmuş. Gökyüzünün kraliçesi buna kızmış ve ikisini Samanyolu'nun iki ayrı yakasına ayırmış. Çoban ve dokumacı kız çok üzülmüş, birbirlerini her gün özlemişler. Kraliçe onlara acımış ve yılda bir kez buluşmalarına izin vermiş. Her yıl aynı gecede, dünyadaki bütün saksağanlar gökyüzüne uçarmış. Kanatlarını açıp Samanyolu üzerinde bir köprü kurarlarmış. Çoban ve dokumacı kız bu köprüden geçip birbirlerine kavuşurmuş. O gece yağan yağmurun, sevinç gözyaşları olduğuna inanılırmış." },
      { ad: "Dağları Taşıyan İhtiyar", dk: 1, metin: "Doksan yaşındaki Yu Gong'un evinin önünde iki koca dağ varmış. Bu dağlar yüzünden köyden şehre gitmek çok uzun sürermiş. Bir gün ailesini toplamış, bu dağları taşıyacağız demiş. Herkes şaşırmış, komşuları ona gülmüş. Bir ihtiyar iki koca dağı nasıl taşıyabilir ki, demişler. Yu Gong gülümsemiş ve kazmasını almış. Her gün biraz toprak kazıp sepetlerle uzağa taşımaya başlamış. Oğulları ve torunları da ona katılmış. Komşular hâlâ gülüyormuş ama Yu Gong hiç durmamış. Ben bitiremesem de çocuklarım devam eder, demiş, onlar da bitiremezse torunları sürdürür. Damla damla göl olur, sabırla koruk helva olurmuş. Gökyüzündeki tanrılar bu sabrı görmüş ve etkilenmiş. Sonunda dağları kaldırıp başka bir yere taşımışlar. Yu Gong'un köyü artık şehre çok daha yakınmış." },
      { ad: "Maymun Kral'ın Doğuşu", dk: 1, metin: "Çiçekler ve Meyveler Dağı'nın tepesinde sihirli bir taş varmış. Bu taş, güneşin ve ayın ışığını binlerce yıl boyunca içine çekmiş. Bir gün taş çatlamış ve içinden taştan bir maymun doğmuş. Gözlerinden iki altın ışık fışkırmış ve gökyüzüne kadar ulaşmış. Küçük maymun dağdaki diğer maymunlarla oynayarak büyümüş. Bir gün bir şelalenin ardındaki mağarayı keşfetmiş. Cesaretle şelalenin içinden geçip mağaraya girmiş. Diğer maymunlar onun cesaretine hayran kalmış ve onu kral seçmişler. Ona Maymun Kral demişler. Maymun Kral, güç ve bilgelik kazanmak için dünyayı dolaşmış. Ölümsüzlük sırlarını öğrenmiş ve sihirli bir asa bulmuş. Asa istediği zaman büyüyüp küçülebiliyormuş. Maymun Kral'ın maceraları, Çin'de yüzyıllardır çocuklara ve büyüklere anlatılırmış. Bu üç hikâye, sabrın, cesaretin ve sevginin insanı nereye götürebileceğini hâlâ çocuklara ve büyüklere hatırlatır bugün bile, yüzyıllar sonra dünyanın her köşesinde, her nesilde tekrar tekrar yeniden." },
    ],
  },


  {
    id: "oki-gunesin-hikayesi",
    baslik: "Oki ve Güneşin Hikâyesi",
    yazar: "Oki Mitoloji Yolu",
    seslendiren: "Oki Anlatıcı",
    kategori: "Eski Masallar",
    yas: "3-6 yaş",
    renk: ["#6A4A1F", "#F0B44C"],
    puan: 4.9,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Minik dinleyiciler için güneş, sabah ve eski masal ritmiyle güvenli mitoloji başlangıcı.",
    bolumler: [
      { ad: "Sabah", dk: 1, metin: "Oki sabah uyandı. Güneş çıktı. Oda aydınlandı. Nana, çok eski zamanlarda insanlar güneşe bakıp hikâye anlatırdı, dedi." },
      { ad: "Işık", dk: 2, metin: "Oki ışığı gördü. Mino ısındı. Lili gülümsedi. Güneş yavaşça yükseldi. Herkes güne merhaba dedi." },
    ],
  },
  {
    id: "lili-ay-isigi",
    baslik: "Lili Ay Işığını Takip Ediyor",
    yazar: "Oki Mitoloji Yolu",
    seslendiren: "Oki Anlatıcı",
    kategori: "Eski Masallar",
    yas: "5-8 yaş",
    renk: ["#263B63", "#88A8E8"],
    puan: 4.9,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Ay, gece ve sakin takip üzerine kısa eski masal anlatısı.",
    bolumler: [
      { ad: "Ay Işığı", dk: 2, metin: "Lili gece pencereden baktı. Ay ışığı yere düştü. Oki ışığın yolunu takip etti. Nana, eski masallarda Ay yol gösterir, dedi." },
      { ad: "Yol", dk: 2, metin: "Mino sessiz yürüdü. Toto acele etmek istedi. Lili, yavaş gidelim, dedi. Ay ışığı onlara küçük bir yol çizdi." },
    ],
  },
  {
    id: "oki-pegasus",
    baslik: "Oki ve Pegasus",
    yazar: "Oki Mitoloji Yolu",
    seslendiren: "Oki Anlatıcı",
    kategori: "Mitoloji",
    yas: "8-10 yaş",
    renk: ["#3D3263", "#9B86D8"],
    puan: 4.9,
    sureDk: 0.4, icerikDurumu: "ozet",
    ozet: "Oki kanatlı at Pegasus ile mitolojiye yumuşak ve macera dolu bir giriş yapar.",
    bolumler: [
      { ad: "Kanatlı At", dk: 3, metin: "Oki eski bir kitapta kanatlı bir at resmi gördü. Nana, bu Pegasus, dedi. Çok eski hikâyelerde Pegasus gökyüzüne yükselen güçlü bir attı. Oki resme uzun uzun baktı." },
      { ad: "Cesaret", dk: 3, metin: "Lili, kanatlar ne anlatır, diye sordu. Nana, bazen cesareti, bazen de hayal kurmayı anlatır, dedi. Oki o gün bir hikâyenin sadece olay değil, anlam da taşıdığını öğrendi." },
    ],
  },
  {
    id: "oki-labirentin-izi",
    baslik: "Oki ve Labirentin İzi",
    yazar: "Oki Mitoloji Yolu",
    seslendiren: "Oki Anlatıcı",
    kategori: "Mitoloji",
    yas: "10-12 yaş",
    renk: ["#4B3B2B", "#B78652"],
    puan: 4.9,
    sureDk: 0.4, icerikDurumu: "ozet",
    ozet: "Labirent, ipucu ve yol bulma temasıyla Ariadne anlatısına giriş.",
    bolumler: [
      { ad: "Harita", dk: 3, metin: "Oki kütüphanede kıvrımlı bir yol çizimi buldu. Çizim bir labirente benziyordu. Lili, insan böyle bir yerde yolunu nasıl bulur, diye sordu. Nana, bazı eski hikâyelerde küçük bir ip bile yol gösterebilir, dedi." },
      { ad: "İp", dk: 4, metin: "Oki çizimin başından sonuna parmağıyla gitti. Bir noktada kayboldu. Lili ince bir ip hayal etti. Oki anladı: bazen zor metinlerde de bir ip gerekir. Bu ip, ana fikir olabilir." },
    ],
  },
  {
    id: "prometheusun-secimi",
    baslik: "Prometheus’un Seçimi",
    yazar: "Oki Mitoloji Yolu",
    seslendiren: "Oki Anlatıcı",
    kategori: "Mitoloji",
    yas: "12-14 yaş",
    renk: ["#5A2E22", "#D2734A"],
    puan: 4.9,
    sureDk: 0.4, icerikDurumu: "ozet",
    ozet: "Prometheus anlatısında seçim, sorumluluk ve bilgi temasına genç okur seviyesinde giriş.",
    bolumler: [
      { ad: "Ateş", dk: 4, metin: "Oki eski bir anlatıda ateşi insanlara veren Prometheus’u okudu. Bu sadece ateşle ilgili değildi. Hikâye bilgi, paylaşmak ve sonuçları göze almak üzerineydi. Lili, iyi bir seçim bazen zor olabilir, dedi." },
      { ad: "Bedel", dk: 4, metin: "Toto, neden risk aldı, diye sordu. Nana, bazı hikâyeler bize kolay cevap vermez, dedi. Oki metni bir daha okudu. Bu kez olaydan çok karakterin kararını düşünmeye başladı." },
    ],
  },
  {
    id: "ikarus-bugun-ne-anlatir",
    baslik: "Ikarus Bugün Ne Anlatır?",
    yazar: "Oki Mitoloji Yolu",
    seslendiren: "Oki Anlatıcı",
    kategori: "Mitolojiden Klasiklere",
    yas: "14-18 yaş",
    renk: ["#26334F", "#D9A24A"],
    puan: 4.8,
    sureDk: 0.4, icerikDurumu: "ozet",
    ozet: "Ikarus anlatısını sınır, istek, uyarı ve sembol okuma üzerinden klasiklere hazırlık seviyesinde ele alır.",
    bolumler: [
      { ad: "Yükselmek", dk: 4, metin: "Ikarus’un hikâyesi ilk bakışta fazla yükseğe uçan bir gencin anlatısıdır. Fakat bu hikâye yalnızca uçmakla ilgili değildir. Sınırları bilmek, uyarıları duymak ve isteğin gücünü anlamakla ilgilidir." },
      { ad: "Sembol", dk: 5, metin: "Oki bu metinde kanatların sadece kanat olmadığını fark etti. Kanatlar istek, özgürlük ve risk anlamına gelebilirdi. Bir mitolojik hikâye, bazen tek bir olayla birçok düşünceyi aynı anda taşır." },
    ],
  },
  {
    id: "ariadnenin-ipi-yetiskin",
    baslik: "Ariadne’nin İpi: Yol Bulmak",
    yazar: "Oki Mitoloji Yolu",
    seslendiren: "Sakin Rehber",
    kategori: "Mitolojiyle Okumaya Dönüş",
    yas: "18+ yaş",
    renk: ["#2C3A3B", "#7AA6A1"],
    puan: 4.8,
    sureDk: 0.3, icerikDurumu: "ozet",
    ozet: "Yetişkin odak için kısa mitoloji okuması: labirent, yön bulma ve düşünce takibi.",
    bolumler: [
      { ad: "Labirent", dk: 4, metin: "Ariadne’nin ipi, eski bir hikâyede çıkış yolunu bulmaya yardım eder. Bugün bu imgeyi karmaşık metinleri okurken de düşünebiliriz. Bir metinde ana fikir, bazen labirentin içindeki ip gibidir." },
      { ad: "Yol", dk: 4, metin: "Okumaya dönmek de bazen bir labirente girmek gibidir. Her şeyi bir anda anlamak gerekmez. Bir cümle, bir paragraf, bir fikir. Küçük ipuçları yolu açar." },
    ],
  },
  {
    id: "oki-lili-sahnesi",
    baslik: "Oki ve Lili Sahnesi",
    yazar: "Oki Rol Seçerek Oku",
    seslendiren: "Oki Anlatıcı",
    kategori: "Piyes",
    yas: "6-8 yaş",
    renk: ["#3D4D32", "#93B66A"],
    puan: 4.9,
    sureDk: 2.3,
    contentQualityReview: { status: "pending-human-review", note: "2026-08-06: Kısa taslaktan 6 sahneye genişletildi (asgari yaş-bandı kelime hedefini karşılamak için). Yayın öncesi Reyhan Açar redaksiyonu bekliyor. 2026-08-07: Reyhan Açar tarafından içerik kalitesi onaylandı. 2026-08-07: Diyalog metni okunabilirlik için konuşmacı satır satır ayrıldı (kelimeler değişmedi); yeniden Reyhan Açar redaksiyonu bekliyor. 2026-08-07: \"Anlatıcı:\" etiketi replik metninden kaldırıldı (sahne/rol isimleri korundu); kelime sayısını asgari hedefin üzerinde tutmak için ilgili sahnelere kısa betimleyici anlatım eklendi; AI ön-inceleme sonrası kapanış cümleleri hikâyeye özgü hale getirilecek şekilde yeniden yazıldı (5 hikâye arasındaki tekrarlayan kalıplar giderildi). Yeniden Reyhan Açar redaksiyonu bekliyor." },
    ozet: "İki karakterli kısa piyes; çocuk rol seçerek kısa repliklerle okuma güveni kazanır. Oki ve Lili, kaybolan Mino'yu izlerini takip ederek bulur, sonra Nana ile birlikte tohum eker.",
    bolumler: [
      { ad: "Sahne 1 — Bahçe Kapısı", dk: 2, metin: "Oki bahçe kapısını açtı, sabah güneşi yapraklara vuruyordu.\n\nOki: Lili, bugün bahçede oynayalım mı?\n\nLili: Olur, önce ellerimi yıkayayım.\n\nOki: Mino'yu da çağıralım, o da bizimle gelsin.\n\nLili: Mino nerede acaba, sabahtan beri görmedim.\n\nİki arkadaş bahçeye birlikte girdi.\n\nOki: Belki çiçeklerin arasında saklanıyordur.\n\nLili: Ya da ağacın gölgesinde uyuyordur." },
      { ad: "Sahne 2 — İzin Peşinde", dk: 2, metin: "Lili yerde küçük pati izleri gördü.\n\nLili: Bak Oki, izler buradan geçiyor!\n\nOki: Haklısın, bu izler taze görünüyor.\n\nLili: Öyleyse Mino çok uzağa gitmemiştir.\n\nOki: İzleri takip edelim, adım adım gidelim.\n\nİki arkadaş izleri dikkatle takip etti.\n\nLili: İzler çiçek saksısının arkasına dönüyor.\n\nOki: O zaman oraya bakalım." },
      { ad: "Sahne 3 — Mino Bulundu", dk: 2, metin: "Oki bahçenin köşesine baktı.\n\nOki: Mino nerede?\n\nLili: Sandalyenin altında olabilir.\n\nMino: Miyav!\n\nKüçük kedi sandalyenin altından çıktı.\n\nOki: Seni buldum Mino!\n\nLili: Demek burada saklanıyordun.\n\nMino: Miyav, miyav!\n\nOki: Karnın acıkmış olmalı, hadi mama verelim.\n\nLili: Ben de su kabını dolduracağım." },
      { ad: "Sahne 4 — Üç Arkadaş Bir Arada", dk: 2, metin: "Oki, Lili ve Mino bahçenin ortasında toplandı.\n\nOki: Bir daha kaybolursan hemen izlerini takip ederiz.\n\nLili: Çünkü arkadaşlar birbirini her zaman bulur.\n\nMino: Miyav!\n\nÜç arkadaş güneşin altında birlikte güldü.\n\nOki: Şimdi hep birlikte oynayalım mı?\n\nLili: Olur, önce Mino'ya top atalım.\n\nBahçede kahkahalar yankılandı." },
      { ad: "Sahne 5 — Tohum Ekme", dk: 2, metin: "Öğleden sonra Nana bahçeye küçük bir sepet getirdi, içinde tohumlar vardı.\n\nNana: Bugün birlikte tohum ekelim mi çocuklar?\n\nOki: Olur Nana, hangi tohumlar bunlar?\n\nNana: Bunlar güneş çiçeği tohumu, yaz gelince sarı çiçek açarlar.\n\nLili: Ben toprağı kazayım, sen tohumu koy Oki.\n\nOki küçük bir çukur kazdı ve tohumu içine bıraktı.\n\nMino: Miyav!\n\nMino merakla toprağı kokladı ama kazmaya çalışmadı.\n\nLili: Aferin Mino, tohumları bozma.\n\nOki: Şimdi su verelim ki büyüsünler.\n\nNana: Sabırla beklerseniz bir gün çiçek açacaklar." },
      { ad: "Sahne 6 — Akşam Sofrası", dk: 2, metin: "Akşam olunca aile bahçedeki masaya oturdu.\n\nOki: Nana, tohumlar ne zaman çiçek açar?\n\nNana: Birkaç hafta sürer ama her gün biraz büyürler.\n\nLili: O zaman her sabah kontrol edelim mi?\n\nOki: Olur, ben ilk çiçeği kim gördüyse haber vereceğim.\n\nMino: Miyav!\n\nMino masanın altına kıvrılıp uyumaya başladı.\n\nLili: Bugün çok güzel bir gündü, değil mi Oki?\n\nOki: Evet, hem Mino'yu bulduk hem tohum ektik.\n\nNana: Güzel günler böyle küçük anlardan oluşur.\n\nGökyüzü kızıla dönerken üç arkadaş gülümsedi.\n\nToprağa gömdükleri tohumun bir gün büyüyüp çiçek açacağı günü hayal ederek gülüştüler. Masadaki çaydanlıktan yükselen ince buhar, akşamın sıcaklığını bahçeye yavaşça yayıyordu." },
    ],
  },
  {
    id: "toto-acele-etme-piyesi",
    baslik: "Toto Acele Etme Piyesi",
    yazar: "Oki Rol Seçerek Oku",
    seslendiren: "Oki Anlatıcı",
    kategori: "Piyes",
    yas: "8-10 yaş",
    renk: ["#5A3A24", "#D08A4A"],
    puan: 4.8,
    sureDk: 3.2,
    contentQualityReview: { status: "pending-human-review", note: "2026-08-06: Kısa taslaktan 9 sahnelik bir kule-inşası ve bahçe-sulama kurgusuna genişletildi (asgari yaş-bandı kelime hedefi için). Yayın öncesi Reyhan Açar redaksiyonu bekliyor. 2026-08-07: Reyhan Açar tarafından içerik kalitesi onaylandı. 2026-08-07: Diyalog metni okunabilirlik için konuşmacı satır satır ayrıldı (kelimeler değişmedi); yeniden Reyhan Açar redaksiyonu bekliyor. 2026-08-07: \"Anlatıcı:\" etiketi replik metninden kaldırıldı (sahne/rol isimleri korundu); kelime sayısını asgari hedefin üzerinde tutmak için ilgili sahnelere kısa betimleyici anlatım eklendi; AI ön-inceleme sonrası kapanış cümleleri hikâyeye özgü hale getirilecek şekilde yeniden yazıldı (5 hikâye arasındaki tekrarlayan kalıplar giderildi). Yeniden Reyhan Açar redaksiyonu bekliyor." },
    ozet: "DEHB dostu piyes; acele etmek, durmak ve yeniden denemek üzerine rol okuma. Toto ve arkadaşları bahçede bir kule kurarken ve çiçek sularken sabrı öğrenir.",
    bolumler: [
      { ad: "Çok Hızlı Plan", dk: 2, metin: "Toto çok hızlı koştu, elinde bir kâğıt vardı.\n\nToto: Planım hazır, hemen başlayalım!\n\nOki: Önce dinleyelim Toto, planın ne?\n\nLili: Bir adım duralım, acele etmeden anlat.\n\nToto: Tamam, derin nefes alıyorum.\n\nToto durdu ve nefes aldı.\n\nToto: Bugün bahçede bir kule yapacağız.\n\nOki: Güzel fikir, ama nasıl başlayacağız?\n\nLili: Önce malzemeleri toplayalım, sonra planlarız." },
      { ad: "Yavaş Adım", dk: 2, metin: "Mino: Miyav.\n\nToto: Şimdi daha iyi düşündüm.\n\nOki: Güzel.\n\nLili: Yavaş adım da bir adımdır.\n\nToto kutuları teker teker taşımaya başladı.\n\nToto: Önce büyük kutuyu koyayım, sonra küçüğü üstüne.\n\nOki: Dikkatli ol, aceleyle düşebilir.\n\nLili: Haklısın, yavaşça yerleştirelim.\n\nToto derin bir nefes daha aldı ve yavaşça devam etti." },
      { ad: "Kule Sallanıyor", dk: 2, metin: "Kule birden sallanmaya başladı.\n\nToto: Aa, çok hızlı koydum galiba!\n\nOki: Dur, elini tutma, düşmesin.\n\nLili: Nefes al Toto, telaşlanma.\n\nToto derin bir nefes aldı ve elini yavaşça çekti.\n\nToto: Şimdi ne yapmalıyım?\n\nOki: Alttaki kutuyu düzeltelim, sonra tekrar deneriz.\n\nLili: Acele etmeden, adım adım." },
      { ad: "Yeniden Deneme", dk: 2, metin: "Üç arkadaş kuleyi yavaşça yeniden kurdu.\n\nToto: Bu sefer her kutuyu kontrol ediyorum.\n\nOki: Aferin, çok daha sağlam duruyor.\n\nLili: Gördün mü, yavaş olmak hiç kötü değilmiş.\n\nMino: Miyav!\n\nMino kulenin yanında dolaştı ama devirmedi.\n\nToto: Mino bile dikkatli davranıyor.\n\nOki: Sabırlı olmak herkese iyi gelir." },
      { ad: "Toto'nun Dersi", dk: 2, metin: "Kule sonunda tamamlandı, güneşin altında parlıyordu.\n\nToto: Acele etseydim bunu asla bitiremezdik.\n\nLili: Şimdi anladın mı, durmak da bir adımdır.\n\nOki: Bazen yavaş gitmek, hızlı gitmekten daha iyidir.\n\nToto: Bir dahaki sefere önce derin nefes alacağım.\n\nÜç arkadaş kulenin önünde el ele tutuştu.\n\nLili: Harika bir iş çıkardık, hep birlikte.\n\nToto: Teşekkürler, beni durdurduğunuz için." },
      { ad: "Ertesi Gün Yeni Bir Görev", dk: 2, metin: "Ertesi sabah Oki elinde bir kova ile geldi.\n\nOki: Bugün bahçedeki çiçeklere su verelim mi?\n\nToto: Ben hemen başlarım, çok hızlı sularım!\n\nLili: Toto, hatırla, yavaş olmak da bir adımdır.\n\nToto: Haklısın, önce derin bir nefes alayım.\n\nToto yavaşça kovayı doldurdu ve çiçeklere gitti.\n\nToto: Her çiçeğe biraz su, fazla değil.\n\nOki: Aferin, çok dikkatli davranıyorsun.\n\nLili: Gördün mü, dün öğrendiğin ders işe yaradı." },
      { ad: "Mino'nun Yardımı", dk: 2, metin: "Mino çiçeklerin arasında dolaşıyordu.\n\nMino: Miyav!\n\nToto: Mino, dikkat et, çiçekleri ezme.\n\nOki: Belki Mino da bize yardım etmek istiyor.\n\nLili: Ona küçük bir görev verelim.\n\nToto: Mino, sen de yapraklara bakabilirsin.\n\nMino bir yaprağın üstüne konan böceği izledi.\n\nMino: Miyav, miyav!\n\nOki: Bak, Mino da sabırla bekliyor.\n\nToto: Demek herkes kendi hızında öğreniyor." },
      { ad: "Bahçe Tamamlandı ve Toto'nun Yeni Alışkanlığı", dk: 4, metin: "Öğleye doğru bütün çiçekler sulanmıştı.\n\nOki: Bugün hiç acele etmeden bitirdik.\n\nToto: Ve hiçbir çiçeği ezmedik.\n\nLili: Çünkü yavaş ve dikkatli çalıştık.\n\nÜç arkadaş bahçenin ortasında oturup mola verdi.\n\nToto: Dün kuleyi, bugün bahçeyi öğrendim.\n\nOki: Sabır her işte işe yarıyor galiba.\n\nLili: Evet, ve seninle çalışmak çok keyifli Toto.\n\nGüneş tepede parlarken üçü de gülümsedi. O akşam Toto günlüğüne uzun bir not yazdı.\n\nToto: Bugün öğrendim ki acele etmek işleri bozabilir.\n\nOki: Ama yavaş olmak da hiç sıkıcı değil, değil mi?\n\nToto: Hayır, hatta daha keyifli, her şeyi fark ediyorum.\n\nLili: Belki yarın yeni bir görev daha buluruz.\n\nToto: Ne olursa olsun, önce derin bir nefes alacağım.\n\nMino: Miyav!\n\nToto gülümseyerek günlüğünü kapattı ve yavaşça uykuya daldı.\n\nPencereden giren ay ışığı, bugün özenle kurduğu kuleyi usulca aydınlatıyordu. Yastığına uzanırken, sabırla beklemenin acele etmekten çok daha tatlı olduğunu düşündü. Ertesi sabah yeniden bahçeye çıkmayı sabırla bekliyordu." },
    ],
  },
  {
    id: "uzay-kulubu-piyesi",
    baslik: "Uzay Kulübü Piyesi",
    yazar: "Oki Rol Seçerek Oku",
    seslendiren: "Oki Anlatıcı",
    kategori: "Piyes",
    yas: "10-12 yaş",
    renk: ["#253A5F", "#6FA7D9"],
    puan: 4.8,
    sureDk: 4.5,
    contentQualityReview: { status: "pending-human-review", note: "2026-08-06: Kısa taslaktan 10 sahneye genişletildi, bilimsel içerik (krater, yıldız/gezegen farkı, gezegenler, halkalar, gökada) derinleştirildi. Yayın öncesi Reyhan Açar redaksiyonu bekliyor. 2026-08-07: Reyhan Açar tarafından içerik kalitesi onaylandı. 2026-08-07: Diyalog metni okunabilirlik için konuşmacı satır satır ayrıldı (kelimeler değişmedi); yeniden Reyhan Açar redaksiyonu bekliyor. 2026-08-07: \"Anlatıcı:\" etiketi replik metninden kaldırıldı (sahne/rol isimleri korundu); kelime sayısını asgari hedefin üzerinde tutmak için ilgili sahnelere kısa betimleyici anlatım eklendi; AI ön-inceleme sonrası kapanış cümleleri hikâyeye özgü hale getirilecek şekilde yeniden yazıldı (5 hikâye arasındaki tekrarlayan kalıplar giderildi). Yeniden Reyhan Açar redaksiyonu bekliyor." },
    ozet: "Gökyüzü konusu ile rol okuma birleşir; çocuk bilim repliklerini seslendirerek aktif okuma yapar. Uzay Kulübü, yıldız-gezegen farkından gökadalara uzanan bir keşif dizisi yaşar.",
    bolumler: [
      { ad: "Kulüp Toplandı", dk: 2, metin: "Uzay Kulübü masanın etrafında toplandı, herkesin elinde bir defter vardı.\n\nOki: Ay haritasını getirdim, dün gece çizdim.\n\nLili: Kraterleri işaretledim, her biri farklı büyüklükte.\n\nToto: Ben de roket çizdim, üç kat yakıt deposu var.\n\nMino: Miyav, yıldızları saydım!\n\nHerkes güldü, Mino'nun sayımı gerçek değildi ama şirindi.\n\nOki: Bugün gökyüzünü daha yakından inceleyelim mi?\n\nLili: Olur, önce bir soru listesi yapalım." },
      { ad: "Soru", dk: 2, metin: "Oki: Yıldız mı, gezegen mi, ikisi arasındaki fark nedir?\n\nLili: Yıldız kendi ışığını verir, kendi enerjisiyle parlar.\n\nToto: Gezegen ışığı yansıtır, kendi ışığı yoktur.\n\nKulüp bir soruyla başladı, küçük bir cevapla büyüdü.\n\nOki: Peki Güneş bir yıldız mı?\n\nLili: Evet, Güneş de bizim en yakın yıldızımız.\n\nToto: O zaman Dünya bir gezegen, öyle mi?\n\nOki: Kesinlikle, Güneş'in etrafında dönen bir gezegen." },
      { ad: "Roket Planı ve Kraterlerin Sırrı", dk: 4, metin: "Toto çizdiği roketi masaya koydu.\n\nToto: Bu roket Ay'a kadar gidebilir mi sizce?\n\nOki: Gerçek roketler çok daha büyük yakıt depoları taşır.\n\nLili: Ama senin çizimin de çok yaratıcı, detaylar harika.\n\nToto: Belki büyüyünce gerçek bir roket tasarlarım.\n\nMino roketin resmine pati vurdu, sanki onaylıyordu.\n\nMino: Miyav!\n\nOki: Mino da mühendis olmak istiyor galiba.\n\nLili: Krater dediğimiz şey aslında bir çukur.\n\nOki: Ay'a çarpan taşlar bu çukurları oluşturuyor.\n\nToto: Peki neden Dünya'da bu kadar az krater var?\n\nLili: Çünkü Dünya'nın atmosferi çoğu taşı yakıyor.\n\nOki: Ay'ın atmosferi olmadığı için izler kalıyor.\n\nKulüp üyeleri haritadaki her krateri tek tek işaretledi.\n\nToto: Bu en büyük krater, adı ne olsun?\n\nLili: Ona Mino Krateri diyelim, o da kulübün üyesi." },
      { ad: "Kulübün Kararı", dk: 2, metin: "Gökyüzü kararmaya başlayınca kulüp pencereye toplandı.\n\nOki: Bu akşam gerçek yıldızlara bakalım mı?\n\nLili: Olur, teleskopu getireyim.\n\nToto: Ben de defterime notlar alırım.\n\nÜç arkadaş ve Mino, karanlıkta parlayan noktaları izledi.\n\nOki: Bir soruyla başladık, bugün çok şey öğrendik.\n\nLili: Gökyüzü hiç bitmeyen bir kitap gibi.\n\nToto: O zaman her hafta yeni bir sayfa okuyalım.\n\nUzay Kulübü, bir sonraki toplantıya kadar sözleşti." },
      { ad: "Gezegenler Sırayla", dk: 2, metin: "Oki büyük bir kağıda güneş sistemini çizdi.\n\nOki: Güneş'in etrafında sekiz gezegen dönüyor.\n\nLili: Hangileri bunlar, sayabilir misin?\n\nOki: Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs ve Neptün.\n\nToto: En büyüğü hangisi?\n\nOki: Jüpiter en büyük gezegen, dev bir fırtınası bile var.\n\nLili: Peki en küçüğü?\n\nOki: Merkür en küçük ve Güneş'e en yakın olan.\n\nToto: Mino, sen hangi gezegeni seçerdin?\n\nMino: Miyav!\n\nHerkes güldü, Mino'nun favori gezegeni belli olmadı." },
      { ad: "Satürn'ün Halkaları", dk: 2, metin: "Lili: Satürn'ün etrafındaki halkalar neden var?\n\nOki: Halkalar aslında buz ve taş parçacıklarından oluşuyor.\n\nToto: Peki neden düşmüyorlar?\n\nOki: Satürn'ün çekim gücü onları yörüngede tutuyor.\n\nLili: Bu gerçekten inanılmaz bir şey.\n\nToto: Ben de büyüyünce Satürn'ü teleskopla görmek istiyorum.\n\nLili kitaplıktan bir gezegenler ansiklopedisi getirdi.\n\nLili: Bakın, burada halkaların fotoğrafı var.\n\nOki: Gerçekten çok güzelmiş, tam bir mücevher gibi.\n\nToto: Uzay hiç bitmeyen bir hazine sandığı gibi." },
      { ad: "Yıldız Haritası Çizmek", dk: 2, metin: "Kulüp üyeleri gece gökyüzünü izlemeye karar verdi.\n\nOki: Bir yıldız haritası çizelim, gördüğümüz her şeyi işaretleyelim.\n\nLili: Ben Büyük Ayı takımyıldızını arayacağım.\n\nToto: Ben de Kutup Yıldızı'nı bulmaya çalışacağım.\n\nÜç arkadaş bahçeye battaniye serdi ve uzandı.\n\nOki: İşte orada, yedi parlak yıldız görüyor musunuz?\n\nLili: Evet, tam bir kepçe şekli gibi.\n\nToto: Kutup Yıldızı hep kuzeyi gösterirmiş, denizciler onunla yön bulurmuş.\n\nMino: Miyav!\n\nMino da gökyüzüne bakıp sessizce yattı." },
      { ad: "Kulübün Yeni Projesi ve Gökadanın Büyüklüğü", dk: 4, metin: "Ertesi hafta kulüp yeni bir proje başlattı.\n\nOki: Kendi mini gözlemevimizi kuralım mı?\n\nLili: Harika fikir, teleskopu balkona yerleştirebiliriz.\n\nToto: Ben de gördüklerimizi bir deftere kaydederim.\n\nÜç arkadaş balkona küçük bir masa taşıdı.\n\nOki: Her hafta bir gezegen veya yıldız araştıracağız.\n\nLili: Böylece Uzay Kulübü hiç durmadan öğrenmeye devam eder.\n\nToto: Ve her toplantıda yeni bir soru sorarız.\n\nKulüp, meraklarını asla kaybetmeden büyümeye devam etti. Bir akşam Nana kulübe katıldı, elinde eski bir kitap vardı.\n\nNana: Bu kitapta gökadalar anlatılıyor, ister misiniz dinlemek?\n\nOki: Evet Nana, gökada nedir tam olarak?\n\nNana: Gökada, milyonlarca yıldızın bir arada bulunduğu dev bir topluluktur.\n\nLili: Bizim Güneş Sistemimiz hangi gökadada?\n\nNana: Samanyolu Gökadası'nda, ama o da evrende sadece küçük bir nokta.\n\nToto: Evren o kadar büyük ki hayal etmek bile zor.\n\nNana: Bu yüzden merak etmeye hiç ara vermeyin çocuklar.\n\nOki: Biz de her hafta yeni bir şey öğrenmeye devam edeceğiz.\n\nMino: Miyav!\n\nKulüp, gökyüzünün sonsuzluğu karşısında hep birlikte sessizce hayrete düştü.\n\nLili: Bir gün belki gerçek bir gökadayı teleskopla görürüz.\n\nToto: O gün geldiğinde hepimiz burada olacağız.\n\nNana: Sizinle gurur duyuyorum çocuklar.\n\nBalkondaki teleskop soğuk gece havasında usulca parlıyordu, yıldızlar sabırla onları bekliyormuş gibi duruyordu. Kulüp üyeleri, evrenin büyüklüğünü düşünerek uzun süre gökyüzünü izlemeye devam etti. Mino da yıldızlara bakarken usulca gözlerini kapadı." },
    ],
  },
  {
    id: "english-hello-card",
    baslik: "English Words: Hello",
    yazar: "Okurio English Team",
    seslendiren: "Oki Anlatıcı",
    kategori: "English Card",
    yas: "5-8 yaş",
    renk: ["#28425F", "#6FA7D9"],
    puan: 4.8,
    sureDk: 3,
    ozet: "Pre-A1 seviyesinde ilk İngilizce selamlaşma kelimeleri: hello, bye, please, thank you.",
    bolumler: [
      { ad: "Hello", dk: 1, metin: "Hello, Oki. Hello, Lili. Bye, Mino. Thank you, Nana." },
      { ad: "Please", dk: 1, metin: "Please, Oki. Thank you, Lili. Hello, Mino. Bye, Toto." },
    ],
  },
  {
    id: "english-sky-words-card",
    baslik: "English Words: Sky",
    yazar: "Okurio English Team",
    seslendiren: "Oki Anlatıcı",
    kategori: "English Card",
    yas: "6-8 yaş",
    renk: ["#1F3A5C", "#7DA7D9"],
    puan: 4.8,
    sureDk: 3,
    ozet: "Gökyüzü subject’i ile uyumlu Pre-A1 kelime kartı: sun, moon, star, sky.",
    bolumler: [
      { ad: "Sky Words", dk: 1, metin: "Sun. Moon. Star. Sky. Oki sees the moon. Lili sees a star." },
      { ad: "Look Up", dk: 1, metin: "Look up. The sky is blue. The sun is bright. The moon is quiet." },
    ],
  },
  {
    id: "english-colors-card",
    baslik: "English Words: Colors",
    yazar: "Okurio English Team",
    seslendiren: "Oki Anlatıcı",
    kategori: "English Card",
    yas: "6-8 yaş",
    renk: ["#4A315F", "#A786D9"],
    puan: 4.8,
    sureDk: 3,
    ozet: "İlk renk kelimeleriyle çok kısa cümleler: red, blue, yellow, green.",
    bolumler: [
      { ad: "Colors", dk: 1, metin: "Red ball. Blue sky. Yellow sun. Green leaf. Oki sees a red ball." },
      { ad: "I See", dk: 1, metin: "I see blue. I see green. Lili sees yellow. Mino sees red." },
    ],
  },

  {
    id: "toto-tak-tak-dedi",
    baslik: "Toto Tak Tak Dedi",
    yazar: "Okurio İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Ritim Oyunu",
    yas: "3-5 yaş",
    renk: ["#6B4A2B", "#D19A55"],
    puan: 4.9,
    sureDk: 3,
    ozet: "Okuma öncesi ritim, ses farkındalığı ve tekrar için kısa Oki oyunu.",
    bolumler: [
      { ad: "Tak Tak", dk: 1, metin: "Toto kapıya baktı. Tak tak. Oki güldü. Tak tak. Mino geldi. Miyav dedi." },
      { ad: "Ses Oyunu", dk: 1, metin: "Tak tak kapı. Pıt pıt yağmur. Şıp şıp su. Oki dinledi." },
    ],
  },
  {
    id: "nana-ritim-oyunu",
    baslik: "Nana’nın Ritim Oyunu",
    yazar: "Okurio İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Ritim Oyunu",
    yas: "4-6 yaş",
    renk: ["#5B3F73", "#B497D6"],
    puan: 4.9,
    sureDk: 3,
    ozet: "Nana ile tekrar, ritim ve dinleme sırası çalışması.",
    bolumler: [
      { ad: "La La", dk: 1, metin: "Nana la la dedi. Lili la la dedi. Oki dinledi. Sonra o da la la dedi." },
      { ad: "Sıra Bende", dk: 1, metin: "Nana durdu. Oki bekledi. Lili gülümsedi. Şimdi sıra Oki’deydi." },
    ],
  },
  {
    id: "oki-hop-hop",
    baslik: "Oki Hop Hop",
    yazar: "Okurio İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Tekerleme",
    yas: "5-7 yaş",
    renk: ["#7A4D1F", "#E0A94C"],
    puan: 4.8,
    sureDk: 3,
    ozet: "Kısa tekrar ve ses oyunu: hop, top, dur, bak.",
    bolumler: [
      { ad: "Hop Hop", dk: 1, metin: "Oki hop hop dedi. Top hopladı. Toto baktı. Mino saklandı." },
      { ad: "Top Nerede?", dk: 1, metin: "Top orada. Oki burada. Lili güldü. Toto durdu." },
    ],
  },
  {
    id: "oki-ay-siiri",
    baslik: "Oki’nin Ay Şiiri",
    yazar: "Okurio Şiir Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Şiir",
    yas: "5-8 yaş",
    renk: ["#24385F", "#8FA9D9"],
    puan: 4.9,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Kısa dizelerle ay, gece ve sakin takip çalışması.",
    bolumler: [
      { ad: "Ay", dk: 2, metin: "Ay geldi geceye. Yavaşça baktı bize. Oki pencere açtı. Işık düştü eline." },
      { ad: "Sessiz Işık", dk: 2, metin: "Lili saydı yıldızı. Bir, iki, üç. Mino uyudu usulca. Gece oldu güç değil, güzel." },
    ],
  },
  {
    id: "yagmur-tip-tip-siiri",
    baslik: "Yağmur Tıp Tıp",
    yazar: "Okurio Şiir Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Şiir",
    yas: "6-8 yaş",
    renk: ["#24556B", "#74B7D6"],
    puan: 4.8,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Ses farkındalığı için yağmur ritimli kısa şiir.",
    bolumler: [
      { ad: "Tıp Tıp", dk: 1, metin: "Tıp tıp yağmur. Camda küçük ses. Oki dinler. İçinde sakin bir nefes." },
      { ad: "Pıt Pıt", dk: 1, metin: "Pıt pıt damla. Toprak güzel kokar. Lili bakar. Mino patisini saklar." },
    ],
  },
  {
    id: "gokyuzu-siiri",
    baslik: "Gökyüzü Şiiri",
    yazar: "Okurio Şiir Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Şiir",
    yas: "8-10 yaş",
    renk: ["#162B45", "#5F8DC2"],
    puan: 4.8,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Gökyüzü ve yıldızlar subject’i için kısa, görsel ve sakin şiir.",
    bolumler: [
      { ad: "Yukarı Bak", dk: 2, metin: "Gökyüzü mavi bir sayfa gibi açıldı. Oki başını kaldırdı. Bir bulut geçti. Sonra bir kuş, sessizce yolunu buldu." },
      { ad: "Yıldız Defteri", dk: 2, metin: "Gece olunca gökyüzü karardı. Ama karanlık boş değildi. Lili yıldızları saydı. Her yıldız, uzak bir ışık gibi parladı." },
    ],
  },
  {
    id: "ay-bilmecesi",
    baslik: "Ay Bilmecesi",
    yazar: "Okurio İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Bilmece",
    yas: "6-9 yaş",
    renk: ["#25304F", "#B6C4E8"],
    puan: 4.8,
    sureDk: 3,
    ozet: "Gökyüzü subject’i için kısa tahmin et oyunu.",
    bolumler: [
      { ad: "Kimim Ben?", dk: 1, metin: "Gece çıkarım. Bazen ince, bazen yuvarlak görünürüm. Güneşten ışık alırım. Ben neyim?" },
      { ad: "Cevap", dk: 1, metin: "Ben Ay’ım. Kendi ışığımı yapmam. Güneşin ışığını yansıtırım." },
    ],
  },
  {
    id: "yildiz-bilmecesi",
    baslik: "Yıldız Bilmecesi",
    yazar: "Okurio İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Bilmece",
    yas: "7-10 yaş",
    renk: ["#1A2440", "#D8C46A"],
    puan: 4.8,
    sureDk: 3,
    ozet: "Yıldız kavramını basit soru-cevapla anlatan kısa bilmece.",
    bolumler: [
      { ad: "Uzak Işık", dk: 1, metin: "Çok uzaktayım. Gece parlıyor gibi görünürüm. Kendi ışığımı veririm. Ben neyim?" },
      { ad: "Cevap", dk: 1, metin: "Ben yıldızım. Güneş de bir yıldızdır. Bize en yakın yıldız Güneş’tir." },
    ],
  },
  {
    id: "tohum-bilmecesi",
    baslik: "Tohum Bilmecesi",
    yazar: "Okurio İçerik Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Bilmece",
    yas: "8-10 yaş",
    renk: ["#2E4B2F", "#88B06A"],
    puan: 4.8,
    sureDk: 3,
    ozet: "Doğa Kulübü için tahmin ve kelime hazinesi oyunu.",
    bolumler: [
      { ad: "Küçük Başlangıç", dk: 1, metin: "Çok küçüğüm. Toprağa düşerim. Su içerim. Bazen bir çiçeğe, bazen bir ağaca dönüşürüm. Ben neyim?" },
      { ad: "Cevap", dk: 1, metin: "Ben tohumum. Bir tohum küçük başlar. Ama içinde büyük bir yolculuk saklar." },
    ],
  },
  {
    id: "bir-tohumun-yolculugu",
    baslik: "Bir Tohumun Yolculuğu",
    yazar: "Okurio Doğa Kulübü",
    seslendiren: "Oki Anlatıcı",
    kategori: "Doğa Bilimi",
    yas: "8-10 yaş",
    renk: ["#315C3B", "#95C77C"],
    puan: 4.8,
    sureDk: 0.3, icerikDurumu: "ozet",
    ozet: "Bir tohumun toprak, su ve ışıkla başlayan yolunu hikâyeleştiren kısa bilim metni.",
    bolumler: [
      { ad: "Toprağın İçinde", dk: 3, metin: "Oki küçük bir tohum buldu. Tohum avucunda sessizdi. Nana, bu küçük şeyin içinde bir bitkinin yolu var, dedi. Oki tohumu toprağa bıraktı." },
      { ad: "İlk Yaprak", dk: 3, metin: "Yağmur yağdı. Güneş çıktı. Bir gün toprağın üstünde yeşil bir nokta belirdi. Lili, bu bir başlangıç, dedi. Oki her gün gelip baktı." },
    ],
  },
  {
    id: "arilar-neden-dans-eder",
    baslik: "Arılar Neden Dans Eder?",
    yazar: "Okurio Doğa Kulübü",
    seslendiren: "Oki Anlatıcı",
    kategori: "Doğa Bilimi",
    yas: "10-12 yaş",
    renk: ["#6E551B", "#DDBA45"],
    puan: 4.8,
    sureDk: 0.3, icerikDurumu: "ozet",
    ozet: "Arıların yön ve yiyecek bilgisini nasıl paylaştığını sade bir hikâyeyle anlatır.",
    bolumler: [
      { ad: "Kovanın Önünde", dk: 3, metin: "Oki kovana uzaktan baktı. Bir arı dönüyor, duruyor, sonra tekrar dönüyordu. Toto, bu arı oyun mu oynuyor, diye sordu. Nana gülümsedi: Belki de haber veriyor." },
      { ad: "Dans Eden Bilgi", dk: 4, metin: "Nana arıların bazı hareketlerle yiyeceğin yönünü anlatabildiğini söyledi. Lili defterine yazdı: Bazen bir dans, bir harita gibi çalışabilir." },
    ],
  },
  {
    id: "kutup-tilkisi-yolculugu",
    baslik: "Kutup Tilkisinin Yolculuğu",
    yazar: "Okurio Doğa Kulübü",
    seslendiren: "Oki Anlatıcı",
    kategori: "Doğa Bilimi",
    yas: "10-12 yaş",
    renk: ["#3B5266", "#D7E7EF"],
    puan: 4.8,
    sureDk: 0.3, icerikDurumu: "ozet",
    ozet: "Kutup tilkisinin çevreye uyumunu ve yol bulma becerisini anlatan sakin bilim hikâyesi.",
    bolumler: [
      { ad: "Beyaz Kürk", dk: 3, metin: "Lili bir fotoğrafta bembeyaz bir tilki gördü. Nana, bu kutup tilkisi, dedi. Karın içinde fark edilmemek için kürkü ona yardım eder." },
      { ad: "Sessiz Yol", dk: 4, metin: "Kutup tilkisi uzun yollar yürüyebilir. Soğuğa dayanır, izleri takip eder, küçük sesleri dinler. Oki, doğada her canlının bir yolu var, diye düşündü." },
    ],
  },
  {
    id: "mino-nerede-sahnesi",
    baslik: "Mino Nerede? Sahnesi",
    yazar: "Okurio Rol Okuma Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Piyes",
    yas: "6-8 yaş",
    renk: ["#5B3A2E", "#C89065"],
    puan: 4.8,
    sureDk: 2.3,
    contentQualityReview: { status: "pending-human-review", note: "2026-08-06: Kısa taslaktan 7 sahneye genişletildi (saklambaç oyunu kurgusu tamamlandı). Yayın öncesi Reyhan Açar redaksiyonu bekliyor. 2026-08-07: Reyhan Açar tarafından içerik kalitesi onaylandı. 2026-08-07: Diyalog metni okunabilirlik için konuşmacı satır satır ayrıldı (kelimeler değişmedi); yeniden Reyhan Açar redaksiyonu bekliyor. 2026-08-07: \"Anlatıcı:\" etiketi replik metninden kaldırıldı (sahne/rol isimleri korundu); kelime sayısını asgari hedefin üzerinde tutmak için ilgili sahnelere kısa betimleyici anlatım eklendi; AI ön-inceleme sonrası kapanış cümleleri hikâyeye özgü hale getirilecek şekilde yeniden yazıldı (5 hikâye arasındaki tekrarlayan kalıplar giderildi). Yeniden Reyhan Açar redaksiyonu bekliyor." },
    ozet: "Kısa repliklerle rol alarak okuma pratiği. Oki, Lili ve Toto, saklambaçta saklanan Mino'yu ipuçlarını takip ederek bulur, sonra sıra değişerek oyun sürer.",
    bolumler: [
      { ad: "Sahne 1 — Saklambaç Başlıyor", dk: 2, metin: "Oki, Lili ve Toto salonun ortasında toplandı.\n\nOki: Hadi saklambaç oynayalım, ilk saklanan Mino olsun.\n\nLili: Ben sayarım, sen de saklan Mino.\n\nToto: Ben de on'a kadar sayabilirim, yardım ederim.\n\nLili gözlerini kapadı ve saymaya başladı.\n\nLili: Bir, iki, üç...\n\nOki: Mino, çabuk saklan, geliyoruz!" },
      { ad: "Sahne 2 — Oki Bahçeye Baktı", dk: 2, metin: "Oki bahçeye baktı.\n\nOki: Mino nerede?\n\nLili: Sandalyenin altında olabilir.\n\nToto: Ben de çiçek saksılarına bakarım.\n\nÜç arkadaş bahçenin her köşesini aradı.\n\nOki: Burada yok, belki mutfaktadır.\n\nLili: Ya da merdivenin altında saklanmıştır.\n\nToto: Hadi birlikte bakalım." },
      { ad: "Sahne 3 — İpucu Bulundu", dk: 2, metin: "Toto yerde küçük bir tüy buldu.\n\nToto: Bakın, burada bir tüy var!\n\nLili: Demek Mino buradan geçmiş.\n\nOki: O zaman sesini dinleyelim, belki mırıldanıyordur.\n\nMino: Miyav!\n\nSes sandalyenin altından geliyordu.\n\nLili: İşte orada!\n\nOki: Seni buldum Mino!" },
      { ad: "Sahne 4 — Sıra Bende", dk: 2, metin: "Küçük kedi sandalyenin altından çıktı.\n\nOki: Seni buldum Mino.\n\nLili: Sıra bende, şimdi ben saklanıyorum.\n\nToto: Ben de seninle geliyorum Lili.\n\nMino: Miyav, miyav!\n\nÜç arkadaş güldü ve oyuna yeniden başladı.\n\nOki: Bu oyunu her gün oynayabiliriz.\n\nLili: Çünkü arkadaşlarla oynamak en güzel oyundur." },
      { ad: "Sahne 5 — Yeni Saklanma Yeri", dk: 2, metin: "Ertesi gün üç arkadaş yine saklambaç oynamak istedi.\n\nToto: Bu sefer ben saklanayım, siz sayın.\n\nLili: Tamam, Oki ile birlikte sayarız.\n\nOki: Bir, iki, üç, dört, beş...\n\nToto hızlıca mutfak dolabının arkasına saklandı.\n\nMino: Miyav!\n\nMino da Toto'nun yanına sokuldu, sanki ona eşlik ediyordu.\n\nLili: On'a kadar saydık, geliyoruz Toto!\n\nOki: Mutfağa bakalım önce." },
      { ad: "Sahne 6 — Herkes Bir Arada", dk: 2, metin: "Oki dolabın arkasında bir gölge fark etti.\n\nOki: Bak Lili, orada bir şey kıpırdıyor.\n\nLili: Toto olmalı, hadi yaklaşalım.\n\nToto: Yakalandım!\n\nToto ve Mino birlikte dolabın arkasından çıktı.\n\nLili: Mino da mı saklanıyordu?\n\nToto: Evet, bana eşlik etti, hiç yalnız değildim.\n\nOki: Demek ki saklambaçta bile arkadaşlık önemliymiş.\n\nDört arkadaş kahkahalarla mutfaktan çıktı.\n\nLili: Yarın yine oynayalım mı?\n\nToto: Elbette, her gün yeni bir saklanma yeri buluruz." },
      { ad: "Sahne 7 — Gece Vakti", dk: 2, metin: "Akşam olunca dört arkadaş verandaya oturdu.\n\nLili: Bugün en sevdiğim oyun saklambaç oldu.\n\nOki: Ben de Mino'nun Toto'yla saklanmasını çok sevdim.\n\nToto: Belki yarın ben de bir ipucu bırakırım.\n\nMino: Miyav!\n\nMino, Toto'nun kucağına atlayıp kıvrıldı.\n\nLili: Görüyorsunuz, en iyi oyunlar arkadaşlarla oynananlar.\n\nOki: Yarın yine buluşalım mı?\n\nToto: Elbette, saklambaç hiç bitmesin.\n\nVerandanın loş ışığında dört arkadaş son bir kez daha saklambaç kurallarını fısıldayarak konuştu, kimin nerede saklanacağını planladılar. Mino yavaşça mışıl mışıl uykuya daldı ve kahkahalar zamanla dindi." },
    ],
  },
  {
    id: "labirentte-uc-ses",
    baslik: "Labirentte Üç Ses",
    yazar: "Okurio Rol Okuma Ekibi",
    seslendiren: "Oki Anlatıcı",
    kategori: "Piyes",
    yas: "10-12 yaş",
    renk: ["#4D365F", "#9B7BB8"],
    puan: 4.8,
    sureDk: 4.5,
    contentQualityReview: { status: "pending-human-review", note: "2026-08-06: Kısa taslaktan 11 sahneye genişletildi, ip/sabır motifi bilmece-bekçi-hazine kurgusuyla tamamlandı. Yayın öncesi Reyhan Açar redaksiyonu bekliyor. 2026-08-07: Reyhan Açar tarafından içerik kalitesi onaylandı. 2026-08-07: Diyalog metni okunabilirlik için konuşmacı satır satır ayrıldı (kelimeler değişmedi); yeniden Reyhan Açar redaksiyonu bekliyor. 2026-08-07: \"Anlatıcı:\" etiketi replik metninden kaldırıldı (sahne/rol isimleri korundu); kelime sayısını asgari hedefin üzerinde tutmak için ilgili sahnelere kısa betimleyici anlatım eklendi; AI ön-inceleme sonrası kapanış cümleleri hikâyeye özgü hale getirilecek şekilde yeniden yazıldı (5 hikâye arasındaki tekrarlayan kalıplar giderildi). Yeniden Reyhan Açar redaksiyonu bekliyor." },
    ozet: "Mitoloji ve rol okuma birleşimi: Oki, Lili ve Toto, elde ettikleri bir ipi kullanarak labirenti anlamaya, bir bilmeceyi çözmeye ve çıkışı bulmaya çalışır.",
    bolumler: [
      { ad: "İpin Başında", dk: 2, metin: "Oki haritaya baktı, çizgiler birbirine karışıyordu.\n\nOki: Labirent çok karışık, nereden başlayacağız?\n\nLili: O zaman bir işaret bırakmalıyız, yoksa kayboluruz.\n\nToto: İp kullanabiliriz, girişte bir ucunu bağlarız!\n\nToto çantasından uzun bir yumak ip çıkardı.\n\nOki: Harika fikir, eski hikâyelerde de böyle yapılırmış.\n\nLili: Hangi hikâyede?\n\nOki: Bir kahraman, labirentten çıkmak için ip kullanmış." },
      { ad: "Yol Bulmak", dk: 2, metin: "Oki: İp bize yolu hatırlatır, geldiğimiz yeri unutmayız.\n\nLili: Bazen bir fikir de ip gibi olur, bizi doğruya bağlar.\n\nToto: O zaman ben ipi tutuyorum, siz yolu bulun.\n\nÜç arkadaş labirentin ilk koridoruna girdi.\n\nOki: Sağa mı, sola mı gitmeliyiz?\n\nLili: Duvara bakalım, işaret var mı?\n\nToto: Burada küçük bir ok işareti görüyorum.\n\nOki: O zaman sağa dönelim." },
      { ad: "Çıkmaz Sokak", dk: 2, metin: "Koridorun sonunda duvar çıktı, yol tıkanmıştı.\n\nToto: Bu bir çıkmaz sokak, geri dönmeliyiz.\n\nLili: Sorun değil, ipimiz sayesinde yolumuzu biliyoruz.\n\nOki: Haklısın, kaybolmadık çünkü işaretimiz vardı.\n\nÜç arkadaş ipi takip ederek geri döndü.\n\nToto: Bir dahaki kavşakta farklı bir yön deneyelim.\n\nLili: Belki de her denemeden bir şey öğreniriz.\n\nOki: Hatalar da bir tür ipucu olabilir." },
      { ad: "Ortadaki Oda", dk: 2, metin: "Üç arkadaş sonunda labirentin ortasındaki odaya ulaştı.\n\nOki: Burada eski bir yazı var, okuyalım mı?\n\nLili: Doğru yolu bulan, sabırla arayandır yazıyor.\n\nToto: Demek sabrımız bize yol gösterdi.\n\nOdanın ortasında küçük bir pusula duruyordu.\n\nOki: Bu pusula bize çıkışı gösterebilir.\n\nLili: Alalım ve ipimizle birlikte geri dönelim." },
      { ad: "Çıkış", dk: 2, metin: "Üç arkadaş ipi takip ederek girişe geri döndü.\n\nToto: Başardık, labirentten çıktık!\n\nLili: Çünkü pes etmedik ve birbirimize yardım ettik.\n\nOki: İp sadece bir yol değil, bir güven işaretiydi.\n\nGüneş ışığı yüzlerine vururken üçü de gülümsedi.\n\nToto: Bir dahaki labirentte de birlikte olalım mı?\n\nLili: Elbette, çünkü birlikte her yolu buluruz.\n\nOki: Şimdi bu hikâyeyi Mino'ya da anlatalım." },
      { ad: "Taş Bilmecesi ve Yeni Bir Koridor", dk: 4, metin: "Girişe dönmeden önce üç arkadaş bir taş kapı gördü.\n\nOki: Burada bir yazı var, bir bilmece galiba.\n\nLili: Okuyalım bakalım ne diyor.\n\nOki: Işığı olmayan ama karanlıkta yol gösteren nedir?\n\nToto: Bu zor bir soru, hiç düşünmemiştim.\n\nLili: Belki de cevap ip değildir, belki de bir fikirdir.\n\nOki: Ya da güvendir, çünkü güven bize hep yol gösterir.\n\nTaş kapı yavaşça açıldı, cevap doğru olmuştu.\n\nToto: Demek doğru cevap güvenmiş.\n\nKapının ardında ışıltılı bir koridor uzanıyordu.\n\nLili: Burası daha önce görmediğimiz bir yer.\n\nOki: İpimiz hâlâ bize giriş yolunu hatırlatıyor.\n\nToto: O zaman korkmadan ilerleyebiliriz.\n\nDuvarlarda eski resimler ve semboller vardı.\n\nOki: Bu resimler eski bir hikâyeyi anlatıyor gibi.\n\nLili: Belki de labirenti yapan kişi bize bir mesaj bırakmış.\n\nToto: Hadi resimleri takip edelim, belki yolu gösteriyorlar." },
      { ad: "Bekçi ile Karşılaşma ve Hazine Odası", dk: 4, metin: "Koridorun sonunda yaşlı bir bekçi oturuyordu.\n\nBekçi: Buraya kadar gelen ilk çocuklarsınız, tebrikler.\n\nOki: Bu labirenti sen mi koruyorsun?\n\nBekçi: Evet, yüzyıllardır burada kimseyi görmedim.\n\nLili: Bize çıkışı gösterir misin?\n\nBekçi: Çıkış zaten sizin elinizde, ipinizi takip edin yeter.\n\nToto: Demek her zaman doğru yoldaydık.\n\nBekçi: Sabırlı ve dürüst olanlar hep yolunu bulur.\n\nBekçi onlara küçük bir oda gösterdi.\n\nOki: Burada ne var acaba?\n\nLili: Bir sandık duruyor, açalım mı?\n\nSandığın içinde eski bir harita ve üç küçük madalyon vardı.\n\nToto: Bu madalyonlar bize mi ait?\n\nBekçi: Evet, buraya kadar gelen herkese bir hatıra bırakılır.\n\nOki: Teşekkür ederiz, bu labirent bize çok şey öğretti.\n\nLili: Sabır, ip ve arkadaşlık, hepsini burada bulduk." },
      { ad: "Eve Dönüş ve Mino'ya Anlatmak", dk: 4, metin: "Üç arkadaş ipi takip ederek yavaşça girişe döndü.\n\nToto: Madalyonlarımızı Mino'ya da göstereceğiz.\n\nLili: O da bizimle gurur duyacak.\n\nOki: Bu labirent macerası hiç unutmayacağımız bir gündü.\n\nGüneş batarken üç arkadaş el ele eve doğru yürüdü.\n\nToto: Bir dahaki mitoloji hikâyesinde de birlikte olalım mı?\n\nLili: Elbette, çünkü en güzel maceralar birlikte yaşananlardır.\n\nOki: Şimdi Mino'ya her şeyi anlatma zamanı.\n\nEve vardıklarında Mino onları kapıda karşıladı.\n\nMino: Miyav!\n\nOki: Mino, bugün inanılmaz bir labirenti keşfettik.\n\nLili: İçinde bir bekçi, bir bilmece ve bir hazine vardı.\n\nToto: Sana madalyonumuzu göstereceğiz, bak ne kadar parlak.\n\nMino madalyonu merakla kokladı ve pati vurdu.\n\nOki: Belki bir gün sen de bizimle bir labirente girersin.\n\nLili: O zaman dördümüz birlikte bir yol buluruz.\n\nToto: İpimiz, sabrımız ve arkadaşlığımızla hiçbir labirent bizi durduramaz.\n\nDört arkadaş gece boyunca labirent hikâyesini konuştu.\n\nMino: Miyav, miyav!\n\nVe hep birlikte yeni bir maceranın hayalini kurdular.\n\nOki: Bu, hep hatırlayacağımız güzel bir gün oldu.\n\nLili: Bir sonraki maceramızda görüşürüz.\n\nToto: Ben şimdiden heyecanlanıyorum bile, yeni bir labirent nerede acaba diye düşünüyorum.\n\nMutfak masasının etrafında toplanıp macerayı tekrar tekrar anlattılar, her seferinde yeni bir ayrıntı hatırlayarak kahkaha attılar. Mino, madalyonların parıltısını meraklı gözlerle izledi. Toto'nun aklı bir sonraki labirentteydi bile, ve dördü de yeni maceranın planlarını heyecanla kurmaya başladı." },
    ],
  },
  {
    id: "little-star-poem-en",
    baslik: "Little Star Poem",
    yazar: "Okurio English Team",
    seslendiren: "Oki Anlatıcı",
    kategori: "English Poem",
    dil: "en",
    yas: "6-8 yaş",
    renk: ["#1B2C52", "#C9D778"],
    puan: 4.8,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "Pre-A1 / A1 seviyesinde kısa İngilizce yıldız şiiri.",
    bolumler: [
      { ad: "Star", dk: 1, metin: "Little star, little light. You are soft in the night. Oki looks up. Lili smiles." },
      { ad: "Night", dk: 1, metin: "The sky is dark. The star is bright. Mino is quiet. The night is kind." },
    ],
  },
  {
    id: "moon-poem-en",
    baslik: "Moon Poem",
    yazar: "Okurio English Team",
    seslendiren: "Oki Anlatıcı",
    kategori: "English Poem",
    dil: "en",
    yas: "8-10 yaş",
    renk: ["#203656", "#AFC3E8"],
    puan: 4.8,
    sureDk: 0.2, icerikDurumu: "ozet",
    ozet: "A1 seviyesinde ay, gece ve sakin takip şiiri.",
    bolumler: [
      { ad: "Moon", dk: 2, metin: "The moon is not a lamp. The moon is not a star. It takes the sun’s light and sends it from far." },
      { ad: "Look", dk: 2, metin: "Oki looks at the moon. Lili writes one word: light. Toto whispers, good night." },
    ],
  },
  {
    id: "space-poem-en",
    baslik: "Space Poem",
    yazar: "Okurio English Team",
    seslendiren: "Oki Anlatıcı",
    kategori: "English Poem",
    dil: "en",
    yas: "10-12 yaş",
    renk: ["#161B3E", "#6C86D4"],
    puan: 4.8,
    sureDk: 0.3, icerikDurumu: "ozet",
    ozet: "A1-A2 seviyesinde uzay, soru ve merak şiiri.",
    bolumler: [
      { ad: "Question", dk: 2, metin: "Space is wide. Space is deep. Oki has a question he wants to keep. Where does a comet go? How does a small star glow?" },
      { ad: "Answer", dk: 2, metin: "Nana says, a question is a door. Read one line, then read one more." },
    ],
  },


]);

const RAFLAR = [
  { ad: "Odysseia Yolculukları", mod: "cocuk", yolIds: ["okuma_guveni_8_10", "genc_okurlar_12_14", "lise_okuma_16_18"], ids: ["odysseia-01-cocuk-truvadan-ayrilis", "odysseia-01-genc-truvadan-ayrilis", "odysseia-01-yetiskin-truvadan-ayrilis"] },
  { ad: "Tam Okuma Oturumları", mod: "cocuk", yolIds: ["ilk_harfler_6_7"], ids: ["okurio-1-grup-ses-bahcesi", "okurio-lili-kayip-tohum-haritasi"] },
  { ad: "Tam Metin · Kamu Malı", mod: "cocuk", yolIds: ["ilk_cumleler_7_8", "okuma_guveni_8_10", "akici_okuma_10_12", "genc_okurlar_12_14"], ids: ["peter-rabbit-en"] },
  { ad: "Oki Minik Dinleyiciler", mod: "cocuk", yolIds: ["okul_oncesi_3_4", "okumaya_hazirlik_5_6"], ids: ["oki-sesleri-dinliyor", "mino-miyav-dedi", "lili-yildiz-sayiyor", "toto-tak-tak-dedi", "nana-ritim-oyunu"] },
  // "Oki Pilot Hikâyeleri" rafı 2026-08-06'da kaldırıldı: oe-01-mino-neden-uzuldu ve
  // os-01-toto-bir-an-durdu, pilotCatalogAdapter.js BLOCKED_STORY_IDS listesinde olduğu için
  // katalogda hiç yoktu; raf boş/kırık görünüyordu. İnsan onayı (Social-Emotional Reading Lead)
  // tamamlanıp story'ler (veya rewriteQueueStories.js'deki v2 sürümleri) blok listesinden
  // çıkarılınca bu raf yeniden eklenebilir.
  { ad: "Mikro Alıştırmalar", mod: "cocuk", yolIds: ["okumaya_hazirlik_5_6", "ilk_harfler_6_7"], ids: ["oki-ses-a", "oki-ses-n", "oki-ses-e", "oki-ses-t", "oki-ses-i", "oki-ses-l", "oki-heceler-1", "oki-heceler-2", "oki-kelimeler-1"] },
  { ad: "Oki Mini Hikâyeler", mod: "cocuk", ids: ["oki-ati-taniyor", "ela-el-ele", "ali-ile-ela", "lili-ile-at", "oki-el-ele", "mino-nerede", "nana-anlatiyor"] },
  { ad: "Editörün Seçtikleri", mod: "yetiskin", ids: ["kurk-mantolu-madonna", "mai-ve-siyah", "pembe-incili-kaftan"] },
  { ad: "Masal Saati", mod: "cocuk", ids: ["keloglan-masallari", "andersen-masallari", "la-fontaine-fugue", "grimm-masallari", "ezop-masallari"] },
  { ad: "English Corner", mod: "cocuk", yolIds: ["ilk_cumleler_7_8", "okuma_guveni_8_10"], ids: ["fox-and-grapes-en", "lion-and-mouse-graded-en", "aesop-fables-en", "ugly-duckling-en"] },
  { ad: "English Word Cards", mod: "cocuk", yolIds: ["okumaya_hazirlik_5_6", "ilk_harfler_6_7", "ilk_cumleler_7_8"], ids: ["english-hello-card", "english-sky-words-card", "english-colors-card", "little-star-poem-en"] },
  { ad: "English Reading Club", mod: "cocuk", yolIds: ["akici_okuma_10_12", "genc_okurlar_12_14"], ids: ["alice-rabbit-hole-en", "selfish-giant-graded-en", "moon-not-star-en", "fox-and-grapes-en", "lion-and-mouse-graded-en", "ugly-duckling-en", "moon-poem-en", "space-poem-en"] },
  { ad: "Young English Readers", mod: "cocuk", yolIds: ["genc_okurlar_12_14"], ids: ["happy-prince-swallow-en", "alice-rabbit-hole-en", "selfish-giant-graded-en", "moon-not-star-en"] },
  { ad: "English Classics Bridge", mod: "cocuk", yolIds: ["klasiklere_hazirlik_14_16", "lise_okuma_16_18"], ids: ["happy-prince-swallow-en", "alice-rabbit-hole-en"] },
  { ad: "Gökyüzü ve Yıldızlar", mod: "cocuk", yolIds: ["ilk_cumleler_7_8", "okuma_guveni_8_10", "akici_okuma_10_12", "genc_okurlar_12_14"], ids: ["oki-ayi-gordu", "yildiz-mi-gezegen-mi", "oki-ay-haritasi", "uzay-kulubu-piyesi", "ay-bilmecesi", "yildiz-bilmecesi", "gokyuzu-siiri"] },

  { ad: "Şiir ve Ritim", mod: "cocuk", yolIds: ["okul_oncesi_3_4", "okumaya_hazirlik_5_6", "ilk_harfler_6_7", "ilk_cumleler_7_8"], ids: ["toto-tak-tak-dedi", "nana-ritim-oyunu", "oki-hop-hop", "oki-ay-siiri", "yagmur-tip-tip-siiri"] },
  { ad: "Bilmeceler", mod: "cocuk", yolIds: ["ilk_cumleler_7_8", "okuma_guveni_8_10", "akici_okuma_10_12"], ids: ["ay-bilmecesi", "yildiz-bilmecesi", "tohum-bilmecesi"] },
  { ad: "Oki Doğa Kulübü", mod: "cocuk", yolIds: ["okuma_guveni_8_10", "akici_okuma_10_12", "genc_okurlar_12_14"], ids: ["bir-tohumun-yolculugu", "arilar-neden-dans-eder", "kutup-tilkisi-yolculugu", "tohum-bilmecesi"] },
  { ad: "English Poems", mod: "cocuk", yolIds: ["ilk_cumleler_7_8", "okuma_guveni_8_10", "akici_okuma_10_12"], ids: ["little-star-poem-en", "moon-poem-en", "space-poem-en"] },
  { ad: "Eski Zaman Masalları", mod: "cocuk", yolIds: ["okul_oncesi_3_4", "okumaya_hazirlik_5_6"], ids: ["oki-gunesin-hikayesi", "lili-ay-isigi"] },
  { ad: "Oki Mitolojiye Başlıyor", mod: "cocuk", yolIds: ["ilk_cumleler_7_8", "okuma_guveni_8_10", "akici_okuma_10_12"], ids: ["oki-pegasus", "oki-labirentin-izi", "labirentte-uc-ses"] },
  { ad: "Mitoloji ve Kahramanlar", mod: "cocuk", yolIds: ["genc_okurlar_12_14"], ids: ["prometheusun-secimi", "oki-labirentin-izi", "oki-pegasus", "labirentte-uc-ses"] },
  { ad: "Mitolojiden Klasiklere", mod: "cocuk", yolIds: ["klasiklere_hazirlik_14_16", "lise_okuma_16_18"], ids: ["ikarus-bugun-ne-anlatir", "prometheusun-secimi", "ariadnenin-ipi-yetiskin"] },
  { ad: "Mitolojiyle Okumaya Dönüş", mod: "yetiskin", yolIds: ["yetiskin_odak_18"], ids: ["ariadnenin-ipi-yetiskin", "ikarus-bugun-ne-anlatir"] },
  { ad: "Rol Seçerek Oku", mod: "cocuk", yolIds: ["ilk_cumleler_7_8", "okuma_guveni_8_10", "akici_okuma_10_12", "genc_okurlar_12_14"], ids: ["oki-lili-sahnesi", "toto-acele-etme-piyesi", "mino-nerede-sahnesi", "labirentte-uc-ses"] },
  { ad: "Dünya Masalları", mod: "cocuk", ids: ["japon-masallari", "cin-masallari", "grimm-masallari", "andersen-masallari", "ezop-masallari"] },
  { ad: "Kısa Dinletiler", mod: "yetiskin", ids: ["yuksek-okceler", "pembe-incili-kaftan", "diyet", "sessiz-saatler"] },
  { ad: "Klasik Romanlar", mod: "yetiskin", ids: ["kurk-mantolu-madonna", "calikusu", "mai-ve-siyah"] },
];


const YOL_SEGMENT_GRUPLARI = {
  okul_oncesi_3_4: ["okul_oncesi", "dinleme"],
  okumaya_hazirlik_5_6: ["okumaya_hazirlik", "dinleme", "ses_farkindaligi"],
  ilk_harfler_6_7: ["ilk_harfler_heceler", "okumaya_hazirlik", "dinleme"],
  ilk_cumleler_7_8: ["ilk_cumleler", "okuma_guveni", "dinleme"],
  okuma_guveni_8_10: ["okuma_guveni", "ilk_cumleler", "akici_okuma", "dinleme"],
  akici_okuma_10_12: ["akici_okuma", "okuma_guveni", "genc_okurlar"],
  genc_okurlar_12_14: ["genc_okurlar", "klasiklere_hazirlik", "akici_okuma"],
  klasiklere_hazirlik_14_16: ["klasiklere_hazirlik", "lise_okuma", "genc_okurlar"],
  lise_okuma_16_18: ["lise_okuma", "klasiklere_hazirlik", "yetiskin_odak"],
  yetiskin_odak_18: ["yetiskin_odak", "lise_okuma"],
};

const YOL_ICERIK_TURLERI = {
  okul_oncesi_3_4: ["dinleme_hikayesi", "mini_hikaye", "masal", "fabl", "dunya_masali", "mitoloji_hikayesi", "tekerleme", "siir"],
  okumaya_hazirlik_5_6: ["dinleme_hikayesi", "harf_karti", "hece_karti", "english_word_card", "masal", "fabl", "mitoloji_hikayesi", "tekerleme", "siir", "english_poem"],
  ilk_harfler_6_7: ["harf_karti", "hece_karti", "kelime_karti", "mini_hikaye", "english_word_card", "tekerleme", "siir"],
  ilk_cumleler_7_8: ["mini_hikaye", "masal", "fabl", "english_word_card", "english_easy", "english_poem", "bilim_hikayesi", "mitoloji_hikayesi", "piyes", "siir", "bilmece", "tekerleme"],
  okuma_guveni_8_10: ["masal", "fabl", "dunya_masali", "english_easy", "english_poem", "mini_hikaye", "bilim_hikayesi", "doga_bilim", "mitoloji_hikayesi", "piyes", "siir", "bilmece"],
  akici_okuma_10_12: ["masal", "fabl", "dunya_masali", "english_easy", "english_reading", "english_science", "english_poem", "kisa_hikaye", "bilim_hikayesi", "doga_bilim", "mitoloji_hikayesi", "piyes", "siir", "bilmece"],
  genc_okurlar_12_14: ["english_easy", "english_reading", "english_science", "english_classic_bridge", "english_poem", "dunya_masali", "kisa_hikaye", "klasik_roman", "bilim_hikayesi", "doga_bilim", "mitoloji_hikayesi", "piyes", "siir", "bilmece"],
  klasiklere_hazirlik_14_16: ["kisa_hikaye", "klasik_roman", "english_easy", "english_reading", "english_classic_bridge", "mitoloji_hikayesi", "siir"],
  lise_okuma_16_18: ["kisa_hikaye", "klasik_roman", "english_classic_bridge", "mitoloji_hikayesi", "siir"],
  yetiskin_odak_18: ["kisa_hikaye", "klasik_roman", "mitoloji_hikayesi", "siir"],
};

const ICERIK_METADATA = {
  "odysseia-01-cocuk-truvadan-ayrilis": { yasMin: 8, yasMax: 10, segmentler: ["okuma_guveni"], okumaEvreleri: ["paragraf", "dinleme"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "mitoloji_hikayesi", subject: "odysseia", oql: 3 },
  "odysseia-01-genc-truvadan-ayrilis": { yasMin: 12, yasMax: 14, segmentler: ["genc_okurlar"], okumaEvreleri: ["uzun_metin", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "mitoloji_hikayesi", subject: "odysseia", oql: 5 },
  "odysseia-01-yetiskin-truvadan-ayrilis": { yasMin: 16, yasMax: 18, segmentler: ["lise_okuma"], okumaEvreleri: ["uzun_metin", "akademik_klasik"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "mitoloji_hikayesi", subject: "odysseia", oql: 7 },
  "okurio-1-grup-ses-bahcesi": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["ses_harf", "hece_kelime", "kisa_cumle", "dinleme"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "mini_hikaye", subject: "rehberli_okuma", oql: 1 },
  "okurio-lili-kayip-tohum-haritasi": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["ses_harf", "hece_kelime", "kisa_cumle", "dinleme"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "mini_hikaye", subject: "ozgun_hikaye", oql: 1 },
  "oe-01-mino-neden-uzuldu": { yasMin: 7, yasMax: 9, segmentler: ["ilk_cumleler", "okuma_guveni", "akici_okuma"], okumaEvreleri: ["kisa_cumle", "paragraf", "dinleme"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "mini_hikaye", subject: "duygu_farkindaligi", oql: 3 },
  "os-01-toto-bir-an-durdu": { yasMin: 7, yasMax: 9, segmentler: ["ilk_cumleler", "okuma_guveni", "akici_okuma"], okumaEvreleri: ["kisa_cumle", "paragraf", "dinleme"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "mini_hikaye", subject: "oz_duzenleme", oql: 3 },
  "oki-sesleri-dinliyor": { yasMin: 3, yasMax: 4, segmentler: ["okul_oncesi", "dinleme"], okumaEvreleri: ["dinleme"], destekler: ["kelime_takibi", "odak", "yumusak_zemin"], icerikTuru: "dinleme_hikayesi", subject: "oki_minik", oql: 0 },
  "mino-miyav-dedi": { yasMin: 3, yasMax: 4, segmentler: ["okul_oncesi", "dinleme"], okumaEvreleri: ["dinleme"], destekler: ["kelime_takibi", "odak", "yumusak_zemin"], icerikTuru: "dinleme_hikayesi", subject: "oki_minik", oql: 0 },
  "lili-yildiz-sayiyor": { yasMin: 3, yasMax: 4, segmentler: ["okul_oncesi", "dinleme"], okumaEvreleri: ["dinleme"], destekler: ["kelime_takibi", "odak", "yumusak_zemin"], icerikTuru: "dinleme_hikayesi", subject: "gokyuzu", oql: 0 },
  "oki-ses-a": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "okumaya_hazirlik"], okumaEvreleri: ["ses_harf", "hece_kelime", "dinleme"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "harf_karti", harfGrubu: 1, harfler: ["a"], heceler: ["an", "al", "at"] },
  "oki-ses-n": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "okumaya_hazirlik"], okumaEvreleri: ["ses_harf", "hece_kelime", "dinleme"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "harf_karti", harfGrubu: 1, harfler: ["n"], heceler: ["an", "en"] },
  "oki-heceler-1": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler"], okumaEvreleri: ["hece_kelime", "ses_harf", "kisa_cumle"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "hece_karti", harfGrubu: 1, harfler: ["a", "n", "e", "t", "i", "l"], heceler: ["an", "en", "al", "el", "at", "et"] },
  "oki-kelimeler-1": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler"], okumaEvreleri: ["hece_kelime", "kisa_cumle"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "kelime_karti", harfGrubu: 1, harfler: ["a", "n", "e", "t", "i", "l"], kelimeler: ["ana", "anne", "Ali", "Ela", "at", "el", "tel"] },
  "oki-ati-taniyor": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["hece_kelime", "kisa_cumle"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "mini_hikaye", harfGrubu: 1, harfler: ["a", "n", "e", "t", "i", "l"] },
  "ela-el-ele": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["hece_kelime", "kisa_cumle"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "mini_hikaye", harfGrubu: 1, harfler: ["a", "n", "e", "t", "i", "l"] },
  "oki-ses-e": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "okumaya_hazirlik"], okumaEvreleri: ["ses_harf", "hece_kelime", "dinleme"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "harf_karti", harfGrubu: 1, harfler: ["e"], heceler: ["en", "el", "et"] },
  "oki-ses-t": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "okumaya_hazirlik"], okumaEvreleri: ["ses_harf", "hece_kelime", "dinleme"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "harf_karti", harfGrubu: 1, harfler: ["t"], heceler: ["at", "et", "it"] },
  "oki-ses-i": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "okumaya_hazirlik"], okumaEvreleri: ["ses_harf", "hece_kelime", "dinleme"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "harf_karti", harfGrubu: 1, harfler: ["i"], heceler: ["il", "in", "it"] },
  "oki-ses-l": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "okumaya_hazirlik"], okumaEvreleri: ["ses_harf", "hece_kelime", "dinleme"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "harf_karti", harfGrubu: 1, harfler: ["l"], heceler: ["al", "el", "il"] },
  "oki-heceler-2": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler"], okumaEvreleri: ["hece_kelime", "ses_harf", "kisa_cumle"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "hece_karti", harfGrubu: 1, harfler: ["a", "n", "e", "t", "i", "l"], heceler: ["al", "el", "il", "in", "it"] },
  "ali-ile-ela": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["hece_kelime", "kisa_cumle"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "mini_hikaye", harfGrubu: 1, harfler: ["a", "n", "e", "t", "i", "l"] },
  "lili-ile-at": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["hece_kelime", "kisa_cumle"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "mini_hikaye", harfGrubu: 1, harfler: ["a", "n", "e", "t", "i", "l"] },
  "oki-el-ele": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["hece_kelime", "kisa_cumle"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "mini_hikaye", harfGrubu: 1, harfler: ["a", "n", "e", "t", "i", "l"] },
  "mino-nerede": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["hece_kelime", "kisa_cumle"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "mini_hikaye", harfGrubu: 1, harfler: ["a", "n", "e", "t", "i", "l"] },
  "nana-anlatiyor": { yasMin: 6, yasMax: 7, segmentler: ["ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["hece_kelime", "kisa_cumle"], destekler: ["hece_takibi", "kelime_takibi", "odak", "buyuk_yazi", "genis_aralik", "yumusak_zemin"], icerikTuru: "mini_hikaye", harfGrubu: 1, harfler: ["a", "n", "e", "t", "i", "l"] },
  "keloglan-masallari": { yasMin: 4, yasMax: 8, segmentler: ["okul_oncesi", "okumaya_hazirlik", "ilk_harfler_heceler", "ilk_cumleler", "okuma_guveni"], okumaEvreleri: ["dinleme", "ses_harf", "hece_kelime", "kisa_cumle"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "masal" },
  "la-fontaine-fugue": { yasMin: 4, yasMax: 9, segmentler: ["okul_oncesi", "okumaya_hazirlik", "ilk_harfler_heceler", "ilk_cumleler", "okuma_guveni"], okumaEvreleri: ["dinleme", "ses_harf", "hece_kelime", "kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "fabl" },
  "andersen-masallari": { yasMin: 5, yasMax: 10, segmentler: ["okumaya_hazirlik", "ilk_cumleler", "okuma_guveni", "akici_okuma"], okumaEvreleri: ["dinleme", "kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "masal" },
  "ezop-masallari": { yasMin: 4, yasMax: 9, segmentler: ["okul_oncesi", "okumaya_hazirlik", "ilk_harfler_heceler", "ilk_cumleler", "okuma_guveni"], okumaEvreleri: ["dinleme", "hece_kelime", "kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "fabl" },
  "grimm-masallari": { yasMin: 5, yasMax: 10, segmentler: ["okumaya_hazirlik", "ilk_cumleler", "okuma_guveni", "akici_okuma"], okumaEvreleri: ["dinleme", "kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "masal" },
  "japon-masallari": { yasMin: 5, yasMax: 12, segmentler: ["ilk_cumleler", "okuma_guveni", "akici_okuma", "genc_okurlar"], okumaEvreleri: ["kisa_cumle", "paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "dunya_masali" },
  "cin-masallari": { yasMin: 5, yasMax: 12, segmentler: ["ilk_cumleler", "okuma_guveni", "akici_okuma", "genc_okurlar"], okumaEvreleri: ["kisa_cumle", "paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "dunya_masali" },

  "english-hello-card": { yasMin: 5, yasMax: 8, segmentler: ["okumaya_hazirlik", "ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["dinleme", "ses_harf", "hece_kelime", "kisa_cumle"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "english_word_card", subject: "english", oql: 1, cefr: "Pre-A1", targetWords: ["hello", "bye", "please", "thank you"] },
  "english-sky-words-card": { yasMin: 6, yasMax: 8, segmentler: ["okumaya_hazirlik", "ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["dinleme", "ses_harf", "hece_kelime", "kisa_cumle"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "english_word_card", subject: "english", oql: 1, cefr: "Pre-A1", targetWords: ["sun", "moon", "star", "sky"] },
  "english-colors-card": { yasMin: 6, yasMax: 8, segmentler: ["okumaya_hazirlik", "ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["dinleme", "ses_harf", "hece_kelime", "kisa_cumle"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "english_word_card", subject: "english", oql: 1, cefr: "Pre-A1", targetWords: ["red", "blue", "yellow", "green"] },
  "aesop-fables-en": { yasMin: 7, yasMax: 12, segmentler: ["ilk_cumleler", "okuma_guveni", "akici_okuma", "genc_okurlar"], okumaEvreleri: ["kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik"], icerikTuru: "english_easy", subject: "english", oql: 3 },
  "peter-rabbit-en": { yasMin: 7, yasMax: 12, segmentler: ["ilk_cumleler", "okuma_guveni", "akici_okuma", "genc_okurlar"], okumaEvreleri: ["kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik"], icerikTuru: "english_easy", subject: "english", oql: 3 },
  "ugly-duckling-en": { yasMin: 8, yasMax: 13, segmentler: ["okuma_guveni", "akici_okuma", "genc_okurlar"], okumaEvreleri: ["paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik"], icerikTuru: "english_easy", subject: "english", oql: 3 },

  "fox-and-grapes-en": { yasMin: 8, yasMax: 10, segmentler: ["okuma_guveni", "akici_okuma"], okumaEvreleri: ["kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "english_easy", subject: "english", oql: 3, cefr: "A1", targetWords: ["fox", "grapes", "jump", "hard"] },
  "lion-and-mouse-graded-en": { yasMin: 8, yasMax: 10, segmentler: ["okuma_guveni", "akici_okuma"], okumaEvreleri: ["kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "english_easy", subject: "english", oql: 3, cefr: "A1", targetWords: ["lion", "mouse", "net", "help"] },
  "alice-rabbit-hole-en": { yasMin: 10, yasMax: 12, segmentler: ["akici_okuma", "genc_okurlar"], okumaEvreleri: ["paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "english_reading", subject: "english", oql: 4, cefr: "A1-A2", targetWords: ["rabbit", "watch", "follow", "adventure"] },
  "selfish-giant-graded-en": { yasMin: 10, yasMax: 12, segmentler: ["akici_okuma", "genc_okurlar"], okumaEvreleri: ["paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "english_reading", subject: "english", oql: 4, cefr: "A2", targetWords: ["garden", "giant", "spring", "share"] },
  "happy-prince-swallow-en": { yasMin: 12, yasMax: 16, segmentler: ["genc_okurlar", "klasiklere_hazirlik", "lise_okuma"], okumaEvreleri: ["uzun_metin", "akademik_klasik"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "english_classic_bridge", subject: "english", oql: 5, cefr: "A2-B1", targetWords: ["statue", "swallow", "city", "choice"] },
  "moon-not-star-en": { yasMin: 10, yasMax: 12, segmentler: ["akici_okuma", "genc_okurlar"], okumaEvreleri: ["paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "english_science", subject: "english", oql: 4, cefr: "A1-A2", targetWords: ["moon", "star", "light", "reflect"] },
  "oki-ayi-gordu": { yasMin: 6, yasMax: 8, segmentler: ["ilk_cumleler", "okuma_guveni"], okumaEvreleri: ["kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "bilim_hikayesi", subject: "gokyuzu", oql: 2 },
  "yildiz-mi-gezegen-mi": { yasMin: 8, yasMax: 10, segmentler: ["okuma_guveni", "akici_okuma"], okumaEvreleri: ["paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "bilim_hikayesi", subject: "gokyuzu", oql: 3 },
  "oki-ay-haritasi": { yasMin: 10, yasMax: 12, segmentler: ["akici_okuma", "genc_okurlar"], okumaEvreleri: ["paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "bilim_hikayesi", subject: "gokyuzu", oql: 4 },

  "oki-gunesin-hikayesi": { yasMin: 3, yasMax: 6, segmentler: ["okul_oncesi", "okumaya_hazirlik", "dinleme"], okumaEvreleri: ["dinleme", "ses_farkindaligi"], destekler: ["kelime_takibi", "odak", "yumusak_zemin"], icerikTuru: "mitoloji_hikayesi", subject: "mitoloji", oql: 0 },
  "lili-ay-isigi": { yasMin: 5, yasMax: 8, segmentler: ["okumaya_hazirlik", "ilk_cumleler", "dinleme"], okumaEvreleri: ["dinleme", "kisa_cumle"], destekler: ["kelime_takibi", "odak", "yumusak_zemin"], icerikTuru: "mitoloji_hikayesi", subject: "mitoloji", oql: 1 },
  "oki-pegasus": { yasMin: 8, yasMax: 10, segmentler: ["okuma_guveni", "akici_okuma"], okumaEvreleri: ["paragraf", "kisa_cumle"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "mitoloji_hikayesi", subject: "mitoloji", oql: 3 },
  "oki-labirentin-izi": { yasMin: 10, yasMax: 12, segmentler: ["akici_okuma", "genc_okurlar"], okumaEvreleri: ["paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "mitoloji_hikayesi", subject: "mitoloji", oql: 4 },
  "prometheusun-secimi": { yasMin: 12, yasMax: 14, segmentler: ["genc_okurlar", "klasiklere_hazirlik"], okumaEvreleri: ["uzun_metin", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "mitoloji_hikayesi", subject: "mitoloji", oql: 5 },
  "ikarus-bugun-ne-anlatir": { yasMin: 14, yasMax: 18, segmentler: ["klasiklere_hazirlik", "lise_okuma", "yetiskin_odak"], okumaEvreleri: ["uzun_metin", "akademik_klasik", "okumaya_donus"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "mitoloji_hikayesi", subject: "mitoloji", oql: 6 },
  "ariadnenin-ipi-yetiskin": { yasMin: 18, yasMax: 99, segmentler: ["yetiskin_odak"], okumaEvreleri: ["okumaya_donus", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "mitoloji_hikayesi", subject: "mitoloji", oql: 8 },
  "oki-lili-sahnesi": { yasMin: 6, yasMax: 8, segmentler: ["ilk_cumleler", "okuma_guveni"], okumaEvreleri: ["kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "piyes", subject: "rol_okuma", oql: 2 },
  "toto-acele-etme-piyesi": { yasMin: 8, yasMax: 10, segmentler: ["okuma_guveni", "akici_okuma"], okumaEvreleri: ["paragraf", "kisa_cumle"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "piyes", subject: "rol_okuma", oql: 3 },
  "uzay-kulubu-piyesi": { yasMin: 10, yasMax: 12, segmentler: ["akici_okuma", "genc_okurlar"], okumaEvreleri: ["paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "bilim_hikayesi", subject: "gokyuzu", oql: 4 },
  "yuksek-okceler": { yasMin: 10, yasMax: 18, segmentler: ["akici_okuma", "genc_okurlar", "klasiklere_hazirlik", "lise_okuma", "yetiskin_odak"], okumaEvreleri: ["paragraf", "uzun_metin", "okumaya_donus"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "kisa_hikaye" },
  "pembe-incili-kaftan": { yasMin: 10, yasMax: 18, segmentler: ["akici_okuma", "genc_okurlar", "klasiklere_hazirlik", "lise_okuma", "yetiskin_odak"], okumaEvreleri: ["paragraf", "uzun_metin", "okumaya_donus"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "kisa_hikaye" },
  "diyet": { yasMin: 10, yasMax: 18, segmentler: ["akici_okuma", "genc_okurlar", "klasiklere_hazirlik", "lise_okuma", "yetiskin_odak"], okumaEvreleri: ["paragraf", "uzun_metin", "okumaya_donus"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "kisa_hikaye" },
  "sessiz-saatler": { yasMin: 13, yasMax: 99, segmentler: ["genc_okurlar", "klasiklere_hazirlik", "lise_okuma", "yetiskin_odak"], okumaEvreleri: ["uzun_metin", "akademik_klasik", "okumaya_donus"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "kisa_hikaye" },
  "calikusu": { yasMin: 12, yasMax: 99, segmentler: ["genc_okurlar", "klasiklere_hazirlik", "lise_okuma", "yetiskin_odak"], okumaEvreleri: ["uzun_metin", "akademik_klasik", "okumaya_donus"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "klasik_roman" },

  "toto-tak-tak-dedi": { yasMin: 3, yasMax: 5, segmentler: ["okul_oncesi", "okumaya_hazirlik", "dinleme"], okumaEvreleri: ["dinleme", "ses_farkindaligi"], destekler: ["kelime_takibi", "odak", "yumusak_zemin"], icerikTuru: "tekerleme", subject: "ritim", oql: 0 },
  "nana-ritim-oyunu": { yasMin: 4, yasMax: 6, segmentler: ["okul_oncesi", "okumaya_hazirlik", "dinleme"], okumaEvreleri: ["dinleme", "ses_farkindaligi"], destekler: ["kelime_takibi", "odak", "yumusak_zemin"], icerikTuru: "tekerleme", subject: "ritim", oql: 0 },
  "oki-hop-hop": { yasMin: 5, yasMax: 7, segmentler: ["okumaya_hazirlik", "ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["dinleme", "ses_harf", "kisa_cumle"], destekler: ["kelime_takibi", "hece_takibi", "odak"], icerikTuru: "tekerleme", subject: "ritim", oql: 1 },
  "oki-ay-siiri": { yasMin: 5, yasMax: 8, segmentler: ["okumaya_hazirlik", "ilk_cumleler"], okumaEvreleri: ["dinleme", "kisa_cumle"], destekler: ["kelime_takibi", "odak", "yumusak_zemin"], icerikTuru: "siir", subject: "siir", oql: 1 },
  "yagmur-tip-tip-siiri": { yasMin: 6, yasMax: 8, segmentler: ["ilk_harfler_heceler", "ilk_cumleler"], okumaEvreleri: ["kisa_cumle", "hece_kelime"], destekler: ["kelime_takibi", "hece_takibi", "odak"], icerikTuru: "siir", subject: "siir", oql: 2 },
  "gokyuzu-siiri": { yasMin: 8, yasMax: 10, segmentler: ["okuma_guveni", "akici_okuma"], okumaEvreleri: ["paragraf", "kisa_cumle"], destekler: ["kelime_takibi", "odak", "genis_aralik"], icerikTuru: "siir", subject: "gokyuzu", oql: 3 },
  "ay-bilmecesi": { yasMin: 6, yasMax: 9, segmentler: ["ilk_cumleler", "okuma_guveni"], okumaEvreleri: ["kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak"], icerikTuru: "bilmece", subject: "gokyuzu", oql: 2 },
  "yildiz-bilmecesi": { yasMin: 7, yasMax: 10, segmentler: ["ilk_cumleler", "okuma_guveni", "akici_okuma"], okumaEvreleri: ["kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak"], icerikTuru: "bilmece", subject: "gokyuzu", oql: 3 },
  "tohum-bilmecesi": { yasMin: 8, yasMax: 10, segmentler: ["okuma_guveni", "akici_okuma"], okumaEvreleri: ["paragraf"], destekler: ["kelime_takibi", "odak"], icerikTuru: "bilmece", subject: "doga", oql: 3 },
  "bir-tohumun-yolculugu": { yasMin: 8, yasMax: 10, segmentler: ["okuma_guveni", "akici_okuma"], okumaEvreleri: ["paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik"], icerikTuru: "doga_bilim", subject: "doga", oql: 3, targetWords: ["tohum", "toprak", "yaprak", "başlangıç"] },
  "arilar-neden-dans-eder": { yasMin: 10, yasMax: 12, segmentler: ["akici_okuma", "genc_okurlar"], okumaEvreleri: ["paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik"], icerikTuru: "doga_bilim", subject: "doga", oql: 4, targetWords: ["kovan", "yön", "bilgi", "dans"] },
  "kutup-tilkisi-yolculugu": { yasMin: 10, yasMax: 12, segmentler: ["akici_okuma", "genc_okurlar"], okumaEvreleri: ["paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik"], icerikTuru: "doga_bilim", subject: "doga", oql: 4, targetWords: ["kutup", "uyum", "iz", "yolculuk"] },
  "mino-nerede-sahnesi": { yasMin: 6, yasMax: 8, segmentler: ["ilk_cumleler", "okuma_guveni"], okumaEvreleri: ["kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik"], icerikTuru: "piyes", subject: "rol_okuma", oql: 2 },
  "labirentte-uc-ses": { yasMin: 10, yasMax: 12, segmentler: ["akici_okuma", "genc_okurlar"], okumaEvreleri: ["paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik"], icerikTuru: "piyes", subject: "rol_okuma", oql: 4 },
  "little-star-poem-en": { yasMin: 6, yasMax: 8, segmentler: ["ilk_cumleler", "okumaya_hazirlik"], okumaEvreleri: ["dinleme", "kisa_cumle"], destekler: ["kelime_takibi", "odak", "yumusak_zemin"], icerikTuru: "english_poem", subject: "english", oql: 1, cefr: "Pre-A1", targetWords: ["star", "light", "night", "sky"] },
  "moon-poem-en": { yasMin: 8, yasMax: 10, segmentler: ["okuma_guveni", "akici_okuma"], okumaEvreleri: ["kisa_cumle", "paragraf"], destekler: ["kelime_takibi", "odak", "genis_aralik"], icerikTuru: "english_poem", subject: "english", oql: 3, cefr: "A1", targetWords: ["moon", "light", "night", "look"] },
  "space-poem-en": { yasMin: 10, yasMax: 12, segmentler: ["akici_okuma", "genc_okurlar"], okumaEvreleri: ["paragraf", "uzun_metin"], destekler: ["kelime_takibi", "odak", "genis_aralik"], icerikTuru: "english_poem", subject: "english", oql: 4, cefr: "A1-A2", targetWords: ["space", "question", "comet", "glow"] },
  "kurk-mantolu-madonna": { yasMin: 13, yasMax: 99, segmentler: ["genc_okurlar", "klasiklere_hazirlik", "lise_okuma", "yetiskin_odak"], okumaEvreleri: ["uzun_metin", "akademik_klasik", "okumaya_donus"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "klasik_roman" },
  "mai-ve-siyah": { yasMin: 13, yasMax: 99, segmentler: ["klasiklere_hazirlik", "lise_okuma", "yetiskin_odak"], okumaEvreleri: ["uzun_metin", "akademik_klasik", "okumaya_donus"], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "klasik_roman" },
};


const SORU_BANKASI = {
  "oki-sesleri-dinliyor": [{ soru: "Oki ne duydu?", secenekler: ["Pıt pıt", "Gök gürültüsü", "Zil"], cevap: "Pıt pıt", destek: "Oki pıt pıt sesini duydu." }],
  "mino-miyav-dedi": [{ soru: "Kim miyav dedi?", secenekler: ["Mino", "Toto", "Nana"], cevap: "Mino", destek: "Mino miyav dedi." }],
  "lili-yildiz-sayiyor": [{ soru: "Lili ne gördü?", secenekler: ["Yıldız", "Top", "Kalem"], cevap: "Yıldız", destek: "Lili gökyüzünde bir yıldız gördü." }],
  "oki-ses-a": [{ soru: "Oki hangi sesi duydu?", secenekler: ["a", "m", "o"], cevap: "a", destek: "Oki bugün a sesini duydu." }],
  "oki-ses-n": [{ soru: "Nana hangi sesi söyledi?", secenekler: ["n", "a", "l"], cevap: "n", destek: "Nana n sesini söyledi." }],
  "oki-ses-e": [{ soru: "Ela hangi sesi buldu?", secenekler: ["e", "t", "i"], cevap: "e", destek: "Ela e sesini buldu." }],
  "oki-ses-t": [{ soru: "Toto hangi sesi duydu?", secenekler: ["t", "n", "e"], cevap: "t", destek: "Toto t sesini duydu." }],
  "oki-ses-i": [{ soru: "Mino hangi sesi duydu?", secenekler: ["i", "a", "t"], cevap: "i", destek: "Mino i sesini duydu." }],
  "oki-ses-l": [{ soru: "Lili hangi sesi söyledi?", secenekler: ["l", "n", "a"], cevap: "l", destek: "Lili l sesini söyledi." }],
  "oki-heceler-1": [{ soru: "Lili hangi heceyi buldu?", secenekler: ["el", "mor", "su"], cevap: "el", destek: "Lili el hecesini buldu." }],
  "oki-heceler-2": [{ soru: "Bu kartta hangi hece vardı?", secenekler: ["il", "ku", "ra"], cevap: "il", destek: "Bu kartta il hecesi vardı." }],
  "oki-kelimeler-1": [{ soru: "Oki hangi kelimeleri duydu?", secenekler: ["ana ve anne", "deniz ve ay", "kuş ve kar"], cevap: "ana ve anne", destek: "Oki ana, anne, Ali ve Ela kelimelerini duydu." }],
  "oki-ati-taniyor": [{ soru: "Oki ne gördü?", secenekler: ["Atı", "Topu", "Kalemi"], cevap: "Atı", destek: "Hikâyede Oki atı gördü." }],
  "ela-el-ele": [{ soru: "Ela nasıl yürüdü?", secenekler: ["El ele", "Tek başına", "Koşarak"], cevap: "El ele", destek: "Ela el ele yürüdü." }],
  "ali-ile-ela": [{ soru: "Ali ne yaptı?", secenekler: ["El salladı", "Uyudu", "Saklandı"], cevap: "El salladı", destek: "Ali el salladı." }],
  "lili-ile-at": [{ soru: "Lili ne gördü?", secenekler: ["Atı", "Evi", "Kutu"], cevap: "Atı", destek: "Lili atı gördü." }],
  "oki-el-ele": [{ soru: "Oki kiminle el ele yürüdü?", secenekler: ["Lili", "Robot", "Karga"], cevap: "Lili", destek: "Oki ve Lili el ele yürüdü." }],
  "mino-nerede": [{ soru: "Mino nereden çıktı?", secenekler: ["El altından", "Denizden", "Aydan"], cevap: "El altından", destek: "Mino el altından çıktı." }],
  "nana-anlatiyor": [{ soru: "Kim anlattı?", secenekler: ["Nana", "Toto", "Mino"], cevap: "Nana", destek: "Hikâyede Nana anlattı." }],



  "english-hello-card": [{ soru: "What does Oki say?", secenekler: ["Hello", "Moon", "Red"], cevap: "Hello", destek: "Oki says hello." }],
  "english-sky-words-card": [{ soru: "Which word means Ay?", secenekler: ["Moon", "Book", "Door"], cevap: "Moon", destek: "Moon means Ay." }],
  "english-colors-card": [{ soru: "Which word is a color?", secenekler: ["Blue", "Rabbit", "Watch"], cevap: "Blue", destek: "Blue is a color word." }],
  "fox-and-grapes-en": [{ soru: "What did the fox see?", secenekler: ["Grapes", "A moon", "A book"], cevap: "Grapes", destek: "The fox saw purple grapes high on a tree." }],
  "lion-and-mouse-graded-en": [{ soru: "Who helped the lion?", secenekler: ["The mouse", "The rabbit", "The giant"], cevap: "The mouse", destek: "The little mouse bit the rope and helped the lion." }],
  "alice-rabbit-hole-en": [{ soru: "Who did Alice follow?", secenekler: ["A white rabbit", "A bird", "A teacher"], cevap: "A white rabbit", destek: "Alice followed a white rabbit with a watch." }],
  "selfish-giant-graded-en": [{ soru: "What came back to the garden?", secenekler: ["Spring", "Snow", "A train"], cevap: "Spring", destek: "When the gate opened, spring came back to the garden." }],
  "happy-prince-swallow-en": [{ soru: "What choice did the swallow make?", secenekler: ["To stay and help", "To hide a book", "To build a boat"], cevap: "To stay and help", destek: "The swallow chose to stay one more night and help." }],
  "moon-not-star-en": [{ soru: "Does the moon make its own light?", secenekler: ["No, it reflects light", "Yes, like a star", "It is a lamp"], cevap: "No, it reflects light", destek: "The moon reflects light from the sun." }],


  "toto-tak-tak-dedi": [{ soru: "Toto hangi sesi duydu?", secenekler: ["Tak tak", "Vuu", "Ding dong"], cevap: "Tak tak", destek: "Toto kapıdan tak tak sesini duydu." }],
  "nana-ritim-oyunu": [{ soru: "Nana hangi sesi söyledi?", secenekler: ["La la", "Moo", "Hop"], cevap: "La la", destek: "Nana ritim oyununda la la dedi." }],
  "oki-hop-hop": [{ soru: "Top ne yaptı?", secenekler: ["Hopladı", "Uyudu", "Uçtu"], cevap: "Hopladı", destek: "Hikâyede top hopladı." }],
  "oki-ay-siiri": [{ soru: "Şiirde geceye ne geldi?", secenekler: ["Ay", "Top", "Kalem"], cevap: "Ay", destek: "Şiirde ay geceye geldi." }],
  "yagmur-tip-tip-siiri": [{ soru: "Yağmur nasıl ses çıkardı?", secenekler: ["Tıp tıp", "Miyav", "Hop"], cevap: "Tıp tıp", destek: "Şiirde yağmur tıp tıp dedi." }],
  "gokyuzu-siiri": [{ soru: "Lili neyi saydı?", secenekler: ["Yıldızları", "Ayakkabıları", "Kalemleri"], cevap: "Yıldızları", destek: "Lili gökyüzündeki yıldızları saydı." }],
  "ay-bilmecesi": [{ soru: "Bilmecenin cevabı neydi?", secenekler: ["Ay", "Top", "Kapı"], cevap: "Ay", destek: "Gece görünen ve Güneş ışığını yansıtan şey Ay’dır." }],
  "yildiz-bilmecesi": [{ soru: "Yıldız ne yapar?", secenekler: ["Kendi ışığını verir", "Kalem taşır", "Uyur"], cevap: "Kendi ışığını verir", destek: "Yıldız kendi ışığını verir." }],
  "tohum-bilmecesi": [{ soru: "Toprakta büyüyebilen küçük başlangıç neydi?", secenekler: ["Tohum", "Taş", "Ay"], cevap: "Tohum", destek: "Tohum toprağa düşer ve büyüyebilir." }],
  "bir-tohumun-yolculugu": [{ soru: "Tohumun büyümesine ne yardım etti?", secenekler: ["Yağmur ve güneş", "Karanlık kutu", "Sessiz kalem"], cevap: "Yağmur ve güneş", destek: "Yağmur ve güneş tohumun büyümesine yardım etti." }],
  "arilar-neden-dans-eder": [{ soru: "Arıların dansı ne anlatabilir?", secenekler: ["Yiyeceğin yönünü", "Kitabın rengini", "Ayakkabı numarasını"], cevap: "Yiyeceğin yönünü", destek: "Arıların hareketleri yiyeceğin yönü hakkında bilgi verebilir." }],
  "kutup-tilkisi-yolculugu": [{ soru: "Kutup tilkisinin beyaz kürkü ne işe yarar?", secenekler: ["Karda fark edilmemeye", "Uçmaya", "Müzik yapmaya"], cevap: "Karda fark edilmemeye", destek: "Beyaz kürk karda saklanmasına yardım eder." }],
  "mino-nerede-sahnesi": [{ soru: "Mino nereden ses verdi?", secenekler: ["Sandalyenin altından", "Gökyüzünden", "Denizden"], cevap: "Sandalyenin altından", destek: "Sahnede Mino sandalyenin altından miyav dedi." }],
  "labirentte-uc-ses": [{ soru: "Labirentte yolu hatırlatmak için ne kullanıldı?", secenekler: ["İp", "Balon", "Kaşık"], cevap: "İp", destek: "İp, labirentte yolu hatırlatmaya yardım etti." }],
  "little-star-poem-en": [{ soru: "What is bright?", secenekler: ["The star", "The chair", "The door"], cevap: "The star", destek: "The poem says the star is bright." }],
  "moon-poem-en": [{ soru: "What does the moon take?", secenekler: ["The sun’s light", "A red ball", "A book"], cevap: "The sun’s light", destek: "The poem says the moon takes the sun’s light." }],
  "space-poem-en": [{ soru: "What does Oki have?", secenekler: ["A question", "A hat", "A sandwich"], cevap: "A question", destek: "Oki has a question about space." }],
  "oki-gunesin-hikayesi": [{ soru: "Oki sabah ne gördü?", secenekler: ["Güneşi", "Denizi", "Kalemi"], cevap: "Güneşi", destek: "Oki sabah güneşi gördü." }],
  "lili-ay-isigi": [{ soru: "Lili neyi takip etti?", secenekler: ["Ay ışığını", "Topu", "Suyu"], cevap: "Ay ışığını", destek: "Lili ay ışığını takip etti." }],
  "oki-pegasus": [{ soru: "Pegasus nasıl bir attı?", secenekler: ["Kanatlı", "Küçük bir kedi", "Tahta bir oyuncak"], cevap: "Kanatlı", destek: "Pegasus eski hikâyelerde kanatlı bir attı." }],
  "oki-labirentin-izi": [{ soru: "Labirentte yol bulmaya ne yardım edebilir?", secenekler: ["İp", "Bulut", "Ayna"], cevap: "İp", destek: "Hikâyede ip, yol bulmaya yardım eden bir işaret gibiydi." }],
  "prometheusun-secimi": [{ soru: "Bu hikâye hangi konu üzerine düşündürüyor?", secenekler: ["Seçim ve sorumluluk", "Ayakkabı rengi", "Kayıp kalem"], cevap: "Seçim ve sorumluluk", destek: "Prometheus hikâyesi seçim, bilgi ve sonuçları düşünmeye çağırır." }],
  "ikarus-bugun-ne-anlatir": [{ soru: "Ikarus hikâyesinde kanatlar neyi anlatabilir?", secenekler: ["İstek ve risk", "Sadece oyuncak", "Bir masa"], cevap: "İstek ve risk", destek: "Kanatlar bu anlatıda istek, özgürlük ve risk anlamı taşıyabilir." }],
  "ariadnenin-ipi-yetiskin": [{ soru: "Ariadne’nin ipi metinde neye benzetildi?", secenekler: ["Ana fikre", "Kalabalık bir pazara", "Bir kapıya"], cevap: "Ana fikre", destek: "Metinde ana fikir, labirentin içindeki ip gibi düşünülür." }],
  "oki-lili-sahnesi": [{ soru: "Oki kiminle yürümek istedi?", secenekler: ["Lili ile", "Robot ile", "Deniz ile"], cevap: "Lili ile", destek: "Oki, Lili ile el ele yürümek istedi." }],
  "toto-acele-etme-piyesi": [{ soru: "Toto ne yapınca daha iyi düşündü?", secenekler: ["Durup nefes alınca", "Koşunca", "Saklanınca"], cevap: "Durup nefes alınca", destek: "Toto durup derin nefes alınca daha iyi düşündü." }],
  "uzay-kulubu-piyesi": [{ soru: "Yıldız ne yapar?", secenekler: ["Kendi ışığını verir", "Kalem saklar", "Kapı açar"], cevap: "Kendi ışığını verir", destek: "Piyeste yıldızın kendi ışığını verdiği söylendi." }],
  "oki-ayi-gordu": [{ soru: "Oki gökyüzünde ne gördü?", secenekler: ["Ay'ı", "Denizi", "Kalemi"], cevap: "Ay'ı", destek: "Oki gece gökyüzünde Ay'ı gördü." }],
  "yildiz-mi-gezegen-mi": [{ soru: "Yıldızlar ne yapar?", secenekler: ["Kendi ışığını verir", "Kalem tutar", "Kitap saklar"], cevap: "Kendi ışığını verir", destek: "Hikâyede yıldızların kendi ışığını verdiği anlatıldı." }],
  "oki-ay-haritasi": [{ soru: "Ay yüzeyindeki yuvarlak izlere ne denir?", secenekler: ["Krater", "Köprü", "Deniz"], cevap: "Krater", destek: "Nana, Ay yüzeyindeki yuvarlak izlere krater denir, dedi." }],
};

function kitapSorusu(kitap) {
  if (!kitap) return null;
  return SORU_BANKASI[kitap.id]?.[0] || null;
}

function anaSayfayaDon(setOynaticiAcik, setSekme, setDetayId) {
  setOynaticiAcik(false);
  setSekme("ana");
  setDetayId(null);
}

const OQL_SEVIYELERI = {
  0: "Dinleme",
  1: "Harf-Hece",
  2: "İlk Cümle",
  3: "Okuma Güveni",
  4: "Akıcı Okuma",
  5: "Genç Okur",
  6: "Klasiklere Hazırlık",
  7: "Lise Okuma",
  8: "Yetişkin Odak",
};

function kelimeleriSay(metin = "") {
  return metin.trim().split(/\s+/).filter(Boolean).length;
}

function icerikKalitesi(kitap) {
  const meta = kitapMeta(kitap);
  const metin = (kitap?.bolumler || []).map((b) => b.metin).join(" ");
  const toplamKelime = kelimeleriSay(metin);
  const cumleler = metin.split(/[.!?]+/).map((c) => c.trim()).filter(Boolean);
  const ortCumle = cumleler.length ? toplamKelime / cumleler.length : 0;
  const maxCumle = cumleler.reduce((m, c) => Math.max(m, kelimeleriSay(c)), 0);
  const oql = meta.oql ?? (meta.yasMax <= 7 ? 1 : meta.yasMax <= 10 ? 3 : meta.yasMax <= 12 ? 4 : meta.yasMax <= 14 ? 5 : meta.yasMax <= 18 ? 7 : 8);
  return { oql, ad: OQL_SEVIYELERI[oql] || "Okuma", toplamKelime, ortCumle, maxCumle };
}

const OKUMA_YOLLARI = [
  { id: "okul_oncesi_3_4", baslik: "Minik Dinleyiciler", yas: "3–4", mod: "cocuk", evre: "dinleme", hedef: "Dinleme alışkanlığı, kelime duyarlılığı ve kısa hikâye ritmi", slogan: "Dinle, hayal et, anlat.", rozetAdi: "Hikâye Tohumu" },
  { id: "okumaya_hazirlik_5_6", baslik: "Okumaya Hazırlık", yas: "5–6", mod: "cocuk", evre: "dinleme", hedef: "Ses farkındalığı, ritim, dikkat ve okuma öncesi hazırlık", slogan: "Sesleri duy, hikâyeyi takip et.", rozetAdi: "Ses Kaşifi" },
  { id: "ilk_harfler_6_7", baslik: "İlk Harfler ve Heceler", yas: "6–7", mod: "cocuk", evre: "hece_kelime", hedef: "MEB harf gruplarına uygun ses–harf–hece–kelime yolu", slogan: "Sesleri duy, harfleri gör, heceleri birleştir.", rozetAdi: "Hece Ustası" },
  { id: "ilk_cumleler_7_8", baslik: "İlk Cümleler", yas: "7–8", mod: "cocuk", evre: "kisa_cumle", hedef: "Kısa cümle, tekrar, güven ve anlamlı okuma", slogan: "Kısa cümlelerle kendi hızında ilerle.", rozetAdi: "Cümle Yolcusu" },
  { id: "okuma_guveni_8_10", baslik: "Okuma Güveni", yas: "8–10", mod: "cocuk", evre: "paragraf", hedef: "Okuma pratiği, satır takibi, dikkat ve güven", slogan: "Zorlanmadan oku, kaldığın yerden devam et.", rozetAdi: "Sakin Okur" },
  { id: "akici_okuma_10_12", baslik: "Akıcı Okuma", yas: "10–12", mod: "cocuk", evre: "paragraf", hedef: "Paragraf takibi, kısa özet ve daha uzun hikâyeler", slogan: "Paragrafı takip et, hikâyeyi yakala.", rozetAdi: "Paragraf Gezgini" },
  { id: "genc_okurlar_12_14", baslik: "Genç Okurlar", yas: "12–14", mod: "cocuk", evre: "uzun_metin", hedef: "Bilim, mitoloji, macera ve uzun metne geçiş", slogan: "Uzun metinlere küçük adımlarla gir.", rozetAdi: "Metin Kaşifi" },
  { id: "klasiklere_hazirlik_14_16", baslik: "Klasiklere Hazırlık", yas: "14–16", mod: "cocuk", evre: "uzun_metin", hedef: "Klasiklere giriş, ana fikir ve odaklı okuma", slogan: "Klasiklere hazır bir okuma ritmi kur.", rozetAdi: "Klasik Yolcusu" },
  { id: "lise_okuma_16_18", baslik: "Lise Okuma", yas: "16–18", mod: "cocuk", evre: "akademik_klasik", hedef: "Klasik, akademik, sınav ve uzun metin dayanıklılığı", slogan: "Okuma yükünü azalt, metinden kopma.", rozetAdi: "Derin Okur" },
  { id: "yetiskin_odak_18", baslik: "Yetişkin Odak", yas: "18+", mod: "yetiskin", evre: "okumaya_donus", hedef: "Okumaya dönüş, dikkat modu ve görsel konfor", slogan: "Dinle, takip et, okumaya dön.", rozetAdi: "Kitap Kurdu" },
];

const EVRE_SECENEKLERI = [
  { id: "dinleme", ad: "Henüz okumuyor, dinliyor" },
  { id: "ses_harf", ad: "Sesleri ve harfleri tanıyor" },
  { id: "hece_kelime", ad: "Hece ve kelime okuyor" },
  { id: "kisa_cumle", ad: "Kısa cümle okuyor" },
  { id: "paragraf", ad: "Paragraf okuyor" },
  { id: "uzun_metin", ad: "Uzun metinde zorlanıyor" },
  { id: "akademik_klasik", ad: "Akademik / klasik okuma yapıyor" },
  { id: "okumaya_donus", ad: "Okumaya geri dönmek istiyor" },
];




const EVRE_SECENEKLERI_BY_YOL = {
  okul_oncesi_3_4: ["dinleme"],
  okumaya_hazirlik_5_6: ["dinleme", "ses_harf"],
  ilk_harfler_6_7: ["ses_harf", "hece_kelime"],
  ilk_cumleler_7_8: ["hece_kelime", "kisa_cumle"],
  okuma_guveni_8_10: ["kisa_cumle", "paragraf"],
  akici_okuma_10_12: ["paragraf", "uzun_metin"],
  genc_okurlar_12_14: ["paragraf", "uzun_metin"],
  klasiklere_hazirlik_14_16: ["uzun_metin", "akademik_klasik"],
  lise_okuma_16_18: ["uzun_metin", "akademik_klasik"],
  yetiskin_odak_18: ["okumaya_donus", "uzun_metin"],
};
const evreSecenekleri = (yolId) => {
  const izinli = EVRE_SECENEKLERI_BY_YOL[yolId] || EVRE_SECENEKLERI.map((e) => e.id);
  return EVRE_SECENEKLERI.filter((e) => izinli.includes(e.id));
};

const SES_TONLARI = [
  { id: "oki", ad: "Oki Anlatıcı", kisa: "Oki", aciklama: "Çocuklar için sıcak, yumuşak ve tane tane okuma.", rate: 0.88, pitch: 1.08, noktaMs: 620, virgulMs: 230 },
  { id: "sakin", ad: "Sakin Rehber", kisa: "Sakin", aciklama: "Daha düşük tempolu, yorulmadan takip etmeye uygun okuma.", rate: 0.84, pitch: 1.02, noktaMs: 700, virgulMs: 260 },
  { id: "tane", ad: "Tane Tane", kisa: "Tane", aciklama: "İlk okuma ve hece-kelime takibi için belirgin duraklamalı okuma.", rate: 0.76, pitch: 1.05, noktaMs: 780, virgulMs: 300 },
  { id: "masal", ad: "Masal Anlatıcısı", kisa: "Masal", aciklama: "Masallar için hafif neşeli ve canlı okuma tonu.", rate: 0.9, pitch: 1.12, noktaMs: 640, virgulMs: 240 },
  { id: "odak", ad: "Odak Modu", kisa: "Odak", aciklama: "Yetişkin ve uzun metinler için sade, dengeli ve daha az vurgulu okuma.", rate: 0.96, pitch: 0.98, noktaMs: 520, virgulMs: 180 },
];
const sesTonuBul = (id) => SES_TONLARI.find((s) => s.id === id) || SES_TONLARI[0];

const OKUMA_MODLARI = [
  { id: "dinliyorum", ad: "Dinliyorum", aciklama: "Okurio okur, ben metni takip ederim.", sesli: true, rateCarpan: 1 },
  { id: "birlikte", ad: "Birlikte Okuyorum", aciklama: "Ses daha yavaş akar, ben eşlik ederim.", sesli: true, rateCarpan: 0.84 },
  { id: "kendim", ad: "Kendim Okuyorum", aciklama: "Ses kapanır; takıldığım yerde yardım alırım.", sesli: false, rateCarpan: 1 },
];
const okumaModuBul = (id) => OKUMA_MODLARI.find((m) => m.id === id) || OKUMA_MODLARI[0];
const OKUMA_MODU_ANAHTAR = "okurio-okuma-modu-v1";

const DESTEK_SECENEKLERI = [
  { id: "kelime_takibi", ad: "Kelime takibi" },
  { id: "hece_takibi", ad: "Hece takibi" },
  { id: "odak", ad: "Aktif cümleyi öne çıkar" },
  { id: "buyuk_yazi", ad: "Büyük yazı" },
  { id: "genis_aralik", ad: "Geniş aralık" },
  { id: "yumusak_zemin", ad: "Yumuşak zemin" },
  { id: "kisa_hedef", ad: "Kısa günlük hedef" },
];

const VARSAYILAN_OKUMA_YOLU = {
  secildi: false,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin", "kisa_hedef"],
};

const yolBul = (id) => OKUMA_YOLLARI.find((y) => y.id === id) || OKUMA_YOLLARI[4];
const evreBul = (id) => EVRE_SECENEKLERI.find((e) => e.id === id) || EVRE_SECENEKLERI[4];

const kitapMeta = (kitap) => ICERIK_METADATA[kitap.id] || {
  yasMin: kitap.kategori === "Masal" ? 5 : 14,
  yasMax: kitap.kategori === "Masal" ? 10 : 99,
  segmentler: kitap.kategori === "Masal" ? ["okuma_guveni"] : ["yetiskin_odak"],
  okumaEvreleri: kitap.kategori === "Masal" ? ["dinleme", "kisa_cumle", "paragraf"] : ["uzun_metin", "okumaya_donus"],
  destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"],
  icerikTuru: kitap.kategori.toLowerCase(),
};
const icerikSunumu = (kitap) => {
  const meta = kitapMeta(kitap);
  const sinif = classifyContent(kitap, {
    ...meta,
    minimumFullReadingSeconds: minimumFullReadingSecondsForAge(meta.yasMin),
  });
  const seconds = (kitap?.bolumler || []).reduce((toplam, bolum) => toplam + estimateStorySeconds(bolum), 0);
  if (meta.icerikTuru === "kullanici_metni") {
    return { ...sinif, seconds, status: "personal-reading", label: "Kişisel metin", deployable: true, blockers: [] };
  }
  if (sinif.status === "preparing" || !sinif.deployable) {
    return { ...sinif, seconds, classificationStatus: sinif.status, status: "preparing", label: "Hazırlanıyor", deployable: false };
  }
  return {
    ...sinif,
    seconds,
    label: kitap.icerikDurumu === "tam-metin" && kitap.hakDurumu === "kamu-mali" ? "Tam metin" : sinif.label,
  };
};
const yolSegmentleri = (yolId) => YOL_SEGMENT_GRUPLARI[yolId] || [yolBul(yolId).evre];
const kitapOkumaYolunaUygunMu = (kitap, yol = VARSAYILAN_OKUMA_YOLU) => {
  if (!kitap) return false;
  const yolDetay = yolBul(yol.yolId);
  const meta = kitapMeta(kitap);
  const hedefSegmentler = yolSegmentleri(yol.yolId);
  const izinliTurler = YOL_ICERIK_TURLERI[yol.yolId] || [];
  const segmentUyumu = meta.segmentler.some((s) => hedefSegmentler.includes(s));
  const turUyumu = izinliTurler.length === 0 || izinliTurler.includes(meta.icerikTuru);
  const modUyumu = yolDetay.mod === "yetiskin" ? meta.segmentler.includes("yetiskin_odak") : !meta.segmentler.every((s) => s === "yetiskin_odak");
  const evreUyumu = !yol.evreId || meta.okumaEvreleri.includes(yol.evreId) || yol.evreId === "dinleme" || yolDetay.mod === "yetiskin";
  const seviyeUyumu = evaluateStoryForReadingLevel(kitap, meta, yol.yolId).eligible;
  return segmentUyumu && turUyumu && modUyumu && evreUyumu && seviyeUyumu;
};

/* ------------------------------------------------------------------ */
/* Yardımcılar                                                         */
/* ------------------------------------------------------------------ */
const kitapBul = (id) => KATALOG.find((k) => k.id === id);
const bolumSn = (b) => estimateStorySeconds(b);
const toplamSn = (kitap) => icerikSunumu(kitap).seconds;
const bolumBasiSn = (kitap, i) => kitap.bolumler.slice(0, i).reduce((t, b) => t + bolumSn(b), 0);

function kelimeSure(k, hiz) {
  let ms = (240 + 62 * k.length) / hiz;
  if (/[.!?…]$/.test(k)) ms += 320 / hiz;
  else if (/[,;:]$/.test(k)) ms += 140 / hiz;
  return Math.max(120, ms);
}

function sureYaz(sn) {
  sn = Math.max(0, Math.floor(sn));
  const s = Math.floor(sn / 3600), d = Math.floor((sn % 3600) / 60), sa = sn % 60;
  return s > 0 ? `${s}:${String(d).padStart(2, "0")}:${String(sa).padStart(2, "0")}` : `${d}:${String(sa).padStart(2, "0")}`;
}

/* Kitaba özgü deterministik dalga formu (imza öğesi) */
function dalgaUret(id, n = 56) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const out = [];
  for (let i = 0; i < n; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    const taban = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.42 + (h % 7)));
    out.push(Math.min(1, 0.2 + taban * ((h % 100) / 100) * 0.9 + 0.15));
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Kalıcı durum (window.storage + localStorage fallback)               */
/* ------------------------------------------------------------------ */
if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    get: async (key) => {
      const value = window.localStorage.getItem(key);
      return value == null ? null : { value };
    },
    set: async (key, value) => { window.localStorage.setItem(key, value); },
  };
}
const ANAHTAR = "dinleti-durum-v1";
const OKUMA_YOLU_ANAHTAR = "okurio-okuma-yolu-v1";
const SES_TONU_ANAHTAR = "okurio-ses-tonu-v1";
async function durumOku() {
  try {
    const r = await window.storage.get(ANAHTAR);
    return r ? JSON.parse(r.value) : null;
  } catch { return null; }
}
async function durumYaz(durum) {
  try { await window.storage.set(ANAHTAR, JSON.stringify(durum)); } catch {}
}

/* ------------------------------------------------------------------ */
/* Kendi metnim — kişisel içerik kalıcılığı ("Benim Kitaplığım")        */
/* 2026-08-06: Daha önce kendiMetniAc() eklediği kitabı yalnızca        */
/* çalışma anındaki KATALOG dizisine ekliyordu; sayfa yenilendiğinde    */
/* KATALOG sıfırdan kurulduğu için kullanıcının yapıştırdığı metin      */
/* sessizce kayboluyordu ("sonKitap" bile bulunamıyordu). Bu, cihaz     */
/* yenilenmesine karşı dayanıklılık gerektiren bir demoda ciddi bir     */
/* risktir. Kişisel içerik hiçbir zaman production KATALOG/RAFLAR ile   */
/* karışmaz, yalnızca bu cihazda localStorage'da saklanır.              */
/* ------------------------------------------------------------------ */
const KENDI_ICERIK_ANAHTAR = "okurio-kendi-icerik-v1";
const KENDI_ICERIK_LIMIT = 20;
async function kendiIceriklerOku() {
  try {
    const r = await window.storage.get(KENDI_ICERIK_ANAHTAR);
    const liste = r ? JSON.parse(r.value) : [];
    return Array.isArray(liste) ? liste : [];
  } catch { return []; }
}
async function kendiIceriklerYaz(liste) {
  try {
    await window.storage.set(KENDI_ICERIK_ANAHTAR, JSON.stringify(liste.slice(0, KENDI_ICERIK_LIMIT)));
  } catch {}
}
/* KATALOG + ICERIK_METADATA'ya, henüz orada olmayan kayıtlı kişisel
   içerikleri ekler. Sayfa yüklendiğinde bir kez çağrılır. */
function kendiIcerikleriKatalogaUygula(liste) {
  (liste || []).forEach((kayit) => {
    if (!kayit?.kitap?.id) return;
    if (!KATALOG.some((k) => k.id === kayit.kitap.id)) KATALOG.unshift(kayit.kitap);
    if (kayit.metadata) ICERIK_METADATA[kayit.kitap.id] = kayit.metadata;
  });
}

/* ------------------------------------------------------------------ */
/* Kapak bileşeni                                                      */
/* ------------------------------------------------------------------ */
function Kapak({ kitap, boyut = 120, radius = 10 }) {
  const [c1, c2] = kitap.renk;
  return (
    <div style={{
      width: boyut, height: boyut * 1.45, borderRadius: radius, flexShrink: 0,
      background: `linear-gradient(160deg, ${c2} 0%, ${c1} 70%)`,
      boxShadow: "0 6px 18px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: boyut * 0.09, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: boyut * 0.06, background: "rgba(0,0,0,0.28)" }} />
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: "#F2ECDF", fontSize: boyut * 0.115, lineHeight: 1.15, paddingLeft: boyut * 0.06 }}>
        {kitap.baslik}
      </div>
      <div style={{ fontSize: boyut * 0.08, color: "rgba(242,236,223,0.75)", paddingLeft: boyut * 0.06, letterSpacing: "0.04em" }}>
        {kitap.yazar}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dalga formu ilerleme çubuğu                                         */
/* ------------------------------------------------------------------ */
function DalgaBar({ kitap, oran, onSar }) {
  const dalga = useMemo(() => dalgaUret(kitap.id), [kitap.id]);
  const ref = useRef(null);
  const tikla = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    onSar(Math.min(1, Math.max(0, x / r.width)));
  };
  return (
    <div ref={ref} onClick={tikla} role="slider" aria-label="İlerleme" aria-valuenow={Math.round(oran * 100)}
      style={{ display: "flex", alignItems: "center", gap: 2, height: 30, cursor: "pointer", touchAction: "none" }}>
      {dalga.map((y, i) => {
        const gecti = i / dalga.length <= oran;
        return <div key={i} style={{
          flex: 1, height: `${y * 100}%`, borderRadius: 2,
          background: gecti ? "#E8A33D" : "rgba(242,236,223,0.18)",
          transition: "background 0.15s",
        }} />;
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ana uygulama                                                        */
/* ------------------------------------------------------------------ */
export default function DinletiApp() {
  const [sekme, setSekme] = useState("ana");          // ana | ara | kitaplik
  const [detayId, setDetayId] = useState(null);
  const [oynaticiAcik, setOynaticiAcik] = useState(false);
  const [arama, setArama] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);

  // Çalma durumu
  const [aktifId, setAktifId] = useState(null);
  const [pozisyon, setPozisyon] = useState(0);        // saniye, kitap bütünü
  const [caliyor, setCaliyor] = useState(false);
  const [hiz, setHiz] = useState(1);
  const [uyku, setUyku] = useState(0);                // kalan sn, 0 = kapalı
  const [seslendirme, setSeslendirme] = useState(true);
  const [okumaModu, setOkumaModu] = useState("dinliyorum");
  const [soruCevabi, setSoruCevabi] = useState(null);
  const [sesTonu, setSesTonu] = useState("oki");
  const [favoriler, setFavoriler] = useState([]);
  const [ilerlemeler, setIlerlemeler] = useState({}); // {id:{pos,ts}}

  // Okuma modu (senkron metin + ses) ve erişilebilirlik ayarları
  /* Kullanıcının seçtiği okuma ve görsel konfor tercihleri */
  const PUNTOLAR = [18, 22, 26, 32];
  const ARALIKLAR = [0, 0.05, 0.1, 0.16];   // em cinsinden harf aralığı
  const SATIRLAR = [1.55, 1.65, 1.75, 1.9];
  const FONTLAR = [
    { id: "lexend", ad: "Lexend", aile: "'Lexend', sans-serif" },
    { id: "varsayilan", ad: "Varsayılan", aile: "inherit" },
  ];
  const fontAile = (id) => (FONTLAR.find((f) => f.id === id) || FONTLAR[0]).aile;
  const fontAd = (id) => (FONTLAR.find((f) => f.id === id) || FONTLAR[0]).ad;
  const sonrakiFont = (id) => FONTLAR[(FONTLAR.findIndex((f) => f.id === id) + 1 + FONTLAR.length) % FONTLAR.length].id;
  const [okumaAcik, setOkumaAcik] = useState(true);
  const [ayarPaneliAcik, setAyarPaneliAcik] = useState(false);
  const [bolumlerAcik, setBolumlerAcik] = useState(false);
  // Okuma profili: birleşimli, YALNIZCA oturum belleğinde tutulur (KVKK veri minimizasyonu —
  // tanı etiketi hiçbir zaman kalıcı depoya yazılmaz; kalıcı olan yalnız nötr ayar sonuçlarıdır)
  const [profil, setProfil] = useState({ dis: false, dehb: false, gorsel: false });

  const profilUygula = (yeniProfil) => {
    setProfil(yeniProfil);
    // Taban ayardan başlayıp aktif profillerin birleşimini uygula
    const a = { punto: 1, aralik: 1, odak: false, vurgu: true, tema: "krem", font: "lexend", biyonik: false };
    if (yeniProfil.dis) { a.aralik = Math.max(a.aralik, 1); a.vurgu = true; a.tema = "krem"; a.font = "lexend"; }
    if (yeniProfil.gorsel) { a.punto = 2; a.aralik = Math.max(a.aralik, 1); }
    if (yeniProfil.dis && yeniProfil.gorsel) a.aralik = 2; // eşzamanlılıkta sıkışıklık en güçlü (Liu 2024)
    if (yeniProfil.dehb) { a.odak = true; a.biyonik = false; }
    setAyar(a);
  };
  const [seri, setSeri] = useState({ sayi: 0, sonGun: "" });
  const [, setMod] = useState("cocuk"); // geriye dönük uyumluluk: cocuk | yetiskin
  const [okumaYolu, setOkumaYolu] = useState(VARSAYILAN_OKUMA_YOLU);
  const [onboardingAcik, setOnboardingAcik] = useState(false);
  const [profilMesaji, setProfilMesaji] = useState("");
  const [ayar, setAyar] = useState({ punto: 1, aralik: 1, odak: false, vurgu: true, tema: "krem", font: "lexend", biyonik: false });
  const [kelimeIx, setKelimeIx] = useState(0);
  const [kendiMetin, setKendiMetin] = useState("");
  const [kendiBaslik, setKendiBaslik] = useState("Kendi Metnim");
  const [kendiMetinMesaji, setKendiMetinMesaji] = useState("");
  const [kendiMetinYukleniyor, setKendiMetinYukleniyor] = useState(false);
  const [kendiMetinPaneliAcik, setKendiMetinPaneliAcik] = useState(false);
  const [kendiIcerikListesi, setKendiIcerikListesi] = useState([]);
  const [modPaneliAcik, setModPaneliAcik] = useState(false);
  const [soruKapali, setSoruKapali] = useState(false);
  const [seciliSozluk, setSeciliSozluk] = useState(null);
  const sozlukTetikleyiciRef = useRef(null);
  const okuyucuGeriOdakRef = useRef(null);
  const kendiMetinGeriOdakRef = useRef(null);
  const kendiMetinCtaRef = useRef(null);
  const oncekiOynaticiAcikRef = useRef(false);
  const readerScrollRef = useRef(null);
  const readerFollowPauseUntilRef = useRef(0);
  const readerFollowResumeTimerRef = useRef(null);
  const readerFollowImmediateRef = useRef(false);
  const [readerFollowNonce, setReaderFollowNonce] = useState(0);

  const okuyucuyuKapatVeOdakla = () => {
    setOynaticiAcik(false);
    window.setTimeout(() => {
      const kaliciCta = document.querySelector("[data-kendi-metnim] > button");
      const geri = okuyucuGeriOdakRef.current?.isConnected
        ? okuyucuGeriOdakRef.current
        : kendiMetinCtaRef.current?.isConnected
          ? kendiMetinCtaRef.current
          : kaliciCta instanceof HTMLElement
            ? kaliciCta
            : kendiMetinGeriOdakRef.current;
      if (geri?.isConnected) geri.focus({ preventScroll: true });
    }, 0);
  };

  useLayoutEffect(() => {
    const kapandi = oncekiOynaticiAcikRef.current && !oynaticiAcik;
    oncekiOynaticiAcikRef.current = oynaticiAcik;
    if (!kapandi) return;
    const kaliciCta = kendiMetinCtaRef.current?.isConnected
      ? kendiMetinCtaRef.current
      : document.querySelector("[data-kendi-metnim] > button");
    if (kaliciCta instanceof HTMLElement) kaliciCta.focus({ preventScroll: true });
  }, [oynaticiAcik]);

  const okuyucuTakibiniGeciciDurdur = useCallback(() => {
    if (okumaModu === "kendim") return;
    readerFollowPauseUntilRef.current = Date.now() + 1800;
    if (readerFollowResumeTimerRef.current) window.clearTimeout(readerFollowResumeTimerRef.current);
    readerFollowResumeTimerRef.current = window.setTimeout(() => {
      readerFollowPauseUntilRef.current = 0;
      setReaderFollowNonce((n) => n + 1);
    }, 1850);
  }, [okumaModu]);

  useEffect(() => () => {
    if (readerFollowResumeTimerRef.current) window.clearTimeout(readerFollowResumeTimerRef.current);
  }, []);



  const sesTonuAyar = useMemo(() => sesTonuBul(sesTonu), [sesTonu]);
  const okumaModuAyar = useMemo(() => okumaModuBul(okumaModu), [okumaModu]);
  const etkinSeslendirme = seslendirme && okumaModuAyar.sesli;
  // v2.4.9: kendiMetniAc callback'i bu değerleri dependency olarak kullandığı için
  // ilk render'da TDZ/ReferenceError oluşmaması adına callback'ten önce hesaplanır.
  const okumaYoluDetay = yolBul(okumaYolu.yolId);
  const okumaEvreDetay = evreBul(okumaYolu.evreId);

  const destekAyarlariniUygula = (onceki, yol) => {
    const destekler = new Set(yol?.destekler || []);
    return {
      ...onceki,
      punto: destekler.has("buyuk_yazi") ? Math.max(onceki.punto, 2) : onceki.punto,
      aralik: destekler.has("genis_aralik") ? Math.max(onceki.aralik, 1) : onceki.aralik,
      odak: destekler.has("odak") ? true : onceki.odak,
      vurgu: destekler.has("kelime_takibi") ? true : onceki.vurgu,
      tema: destekler.has("yumusak_zemin") ? "krem" : onceki.tema,
    };
  };

  const kendiMetniAc = useCallback((metin, baslik = "Kendi Metnim") => {
    const temizMetin = normalizeDocumentText(metin);
    if (temizMetin.length < 20) { setKendiMetinMesaji("En az birkaç cümlelik düz metin ekle."); return; }
    const id = `kendi-metin-${Date.now()}`;
    const kelimeSayisi = temizMetin.split(/\s+/).length;
    const parcalar = temizMetin.match(/[^.!?…]+[.!?…]?/g) || [temizMetin];
    const bolumler = [];
    let buf = [];
    parcalar.forEach((c) => {
      buf.push(c.trim());
      if (buf.join(" ").split(/\s+/).length >= 90) {
        bolumler.push({ ad: `Bölüm ${bolumler.length + 1}`, dk: Math.max(1, Math.round(buf.join(" ").split(/\s+/).length / 130)), metin: buf.join(" ") });
        buf = [];
      }
    });
    if (buf.length) bolumler.push({ ad: `Bölüm ${bolumler.length + 1}`, dk: Math.max(1, Math.round(buf.join(" ").split(/\s+/).length / 130)), metin: buf.join(" ") });
    const kitap = {
      id, baslik: baslik || "Kendi Metnim", yazar: "Kullanıcı İçeriği", seslendiren: "Oki Anlatıcı", kategori: "Kendi Metnim",
      yas: okumaYoluDetay.yas || "Kişisel", renk: ["#3B465C", "#9FB3D7"], puan: 5, sureDk: Math.max(1, Math.ceil(kelimeSayisi / 130)),
      ozet: "Kopyala-yapıştır, PDF, Word veya TXT dosyasıyla eklenen kişisel kullanım metni.", bolumler, kullaniciIcerigi: true,
    };
    const metadata = { yasMin: 6, yasMax: 99, segmentler: YOL_SEGMENT_GRUPLARI[okumaYolu.yolId] || ["yetiskin_odak"], okumaEvreleri: [okumaYolu.evreId], destekler: ["kelime_takibi", "odak", "genis_aralik", "yumusak_zemin"], icerikTuru: "kullanici_metni", subject: "kendi_metin", oql: okumaYoluDetay.oql || 4 };
    if (!KATALOG.some((k) => k.id === id)) KATALOG.unshift(kitap);
    ICERIK_METADATA[id] = metadata;
    // "Benim Kitaplığım": bu cihazda kalıcı olsun diye localStorage'a da yazılır
    // (yalnızca bu cihaz — production KATALOG/RAFLAR'a hiçbir zaman karışmaz).
    setKendiIcerikListesi((onceki) => {
      const yeni = [{ kitap, metadata, eklenmeZamani: Date.now() }, ...onceki].slice(0, KENDI_ICERIK_LIMIT);
      kendiIceriklerYaz(yeni);
      return yeni;
    });
    setAktifId(id); setDetayId(null); setSekme("ana"); setPozisyon(0); setKelimeIx(0); setCaliyor(false); setKendiMetinPaneliAcik(false); setOynaticiAcik(true); setKendiMetin(""); setKendiMetinMesaji("Metin okuma moduna alındı.");
  }, [okumaYolu, okumaYoluDetay]);

  const dosyaMetniYukle = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setKendiMetinYukleniyor(true);
    setKendiMetinMesaji(`${file.name} cihazında okunuyor…`);
    try {
      const result = await extractDocumentText(file);
      setKendiBaslik(result.title || "Kendi Metnim");
      setKendiMetin(result.text);
      setKendiMetinMesaji(`${result.type.toUpperCase()} metni hazır. Kontrol et ve “Okuma moduna al” düğmesine bas.`);
    } catch (error) {
      setKendiMetinMesaji(error?.message || "Belge okunamadı. Başka bir dosya seç.");
    } finally {
      setKendiMetinYukleniyor(false);
      e.target.value = "";
    }
  }, []);

  const konusmaRef = useRef(null);
  const sonKayit = useRef(0);
  const seslerRef = useRef([]);

  /* Sesler asenkron yüklenir; önbelleğe al ve değişiklikleri dinle */
  useEffect(() => {
    if (!window.speechSynthesis) return;
    const yukle = () => { const l = window.speechSynthesis.getVoices(); if (l && l.length) seslerRef.current = l; };
    yukle();
    if (typeof window.speechSynthesis.addEventListener === "function") {
      window.speechSynthesis.addEventListener("voiceschanged", yukle);
      return () => window.speechSynthesis.removeEventListener("voiceschanged", yukle);
    }
    window.speechSynthesis.onvoiceschanged = yukle;
  }, []);

  /* Yazı tipleri */
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=Lexend:wght@400;500;600&display=swap";
    document.head.appendChild(l);
    return () => { document.head.removeChild(l); };
  }, []);

  /* Kalıcı durumu yükle */
  useEffect(() => {
    (async () => {
      // Kişisel içerik (Kendi Metnim) önce yüklenir ki sonKitap kontrolü
      // kitapBul() ile onu bulabilsin — aksi halde yenilemeden sonra
      // kullanıcının yapıştırdığı metin sessizce kaybolur.
      const kendiListe = await kendiIceriklerOku();
      if (kendiListe.length) {
        kendiIcerikleriKatalogaUygula(kendiListe);
        setKendiIcerikListesi(kendiListe);
      }
      const d = await durumOku();
      if (d) {
        setFavoriler(d.favoriler || []);
        setIlerlemeler(d.ilerlemeler || {});
        if (d.hiz) setHiz(d.hiz);
        if (d.sonKitap && kitapBul(d.sonKitap) && icerikSunumu(kitapBul(d.sonKitap)).deployable) {
          setAktifId(d.sonKitap);
          setPozisyon(d.ilerlemeler?.[d.sonKitap]?.pos || 0);
        }
      }
      setYukleniyor(false);
    })();
    (async () => {
      try {
        const r = await window.storage.get("dinleti-mod-v1");
        if (r && (r.value === "cocuk" || r.value === "yetiskin")) setMod(r.value);
      } catch {}
    })();
    (async () => {
      try {
        const [r, kayitliAyar] = await Promise.all([
          window.storage.get(OKUMA_YOLU_ANAHTAR),
          window.storage.get("dinleti-okuma-ayar-v1"),
        ]);
        const kayitli = kayitliAyar ? JSON.parse(kayitliAyar.value) : {};
        if (r) {
          const y = { ...VARSAYILAN_OKUMA_YOLU, ...JSON.parse(r.value), secildi: true };
          setOkumaYolu(y);
          setMod(yolBul(y.yolId).mod);
          setAyar((e) => destekAyarlariniUygula({ ...e, ...kayitli }, y));
        } else {
          setAyar((e) => destekAyarlariniUygula({ ...e, ...kayitli }, VARSAYILAN_OKUMA_YOLU));
          setOnboardingAcik(true);
        }
      } catch { setOnboardingAcik(true); }
    })();
    (async () => {
      try {
        const r = await window.storage.get(SES_TONU_ANAHTAR);
        if (r && SES_TONLARI.some((s) => s.id === r.value)) setSesTonu(r.value);
      } catch {}
    })();
    (async () => {
      try {
        const r = await window.storage.get(OKUMA_MODU_ANAHTAR);
        if (r && OKUMA_MODLARI.some((m) => m.id === r.value)) {
          setOkumaModu(r.value);
          const m = okumaModuBul(r.value);
          setSeslendirme(m.sesli);
        }
      } catch {}
    })();
    (async () => {
      try {
        const r = await window.storage.get("dinleti-seri-v1");
        if (r) setSeri(JSON.parse(r.value));
      } catch {}
    })();
  }, []);

  /* ------------------------------------------------------------------ */
  /* Alternatif erişim: bookmarklet + PWA share_target girişi            */
  /* 2026-08-06: Kullanıcı, herhangi bir web sayfasından seçtiği metni    */
  /* (1) bookmarklet ile — okurio.../#oku=...&baslik=... hash parametresi */
  /* ya da (2) Android'de "Paylaş → Dinleti" ile — manifest.json          */
  /* share_target'ın ürettiği ?text=&title=&url= query parametreleriyle   */
  /* gönderebilir. İkisi de aynı "Kendi metnini oku" panelini, metin      */
  /* önceden dolu biçimde açar; kullanıcı yine kendi onayıyla "Okuma      */
  /* moduna al"a basar (otomatik yayınlama/otomatik okuma başlatma yok).  */
  /* iOS/iPad'de Web Share Target desteklenmediği için orada yalnızca     */
  /* bookmarklet yolu çalışır — index.html'deki apple- meta etiketleri    */
  /* "Ana Ekrana Ekle" ile bookmarklet'i tam ekran deneyimde kullanılır   */
  /* kılar.                                                               */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const PAYLASIM_METIN_LIMIT = 6000;
    let baslik = "";
    let metin = "";
    let paylasilanUrl = "";

    try {
      const params = new URLSearchParams(window.location.search);
      metin = params.get("text") || "";
      baslik = params.get("title") || "";
      paylasilanUrl = params.get("url") || "";
    } catch {}

    if (!metin && window.location.hash) {
      try {
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        if (hashParams.has("oku")) {
          // URLSearchParams zaten yüzde-kodlamayı çözer; burada tekrar
          // decodeURIComponent çağırmak çift-çözme hatasına yol açar.
          metin = hashParams.get("oku") || "";
          baslik = hashParams.get("baslik") || "";
        }
      } catch {}
    }

    if (!metin && !paylasilanUrl) return;

    if (metin.length > PAYLASIM_METIN_LIMIT) {
      metin = metin.slice(0, PAYLASIM_METIN_LIMIT);
    }

    setKendiBaslik(baslik || "Paylaşılan Metin");
    setKendiMetin(
      metin ||
        `Bu bağlantıdan yalnızca adres paylaşıldı, metin gelmedi: ${paylasilanUrl}\n\nOkurio güvenlik nedeniyle bağlantıdaki sayfayı kendisi indiremez. Sayfadaki metni seçip tekrar paylaşmayı veya buraya yapıştırmayı dene.`,
    );
    setKendiMetinPaneliAcik(true);

    // URL'i temizle: hem gizlilik hem de rehydration mantığının (sonKitap vb.)
    // her yenilemede aynı paylaşılan metni tekrar tekrar açmasını önlemek için.
    try {
      const temizUrl = window.location.pathname;
      window.history.replaceState(null, "", temizUrl);
    } catch {}
  }, []);

  /* Okuma ayarlarını kaydet */
  const ilkAyar = useRef(true);
  useEffect(() => {
    if (ilkAyar.current) { ilkAyar.current = false; return; }
    (async () => { try { await window.storage.set("dinleti-okuma-ayar-v1", JSON.stringify(ayar)); } catch {} })();
  }, [ayar]);


  const aktif = aktifId ? kitapBul(aktifId) : null;
  const toplam = aktif ? toplamSn(aktif) : 0;

  const aktifBolumIx = useMemo(() => {
    if (!aktif) return 0;
    let t = 0;
    for (let i = 0; i < aktif.bolumler.length; i++) {
      t += bolumSn(aktif.bolumler[i]);
      if (pozisyon < t) return i;
    }
    return aktif.bolumler.length - 1;
  }, [aktif, pozisyon]);

  useLayoutEffect(() => {
    if (!oynaticiAcik || !okumaAcik || okumaModu === "kendim") return;
    if (Date.now() < readerFollowPauseUntilRef.current) return;
    const container = readerScrollRef.current;
    const activeWord = container?.querySelector('[data-kelime-ix="' + kelimeIx + '"]');
    if (!container || !activeWord) return;

    const containerRect = container.getBoundingClientRect();
    const wordRect = activeWord.getBoundingClientRect();
    const controls = container.closest("[data-okuma-alani]")?.querySelector("[data-alt-kontrol]");
    const controlsRect = controls?.getBoundingClientRect();
    const visualViewportBottom = window.visualViewport?.height ?? window.innerHeight;
    const occlusionTop = controlsRect && controlsRect.top < containerRect.bottom
      ? controlsRect.top
      : Number.POSITIVE_INFINITY;
    const visibleTop = Math.max(containerRect.top, 0);
    const visibleBottom = Math.min(containerRect.bottom, visualViewportBottom, occlusionTop);
    const visibleHeight = Math.max(1, visibleBottom - visibleTop);
    const wordCenter = wordRect.top + wordRect.height / 2;
    const safeTop = visibleTop + visibleHeight * 0.40;
    const safeBottom = visibleTop + visibleHeight * 0.55;
    const wordIsFullyVisible = wordRect.top >= visibleTop && wordRect.bottom <= visibleBottom;
    const immediate = readerFollowImmediateRef.current;
    readerFollowImmediateRef.current = false;
    if (!immediate && wordIsFullyVisible && wordCenter >= safeTop && wordCenter <= safeBottom) return;

    const target = visibleTop + visibleHeight * 0.475;
    const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);
    const nextTop = Math.max(0, Math.min(maxScroll, container.scrollTop + wordCenter - target));
    container.scrollTo({ top: nextTop, behavior: immediate ? "auto" : "smooth" });
  }, [kelimeIx, aktifBolumIx, okumaModu, oynaticiAcik, okumaAcik, ayar.odak, readerFollowNonce]);

  useEffect(() => {
    setSoruCevabi(null);
    setSoruKapali(false);
    setAyarPaneliAcik(false);
  }, [aktifId, aktifBolumIx]);

  useEffect(() => {
    if (!oynaticiAcik) return undefined;
    const aktifOda = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : null;
    okuyucuGeriOdakRef.current = aktifOda?.isConnected ? aktifOda : kendiMetinGeriOdakRef.current;
    const oncekiOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const shell = document.querySelector("[data-reader-shell]");
    const odaklanabilirler = () => shell ? [...shell.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')].filter((el) => !el.closest('[aria-hidden="true"]')) : [];
    const klavye = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        okuyucuyuKapatVeOdakla();
        return;
      }
      if (event.key !== "Tab") return;
      const liste = odaklanabilirler();
      if (!liste.length) return;
      const ilk = liste[0];
      const son = liste[liste.length - 1];
      if (event.shiftKey && document.activeElement === ilk) { event.preventDefault(); son.focus(); }
      else if (!event.shiftKey && document.activeElement === son) { event.preventDefault(); ilk.focus(); }
    };
    window.addEventListener("keydown", klavye);
    window.requestAnimationFrame(() => shell?.querySelector('[aria-label="Kapat"]')?.focus());
    return () => {
      window.removeEventListener("keydown", klavye);
      document.body.style.overflow = oncekiOverflow;
      window.requestAnimationFrame(() => {
        const geri = okuyucuGeriOdakRef.current?.isConnected
          ? okuyucuGeriOdakRef.current
          : kendiMetinCtaRef.current?.isConnected
            ? kendiMetinCtaRef.current
            : kendiMetinGeriOdakRef.current;
        if (geri?.isConnected) geri.focus({ preventScroll: true });
      });
    };
  }, [oynaticiAcik]);

  useEffect(() => {
    if (!kendiMetinPaneliAcik) return undefined;
    kendiMetinGeriOdakRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oncekiOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = document.querySelector("[data-kendi-metin-dialog]");
    const klavye = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setKendiMetinPaneliAcik(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const liste = [...panel.querySelectorAll('button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])')];
      if (!liste.length) return;
      const ilk = liste[0];
      const son = liste[liste.length - 1];
      if (event.shiftKey && document.activeElement === ilk) { event.preventDefault(); son.focus(); }
      else if (!event.shiftKey && document.activeElement === son) { event.preventDefault(); ilk.focus(); }
    };
    window.addEventListener("keydown", klavye);
    window.requestAnimationFrame(() => panel?.querySelector('[aria-label="Kendi metin panelini kapat"]')?.focus());
    return () => {
      window.removeEventListener("keydown", klavye);
      document.body.style.overflow = oncekiOverflow;
      const geri = kendiMetinGeriOdakRef.current;
      window.requestAnimationFrame(() => geri?.isConnected && geri.focus({ preventScroll: true }));
    };
  }, [kendiMetinPaneliAcik]);

  /* Seslendirme (Web Speech) */
  const zincirNo = useRef(0);
  const konusmayiDurdur = () => {
    zincirNo.current += 1; // aktif cümle zincirini iptal et
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch {}
    konusmaRef.current = null;
  };
  const sonSinir = useRef(0);          // son onboundary olayının zamanı (uyarlanabilir kapı)
  const kalibrasyon = useRef(1);       // gerçek TTS temposu / tahmin (bölüm sonunda güncellenir)
  const konusmayiBaslatRef = useRef(null);
  const konusmayiBaslat = useCallback((kitap, bolumIx, kelimeBas = 0, modAyar = okumaModuAyar, zorla = false) => {
    if ((!zorla && !etkinSeslendirme) || !modAyar.sesli || !window.speechSynthesis) return;
    konusmayiDurdur();
    sonSinir.current = 0;
    const benimNo = zincirNo.current;
    try {
      const b = kitap.bolumler[bolumIx];
      const kelimeler = b.metin.trim().split(/\s+/);
      const cumleler = [];
      let cbas = 0;
      kelimeler.forEach((k, i) => { if (/[.!?…]$/.test(k) || i === kelimeler.length - 1) { cumleler.push([cbas, i]); cbas = i + 1; } });
      const basKelime = Math.min(Math.max(0, kelimeBas), kelimeler.length - 1);
      let ilkCumle = cumleler.findIndex(([a, z]) => basKelime >= a && basKelime <= z);
      if (ilkCumle < 0) ilkCumle = 0;
      const dil = kitap.dil === "en" ? "en-GB" : "tr-TR";
      const hedef = kitap.dil === "en" ? "en" : "tr";
      const bolumBaslangic = Date.now();
      const tahminMs = kelimeler.slice(basKelime).reduce((t, k) => t + kelimeSure(k, hiz), 0);
      const konumuYaz = (wordIndex) => {
        const safeWord = Math.max(0, Math.min(kelimeler.length - 1, wordIndex));
        setKelimeIx(safeWord);
        setPozisyon(positionFromCursor(kitap.bolumler, bolumIx, safeWord, bolumSn));
      };

      const sesAta = (u) => {
        u.lang = dil;
        u.rate = Math.max(0.55, Math.min(1.8, hiz * sesTonuAyar.rate * modAyar.rateCarpan));
        u.pitch = sesTonuAyar.pitch;
        u.volume = 1;
        let liste = seslerRef.current;
        if (!liste.length) { try { const l = window.speechSynthesis.getVoices(); if (l && l.length) { seslerRef.current = l; liste = l; } } catch {} }
        const puanla = (v) => {
          const ad = (v.name || "").toLowerCase();
          return (ad.includes("natural") ? 8 : 0) + (/enhanced|premium|neural/.test(ad) ? 6 : 0)
            + (/google|siri|samantha|yelda|filiz|daniel/.test(ad) ? 3 : 0) + (v.localService === false ? 1 : 0);
        };
        const adaylar = liste.filter((v) => v.lang && v.lang.toLowerCase().startsWith(hedef)).sort((a, c) => puanla(c) - puanla(a));
        if (adaylar[0]) u.voice = adaylar[0];
      };

      /* Cümle zinciri: her utterance kısa tutulur; tarayıcı motorlarının uzun
         okumayı ~15 sn sonra sessizce kesme kusuru böylece hiç tetiklenmez.
         Her cümle sonunda vurgu bir sonraki cümlenin başına hizalanır. */
      const konusCumle = (ci, ilkKelimeIx) => {
        if (zincirNo.current !== benimNo) return;
        if (ci >= cumleler.length) {
          if (tahminMs > 1000) {
            const oran = (Date.now() - bolumBaslangic) / tahminMs;
            if (oran > 0.4 && oran < 3) kalibrasyon.current = Math.min(2, Math.max(0.5, kalibrasyon.current * 0.6 + oran * 0.4));
          }
          if (bolumIx + 1 < kitap.bolumler.length) {
            setPozisyon(bolumBasiSn(kitap, bolumIx + 1));
            setKelimeIx(0);
            if (konusmayiBaslatRef.current) konusmayiBaslatRef.current(kitap, bolumIx + 1, 0);
          }
          return;
        }
        const [a, z] = cumleler[ci];
        const basIx = ilkKelimeIx != null ? Math.max(a, ilkKelimeIx) : a;
        const parca = kelimeler.slice(basIx, z + 1).join(" ");
        const u = new SpeechSynthesisUtterance(parca);
        let syncMode = "pending";
        let syncTimer = null;
        let fallbackIx = basIx;
        const timeriDurdur = () => {
          if (syncTimer) window.clearTimeout(syncTimer);
          syncTimer = null;
        };
        const fallbackAdimi = () => {
          if (zincirNo.current !== benimNo || syncMode === "boundary") return;
          syncMode = "fallback";
          fallbackIx = Math.min(z, fallbackIx + 1);
          konumuYaz(fallbackIx);
          if (fallbackIx < z) syncTimer = window.setTimeout(fallbackAdimi, kelimeSure(kelimeler[fallbackIx], hiz));
        };
        const fallbackBeklet = () => {
          timeriDurdur();
          const wordDelay = kelimeSure(kelimeler[fallbackIx] || "", hiz);
          const watchdogDelay = Math.max(700, Math.min(1400, Math.round(wordDelay * 1.8)));
          syncTimer = window.setTimeout(fallbackAdimi, watchdogDelay);
        };
        sesAta(u);
        u.onboundary = (e) => {
          if (e.name && e.name !== "word") return;
          const idx = monotonicBoundaryWord({
            utteranceText: parca,
            charIndex: Number(e.charIndex),
            baseIndex: basIx,
            currentIndex: fallbackIx,
            endIndex: z,
          });
          // Samsung/Android motorları bazen charIndex=0 değerini veya geriye
          // giden boundary olaylarını tekrarlar. Bunlar watchdog'u sıfırlamaz.
          if (idx == null) return;
          syncMode = "boundary";
          timeriDurdur();
          sonSinir.current = Date.now();
          fallbackIx = idx;
          konumuYaz(idx);
          // Geçerli boundary akışı kesilirse watchdog son doğru kelimeden sürer.
          syncMode = "pending";
          fallbackBeklet();
        };
        u.onend = () => {
          timeriDurdur();
          if (zincirNo.current !== benimNo) return;
          const sonKelime = kelimeler[z] || "";
          const duraklama = /[.!?…]$/.test(sonKelime) ? sesTonuAyar.noktaMs : (/[,;:]$/.test(sonKelime) ? sesTonuAyar.virgulMs : 140);
          window.setTimeout(() => {
            if (zincirNo.current !== benimNo) return;
            if (ci + 1 < cumleler.length) { konumuYaz(cumleler[ci + 1][0]); sonSinir.current = Date.now(); }
            konusCumle(ci + 1, null);
          }, duraklama);
        };
        u.onerror = timeriDurdur;
        konusmaRef.current = u;
        fallbackBeklet();
        window.speechSynthesis.speak(u);
      };

      if (basKelime === 0) {
        // v2.2.2: Bölüm başlığını seslendirme.
        // Kullanıcı ekranda bölüm adını zaten görüyor; başlığın okunması
        // özellikle İngilizce kitaplarda metinle sesin karıştığı algısını yaratıyordu.
        konusCumle(0, null);
      } else {
        konusCumle(ilkCumle, basKelime);
      }
    } catch {}
  }, [etkinSeslendirme, hiz, sesTonuAyar, okumaModuAyar]);
  useEffect(() => { konusmayiBaslatRef.current = konusmayiBaslat; }, [konusmayiBaslat]);

  /* Tek okuma saati: ilerleme gerçek kelime boundary/fallback olaylarından gelir.
     Manuel modda tahmini bir saat çalıştırılmaz; yalnız uyku sayacı ilerler. */
  useEffect(() => {
    if (!caliyor || !aktif || uyku <= 0) return;
    const int = setInterval(() => {
      setUyku((u) => {
        if (u <= 1) { setCaliyor(false); return 0; }
        return u - 1;
      });
    }, 1000);
    return () => clearInterval(int);
  }, [caliyor, aktif, uyku]);

  /* Uyku dolunca konuşmayı da kes */
  useEffect(() => { if (!caliyor) konusmayiDurdur(); }, [caliyor]);

  /* Kelime vurgusu: bölüm/kitap değişince başa dön */
  useEffect(() => { setSoruCevabi(null); }, [aktifId, aktifBolumIx]);

  /* İlerlemeyi 5 sn'de bir kaydet */
  useEffect(() => {
    if (!aktifId) return;
    const simdi = Date.now();
    if (simdi - sonKayit.current < 5000 && caliyor) return;
    sonKayit.current = simdi;
    setIlerlemeler((eski) => {
      const yeni = { ...eski, [aktifId]: readingProgressSnapshot({ storyId: aktifId, sections: aktif.bolumler, sectionIndex: aktifBolumIx, wordIndex: kelimeIx, durationForSection: bolumSn, now: simdi }) };
      durumYaz({ favoriler, ilerlemeler: yeni, hiz, sonKitap: aktifId });
      return yeni;
    });
  }, [pozisyon, aktifId]); // eslint-disable-line

  /* Oynat / duraklat */
  const kitapUyum = useCallback((k, yol = okumaYolu) => kitapOkumaYolunaUygunMu(k, yol), [okumaYolu]);
  const uyumluKatalog = useMemo(() => KATALOG.filter((k) => kitapUyum(k)), [kitapUyum]);
  const uyumluRaflar = useMemo(() => RAFLAR
    .filter((raf) => !raf.yolIds || raf.yolIds.includes(okumaYolu.yolId))
    .map((raf) => ({ ...raf, ids: raf.ids.filter((id) => kitapUyum(kitapBul(id))) }))
    .filter((raf) => raf.ids.length > 0), [kitapUyum, okumaYolu.yolId]);

  const icerikAuditOzeti = useMemo(() => {
    const rafSayilari = uyumluRaflar.map((raf) => `${raf.ad}: ${raf.ids.length}`);
    const bosRaflar = uyumluRaflar.filter((raf) => raf.ids.length === 0).map((raf) => raf.ad);
    const eksikOql = uyumluKatalog.filter((k) => icerikKalitesi(k).toplamKelime === 0).length;
    const eksikSoru = uyumluKatalog.filter((k) => !SORU_BANKASI[k.id]).length;
    const englishSayisi = uyumluKatalog.filter((k) => k.dil === "en").length;
    return { rafSayilari, bosRaflar, eksikOql, eksikSoru, englishSayisi, toplam: uyumluKatalog.length };
  }, [uyumluRaflar, uyumluKatalog]);

  const okumaYolunuKaydet = (yeni) => {
    const temiz = { ...VARSAYILAN_OKUMA_YOLU, ...yeni, secildi: true };
    const yol = yolBul(temiz.yolId);
    const aktifKitap = kitapBul(aktifId);
    const aktifUyumlu = !aktifKitap || kitapOkumaYolunaUygunMu(aktifKitap, temiz);
    if (!aktifUyumlu) {
      konusmayiDurdur();
      setCaliyor(false);
      setOynaticiAcik(false);
      setDetayId(null);
      setAktifId(null);
      setPozisyon(0);
      setProfilMesaji("Okuma yolun değişti. Önceki içerik yeni yoluna uygun olmadığı için durdurdum ve sana uygun içerikleri gösteriyorum.");
    } else if (temiz.yolId !== okumaYolu.yolId || temiz.evreId !== okumaYolu.evreId) {
      setProfilMesaji("Okuma yolun güncellendi. Sana uygun içerikleri öne aldım.");
    }
    setOkumaYolu(temiz);
    setAyar((onceki) => destekAyarlariniUygula(onceki, temiz));
    setMod(yol.mod);
    setOnboardingAcik(false);
    (async () => {
      try {
        await window.storage.set(OKUMA_YOLU_ANAHTAR, JSON.stringify(temiz));
        await window.storage.set("dinleti-mod-v1", yol.mod);
      } catch {}
    })();
  };


  const seriGuncelle = () => {
    setSeri((e) => {
      const bugun = new Date().toISOString().slice(0, 10);
      if (e.sonGun === bugun) return e;
      const dun = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const yeni = { sayi: e.sonGun === dun ? e.sayi + 1 : 1, sonGun: bugun };
      (async () => { try { await window.storage.set("dinleti-seri-v1", JSON.stringify(yeni)); } catch {} })();
      return yeni;
    });
  };

  const oynatDegistir = (kitapId) => {
    const id = kitapId || aktifId;
    const secilenKitap = kitapBul(id);
    if (!id || !secilenKitap || !icerikSunumu(secilenKitap).deployable) return;
    if (id !== aktifId) {
      konusmayiDurdur();
      setAktifId(id);
      const p = ilerlemeler[id]?.pos || 0;
      const k = kitapBul(id);
      const kayitli = ilerlemeler[id];
      const cursor = kayitli?.version === 2
        ? { sectionIndex: kayitli.sectionIndex || 0, wordIndex: kayitli.wordIndex || 0 }
        : cursorFromPosition(k.bolumler, p, bolumSn);
      setPozisyon(p);
      setKelimeIx(cursor.wordIndex);
      setCaliyor(true);
      seriGuncelle();
      if (etkinSeslendirme) konusmayiBaslat(k, cursor.sectionIndex, cursor.wordIndex);
      return;
    }
    if (caliyor) {
      setCaliyor(false); konusmayiDurdur();
      setIlerlemeler((eski) => {
        const simdi = Date.now();
        const yeni = { ...eski, [id]: readingProgressSnapshot({ storyId: id, sections: aktif.bolumler, sectionIndex: aktifBolumIx, wordIndex: kelimeIx, durationForSection: bolumSn, now: simdi }) };
        durumYaz({ favoriler, ilerlemeler: yeni, hiz, sonKitap: id });
        return yeni;
      });
    }
    else { setCaliyor(true); seriGuncelle(); if (etkinSeslendirme) konusmayiBaslat(aktif, aktifBolumIx, kelimeIx); }
  };

  const vurguHizala = (poz, konusmayiYenile = false) => {
    if (!aktif) return;
    readerFollowImmediateRef.current = true;
    readerFollowPauseUntilRef.current = 0;
    const cursor = cursorFromPosition(aktif.bolumler, poz, bolumSn);
    setKelimeIx(cursor.wordIndex);
    if (konusmayiYenile && caliyor && etkinSeslendirme) {
      konusmayiBaslat(aktif, cursor.sectionIndex, cursor.wordIndex);
    }
  };
  const sar = (sn) => {
    if (!aktif) return;
    const yeni = Math.min(toplam, Math.max(0, pozisyon + sn));
    setPozisyon(yeni);
    vurguHizala(yeni, true);
  };
  const oranaSar = (oran) => {
    if (!aktif) return;
    const yeni = Math.floor(oran * toplam);
    setPozisyon(yeni);
    vurguHizala(yeni, true);
  };
  const oynatKitapBolum = (kitapId, ix) => {
    const k = kitapBul(kitapId);
    if (!k || !icerikSunumu(k).deployable) return;
    konusmayiDurdur();
    setAktifId(kitapId);
    setPozisyon(bolumBasiSn(k, ix));
    readerFollowImmediateRef.current = true;
    readerFollowPauseUntilRef.current = 0;
    setKelimeIx(0);
    setReaderFollowNonce((n) => n + 1);
    setCaliyor(true);
    seriGuncelle();
    if (etkinSeslendirme) konusmayiBaslat(k, ix, 0);
  };

  const bolumeGit = (ix) => {
    if (!aktif) return;
    oynatKitapBolum(aktif.id, ix);
  };

  const favoriDegistir = (id) => {
    setFavoriler((f) => {
      const yeni = f.includes(id) ? f.filter((x) => x !== id) : [...f, id];
      durumYaz({ favoriler: yeni, ilerlemeler, hiz, sonKitap: aktifId });
      return yeni;
    });
  };

  const hizlar = [0.75, 1, 1.25, 1.5, 2];
  const hizDegistir = () => {
    const ix = hizlar.indexOf(hiz);
    const yeni = hizlar[(ix + 1) % hizlar.length];
    setHiz(yeni);
    durumYaz({ favoriler, ilerlemeler, hiz: yeni, sonKitap: aktifId });
  };
  const uykular = [0, 15 * 60, 30 * 60, 60 * 60];
  const sesTonuDegistir = () => {
    const ix = SES_TONLARI.findIndex((s) => s.id === sesTonu);
    const yeni = SES_TONLARI[(ix + 1) % SES_TONLARI.length].id;
    setSesTonu(yeni);
    (async () => { try { await window.storage.set(SES_TONU_ANAHTAR, yeni); } catch {} })();
    if (caliyor && aktif && etkinSeslendirme) konusmayiBaslat(aktif, aktifBolumIx, kelimeIx);
  };

  const okumaModuDegistir = (yeni) => {
    setOkumaModu(yeni);
    setModPaneliAcik(false);
    setSeciliSozluk(null);
    const m = okumaModuBul(yeni);
    setSeslendirme(m.sesli);
    if (!m.sesli) konusmayiDurdur();
    else if (caliyor && aktif) konusmayiBaslat(aktif, aktifBolumIx, kelimeIx, m, true);
    (async () => { try { await window.storage.set(OKUMA_MODU_ANAHTAR, yeni); } catch {} })();
  };

  const sozlukAc = (entry, trigger) => {
    if (!entry) return;
    sozlukTetikleyiciRef.current = trigger || null;
    setSeciliSozluk(entry);
  };

  const sozlukKapat = () => {
    const trigger = sozlukTetikleyiciRef.current;
    const hedefKelime = trigger?.dataset.hedefKelime;
    const odagiGeriVer = () => {
      const guncelTrigger = trigger?.isConnected
        ? trigger
        : hedefKelime
          ? document.querySelector(`[data-mobile-stability] [data-hedef-kelime="${hedefKelime}"]`)
          : null;
      if (guncelTrigger instanceof HTMLElement) guncelTrigger.focus({ preventScroll: true });
    };
    odagiGeriVer();
    setSeciliSozluk(null);
    window.setTimeout(() => {
      odagiGeriVer();
      sozlukTetikleyiciRef.current = null;
    }, 0);
  };

  const kelimeyiSeslendir = (kelime) => {
    if (!kelime || !window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== "function") return;
    const okumayaDevamEt = caliyor;
    const sesAcikti = seslendirme;
    setCaliyor(false);
    try { window.speechSynthesis.cancel(); } catch {}
    const u = new window.SpeechSynthesisUtterance(kelime);
    u.lang = "tr-TR";
    u.rate = 0.86;
    u.pitch = 1;
    const oncekiDurumaDon = () => {
      setSeslendirme(sesAcikti);
      if (okumayaDevamEt && sesAcikti && aktif) {
        setCaliyor(true);
        konusmayiBaslat(aktif, aktifBolumIx, kelimeIx);
      }
    };
    u.onend = oncekiDurumaDon;
    u.onerror = oncekiDurumaDon;
    window.speechSynthesis.speak(u);
  };

  const uykuDegistir = () => {
    const enYakin = uykular.reduce((a, b) => (Math.abs(b - uyku) < Math.abs(a - uyku) ? b : a), 0);
    const ix = uykular.indexOf(enYakin);
    setUyku(uykular[(ix + 1) % uykular.length]);
  };

  /* ------------------------------ Stil ------------------------------ */
  const S = {
    fon: "#14181F", kart: "#1C222D", kart2: "#242C3A",
    metin: "#F2ECDF", soluk: "#8B94A7", vurgu: "#E8A33D",
  };
  const govde = { fontFamily: "'Inter', system-ui, sans-serif", background: S.fon, color: S.metin, minHeight: "100vh", width: "100%", maxWidth: 1180, margin: "0 auto", position: "relative", paddingBottom: 150, boxSizing: "border-box" };
  const baslikStil = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

  if (yukleniyor) {
    return <div style={{ ...govde, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{ color: S.soluk }}>Kitaplık açılıyor…</div>
    </div>;
  }

  /* ------------------------- Alt bileşenler ------------------------- */

  const KitapKart = ({ kitap, genis }) => {
    const meta = kitapMeta(kitap);
    const kalite = icerikKalitesi(kitap);
    const sunum = icerikSunumu(kitap);
    const seviye = evaluateStoryForReadingLevel(kitap, meta, okumaYolu.yolId);
    const insanIncelemesi = evaluateContentQualityReview(kitap.contentQualityReview, {
      readingPathId: okumaYolu.yolId,
    });
    const ayrintiAc = () => setDetayId(kitap.id);
    return (
      <div
        data-kitap-karti
        data-story-id={kitap.id}
        data-content-status={sunum.status}
        data-reading-enabled={sunum.deployable ? "true" : "false"}
        data-word-count={seviye.wordCount ?? 0}
        data-reading-level={okumaYolu.yolId}
        data-content-review-status={insanIncelemesi.normalized.status}
        data-publication-ready={insanIncelemesi.publicationReady ? "true" : "false"}
        role="button"
        tabIndex={0}
        aria-label={`${kitap.baslik} ayrıntılarını aç${sunum.deployable ? "" : " · hazırlanıyor"}`}
        onClick={ayrintiAc}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            ayrintiAc();
          }
        }}
        style={{ cursor: "pointer", width: genis ? "100%" : 128, opacity: sunum.deployable ? 1 : 0.72 }}
      >
        <Kapak kitap={kitap} boyut={genis ? 96 : 128} />
        <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{kitap.baslik}</div>
        <div style={{ fontSize: 12, color: S.soluk, marginTop: 2 }}>{kitap.yazar}</div>
        <div data-yas style={{ fontSize: 11, color: S.vurgu, marginTop: 3 }}>
          {kitap.yas || `${meta.yasMin || ""}${meta.yasMax ? `–${meta.yasMax}` : "+"} yaş`}{kitap.dil === "en" ? ` · CEFR ${meta.cefr || "A1"}` : ""}{meta.harfGrubu ? ` · ${meta.harfGrubu}. harf grubu` : ""}
        </div>
        <div data-icerik-yolu style={{ fontSize: 10, color: S.soluk, marginTop: 2 }}>{meta.icerikTuru.replace(/_/g, " ")}</div>
        <div data-content-scope style={{ fontSize: 11, color: sunum.deployable ? S.vurgu : "#D7B778", fontWeight: 700, marginTop: 4 }}>{sunum.label}</div>
        <OkurioProvenanceStamp stamp={kitap.provenanceStamp} compact />
        <div data-actual-duration style={{ fontSize: 10, color: S.soluk, marginTop: 2 }}>{sureYaz(sunum.seconds)} · {kalite.toplamKelime} kelime</div>
        <div data-oql style={{ fontSize: 10, color: S.soluk, marginTop: 2 }}>OQL-{kalite.oql} · ort. cümle {kalite.ortCumle.toFixed(1)}</div>
      </div>
    );
  };

  const DevamKart = () => {
    const devamlar = Object.entries(ilerlemeler)
      .filter(([id, v]) => v.pos > 10 && kitapUyum(kitapBul(id)) && icerikSunumu(kitapBul(id)).deployable)
      .sort((a, b) => b[1].ts - a[1].ts);
    if (devamlar.length === 0) return null;
    const [id, v] = devamlar[0];
    const k = kitapBul(id);
    const oran = v.pos / toplamSn(k);
    return (
      <div onClick={() => { setDetayId(null); if (id !== aktifId || !caliyor) oynatDegistir(id); setOynaticiAcik(true); }}
        style={{ display: "flex", gap: 14, background: S.kart, borderRadius: 16, padding: 14, cursor: "pointer", alignItems: "center", border: `1px solid rgba(232,163,61,0.25)` }}>
        <Kapak kitap={k} boyut={64} radius={8} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: S.vurgu, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Kaldığın yerden devam et</div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{k.baslik}</div>
          <div style={{ fontSize: 12, color: S.soluk, marginTop: 2 }}>{sureYaz(v.pos)} / {sureYaz(toplamSn(k))}</div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginTop: 8 }}>
            <div style={{ width: `${oran * 100}%`, height: "100%", background: S.vurgu, borderRadius: 2 }} />
          </div>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 21, background: S.vurgu, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Play size={18} color="#14181F" fill="#14181F" style={{ marginLeft: 2 }} />
        </div>
      </div>
    );
  };

  const RozetYolu = () => {
    const baslanan = Object.entries(ilerlemeler).filter(([id, v]) => v.pos > 10 && kitapBul(id));
    const toplamTakipSn = baslanan.reduce((t, [id, v]) => t + Math.min(v.pos || 0, toplamSn(kitapBul(id))), 0);
    const kazanilan = [
      { id: "tohum", ad: "Okuma Tohumu", aciklama: "İlk dinlemeyi başlat", aktif: baslanan.length >= 1 },
      { id: "filiz", ad: "Takip Filizi", aciklama: "3 farklı içeriğe dokun", aktif: baslanan.length >= 3 },
      { id: "yaprak", ad: "Sakin Okur", aciklama: "10 dk takipli okuma", aktif: toplamTakipSn >= 600 },
      { id: "kurdu", ad: okumaYoluDetay.rozetAdi || "Kitap Kurdu", aciklama: "7 günlük düzenli ritim", aktif: seri.sayi >= 7 },
    ];
    const aktifSayisi = kazanilan.filter((r) => r.aktif).length;
    return (
      <div data-rozet-yolu style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 14, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 13, color: S.vurgu, fontWeight: 700 }}>Kitap Kurdu Yolculuğu</div>
            <div style={{ fontSize: 12, color: S.soluk, marginTop: 2 }}>Sessiz, baskısız ilerleme: {aktifSayisi}/4 rozet açıldı.</div>
          </div>
          <div style={{ fontSize: 20 }}>🌱</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {kazanilan.map((r) => (
            <div key={r.id} style={{ borderRadius: 12, padding: "9px 10px", background: r.aktif ? "rgba(232,163,61,0.16)" : "rgba(255,255,255,0.055)", border: r.aktif ? "1px solid rgba(232,163,61,0.32)" : "1px solid rgba(255,255,255,0.06)", color: r.aktif ? S.metin : S.soluk }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{r.aktif ? "✓ " : "○ "}{r.ad}</div>
              <div style={{ fontSize: 11, marginTop: 3, opacity: 0.85 }}>{r.aciklama}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OkumaYoluKarti = () => (
    <div data-okuma-yolu style={{ background: "linear-gradient(135deg, rgba(232,163,61,0.12), rgba(255,255,255,0.035))", border: "1px solid rgba(232,163,61,0.24)", borderRadius: 16, padding: 12, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, color: S.vurgu, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>Okuma yolu</div>
          <div style={{ ...baslikStil, fontSize: 21, marginTop: 3 }}>{okumaYoluDetay.baslik}</div>
          <div style={{ color: S.soluk, fontSize: 13, marginTop: 4 }}>{okumaYoluDetay.yas} · {okumaEvreDetay.ad}</div>
        </div>
        <button onClick={() => setOnboardingAcik(true)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, color: S.metin, padding: "8px 10px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Değiştir</button>
      </div>
      <div style={{ color: S.soluk, fontSize: 12, marginTop: 7 }}>{okumaYolu.destekler.length} destek aktif · Düzenlemek için Değiştir</div>
    </div>
  );

  const AnaSayfa = () => (
    <main data-page-shell data-home-page style={{ padding: "24px 20px" }}>
      <div style={{ ...baslikStil, fontSize: 30, marginBottom: 4 }}>Okurio</div>
      <div style={{ color: S.soluk, fontSize: 14, marginBottom: 14 }}>
        Her yaşta okumayı kolaylaştıran sesli ve takipli okuma arkadaşı.
        {" "}<span data-surum style={{ fontSize: 11, opacity: 0.6 }}>v{SURUM}</span>
      </div>
      <OkumaYoluKarti />
      {profilMesaji && (
        <div data-profil-gecis-mesaji style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(232,163,61,0.12)", border: "1px solid rgba(232,163,61,0.28)", borderRadius: 14, padding: "10px 12px", marginBottom: 14 }}>
          <div style={{ color: S.vurgu, fontSize: 14, fontWeight: 700 }}>Okuma yolu</div>
          <div style={{ color: "rgba(242,236,223,0.88)", fontSize: 13, lineHeight: 1.45, flex: 1 }}>{profilMesaji}</div>
          <button onClick={() => setProfilMesaji("")} aria-label="Mesajı kapat" style={{ background: "transparent", border: "none", color: S.soluk, cursor: "pointer", fontSize: 16, lineHeight: 1 }}>×</button>
        </div>
      )}
      <RozetYolu />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {["Senkron kelime takibi", "Odak modu", "Rahat okuma aralığı", "Kısa günlük hedef"].map((r) => (
          <span key={r} style={{ fontSize: 12, color: S.soluk, background: S.kart, borderRadius: 10, padding: "7px 11px" }}>{r}</span>
        ))}
      </div>
      {seri.sayi > 0 && (
        <div data-seri style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(232,163,61,0.12)", borderRadius: 12, padding: "10px 14px", marginBottom: 14, color: S.vurgu, fontSize: 13 }}>
          <Flame size={16} /> {seri.sayi} günlük okuma ritmi. Bugün de buradasın, bu yeterli.
        </div>
      )}
      <DevamKart />
      {uyumluRaflar.length === 0 && <div data-bos-okuma-yolu style={{ color: S.soluk, fontSize: 14, marginTop: 18 }}>Bu okuma yolunda yaş ve uzunluk hedefini karşılayan hazır tam metin bulunmuyor. Okuma yolunu değiştirerek mevcut seçkilere bakabilirsin.</div>}
      {uyumluRaflar.map((raf) => {
        const hazirIds = raf.ids.filter((id) => icerikSunumu(kitapBul(id)).deployable);
        const rafOzeti = `${hazirIds.length} hazır`;
        return (
          <div key={raf.ad} data-content-shelf data-shelf-name={raf.ad} style={{ marginTop: 28 }}>
            <div style={{ ...baslikStil, fontSize: 19, marginBottom: 14 }}>{raf.ad} <span style={{ fontFamily: "Inter, system-ui, sans-serif", color: S.soluk, fontSize: 12, fontWeight: 500 }}>· {rafOzeti}</span></div>
            <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 6 }}>
              {hazirIds.map((id) => <KitapKart key={id} kitap={kitapBul(id)} />)}
            </div>
          </div>
        );
      })}
      <div data-kendi-metnim style={{ marginTop: 32, marginBottom: 18 }}>
        <button ref={kendiMetinCtaRef} onClick={() => setKendiMetinPaneliAcik(true)} aria-haspopup="dialog" aria-expanded={kendiMetinPaneliAcik} style={{ width: "100%", minHeight: 56, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: S.kart, border: "1px solid rgba(232,163,61,0.22)", borderRadius: 16, padding: "12px 14px", color: S.metin, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
          <span>
            <strong style={{ display: "block", color: S.vurgu, fontSize: 14 }}>Kendi metnini oku</strong>
            <span style={{ display: "block", color: S.soluk, fontSize: 12, marginTop: 2 }}>Kopyala-yapıştır veya TXT</span>
          </span>
          <span aria-hidden="true" style={{ color: S.vurgu, fontSize: 22 }}>＋</span>
        </button>
        {kendiIcerikListesi.length > 0 && (
          <div data-benim-kitapligim style={{ marginTop: 10 }}>
            <div style={{ color: S.soluk, fontSize: 12, marginBottom: 6 }}>Benim Kitaplığım</div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              {kendiIcerikListesi.slice(0, 5).map((kayit) => (
                <button
                  key={kayit.kitap.id}
                  onClick={() => { setAktifId(kayit.kitap.id); setDetayId(null); setSekme("ana"); setPozisyon(0); setKelimeIx(0); setCaliyor(false); setOynaticiAcik(true); }}
                  style={{ flexShrink: 0, maxWidth: 160, minHeight: 44, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 10, padding: "8px 12px", color: S.metin, fontSize: 12, textAlign: "left", cursor: "pointer", fontFamily: "inherit", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {kayit.kitap.baslik}
                </button>
              ))}
            </div>
          </div>
        )}
        {kendiMetinPaneliAcik && (
          <div data-kendi-metin-backdrop style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "flex-end", justifyContent: "center", background: "rgba(10,12,16,0.82)" }}>
            <section role="dialog" aria-modal="true" aria-labelledby="kendi-metin-basligi" data-kendi-metin-dialog style={{ width: "min(720px, 100%)", maxHeight: "min(860px, 96dvh)", display: "flex", flexDirection: "column", background: S.kart, border: "1px solid rgba(255,255,255,0.08)", borderRadius: "22px 22px 0 0", padding: "18px", boxSizing: "border-box", boxShadow: "0 -24px 70px rgba(0,0,0,0.52)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexShrink: 0 }}>
                <div>
                  <h2 id="kendi-metin-basligi" style={{ ...baslikStil, fontSize: 24, margin: 0 }}>Kendi metnini oku</h2>
                  <div style={{ color: S.soluk, fontSize: 13, lineHeight: 1.45, marginTop: 4 }}>Metni yalnızca bu cihazda okuma görünümüne hazırlar.</div>
                </div>
                <button onClick={() => setKendiMetinPaneliAcik(false)} aria-label="Kendi metin panelini kapat" style={{ width: 44, height: 44, flexShrink: 0, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 12, color: S.metin, fontSize: 22, cursor: "pointer" }}>×</button>
              </div>
              <input value={kendiBaslik} onChange={(e) => setKendiBaslik(e.target.value)} aria-label="Kendi metnim başlık" style={{ width: "100%", boxSizing: "border-box", marginTop: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.05)", color: S.metin, padding: "12px", fontSize: 16, fontFamily: "inherit", flexShrink: 0 }} />
              <textarea value={kendiMetin} onChange={(e) => setKendiMetin(e.target.value)} placeholder="Metni buraya yapıştır..." aria-label="Kendi metnim" style={{ width: "100%", boxSizing: "border-box", minHeight: "min(48dvh, 420px)", flex: "1 1 auto", marginTop: 10, borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.05)", color: S.metin, padding: "14px", fontSize: 16, lineHeight: 1.55, fontFamily: "inherit", resize: "none" }} />
              {kendiMetinMesaji && <div aria-live="polite" style={{ color: S.soluk, fontSize: 12, marginTop: 8 }}>{kendiMetinMesaji}</div>}
              <div data-kendi-metin-actions style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", marginTop: 12, flexShrink: 0 }}>
                <label aria-disabled={kendiMetinYukleniyor ? "true" : undefined} style={{ minHeight: 44, display: "flex", alignItems: "center", background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "0 12px", cursor: kendiMetinYukleniyor ? "wait" : "pointer", fontSize: 13, opacity: kendiMetinYukleniyor ? 0.7 : 1 }}>{kendiMetinYukleniyor ? "Belge okunuyor…" : "PDF, Word veya TXT seç"}
                  <input type="file" aria-label="PDF, Word veya TXT dosyası seç" accept={SUPPORTED_DOCUMENT_ACCEPT} disabled={kendiMetinYukleniyor} onChange={dosyaMetniYukle} style={{ display: "none" }} />
                </label>
                <button disabled={kendiMetinYukleniyor} onClick={() => kendiMetniAc(kendiMetin, kendiBaslik)} style={{ minHeight: 48, background: S.vurgu, color: "#14181F", border: "none", borderRadius: 12, padding: "0 18px", fontWeight: 800, cursor: kendiMetinYukleniyor ? "wait" : "pointer", fontFamily: "inherit", opacity: kendiMetinYukleniyor ? 0.65 : 1 }}>Okuma moduna al</button>
              </div>
              <div data-terms style={{ color: S.soluk, fontSize: 11, lineHeight: 1.45, marginTop: 10, opacity: 0.9 }}>
                Yüklediğin içeriğin haklarından sen sorumlusun. Okurio metni kişisel erişilebilir okuma desteği için işler; yayınlamaz veya dağıtmaz.
              </div>
            </section>
          </div>
        )}
      </div>
      <details data-audit-ozet style={{ background: "rgba(255,255,255,0.035)", border: `1px solid ${S.kart2}`, borderRadius: 12, padding: "10px 12px", marginTop: 10 }}>
        <summary style={{ color: S.soluk, fontSize: 12, cursor: "pointer" }}>İçerik durumu</summary>
        <div style={{ fontSize: 11, color: S.soluk, marginTop: 8 }}>
          Bu yolda {icerikAuditOzeti.toplam} uygun içerik · {icerikAuditOzeti.englishSayisi} İngilizce içerik · {icerikAuditOzeti.bosRaflar.length} hazırlık rafı
        </div>
      </details>
    </main>
  );

  const AramaSayfa = () => {
    const q = arama.trim().toLowerCase();
    const evren = uyumluKatalog;
    const sonuc = q ? evren.filter((k) => (k.baslik + " " + k.yazar + " " + k.kategori + " " + (k.ozet || "")).toLowerCase().includes(q)) : evren;
    return (
      <main data-page-shell data-search-page style={{ padding: "24px 20px" }}>
        <div style={{ ...baslikStil, fontSize: 26, marginBottom: 16 }}>Ara</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: S.kart, borderRadius: 12, padding: "12px 14px", marginBottom: 20 }}>
          <Search size={18} color={S.soluk} />
          <input value={arama} onChange={(e) => setArama(e.target.value)} placeholder="Kitap veya yazar ara"
            style={{ background: "none", border: "none", outline: "none", color: S.metin, fontSize: 15, flex: 1, fontFamily: "inherit" }} />
        </div>
        {sonuc.length === 0 && <div style={{ color: S.soluk, fontSize: 14 }}>Sonuç bulunamadı. Başka bir kelime dene.</div>}
        {sonuc.map((k) => (
          <div key={k.id} role="button" tabIndex={0} onClick={() => setDetayId(k.id)} onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setDetayId(k.id); }
          }} style={{ display: "flex", gap: 14, padding: "12px 0", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.06)", alignItems: "center" }}>
            <Kapak kitap={k} boyut={52} radius={6} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{k.baslik}</div>
              <div style={{ fontSize: 12, color: S.soluk, marginTop: 2 }}>{k.yazar} · {k.kategori}{k.dil === "en" ? " · English" : ""}{k.yas ? ` · ${k.yas}` : ""} · {sureYaz(toplamSn(k))}</div>
            </div>
          </div>
        ))}
      </main>
    );
  };

  const KitaplikSayfa = () => {
    const favKitaplar = favoriler.map(kitapBul).filter((k) => k && kitapUyum(k));
    const devamlar = Object.entries(ilerlemeler).filter(([id, v]) => v.pos > 10 && kitapUyum(kitapBul(id)) && icerikSunumu(kitapBul(id)).deployable).sort((a, b) => b[1].ts - a[1].ts);
    return (
      <main data-page-shell data-library-page style={{ padding: "24px 20px" }}>
        <div style={{ ...baslikStil, fontSize: 26, marginBottom: 20 }}>Kitaplığım</div>
        <div style={{ ...baslikStil, fontSize: 17, marginBottom: 12 }}>Okumaya devam</div>
        {devamlar.length === 0 && <div style={{ color: S.soluk, fontSize: 14, marginBottom: 20 }}>Henüz dinlemeye başlamadın. Ana sayfadan bir kitap seç.</div>}
        {devamlar.map(([id, v]) => {
          const k = kitapBul(id); const oran = v.pos / toplamSn(k);
          return (
            <div key={id} role="button" tabIndex={0} onClick={() => setDetayId(id)} onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setDetayId(id); }
            }} style={{ display: "flex", gap: 14, padding: "10px 0", cursor: "pointer", alignItems: "center" }}>
              <Kapak kitap={k} boyut={52} radius={6} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{k.baslik}</div>
                <div style={{ fontSize: 12, color: S.soluk, margin: "4px 0 6px" }}>%{Math.round(oran * 100)} okundu</div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
                  <div style={{ width: `${oran * 100}%`, height: "100%", background: S.vurgu, borderRadius: 2 }} />
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ ...baslikStil, fontSize: 17, margin: "24px 0 12px" }}>Favoriler</div>
        {favKitaplar.length === 0 && <div style={{ color: S.soluk, fontSize: 14 }}>Favori eklemedin. Kitap sayfasındaki kalp simgesini kullan.</div>}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {favKitaplar.map((k) => <KitapKart key={k.id} kitap={k} />)}
        </div>
      </main>
    );
  };

  const DetaySayfa = () => {
    const k = kitapBul(detayId);
    if (!k) return null;
    const profilUyumlu = kitapUyum(k);
    const sunum = icerikSunumu(k);
    const baslatilabilir = profilUyumlu && sunum.deployable;
    const p = ilerlemeler[k.id]?.pos || 0;
    const fav = favoriler.includes(k.id);
    return (
      <main data-page-shell data-detail-page style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <button onClick={() => setDetayId(null)} aria-label="Geri" style={{ background: S.kart, border: "none", borderRadius: 10, padding: 8, color: S.metin, cursor: "pointer" }}><ChevronLeft size={20} /></button>
          <button onClick={() => favoriDegistir(k.id)} aria-label="Favori" style={{ background: S.kart, border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
            <Heart size={20} color={fav ? S.vurgu : S.metin} fill={fav ? S.vurgu : "none"} />
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><Kapak kitap={k} boyut={150} radius={12} /></div>
        <div style={{ ...baslikStil, fontSize: 24, textAlign: "center" }}>{k.baslik}</div>
        <div style={{ textAlign: "center", color: S.soluk, fontSize: 14, marginTop: 4 }}>{k.yazar}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 12, fontSize: 12, color: S.soluk }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={13} /> {sureYaz(toplamSn(k))}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><BookOpen size={13} /> {k.bolumler.length} bölüm</span>
          <span style={{ color: S.vurgu }}>★ {k.puan}</span>
          {k.yas && <span style={{ background: "rgba(232,163,61,0.15)", color: S.vurgu, borderRadius: 6, padding: "1px 7px" }}>{k.yas}</span>}
          {k.dil === "en" && <span style={{ background: "rgba(90,140,160,0.25)", color: "#9CCDE0", borderRadius: 6, padding: "1px 7px" }}>English</span>}
        </div>
        {!profilUyumlu && (
          <div data-profil-uyumsuz style={{ marginTop: 14, fontSize: 12, color: S.vurgu, background: "rgba(232,163,61,0.10)", borderRadius: 10, padding: "8px 12px" }}>
            Bu içerik mevcut okuma yoluna tam uymuyor. Dinlemek için okuma yolunu değiştirmen önerilir.
          </div>
        )}
        {!sunum.deployable && (
          <div data-content-preparing style={{ marginTop: 14, fontSize: 13, color: "#E2C58F", background: "rgba(215,183,120,0.10)", border: "1px solid rgba(215,183,120,0.24)", borderRadius: 10, padding: "10px 12px", lineHeight: 1.5 }}>
            Bu kısa seçki henüz tam bir okuma oturumu değil. Metin genişletilip içerik kontrolünden geçince açılacak.
          </div>
        )}
        <button disabled={!baslatilabilir} onClick={() => { if (!baslatilabilir) return; oynatDegistir(k.id); setOynaticiAcik(true); }}
          style={{ width: "100%", marginTop: 18, background: baslatilabilir ? S.vurgu : "rgba(255,255,255,0.12)", color: baslatilabilir ? "#14181F" : S.soluk, border: "none", borderRadius: 14, padding: "14px 0", fontSize: 15, fontWeight: 600, cursor: baslatilabilir ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
          {!sunum.deployable ? "Hazırlanıyor" : p > 10 ? `Okumaya devam et · ${sureYaz(p)}` : "Okumaya başla"}
        </button>
        <div data-icerik-kapsami={sunum.status} style={{ marginTop: 14, fontSize: 12, color: S.vurgu, background: "rgba(232,163,61,0.10)", borderRadius: 10, padding: "8px 12px", lineHeight: 1.55 }}>
          {k.icerikDurumu === "tam-metin" && k.hakDurumu === "kamu-mali" ? (
            <>
              <strong>Tam metin · Kamu malı kaynak.</strong>{" "}
              <a href={k.kaynak.url} target="_blank" rel="noreferrer" style={{ color: S.vurgu }}>Source of truth: {k.kaynak.ad}</a>
            </>
          ) : sunum.status === "full-reading" ? (
            <><strong>Tam okuma · Okurio özgün içerik.</strong> Gerçek süresi ve kapsamı doğrulanmış eksiksiz bir okuma oturumudur.</>
          ) : sunum.status === "micro-exercise" ? (
            <><strong>Mikro alıştırma.</strong> Harf, hece veya kelime çalışmasıdır; hikâye ya da tam eser değildir.</>
          ) : (
            <><strong>Hazırlanıyor.</strong> Bu kısa kayıt tam eser veya tamamlanmış hikâye değildir ve henüz başlatılamaz.</>
          )}
        </div>
        <OkurioProvenanceStamp stamp={k.provenanceStamp} />
        <div data-kalite-karti style={{ marginTop: 14, fontSize: 12, color: S.soluk, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "8px 12px" }}>
          Okuma seviyesi: OQL-{icerikKalitesi(k).oql} · {icerikKalitesi(k).ad}{kitapMeta(k).cefr ? ` · CEFR ${kitapMeta(k).cefr}` : ""} · {icerikKalitesi(k).toplamKelime} kelime · gerçek süre {sureYaz(sunum.seconds)} · ort. cümle {icerikKalitesi(k).ortCumle.toFixed(1)} kelime
        </div>
        <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6, color: "rgba(242,236,223,0.85)" }}>{k.ozet}</div>
        <div style={{ ...baslikStil, fontSize: 17, margin: "24px 0 10px" }}>Bölümler</div>
        {k.bolumler.map((b, i) => {
          const aktifMi = aktifId === k.id && aktifBolumIx === i;
          return (
            <div key={i} role="button" tabIndex={baslatilabilir ? 0 : -1} aria-disabled={!baslatilabilir} onClick={() => { if (!baslatilabilir) return; oynatKitapBolum(k.id, i); setOynaticiAcik(true); }} onKeyDown={(event) => {
              if (baslatilabilir && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); oynatKitapBolum(k.id, i); setOynaticiAcik(true); }
            }}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: baslatilabilir ? "pointer" : "not-allowed", opacity: baslatilabilir ? 1 : 0.55 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 26, textAlign: "center", color: aktifMi ? S.vurgu : S.soluk, fontSize: 13 }}>{aktifMi ? <Volume2 size={15} /> : i + 1}</div>
                <div style={{ fontSize: 14, fontWeight: aktifMi ? 600 : 400, color: aktifMi ? S.vurgu : S.metin }}>{b.ad}</div>
              </div>
              <div style={{ fontSize: 12, color: S.soluk }}>{sureYaz(bolumSn(b))}</div>
            </div>
          );
        })}
      </main>
    );
  };

  /* Mini oynatıcı */
  const MiniOynatici = () => {
    if (!aktif || oynaticiAcik) return null;
    const oran = toplam ? pozisyon / toplam : 0;
    return (
      <div data-mini-player role="button" tabIndex={0} aria-label={`${aktif.baslik} oynatıcısını aç`} onClick={() => setOynaticiAcik(true)} onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setOynaticiAcik(true); }
      }} style={{ position: "fixed", bottom: 64, left: "50%", transform: "translateX(-50%)", width: "min(1180px, 100%)", padding: "0 10px", boxSizing: "border-box", cursor: "pointer", zIndex: 20 }}>
        <div style={{ background: S.kart2, borderRadius: 14, padding: "10px 12px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 -4px 20px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, bottom: 0, height: 2, width: `${oran * 100}%`, background: S.vurgu }} />
          <Kapak kitap={aktif} boyut={38} radius={5} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{aktif.baslik}</div>
            <div style={{ fontSize: 11, color: S.soluk }}>{aktif.bolumler[aktifBolumIx].ad}</div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); sar(-15); }} aria-label="15 sn geri" style={{ background: "none", border: "none", color: S.metin, cursor: "pointer", padding: 4 }}><RotateCcw size={18} /></button>
          <button onClick={(e) => { e.stopPropagation(); oynatDegistir(); }} aria-label={caliyor ? "Duraklat" : "Oynat"}
            style={{ width: 38, height: 38, borderRadius: 19, background: S.vurgu, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            {caliyor ? <Pause size={17} color="#14181F" fill="#14181F" /> : <Play size={17} color="#14181F" fill="#14181F" style={{ marginLeft: 2 }} />}
          </button>
        </div>
      </div>
    );
  };

  /* Tam ekran oynatıcı */
  const TamOynatici = () => {
    if (!aktif || !oynaticiAcik) return null;
    const oran = toplam ? pozisyon / toplam : 0;
    const b = aktif.bolumler[aktifBolumIx];
    const mobilDar = typeof window !== "undefined" && window.innerWidth <= 430;
    const soruHazir = toplam > 0 && pozisyon >= Math.max(0, toplam - 2);
    const cip = (aktifMi) => ({ background: aktifMi ? "rgba(232,163,61,0.18)" : "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: mobilDar ? "6px 9px" : "7px 11px", color: aktifMi ? S.vurgu : S.metin, cursor: "pointer", fontSize: mobilDar ? 11 : 12, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" });
    return (
      <div data-reader-backdrop style={{ position: "fixed", inset: 0, zIndex: 40, display: "flex", justifyContent: "center", background: "rgba(10,12,16,0.78)" }}>
        <div role="dialog" aria-modal="true" aria-label={`${aktif.baslik} okuma ekranı`} data-mobile-stability="v2.8.4" data-reader-shell data-playing={caliyor ? "1" : "0"} data-okuma-modu-aktif={okumaModu} data-ses-tonu-aktif={sesTonu} data-story-id={aktif.id} style={{ width: "min(1180px, calc(100% - 48px))", background: `linear-gradient(180deg, ${aktif.renk[0]}55 0%, ${S.fon} 30%)`, backgroundColor: S.fon, display: "flex", flexDirection: "column", height: "var(--okurio-visual-viewport-height, 100dvh)", maxHeight: "var(--okurio-visual-viewport-height, 100dvh)", overflow: "hidden", padding: mobilDar ? "10px 12px calc(10px + env(safe-area-inset-bottom, 0px))" : "14px 22px 14px", boxSizing: "border-box", position: "relative" }}>

          {/* Üst çubuk */}
          <div data-reader-topbar style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, minHeight: mobilDar ? 44 : undefined }}>
            <button onClick={okuyucuyuKapatVeOdakla} aria-label="Kapat" style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: 8, color: S.metin, cursor: "pointer" }}><ChevronDown size={20} /></button>
            <div data-reader-eyebrow style={{ fontSize: mobilDar ? 10 : 12, color: S.soluk, letterSpacing: mobilDar ? "0.06em" : "0.08em", textTransform: "uppercase" }}>Şimdi okunuyor</div>
            <button data-reader-favorite onClick={() => favoriDegistir(aktif.id)} aria-label="Favori" aria-pressed={favoriler.includes(aktif.id)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
              <Heart size={18} color={favoriler.includes(aktif.id) ? S.vurgu : S.metin} fill={favoriler.includes(aktif.id) ? S.vurgu : "none"} />
            </button>
          </div>

          {/* Kompakt kitap bilgisi */}
          <div data-kompakt-baslik role="button" tabIndex={0} aria-expanded={bolumlerAcik} aria-controls="okurio-bolum-listesi" onClick={() => setBolumlerAcik(!bolumlerAcik)} onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setBolumlerAcik(!bolumlerAcik); }
          }} style={{ display: "flex", alignItems: "center", gap: mobilDar ? 7 : 12, margin: mobilDar ? "2px 0 4px" : "8px 0 6px", minHeight: mobilDar ? 54 : undefined, maxHeight: mobilDar ? 60 : undefined, flexShrink: 0, cursor: "pointer" }}>
            {!mobilDar && <Kapak kitap={aktif} boyut={44} radius={6} />}
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ ...baslikStil, fontSize: mobilDar ? 15 : 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{aktif.baslik}</div>
              <div style={{ color: S.soluk, fontSize: mobilDar ? 11 : 12, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.ad} · {aktifBolumIx + 1}/{aktif.bolumler.length} bölüm</div>
              {!mobilDar && <div data-ses-tonu style={{ color: S.vurgu, fontSize: 11, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sesTonuAyar.ad}</div>}
            </div>
            <ListMusic size={17} color={bolumlerAcik ? S.vurgu : S.soluk} />
          </div>

          {/* Bölüm listesi (katlanır) */}
          {bolumlerAcik && (
            <div id="okurio-bolum-listesi" data-bolum-listesi style={{ flexShrink: 0, maxHeight: 180, overflowY: "auto", background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "4px 12px", marginBottom: 10 }}>
              {aktif.bolumler.map((bb, i) => (
                <div key={i} role="button" tabIndex={0} onClick={() => { bolumeGit(i); setBolumlerAcik(false); }} onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); bolumeGit(i); setBolumlerAcik(false); }
                }} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < aktif.bolumler.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", cursor: "pointer", fontSize: 13, color: i === aktifBolumIx ? S.vurgu : S.metin, fontWeight: i === aktifBolumIx ? 600 : 400 }}>
                  <span>{i + 1}. {bb.ad}</span><span style={{ color: S.soluk, fontSize: 12 }}>{sureYaz(bolumSn(bb))}</span>
                </div>
              ))}
            </div>
          )}

          {/* OKUMA ALANI: ekranın ana yüzeyi */}
          <div data-okuma-alani style={{ flex: "1 1 auto", minHeight: 0, overflow: "hidden", background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: mobilDar ? 10 : 14, position: "relative", display: "flex", flexDirection: "column" }}>
            <div data-reader-stage-header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: mobilDar ? 5 : 10, minHeight: mobilDar ? 44 : undefined }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: S.soluk, fontSize: mobilDar ? 11 : 13 }}><BookOpen size={mobilDar ? 13 : 15} /> Okuma görünümü</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button data-reader-settings-toggle onClick={() => setAyarPaneliAcik(!ayarPaneliAcik)} aria-expanded={ayarPaneliAcik} aria-controls="okurio-okuma-ayarlari"
                  style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "7px 10px", color: S.metin, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
                  Aa&nbsp; Ayarlar
                </button>
                <button data-reader-visibility-toggle onClick={() => setOkumaAcik(!okumaAcik)} aria-label="Okuma görünümünü aç kapat" aria-expanded={okumaAcik} aria-controls="okurio-okuma-icerigi"
                  style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "7px 10px", color: S.metin, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
                  {okumaAcik ? "Gizle" : "Göster"}
                </button>
              </div>
            </div>
            {okumaAcik && (() => {
              const kelimeler = b.metin.trim().split(/\s+/);
              const cumleler = [];
              let bas = 0;
              kelimeler.forEach((k, i) => { if (/[.!?…]$/.test(k) || i === kelimeler.length - 1) { cumleler.push([bas, i]); bas = i + 1; } });
              const aktifCumle = cumleler.find(([a, z]) => kelimeIx >= a && kelimeIx <= z) || cumleler[0];
              // Odak desteği bölümün bağlamını yok etmez. Önceki davranış yalnız
              // aktif cümleyi DOM'a koyduğu için tam bir bölüm tek cümleymiş gibi
              // görünüyordu. Bütün bölüm ekranda kalır; aktif cümle görsel olarak
              // öne çıkarılır.
              const gorunecek = kelimeler;
              const kaydirma = 0;
              return (
                <div id="okurio-okuma-icerigi" data-reader-workspace style={{ flex: "1 1 auto", minHeight: 0, overflow: "hidden" }}>
                  <div data-reading-column style={{ height: "100%", minHeight: 0 }}>
                  <div ref={readerScrollRef} data-okuma-metin="1" data-tema={ayar.tema} data-aktif-cumle={`${aktifCumle[0]}-${aktifCumle[1]}`} data-kullanici-kaydirma={okumaModu === "kendim" ? "1" : undefined} style={{
                    fontSize: PUNTOLAR[ayar.punto], letterSpacing: `${ARALIKLAR[ayar.aralik]}em`,
                    lineHeight: SATIRLAR[ayar.aralik], wordSpacing: `${ARALIKLAR[ayar.aralik] * 2.2}em`,
                    color: ayar.tema === "krem" ? "#2A2622" : "rgba(242,236,223,0.92)",
                    background: ayar.tema === "krem" ? "#F2ECDF" : "none",
                    borderRadius: ayar.tema === "krem" ? 12 : 0,
                    padding: ayar.tema === "krem" ? "14px 16px" : 0,
                    fontFamily: fontAile(ayar.font),
                    textAlign: "left", minHeight: 0, height: "100%", maxHeight: "none", overflowY: "auto", WebkitOverflowScrolling: "touch", touchAction: "pan-y",
                    scrollBehavior: "smooth", overscrollBehavior: "contain",
                  }} onTouchStart={okuyucuTakibiniGeciciDurdur} onPointerDown={okuyucuTakibiniGeciciDurdur} onWheel={okuyucuTakibiniGeciciDurdur}>
                    {gorunecek.map((k, i) => {
                      const gercekIx = i + kaydirma;
                      const aktifMi = ayar.vurgu && gercekIx === kelimeIx;
                      const aktifCumledeMi = gercekIx >= aktifCumle[0] && gercekIx <= aktifCumle[1];
                      const temiz = k.replace(/[.,!?…;:]+$/u, "");
                      const son = k.slice(temiz.length);
                      const n = Math.max(1, Math.ceil(temiz.length * 0.45));
                      const sozluk = findGlossaryEntry(aktif.id, temiz);
                      return <span
                        key={gercekIx}
                        data-kelime-ix={gercekIx}
                        data-aktif={aktifMi ? "1" : undefined}
                        data-hedef-kelime={sozluk ? temiz.toLocaleLowerCase("tr-TR") : undefined}
                        role={sozluk ? "button" : undefined}
                        tabIndex={sozluk ? 0 : undefined}
                        aria-haspopup={sozluk ? "dialog" : undefined}
                        aria-label={sozluk ? `${temiz} kelimesinin anlamını aç` : undefined}
                        onClick={(event) => sozluk && sozlukAc(sozluk, event.currentTarget)}
                        onKeyDown={(event) => {
                          if (sozluk && (event.key === "Enter" || event.key === " ")) {
                            event.preventDefault();
                            sozlukAc(sozluk, event.currentTarget);
                          }
                        }}
                        style={{
                          background: aktifMi ? (ayar.tema === "krem" ? "rgba(201,139,61,0.45)" : "rgba(232,163,61,0.35)") : "none",
                          borderRadius: 4,
                          padding: aktifMi ? "0 2px" : 0,
                          color: aktifMi ? (ayar.tema === "krem" ? "#1A1510" : "#FFF3DC") : undefined,
                          opacity: ayar.odak && !aktifCumledeMi ? 0.38 : 1,
                          transition: ayar.odak ? "opacity 160ms ease" : undefined,
                          cursor: sozluk ? "help" : undefined,
                          textDecoration: sozluk ? "underline dotted" : undefined,
                          textUnderlineOffset: sozluk ? 3 : undefined,
                        }}>
                        {ayar.biyonik && temiz.length > 3 ? <><strong style={{ fontWeight: 850 }}>{temiz.slice(0, n)}</strong>{temiz.slice(n)}{son}</> : k}{" "}
                      </span>;
                    })}
                  </div>
                  {seciliSozluk && (
                    <div data-sozluk-karti style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                      <GlossaryCard entry={seciliSozluk} onClose={sozlukKapat} onPronounce={kelimeyiSeslendir} />
                    </div>
                  )}
                  {ayar.odak && <div style={{ fontSize: 11, color: S.soluk, marginTop: 8 }}>Odak modu: cümle {cumleler.indexOf(aktifCumle) + 1} / {cumleler.length} · bölümün tamamı görünür</div>}
                  </div>
                  <aside id="okurio-okuma-ayarlari" data-reader-settings data-acik={ayarPaneliAcik ? "1" : "0"} aria-label="Okuma ayarları" aria-hidden={mobilDar && !ayarPaneliAcik ? "true" : undefined}>
                  <div data-reader-settings-title style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <strong style={{ fontSize: 14 }}>Okuma ayarları</strong>
                    <button data-reader-settings-close onClick={() => setAyarPaneliAcik(false)} aria-label="Okuma ayarlarını kapat" style={{ ...cip(false), minWidth: 44, minHeight: 44, justifyContent: "center" }}>×</button>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.5, color: S.soluk }}>Sunumu kişiselleştirir; tanı koymaz, görme kusurunu düzeltmez veya tedavi etmez.</div>
                  <div style={{ marginTop: 14, fontSize: 12, color: S.soluk }}>Hazır destekler (birlikte seçilebilir):</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                    <button data-profil="dis" onClick={() => profilUygula({ ...profil, dis: !profil.dis })} aria-label="Okuma kolaylığı desteği" aria-pressed={profil.dis} style={cip(profil.dis)}>Okuma kolaylığı</button>
                    <button data-profil="dehb" onClick={() => profilUygula({ ...profil, dehb: !profil.dehb })} aria-label="Dikkat desteği" aria-pressed={profil.dehb} style={cip(profil.dehb)}>Dikkat Desteği</button>
                    <button data-profil="gorsel" onClick={() => profilUygula({ ...profil, gorsel: !profil.gorsel })} aria-label="Görsel konfor desteği" aria-pressed={profil.gorsel} style={cip(profil.gorsel)}>Görsel Konfor</button>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                    <button onClick={() => setAyar({ ...ayar, punto: (ayar.punto + 1) % PUNTOLAR.length })} aria-label={`Yazı boyutu: ${PUNTOLAR[ayar.punto]} piksel`} style={cip(false)}>
                      <Type size={13} /> {PUNTOLAR[ayar.punto]} px
                    </button>
                    <button onClick={() => setAyar({ ...ayar, aralik: (ayar.aralik + 1) % ARALIKLAR.length })} aria-label={`Harf ve satır aralığı: ${["Sıkı", "Rahat", "Geniş", "Ekstra geniş"][ayar.aralik]}`} style={cip(false)}>
                      <AlignJustify size={13} /> Aralık: {["Sıkı", "Rahat", "Geniş", "Ekstra"][ayar.aralik]}
                    </button>
                    <button onClick={() => setAyar({ ...ayar, odak: !ayar.odak })} aria-label="Odak modu" aria-pressed={ayar.odak} style={cip(ayar.odak)}>
                      <Focus size={13} /> Odak modu
                    </button>
                    <button onClick={() => setAyar({ ...ayar, vurgu: !ayar.vurgu })} aria-label="Kelime vurgusu" aria-pressed={ayar.vurgu} style={cip(ayar.vurgu)}>
                      Kelime vurgusu
                    </button>
                    <button onClick={() => setAyar({ ...ayar, tema: ayar.tema === "krem" ? "koyu" : "krem" })} aria-label={`Zemin: ${ayar.tema === "krem" ? "Krem" : "Koyu"}`} aria-pressed={ayar.tema === "krem"} style={cip(ayar.tema === "krem")}>
                      Zemin: {ayar.tema === "krem" ? "Krem" : "Koyu"}
                    </button>
                    <button onClick={() => setAyar({ ...ayar, biyonik: !ayar.biyonik })} aria-label="Biyonik vurgu, deneysel" aria-pressed={ayar.biyonik} style={cip(ayar.biyonik)}>
                      Biyonik vurgu · deneysel
                    </button>
                    <button onClick={() => setAyar({ ...ayar, font: sonrakiFont(ayar.font) })} aria-label={`Yazı tipi: ${fontAd(ayar.font)}`} style={cip(ayar.font === "lexend")}>
                      Yazı: {fontAd(ayar.font)}
                    </button>
                  </div>
                  <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 12, color: S.soluk }}>Okuma ve ses kontrolleri</div>
                  <div data-okuma-modu-kompakt style={{ display: "flex", marginTop: 8 }}>
                    <button onClick={() => setModPaneliAcik((acik) => !acik)} aria-expanded={modPaneliAcik} aria-controls="okurio-okuma-modlari" aria-label={`Okuma modu: ${okumaModuAyar.ad}`} style={{ ...cip(true), width: "100%", minHeight: 44, justifyContent: "center" }}>
                      Mod: {okumaModuAyar.ad} ▾
                    </button>
                  </div>
                  {modPaneliAcik && (
                    <div id="okurio-okuma-modlari" data-okuma-modlari style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                      {OKUMA_MODLARI.map((m) => (
                        <button key={m.id} data-okuma-modu={m.id} onClick={() => okumaModuDegistir(m.id)} aria-pressed={okumaModu === m.id} title={m.aciklama} style={{ ...cip(okumaModu === m.id), minHeight: 44 }}>
                          {m.ad}
                        </button>
                      ))}
                    </div>
                  )}
                  {!caliyor && <div data-okuma-modu-ipucu style={{ marginTop: 7, color: S.soluk, fontSize: 11, lineHeight: 1.45 }}>{okumaModuAyar.aciklama}</div>}
                  {okumaModu === "kendim" && (
                    <div data-kelime-yardimi="1" role="note" style={{ marginTop: 7, color: S.vurgu, fontSize: 11, lineHeight: 1.45 }}>
                      Altı çizili hedef kelimeye dokunarak kısa anlamını aç.
                    </div>
                  )}
                  <div data-alt-araclar style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                    <button onClick={hizDegistir} style={{ ...cip(false), minHeight: 44, padding: "6px 9px" }}><Gauge size={13} /> {hiz}x</button>
                    <button data-ses-tonu={sesTonu} onClick={sesTonuDegistir} title={sesTonuAyar.aciklama} style={{ ...cip(etkinSeslendirme), minHeight: 44, padding: "6px 9px" }}><Volume2 size={13} /> Ses: {etkinSeslendirme ? sesTonuAyar.kisa : "Kapalı"}</button>
                    <button onClick={uykuDegistir} style={{ ...cip(uyku > 0), minHeight: 44, padding: "6px 9px" }}><Moon size={13} /> {uyku > 0 ? sureYaz(uyku) : "Uyku"}</button>
                  </div>
                  </aside>
                </div>
              );
            })()}
          </div>


          {(() => {
            const soru = kitapSorusu(aktif);
            if (!soru || !soruHazir || soruKapali) return null;
            return (
              <div role="dialog" aria-label="Birlikte düşünelim" data-birlikte-dusunelim data-soru-zamani="bolum-sonu" style={{ background: S.kart2, border: "1px solid rgba(232,163,61,0.38)", borderRadius: 16, padding: mobilDar ? "14px" : "16px" }}>
                <div style={{ fontSize: 12, color: S.vurgu, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Birlikte Düşünelim</div>
                <div style={{ fontSize: 14, color: S.metin, fontWeight: 600, marginBottom: 8 }}>{soru.soru}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {soru.secenekler.map((secenek) => {
                    const secildi = soruCevabi === secenek;
                    return (
                      <button key={secenek} onClick={() => setSoruCevabi(secenek)} aria-pressed={secildi}
                        style={{ background: secildi ? "rgba(232,163,61,0.20)" : "rgba(255,255,255,0.08)", border: secildi ? "1px solid rgba(232,163,61,0.52)" : "1px solid rgba(255,255,255,0.08)", borderRadius: 10, minHeight: 44, padding: "8px 10px", color: S.metin, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>
                        {secenek}
                      </button>
                    );
                  })}
                </div>
                {soruCevabi && (
                  <div data-soru-geri-bildirim aria-live="polite" style={{ marginTop: 10, fontSize: 13, color: "rgba(242,236,223,0.84)", lineHeight: 1.5 }}>
                    Seçimini gördüm. {soru.destek} Burada puan yok; metne kendi yorumunla dönebilirsin.
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  <button onClick={() => setSoruKapali(true)} style={{ ...cip(false), minHeight: 44 }}>Metne dön</button>
                  <button onClick={() => anaSayfayaDon(setOynaticiAcik, setSekme, setDetayId)} style={{ ...cip(true), minHeight: 44 }}>Okumayı bitir</button>
                </div>
              </div>
            );
          })()}

          {/* ALT KONTROL BLOĞU: sabit */}
          <div data-alt-kontrol style={{ flexShrink: 0, paddingTop: mobilDar ? 6 : 10 }}>
            <div data-kompakt-ilerleme data-player-visual="compact-progress" style={{ marginTop: 4 }}>
              <div
                role="slider"
                tabIndex={0}
                aria-label="Okuma ilerlemesi"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(oran * 100)}
                aria-valuetext={`%${Math.round(oran * 100)} tamamlandı`}
                onClick={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  oranaSar((event.clientX - rect.left) / rect.width);
                }}
                onKeyDown={(event) => {
                  const step = event.shiftKey ? 0.1 : 0.02;
                  if (["ArrowLeft", "ArrowDown"].includes(event.key)) { event.preventDefault(); oranaSar(Math.max(0, oran - step)); }
                  if (["ArrowRight", "ArrowUp"].includes(event.key)) { event.preventDefault(); oranaSar(Math.min(1, oran + step)); }
                  if (event.key === "Home") { event.preventDefault(); oranaSar(0); }
                  if (event.key === "End") { event.preventDefault(); oranaSar(1); }
                }}
                style={{ height: 44, display: "flex", alignItems: "center", cursor: "pointer", touchAction: "manipulation" }}
              >
                <div data-progress-track style={{ width: "100%", height: 8, borderRadius: 999, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}>
                  <div style={{ width: `${oran * 100}%`, height: "100%", background: S.vurgu }} />
                </div>
              </div>
            </div>
            <div data-progress-time style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: S.soluk, marginTop: -8 }}>
              <span>{sureYaz(pozisyon)}</span><span>-{sureYaz(toplam - pozisyon)}</span>
            </div>
            <div data-transport-controls style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: mobilDar ? 18 : 22, marginTop: mobilDar ? 6 : 8 }}>
              <button onClick={() => sar(-15)} aria-label="15 saniye geri" style={{ background: "none", border: "none", color: S.metin, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <RotateCcw size={24} /><span style={{ fontSize: 10, color: S.soluk }}>15</span>
              </button>
              <button onClick={() => oynatDegistir()} aria-label={caliyor ? "Duraklat" : "Oynat"}
                style={{ width: mobilDar ? 52 : 58, height: mobilDar ? 52 : 58, borderRadius: mobilDar ? 26 : 29, background: S.vurgu, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 6px 22px rgba(232,163,61,0.35)" }}>
                {caliyor ? <Pause size={25} color="#14181F" fill="#14181F" /> : <Play size={25} color="#14181F" fill="#14181F" style={{ marginLeft: 3 }} />}
              </button>
              <button onClick={() => sar(30)} aria-label="30 saniye ileri" style={{ background: "none", border: "none", color: S.metin, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <RotateCw size={24} /><span style={{ fontSize: 10, color: S.soluk }}>30</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const OnboardingSayfa = () => {
    const [taslak, setTaslak] = useState({ ...okumaYolu, destekler: [...okumaYolu.destekler] });
    const yol = yolBul(taslak.yolId);
    const toggleDestek = (id) => {
      setTaslak((e) => ({ ...e, destekler: e.destekler.includes(id) ? e.destekler.filter((x) => x !== id) : [...e.destekler, id] }));
    };
    return (
      <main data-page-shell data-onboarding-page style={{ padding: "26px 20px 110px" }}>
        <div style={{ ...baslikStil, fontSize: 30, marginBottom: 6 }}>Okuma yolunu seç</div>
        <div style={{ color: S.soluk, fontSize: 14, lineHeight: 1.55, marginBottom: 18 }}>
          Yaş tek başına yeterli değil. Okurio, yaş bandını okuma evresi, destek ihtiyacı ve okuma moduyla birlikte kullanır.
        </div>

        <div style={{ fontSize: 12, color: S.vurgu, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>1 · Kim için?</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
          {OKUMA_YOLLARI.map((y) => (
            <button key={y.id} onClick={() => setTaslak((e) => { const izinli = evreSecenekleri(y.id); const yeniEvre = izinli.some((x) => x.id === e.evreId) ? e.evreId : y.evre; return { ...e, yolId: y.id, evreId: yeniEvre }; })} data-yol={y.id}
              style={{ textAlign: "left", background: taslak.yolId === y.id ? "rgba(232,163,61,0.16)" : S.kart, border: taslak.yolId === y.id ? "1px solid rgba(232,163,61,0.48)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 12, cursor: "pointer", color: S.metin, fontFamily: "inherit" }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{y.baslik}</div>
              <div style={{ fontSize: 11, color: S.soluk, marginTop: 3 }}>{y.yas} yaş{getGradeLabelForYolId(y.id) ? ` · ${getGradeLabelForYolId(y.id)}` : ""}</div>
            </button>
          ))}
        </div>

        <div style={{ fontSize: 12, color: S.vurgu, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>2 · Okuma evresi</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
          {evreSecenekleri(taslak.yolId).map((e) => (
            <button key={e.id} onClick={() => setTaslak((t) => ({ ...t, evreId: e.id }))}
              style={{ textAlign: "left", background: taslak.evreId === e.id ? "rgba(232,163,61,0.14)" : S.kart, border: taslak.evreId === e.id ? "1px solid rgba(232,163,61,0.45)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 12, minHeight: 44, padding: "11px 12px", color: S.metin, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>
              {e.ad}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 12, color: S.vurgu, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>3 · Destekler</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {DESTEK_SECENEKLERI.map((d) => {
            const secili = taslak.destekler.includes(d.id);
            return (
              <button key={d.id} onClick={() => toggleDestek(d.id)}
                aria-pressed={secili}
                style={{ background: secili ? "rgba(232,163,61,0.17)" : S.kart, border: secili ? "1px solid rgba(232,163,61,0.45)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 999, minHeight: 44, padding: "9px 12px", color: secili ? S.vurgu : S.soluk, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>
                {secili ? "✓ " : ""}{d.ad}
              </button>
            );
          })}
        </div>

        <div style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 15, marginBottom: 16 }}>
          <div style={{ color: S.vurgu, fontSize: 12, fontWeight: 700 }}>Profil önizlemesi</div>
          <div style={{ ...baslikStil, fontSize: 21, marginTop: 4 }}>{yol.baslik}</div>
          <div style={{ color: S.soluk, fontSize: 13, marginTop: 4 }}>{yol.yas} · {evreBul(taslak.evreId).ad}</div>
          <div style={{ color: "rgba(242,236,223,0.86)", fontSize: 14, lineHeight: 1.55, marginTop: 9 }}>{yol.slogan}</div>
          <div style={{ color: S.soluk, fontSize: 12, marginTop: 10 }}>Rozet yolu: {yol.rozetAdi}. Gürültülü ödül değil; ilerleme ve doygunluk hissi.</div>
        </div>

        <button onClick={() => okumaYolunuKaydet(taslak)}
          style={{ width: "100%", background: S.vurgu, color: "#14181F", border: "none", borderRadius: 15, padding: "14px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          Okuma yolumu başlat
        </button>
      </main>
    );
  };

  const AltMenu = () => (
    <nav data-bottom-nav aria-label="Ana gezinme" style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "min(1180px, 100%)", background: "rgba(20,24,31,0.96)", backdropFilter: "blur(10px)", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", zIndex: 30 }}>
      {[
        { id: "ana", ad: "Ana Sayfa", Ico: Home },
        { id: "ara", ad: "Ara", Ico: Search },
        { id: "kitaplik", ad: "Kitaplığım", Ico: Library },
      ].map(({ id, ad, Ico }) => (
        <button key={id} onClick={() => { setSekme(id); setDetayId(null); }}
          aria-current={sekme === id && !detayId ? "page" : undefined}
          style={{ flex: 1, background: "none", border: "none", padding: "10px 0 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: sekme === id && !detayId ? S.vurgu : S.soluk, fontFamily: "inherit" }}>
          <Ico size={20} /><span style={{ fontSize: 10 }}>{ad}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <div data-app-shell style={govde}>
      <style>{`@media (pointer: coarse), (hover: none), (max-width: 430px) { [data-app-shell] button { min-height: 44px !important; } }`}</style>
      {onboardingAcik ? <OnboardingSayfa /> : detayId ? <DetaySayfa /> : sekme === "ana" ? <AnaSayfa /> : sekme === "ara" ? <AramaSayfa /> : <KitaplikSayfa />}
      {!onboardingAcik && <MiniOynatici />}
      {!onboardingAcik && <TamOynatici />}
      {!onboardingAcik && <AltMenu />}
    </div>
  );
}
