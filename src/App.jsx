import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Play, Pause, RotateCcw, RotateCw, Heart, Search, Home, Library, ChevronDown, ChevronLeft, Moon, Gauge, ListMusic, Volume2, BookOpen, Clock, Type, AlignJustify, Focus, Flame } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Katalog: telifsiz Türk klasikleri, örnek bölüm metinleriyle          */
/* ------------------------------------------------------------------ */
const SURUM = "1.7.1";

const KATALOG = [
  {
    id: "kurk-mantolu-madonna",
    yas: "13+ yaş",
    baslik: "Kürk Mantolu Madonna",
    yazar: "Sabahattin Ali",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Roman",
    renk: ["#3E2C41", "#7A4A6D"],
    puan: 4.8,
    sureDk: 372,
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
    sureDk: 540,
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
    sureDk: 34,
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
    sureDk: 41,
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
    sureDk: 465,
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
    sureDk: 38,
    ozet: "Koca Ali'nin borçlu olduğu adama karşı verdiği ağır bedelin hikâyesi; minnet ve onur üzerine sarsıcı bir anlatı.",
    bolumler: [
      { ad: "Demirci Koca Ali", dk: 13, metin: "Koca Ali, kasabanın en usta demircisiydi. Kimseye minneti yoktu; alın teriyle yaşar, kimsenin ekmeğine el uzatmazdı." },
      { ad: "İftira", dk: 12, metin: "Bir gün kasabada bir hırsızlık oldu ve iftira Koca Ali'nin üzerine kaldı. Kadı, elinin kesilmesine hükmetti." },
      { ad: "Bedel", dk: 13, metin: "Hacı Mehmet diyeti ödeyip onu kurtardı ama her fırsatta bunu başına kakıyordu. Koca Ali sonunda kararını verdi." },
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
    sureDk: 52,
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
    sureDk: 45,
    ozet: "Ağustos böceği ile karınca, tavşan ile kaplumbağa ve karga ile tilki. Her biri küçük bir hayat dersi taşıyan üç klasik fabl.",
    bolumler: [
      { ad: "Ağustos Böceği ile Karınca", dk: 15, metin: "Ağustos böceği bütün yaz şarkı söylemiş, saz çalmış. Karınca ise durmadan çalışmış, kışlık yiyeceğini toplamış. Derken kış gelmiş, kar her yeri kaplamış." },
      { ad: "Tavşan ile Kaplumbağa", dk: 15, metin: "Tavşan, kaplumbağayla alay edermiş. Sen mi benimle yarışacaksın demiş. Kaplumbağa sakin sakin gülümsemiş, yarışalım da görelim demiş. Yavaş ama kararlı olan kazanırmış." },
      { ad: "Karga ile Tilki", dk: 15, metin: "Karganın ağzında bir parça peynir varmış. Kurnaz tilki ağacın altına gelmiş, ne güzel kuşsun sen, sesin de güzel midir acaba demiş. Tatlı dile kanmamak gerekirmiş." },
    ],
  },
  {
    id: "andersen-masallari",
    baslik: "Andersen Masalları",
    yazar: "Hans Christian Andersen",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Masal",
    yas: "5-9 yaş",
    renk: ["#1E4A5A", "#4A8CA0"],
    puan: 4.8,
    sureDk: 58,
    ozet: "Çirkin ördek yavrusu, kibritçi kız ve çıplak kral. Dünya çocuk edebiyatının en dokunaklı üç Andersen masalı.",
    bolumler: [
      { ad: "Çirkin Ördek Yavrusu", dk: 20, metin: "Çiftlikteki ördek yuvasında yumurtalar bir bir çatlamış. En son çatlayan yumurtadan çıkan yavru, ötekilerden çok farklıymış. Ama herkesin içinde bir kuğu saklı olabilirmiş." },
      { ad: "Kibritçi Kız", dk: 18, metin: "Yılın son gecesiymiş, kar lapa lapa yağıyormuş. Küçük kız, elindeki kibritleri satabilmek için soğuk sokaklarda dolaşıyormuş. Her kibrit alevi ona sıcak bir hayal gösteriyormuş." },
      { ad: "Kralın Yeni Giysileri", dk: 20, metin: "Kral, giysiye çok düşkünmüş. İki düzenbaz terzi saraya gelmiş, öyle bir kumaş dokuruz ki yalnızca akıllılar görebilir demişler. Gerçeği söylemek için bazen bir çocuk cesareti gerekirmiş." },
    ],
  },
  {
    id: "ezop-masallari",
    baslik: "Ezop Masalları",
    yazar: "Ezop",
    seslendiren: "Stüdyo Kaydı",
    kategori: "Masal",
    yas: "4-8 yaş",
    renk: ["#5A3A5E", "#9A6AA0"],
    puan: 4.6,
    sureDk: 40,
    ozet: "Binlerce yıldır anlatılan Ezop bilgeliği: yalancı çoban, aslan ile fare ve altın yumurtlayan tavuk.",
    bolumler: [
      { ad: "Yalancı Çoban", dk: 13, metin: "Çoban, köylülere şaka yapmayı severmiş. Kurt geliyor diye bağırır, koşup gelenlere gülermiş. Ama bir gün kurt gerçekten gelmiş. Yalancının evi yanmış, kimse inanmamış." },
      { ad: "Aslan ile Fare", dk: 13, metin: "Küçük fare, uyuyan aslanın üzerinde gezinirken aslan uyanıvermiş. Fare, beni bırakırsan bir gün ben de sana yardım ederim demiş. Aslan gülmüş ama fareyi bırakmış." },
      { ad: "Altın Yumurtlayan Tavuk", dk: 14, metin: "Adamın bir tavuğu varmış, her gün altın bir yumurta yumurtlarmış. Ama adam sabırsızmış, hepsini birden istemiş. Açgözlülük eldekinden de edermiş." },
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
    sureDk: 62,
    ozet: "Bremen mızıkacıları, Hansel ile Gretel ve kurbağa prens. Grimm Kardeşler'in derlediği üç ölümsüz masal.",
    bolumler: [
      { ad: "Bremen Mızıkacıları", dk: 20, metin: "Yaşlanan eşek, sahibinin kendisini istemediğini anlayınca yola çıkmış. Ben Bremen'e gider, mızıkacı olurum demiş. Yolda bir köpek, bir kedi ve bir horozla karşılaşmış." },
      { ad: "Hansel ile Gretel", dk: 22, metin: "Hansel ile Gretel ormanda kaybolmuşlar. Derken karşılarına şekerden, kurabiyeden yapılmış bir ev çıkmış. Ama her parlayan şeker, tatlı olmayabilirmiş." },
      { ad: "Kurbağa Prens", dk: 20, metin: "Prensesin altın topu kuyuya düşmüş. Bir kurbağa, topunu çıkarırım ama bir şartım var demiş. Verilen söz tutulurmuş, çünkü sözünde durmak insanı güzelleştirirmiş." },
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
    sureDk: 36,
    ozet: "Three timeless fables in simple English: the tortoise and the hare, the lion and the mouse, and the boy who cried wolf.",
    bolumler: [
      { ad: "The Tortoise and the Hare", dk: 12, metin: "The hare laughed at the slow tortoise. Let us race, said the tortoise with a smile. The hare ran fast, then stopped to sleep under a tree. Slow and steady wins the race." },
      { ad: "The Lion and the Mouse", dk: 12, metin: "A little mouse ran over a sleeping lion. The lion woke up and caught it. Please let me go, said the mouse, one day I will help you. The lion laughed, but he let the mouse go." },
      { ad: "The Boy Who Cried Wolf", dk: 12, metin: "A shepherd boy liked to play tricks. Wolf, wolf, he shouted, and the villagers came running. One day a real wolf came. Nobody believed the boy this time." },
    ],
  },
  {
    id: "peter-rabbit-en",
    baslik: "The Tale of Peter Rabbit",
    yazar: "Beatrix Potter",
    seslendiren: "Studio Recording",
    kategori: "Masal",
    dil: "en",
    yas: "4-8 yaş",
    renk: ["#3A4A2E", "#7A9A5C"],
    puan: 4.8,
    sureDk: 30,
    ozet: "The classic story of a naughty little rabbit who sneaks into Mr. McGregor's garden, retold in simple English.",
    bolumler: [
      { ad: "Into the Garden", dk: 10, metin: "Once upon a time there were four little rabbits. Their names were Flopsy, Mopsy, Cottontail, and Peter. Peter was very naughty. He ran straight to Mr. McGregor's garden." },
      { ad: "The Chase", dk: 10, metin: "Mr. McGregor saw Peter near the cucumber frame. Stop, thief, he cried. Peter ran as fast as his little legs could carry him. He lost one shoe among the cabbages." },
      { ad: "Safe at Home", dk: 10, metin: "At last Peter found the gate and slipped under it. He ran home and never stopped. His mother put him to bed with a spoonful of chamomile tea. Good little bunnies had bread and milk." },
    ],
  },
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
    sureDk: 32,
    ozet: "Andersen's beloved story about being different, told in short and clear English sentences.",
    bolumler: [
      { ad: "The Strange Egg", dk: 11, metin: "On a sunny farm, a mother duck sat on her eggs. One egg was bigger than the others. When it opened, out came a grey and clumsy duckling. He did not look like the rest." },
      { ad: "A Long Winter", dk: 11, metin: "The other animals laughed at the grey duckling. He felt sad and left the farm. The winter was long and cold, but he did not give up." },
      { ad: "The Swan", dk: 10, metin: "In spring, the duckling saw beautiful white birds on the lake. He looked at the water and saw his own reflection. He was not an ugly duckling at all. He was a swan." },
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
    sureDk: 48,
    ozet: "Şeftali çocuk Momotaro, denizin dibindeki saray ve ay prensesi. Japonya'nın en sevilen üç halk masalı.",
    bolumler: [
      { ad: "Momotaro, Şeftali Çocuk", dk: 16, metin: "Bir zamanlar Japonya'da yaşlı bir çift yaşarmış. Bir gün dere kenarında kocaman bir şeftali bulmuşlar. Şeftaliyi açtıklarında içinden gülen bir bebek çıkmış. Adını Momotaro koymuşlar." },
      { ad: "Urashima Taro", dk: 16, metin: "Genç balıkçı Urashima Taro, kumsalda çocukların elinden bir kaplumbağayı kurtarmış. Kaplumbağa ona teşekkür etmiş ve onu denizin dibindeki masmavi saraya davet etmiş. İyilik hiçbir zaman unutulmazmış." },
      { ad: "Ay Prensesi Kaguya", dk: 16, metin: "Yaşlı bambu kesicisi, ormanda parlayan bir bambu görmüş. İçinde avuç içi kadar küçük, ışık saçan bir kız bebek varmış. Kaguya büyüdükçe güzelleşmiş ama gözleri hep ayı ararmış." },
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
    sureDk: 46,
    ozet: "Gökyüzünde buluşan iki sevgili yıldız, dağları taşımaya karar veren ihtiyar ve yaramaz Maymun Kral. Çin'in binlerce yıllık üç anlatısı.",
    bolumler: [
      { ad: "Çoban ile Dokumacı Kız", dk: 15, metin: "Gökyüzünde, Samanyolu'nun iki yakasında iki yıldız yaşarmış. Biri çalışkan bir çoban, öteki bulutları dokuyan bir kızmış. Yılda bir gece, saksağanlar kanatlarından köprü kurarmış ki ikisi buluşabilsin." },
      { ad: "Dağları Taşıyan İhtiyar", dk: 15, metin: "Doksan yaşındaki Yu Gong'un evinin önünde iki koca dağ varmış. Bir gün ailesini toplamış, bu dağları taşıyacağız demiş. Herkes gülmüş ama o başlamış. Damla damla göl olurmuş, sabırla koruk helva olurmuş." },
      { ad: "Maymun Kral'ın Doğuşu", dk: 16, metin: "Çiçekler ve Meyveler Dağı'nın tepesinde sihirli bir taş varmış. Bir gün taş çatlamış ve içinden taştan bir maymun doğmuş. Gözlerinden iki altın ışık fışkırmış. Bu, maceraları dillere destan olacak Maymun Kral'mış." },
    ],
  },
];

const RAFLAR = [
  { ad: "Editörün Seçtikleri", mod: "yetiskin", ids: ["kurk-mantolu-madonna", "mai-ve-siyah", "pembe-incili-kaftan"] },
  { ad: "Masal Saati", mod: "cocuk", ids: ["keloglan-masallari", "andersen-masallari", "la-fontaine-fugue", "grimm-masallari", "ezop-masallari"] },
  { ad: "English Corner", mod: "cocuk", ids: ["peter-rabbit-en", "aesop-fables-en", "ugly-duckling-en"] },
  { ad: "Dünya Masalları", mod: "cocuk", ids: ["japon-masallari", "cin-masallari", "grimm-masallari", "andersen-masallari", "ezop-masallari"] },
  { ad: "Kısa Dinletiler", mod: "yetiskin", ids: ["yuksek-okceler", "pembe-incili-kaftan", "diyet"] },
  { ad: "Klasik Romanlar", mod: "yetiskin", ids: ["kurk-mantolu-madonna", "calikusu", "mai-ve-siyah"] },
];

/* ------------------------------------------------------------------ */
/* Yardımcılar                                                         */
/* ------------------------------------------------------------------ */
const kitapBul = (id) => KATALOG.find((k) => k.id === id);
const toplamSn = (kitap) => kitap.bolumler.reduce((t, b) => t + b.dk * 60, 0);
const bolumBasiSn = (kitap, i) => kitap.bolumler.slice(0, i).reduce((t, b) => t + b.dk * 60, 0);

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
function sureUzun(dk) {
  const s = Math.floor(dk / 60), d = dk % 60;
  return s > 0 ? `${s} sa ${d} dk` : `${d} dk`;
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
/* Kalıcı durum (window.storage)                                       */
/* ------------------------------------------------------------------ */
const ANAHTAR = "dinleti-durum-v1";
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
      style={{ display: "flex", alignItems: "center", gap: 2, height: 52, cursor: "pointer", touchAction: "none" }}>
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
  const [favoriler, setFavoriler] = useState([]);
  const [ilerlemeler, setIlerlemeler] = useState({}); // {id:{pos,ts}}

  // Okuma modu (senkron metin + ses) ve erişilebilirlik ayarları
  /* Erişilebilir okuma görünümü (disleksi/DEHB destekleri) */
  const PUNTOLAR = [15, 17, 20];
  const ARALIKLAR = [0, 0.07, 0.16];   // em cinsinden harf aralığı (Zorzi 2012 gerekçesi)
  const SATIRLAR = [1.7, 1.9, 2.15];
  const [okumaAcik, setOkumaAcik] = useState(true);
  const [bolumlerAcik, setBolumlerAcik] = useState(false);
  const [seri, setSeri] = useState({ sayi: 0, sonGun: "" });
  const [mod, setMod] = useState("cocuk"); // cocuk | yetiskin
  const [ayar, setAyar] = useState({ punto: 1, aralik: 1, odak: false, vurgu: true, tema: "krem", font: "lexend" });
  const [kelimeIx, setKelimeIx] = useState(0);

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
    return () => document.head.removeChild(l);
  }, []);

  /* Kalıcı durumu yükle */
  useEffect(() => {
    (async () => {
      const d = await durumOku();
      if (d) {
        setFavoriler(d.favoriler || []);
        setIlerlemeler(d.ilerlemeler || {});
        if (d.hiz) setHiz(d.hiz);
        if (d.sonKitap && kitapBul(d.sonKitap)) {
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
        const r = await window.storage.get("dinleti-seri-v1");
        if (r) setSeri(JSON.parse(r.value));
      } catch {}
    })();
    (async () => {
      try {
        const r = await window.storage.get("dinleti-okuma-ayar-v1");
        if (r) setAyar((e) => ({ ...e, ...JSON.parse(r.value) }));
      } catch {}
    })();
  }, []);

  /* Okuma ayarlarını kaydet */
  const ilkAyar = useRef(true);
  useEffect(() => {
    if (ilkAyar.current) { ilkAyar.current = false; return; }
    (async () => { try { await window.storage.set("dinleti-okuma-ayar-v1", JSON.stringify(ayar)); } catch {} })();
  }, [ayar]);

  /* Kaydet */
  const kaydet = useCallback((ek = {}) => {
    durumYaz({ favoriler, ilerlemeler, hiz, sonKitap: aktifId, ...ek });
  }, [favoriler, ilerlemeler, hiz, aktifId]);

  const aktif = aktifId ? kitapBul(aktifId) : null;
  const toplam = aktif ? toplamSn(aktif) : 0;

  const aktifBolumIx = useMemo(() => {
    if (!aktif) return 0;
    let t = 0;
    for (let i = 0; i < aktif.bolumler.length; i++) {
      t += aktif.bolumler[i].dk * 60;
      if (pozisyon < t) return i;
    }
    return aktif.bolumler.length - 1;
  }, [aktif, pozisyon]);

  /* Seslendirme (Web Speech) */
  const konusmayiDurdur = () => {
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch {}
    konusmaRef.current = null;
  };
  const sonSinir = useRef(0);          // son onboundary olayının zamanı (uyarlanabilir kapı)
  const kalibrasyon = useRef(1);       // gerçek TTS temposu / tahmin (bölüm sonunda güncellenir)
  const konusmayiBaslatRef = useRef(null);
  const konusmayiBaslat = useCallback((kitap, bolumIx, kelimeBas = 0) => {
    if (!seslendirme || !window.speechSynthesis) return;
    konusmayiDurdur();
    sonSinir.current = 0;
    try {
      const b = kitap.bolumler[bolumIx];
      const kelimeler = b.metin.trim().split(/\s+/);
      const bas = Math.min(Math.max(0, kelimeBas), kelimeler.length - 1);
      const govdeMetin = kelimeler.slice(bas).join(" ");
      const onekMetin = bas === 0 ? `${b.ad}. ` : "";
      const u = new SpeechSynthesisUtterance(onekMetin + govdeMetin);
      const dil = kitap.dil === "en" ? "en-GB" : "tr-TR";
      u.lang = dil; u.rate = hiz;
      const onek = onekMetin.length; // bölüm adı vurgulanmaz
      u.onboundary = (e) => {
        if (e.name && e.name !== "word") return;
        sonSinir.current = Date.now();
        const ci = (e.charIndex || 0) - onek;
        if (ci < 0) { setKelimeIx(bas); return; }
        const oncekiler = govdeMetin.slice(0, ci).trim();
        const idx = bas + (oncekiler ? oncekiler.split(/\s+/).length : 0);
        setKelimeIx(Math.min(idx, kelimeler.length - 1));
      };
      const tahminMs = kelimeler.slice(bas).reduce((t, k) => t + kelimeSure(k, hiz), 0);
      let basZaman = 0;
      u.onstart = () => { basZaman = Date.now(); };
      u.onend = () => {
        if (konusmaRef.current !== u) return; // iptal/yenisiyle değiştirilmişse dokunma
        if (basZaman && tahminMs > 1000) {
          const oran = (Date.now() - basZaman) / tahminMs;
          if (oran > 0.4 && oran < 3) kalibrasyon.current = Math.min(2, Math.max(0.5, kalibrasyon.current * 0.6 + oran * 0.4));
        }
        if (bolumIx + 1 < kitap.bolumler.length) {
          setPozisyon(bolumBasiSn(kitap, bolumIx + 1));
          setKelimeIx(0);
          if (konusmayiBaslatRef.current) konusmayiBaslatRef.current(kitap, bolumIx + 1, 0);
        }
      };
      const hedef = kitap.dil === "en" ? "en" : "tr";
      konusmaRef.current = u;
      const konus = (deneme) => {
        if (konusmaRef.current !== u) return; // bu arada iptal/degisti
        let liste = seslerRef.current;
        if (!liste.length) { const l = window.speechSynthesis.getVoices(); if (l && l.length) { seslerRef.current = l; liste = l; } }
        if (!liste.length && deneme < 6) { setTimeout(() => konus(deneme + 1), 180); return; }
        const puanla = (v) => {
          const ad = (v.name || "").toLowerCase();
          return (ad.includes("natural") ? 8 : 0) + (/enhanced|premium|neural/.test(ad) ? 6 : 0)
            + (/google|siri|samantha|yelda|filiz|daniel/.test(ad) ? 3 : 0) + (v.localService === false ? 1 : 0);
        };
        const adaylar = liste.filter((v) => v.lang && v.lang.toLowerCase().startsWith(hedef)).sort((a, b) => puanla(b) - puanla(a));
        if (adaylar[0]) u.voice = adaylar[0];
        u.pitch = 1.03; // düz makine tonunu bir tık yumuşat
        window.speechSynthesis.speak(u);
      };
      konus(0);
    } catch {}
  }, [seslendirme, hiz]);
  useEffect(() => { konusmayiBaslatRef.current = konusmayiBaslat; }, [konusmayiBaslat]);

  /* Zaman ilerletici */
  useEffect(() => {
    if (!caliyor || !aktif) return;
    const int = setInterval(() => {
      setPozisyon((p) => {
        const yeni = Math.min(toplam, p + hiz);
        if (yeni >= toplam) setCaliyor(false);
        return yeni;
      });
      setUyku((u) => {
        if (u <= 0) return 0;
        if (u <= 1) { setCaliyor(false); return 0; }
        return u - 1;
      });
    }, 1000);
    return () => clearInterval(int);
  }, [caliyor, aktif, hiz, toplam]);

  /* Uyku dolunca konuşmayı da kes */
  useEffect(() => { if (!caliyor) konusmayiDurdur(); }, [caliyor]);

  /* Kelime vurgusu: bölüm/kitap değişince başa dön */
  useEffect(() => { setKelimeIx(0); }, [aktifId, aktifBolumIx]);

  /* Kelime vurgusu: uyarlanabilir tahmin motoru.
     onboundary olayları geliyorsa gerçek senkron onları kullanır; gelmiyorsa
     (mobil tarayıcıların çoğu göndermez) kelime uzunluğu ağırlıklı zamanlayıcı sürer. */
  useEffect(() => {
    if (!caliyor || !aktif || !okumaAcik) return;
    const kelimeler = aktif.bolumler[aktifBolumIx].metin.trim().split(/\s+/);
    let zaman = null, iptal = false;
    const en = aktif.dil === "en";
    const sure = (k) => {
      let ms = (en ? 190 + 48 * k.length : 240 + 62 * k.length) / hiz; // dil temposu
      if (/[.!?…]$/.test(k)) ms += (en ? 260 : 320) / hiz;             // cümle sonu duraklaması
      else if (/[,;:]$/.test(k)) ms += 140 / hiz;
      return Math.max(110, ms);
    };
    const adim = () => {
      if (iptal) return;
      setKelimeIx((i) => {
        if (iptal) return i; // temizlik ile güncelleyici arasındaki yarışı kapat
        const ttsSuruyor = Date.now() - sonSinir.current < 1500; // gerçek sınır olayları canlı
        const yeni = ttsSuruyor ? i : Math.min(kelimeler.length - 1, i + 1);
        zaman = setTimeout(adim, sure(kelimeler[Math.min(yeni, kelimeler.length - 1)]));
        return yeni;
      });
    };
    zaman = setTimeout(adim, 400);
    return () => { iptal = true; if (zaman) clearTimeout(zaman); };
  }, [caliyor, aktif, aktifBolumIx, hiz, okumaAcik, seslendirme]);

  /* İlerlemeyi 5 sn'de bir kaydet */
  useEffect(() => {
    if (!aktifId) return;
    const simdi = Date.now();
    if (simdi - sonKayit.current < 5000 && caliyor) return;
    sonKayit.current = simdi;
    setIlerlemeler((eski) => {
      const yeni = { ...eski, [aktifId]: { pos: pozisyon, ts: simdi } };
      durumYaz({ favoriler, ilerlemeler: yeni, hiz, sonKitap: aktifId });
      return yeni;
    });
  }, [pozisyon, aktifId]); // eslint-disable-line

  /* Oynat / duraklat */
  const modDegistir = (m) => {
    setMod(m);
    (async () => { try { await window.storage.set("dinleti-mod-v1", m); } catch {} })();
  };
  const modUyum = (k) => (mod === "cocuk" ? k.kategori === "Masal" : k.kategori !== "Masal");

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
    if (!id) return;
    if (id !== aktifId) {
      konusmayiDurdur();
      setAktifId(id);
      const p = ilerlemeler[id]?.pos || 0;
      setPozisyon(p);
      setCaliyor(true);
      seriGuncelle();
      const k = kitapBul(id);
      let ix = 0, t = 0;
      for (let i = 0; i < k.bolumler.length; i++) { t += k.bolumler[i].dk * 60; if (p < t) { ix = i; break; } }
      konusmayiBaslat(k, ix, 0);
      return;
    }
    if (caliyor) {
      setCaliyor(false); konusmayiDurdur();
      setIlerlemeler((eski) => {
        const yeni = { ...eski, [id]: { pos: pozisyon, ts: Date.now() } };
        durumYaz({ favoriler, ilerlemeler: yeni, hiz, sonKitap: id });
        return yeni;
      });
    }
    else { setCaliyor(true); seriGuncelle(); konusmayiBaslat(aktif, aktifBolumIx, 0); }
  };

  const vurguHizala = (poz, konusmayiYenile = false) => {
    if (!aktif) return;
    let t = 0;
    for (let i = 0; i < aktif.bolumler.length; i++) {
      const s = aktif.bolumler[i].dk * 60;
      if (poz < t + s) {
        const oran = (poz - t) / s;
        const ks = aktif.bolumler[i].metin.trim().split(/\s+/).length;
        const kelime = Math.min(ks - 1, Math.max(0, Math.floor(oran * ks)));
        setKelimeIx(kelime);
        if (konusmayiYenile && caliyor) konusmayiBaslat(aktif, i, kelime);
        return;
      }
      t += s;
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
  const bolumeGit = (ix) => {
    if (!aktif) return;
    setPozisyon(bolumBasiSn(aktif, ix));
    setCaliyor(true);
    konusmayiBaslat(aktif, ix, 0);
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
  const govde = { fontFamily: "'Inter', system-ui, sans-serif", background: S.fon, color: S.metin, minHeight: "100vh", maxWidth: 480, margin: "0 auto", position: "relative", paddingBottom: 150 };
  const baslikStil = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

  if (yukleniyor) {
    return <div style={{ ...govde, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{ color: S.soluk }}>Kitaplık açılıyor…</div>
    </div>;
  }

  /* ------------------------- Alt bileşenler ------------------------- */

  const KitapKart = ({ kitap, genis }) => (
    <div onClick={() => setDetayId(kitap.id)} style={{ cursor: "pointer", width: genis ? "100%" : 128 }}>
      <Kapak kitap={kitap} boyut={genis ? 96 : 128} />
      <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{kitap.baslik}</div>
      <div style={{ fontSize: 12, color: S.soluk, marginTop: 2 }}>{kitap.yazar}</div>
      {kitap.yas && <div data-yas style={{ fontSize: 11, color: S.vurgu, marginTop: 3 }}>{kitap.yas}{kitap.dil === "en" ? " · English" : ""}</div>}
    </div>
  );

  const DevamKart = () => {
    const devamlar = Object.entries(ilerlemeler)
      .filter(([id, v]) => v.pos > 10 && kitapBul(id))
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

  const AnaSayfa = () => (
    <div style={{ padding: "24px 20px" }}>
      <div style={{ ...baslikStil, fontSize: 30, marginBottom: 4 }}>Dinleti</div>
      <div style={{ color: S.soluk, fontSize: 14, marginBottom: 14 }}>
        {mod === "cocuk" ? "Masallarla dinle, takip et, okumaya alış." : "Klasikleri sesli ve odaklı dinle."}
        {" "}<span data-surum style={{ fontSize: 11, opacity: 0.6 }}>v{SURUM}</span>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        {[
          { id: "cocuk", ad: "Çocuk", alt: "Masal + kısa pratik" },
          { id: "yetiskin", ad: "Yetişkin", alt: "Klasikler + odak" },
        ].map((m) => (
          <button key={m.id} data-mod={m.id} onClick={() => modDegistir(m.id)}
            style={{ flex: 1, textAlign: "left", background: mod === m.id ? "rgba(232,163,61,0.14)" : S.kart, border: mod === m.id ? "1px solid rgba(232,163,61,0.5)" : "1px solid transparent", borderRadius: 14, padding: "12px 14px", cursor: "pointer", fontFamily: "inherit" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: mod === m.id ? S.vurgu : S.metin }}>{m.ad}</div>
            <div style={{ fontSize: 12, color: S.soluk, marginTop: 2 }}>{m.alt}</div>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {["Senkron kelime takibi", "Odak modu", "Rahat okuma aralığı", "Kaldığın yerden devam"].map((r) => (
          <span key={r} style={{ fontSize: 12, color: S.soluk, background: S.kart, borderRadius: 10, padding: "7px 11px" }}>{r}</span>
        ))}
      </div>
      {seri.sayi > 0 && (
        <div data-seri style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(232,163,61,0.12)", borderRadius: 12, padding: "10px 14px", marginBottom: 14, color: S.vurgu, fontSize: 13 }}>
          <Flame size={16} /> {seri.sayi} günlük dinleme serisi. Bugün de buradasın, harika.
        </div>
      )}
      <DevamKart />
      {RAFLAR.filter((raf) => !raf.mod || raf.mod === mod).map((raf) => (
        <div key={raf.ad} style={{ marginTop: 28 }}>
          <div style={{ ...baslikStil, fontSize: 19, marginBottom: 14 }}>{raf.ad}</div>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 6 }}>
            {raf.ids.map((id) => <KitapKart key={id} kitap={kitapBul(id)} />)}
          </div>
        </div>
      ))}
    </div>
  );

  const AramaSayfa = () => {
    const q = arama.trim().toLowerCase();
    const evren = KATALOG.filter(modUyum);
    const sonuc = q ? evren.filter((k) => (k.baslik + " " + k.yazar + " " + k.kategori).toLowerCase().includes(q)) : evren;
    return (
      <div style={{ padding: "24px 20px" }}>
        <div style={{ ...baslikStil, fontSize: 26, marginBottom: 16 }}>Ara</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: S.kart, borderRadius: 12, padding: "12px 14px", marginBottom: 20 }}>
          <Search size={18} color={S.soluk} />
          <input value={arama} onChange={(e) => setArama(e.target.value)} placeholder="Kitap veya yazar ara"
            style={{ background: "none", border: "none", outline: "none", color: S.metin, fontSize: 15, flex: 1, fontFamily: "inherit" }} />
        </div>
        {sonuc.length === 0 && <div style={{ color: S.soluk, fontSize: 14 }}>Sonuç bulunamadı. Başka bir kelime dene.</div>}
        {sonuc.map((k) => (
          <div key={k.id} onClick={() => setDetayId(k.id)} style={{ display: "flex", gap: 14, padding: "12px 0", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.06)", alignItems: "center" }}>
            <Kapak kitap={k} boyut={52} radius={6} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{k.baslik}</div>
              <div style={{ fontSize: 12, color: S.soluk, marginTop: 2 }}>{k.yazar} · {k.kategori}{k.dil === "en" ? " · English" : ""}{k.yas ? ` · ${k.yas}` : ""} · {sureUzun(k.sureDk)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const KitaplikSayfa = () => {
    const favKitaplar = favoriler.map(kitapBul).filter(Boolean);
    const devamlar = Object.entries(ilerlemeler).filter(([id, v]) => v.pos > 10 && kitapBul(id)).sort((a, b) => b[1].ts - a[1].ts);
    return (
      <div style={{ padding: "24px 20px" }}>
        <div style={{ ...baslikStil, fontSize: 26, marginBottom: 20 }}>Kitaplığım</div>
        <div style={{ ...baslikStil, fontSize: 17, marginBottom: 12 }}>Dinlemeye devam</div>
        {devamlar.length === 0 && <div style={{ color: S.soluk, fontSize: 14, marginBottom: 20 }}>Henüz dinlemeye başlamadın. Ana sayfadan bir kitap seç.</div>}
        {devamlar.map(([id, v]) => {
          const k = kitapBul(id); const oran = v.pos / toplamSn(k);
          return (
            <div key={id} onClick={() => setDetayId(id)} style={{ display: "flex", gap: 14, padding: "10px 0", cursor: "pointer", alignItems: "center" }}>
              <Kapak kitap={k} boyut={52} radius={6} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{k.baslik}</div>
                <div style={{ fontSize: 12, color: S.soluk, margin: "4px 0 6px" }}>%{Math.round(oran * 100)} dinlendi</div>
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
      </div>
    );
  };

  const DetaySayfa = () => {
    const k = kitapBul(detayId);
    if (!k) return null;
    const p = ilerlemeler[k.id]?.pos || 0;
    const fav = favoriler.includes(k.id);
    return (
      <div style={{ padding: "16px 20px" }}>
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
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={13} /> {sureUzun(k.sureDk)}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><BookOpen size={13} /> {k.bolumler.length} bölüm</span>
          <span style={{ color: S.vurgu }}>★ {k.puan}</span>
          {k.yas && <span style={{ background: "rgba(232,163,61,0.15)", color: S.vurgu, borderRadius: 6, padding: "1px 7px" }}>{k.yas}</span>}
          {k.dil === "en" && <span style={{ background: "rgba(90,140,160,0.25)", color: "#9CCDE0", borderRadius: 6, padding: "1px 7px" }}>English</span>}
        </div>
        <button onClick={() => { oynatDegistir(k.id); setOynaticiAcik(true); }}
          style={{ width: "100%", marginTop: 18, background: S.vurgu, color: "#14181F", border: "none", borderRadius: 14, padding: "14px 0", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          {p > 10 ? `Devam et · ${sureYaz(p)}` : "Dinlemeye başla"}
        </button>
        <div style={{ marginTop: 22, fontSize: 14, lineHeight: 1.6, color: "rgba(242,236,223,0.85)" }}>{k.ozet}</div>
        <div style={{ ...baslikStil, fontSize: 17, margin: "24px 0 10px" }}>Bölümler</div>
        {k.bolumler.map((b, i) => {
          const aktifMi = aktifId === k.id && aktifBolumIx === i;
          return (
            <div key={i} onClick={() => { if (aktifId !== k.id) { oynatDegistir(k.id); } bolumeGit(i); setOynaticiAcik(true); }}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 26, textAlign: "center", color: aktifMi ? S.vurgu : S.soluk, fontSize: 13 }}>{aktifMi ? <Volume2 size={15} /> : i + 1}</div>
                <div style={{ fontSize: 14, fontWeight: aktifMi ? 600 : 400, color: aktifMi ? S.vurgu : S.metin }}>{b.ad}</div>
              </div>
              <div style={{ fontSize: 12, color: S.soluk }}>{b.dk} dk</div>
            </div>
          );
        })}
      </div>
    );
  };

  /* Mini oynatıcı */
  const MiniOynatici = () => {
    if (!aktif || oynaticiAcik) return null;
    const oran = toplam ? pozisyon / toplam : 0;
    return (
      <div onClick={() => setOynaticiAcik(true)} style={{ position: "fixed", bottom: 64, left: "50%", transform: "translateX(-50%)", width: "min(480px, 100%)", padding: "0 10px", boxSizing: "border-box", cursor: "pointer", zIndex: 20 }}>
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
    const cip = (aktifMi) => ({ background: aktifMi ? "rgba(232,163,61,0.18)" : "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "7px 11px", color: aktifMi ? S.vurgu : S.metin, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" });
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 40, display: "flex", justifyContent: "center", background: "rgba(10,12,16,0.6)" }}>
        <div style={{ width: "min(480px, 100%)", background: `linear-gradient(180deg, ${aktif.renk[0]}55 0%, ${S.fon} 30%)`, backgroundColor: S.fon, display: "flex", flexDirection: "column", height: "100%", padding: "14px 18px 12px", boxSizing: "border-box" }}>

          {/* Üst çubuk */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
            <button onClick={() => setOynaticiAcik(false)} aria-label="Kapat" style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: 8, color: S.metin, cursor: "pointer" }}><ChevronDown size={20} /></button>
            <div style={{ fontSize: 12, color: S.soluk, letterSpacing: "0.08em", textTransform: "uppercase" }}>Şimdi dinleniyor</div>
            <button onClick={() => favoriDegistir(aktif.id)} aria-label="Favori" style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
              <Heart size={18} color={favoriler.includes(aktif.id) ? S.vurgu : S.metin} fill={favoriler.includes(aktif.id) ? S.vurgu : "none"} />
            </button>
          </div>

          {/* Kompakt kitap bilgisi */}
          <div data-kompakt-baslik onClick={() => setBolumlerAcik(!bolumlerAcik)} style={{ display: "flex", alignItems: "center", gap: 12, margin: "12px 0 10px", flexShrink: 0, cursor: "pointer" }}>
            <Kapak kitap={aktif} boyut={44} radius={6} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ ...baslikStil, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{aktif.baslik}</div>
              <div style={{ color: S.soluk, fontSize: 12, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.ad} · {aktifBolumIx + 1}/{aktif.bolumler.length} bölüm</div>
            </div>
            <ListMusic size={17} color={bolumlerAcik ? S.vurgu : S.soluk} />
          </div>

          {/* Bölüm listesi (katlanır) */}
          {bolumlerAcik && (
            <div data-bolum-listesi style={{ flexShrink: 0, maxHeight: 180, overflowY: "auto", background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "4px 12px", marginBottom: 10 }}>
              {aktif.bolumler.map((bb, i) => (
                <div key={i} onClick={() => { bolumeGit(i); setBolumlerAcik(false); }} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < aktif.bolumler.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", cursor: "pointer", fontSize: 13, color: i === aktifBolumIx ? S.vurgu : S.metin, fontWeight: i === aktifBolumIx ? 600 : 400 }}>
                  <span>{i + 1}. {bb.ad}</span><span style={{ color: S.soluk, fontSize: 12 }}>{bb.dk} dk</span>
                </div>
              ))}
            </div>
          )}

          {/* OKUMA ALANI: ekranın ana yüzeyi */}
          <div data-okuma-alani style={{ flex: 1, minHeight: 0, overflowY: "auto", background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: S.soluk, fontSize: 13 }}><BookOpen size={15} /> Okuma görünümü</div>
              <button onClick={() => setOkumaAcik(!okumaAcik)} aria-label="Okuma görünümünü aç kapat"
                style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "5px 10px", color: S.metin, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
                {okumaAcik ? "Gizle" : "Göster"}
              </button>
            </div>
            {okumaAcik && (() => {
              const kelimeler = b.metin.trim().split(/\s+/);
              const cumleler = [];
              let bas = 0;
              kelimeler.forEach((k, i) => { if (/[.!?…]$/.test(k) || i === kelimeler.length - 1) { cumleler.push([bas, i]); bas = i + 1; } });
              const aktifCumle = cumleler.find(([a, z]) => kelimeIx >= a && kelimeIx <= z) || cumleler[0];
              const gorunecek = ayar.odak ? kelimeler.slice(aktifCumle[0], aktifCumle[1] + 1) : kelimeler;
              const kaydirma = ayar.odak ? aktifCumle[0] : 0;
              return (
                <>
                  <div data-okuma-metin="1" data-tema={ayar.tema} style={{
                    fontSize: PUNTOLAR[ayar.punto], letterSpacing: `${ARALIKLAR[ayar.aralik]}em`,
                    lineHeight: SATIRLAR[ayar.aralik], wordSpacing: `${ARALIKLAR[ayar.aralik] * 2.2}em`,
                    color: ayar.tema === "krem" ? "#2A2622" : "rgba(242,236,223,0.92)",
                    background: ayar.tema === "krem" ? "#F2ECDF" : "none",
                    borderRadius: ayar.tema === "krem" ? 12 : 0,
                    padding: ayar.tema === "krem" ? "14px 16px" : 0,
                    fontFamily: ayar.font === "lexend" ? "'Lexend', sans-serif" : "inherit",
                    textAlign: "left", minHeight: 60,
                  }}>
                    {gorunecek.map((k, i) => {
                      const gercekIx = i + kaydirma;
                      const aktifMi = ayar.vurgu && gercekIx === kelimeIx;
                      return <span key={gercekIx} data-aktif={aktifMi ? "1" : undefined} style={{
                        background: aktifMi ? (ayar.tema === "krem" ? "rgba(201,139,61,0.45)" : "rgba(232,163,61,0.35)") : "none",
                        borderRadius: 4, padding: aktifMi ? "0 2px" : 0,
                        color: aktifMi ? (ayar.tema === "krem" ? "#1A1510" : "#FFF3DC") : undefined,
                      }}>{k}{" "}</span>;
                    })}
                  </div>
                  {ayar.odak && <div style={{ fontSize: 11, color: S.soluk, marginTop: 8 }}>Odak modu: cümle {cumleler.indexOf(aktifCumle) + 1} / {cumleler.length}</div>}
                  <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                    <button onClick={() => setAyar({ ...ayar, punto: (ayar.punto + 1) % PUNTOLAR.length })} aria-label="Yazı boyutu" style={cip(false)}>
                      <Type size={13} /> {["Küçük", "Orta", "Büyük"][ayar.punto]}
                    </button>
                    <button onClick={() => setAyar({ ...ayar, aralik: (ayar.aralik + 1) % ARALIKLAR.length })} aria-label="Harf aralığı" style={cip(false)}>
                      <AlignJustify size={13} /> Aralık: {["Normal", "Geniş", "Ekstra"][ayar.aralik]}
                    </button>
                    <button onClick={() => setAyar({ ...ayar, odak: !ayar.odak })} aria-label="Odak modu" style={cip(ayar.odak)}>
                      <Focus size={13} /> Odak modu
                    </button>
                    <button onClick={() => setAyar({ ...ayar, vurgu: !ayar.vurgu })} aria-label="Kelime vurgusu" style={cip(ayar.vurgu)}>
                      Kelime vurgusu
                    </button>
                    <button onClick={() => setAyar({ ...ayar, tema: ayar.tema === "krem" ? "koyu" : "krem" })} aria-label="Zemin" style={cip(false)}>
                      Zemin: {ayar.tema === "krem" ? "Krem" : "Koyu"}
                    </button>
                    <button onClick={() => setAyar({ ...ayar, font: ayar.font === "lexend" ? "varsayilan" : "lexend" })} aria-label="Yazı tipi" style={cip(false)}>
                      Yazı: {ayar.font === "lexend" ? "Lexend" : "Varsayılan"}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>

          {/* ALT KONTROL BLOĞU: sabit */}
          <div data-alt-kontrol style={{ flexShrink: 0, paddingTop: 10 }}>
            <DalgaBar kitap={aktif} oran={oran} onSar={oranaSar} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: S.soluk, marginTop: 4 }}>
              <span>{sureYaz(pozisyon)}</span><span>-{sureYaz(toplam - pozisyon)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, marginTop: 8 }}>
              <button onClick={() => sar(-15)} aria-label="15 saniye geri" style={{ background: "none", border: "none", color: S.metin, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <RotateCcw size={24} /><span style={{ fontSize: 10, color: S.soluk }}>15</span>
              </button>
              <button onClick={() => oynatDegistir()} aria-label={caliyor ? "Duraklat" : "Oynat"}
                style={{ width: 58, height: 58, borderRadius: 29, background: S.vurgu, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 6px 22px rgba(232,163,61,0.35)" }}>
                {caliyor ? <Pause size={25} color="#14181F" fill="#14181F" /> : <Play size={25} color="#14181F" fill="#14181F" style={{ marginLeft: 3 }} />}
              </button>
              <button onClick={() => sar(30)} aria-label="30 saniye ileri" style={{ background: "none", border: "none", color: S.metin, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <RotateCw size={24} /><span style={{ fontSize: 10, color: S.soluk }}>30</span>
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
              <button onClick={hizDegistir} style={cip(false)}><Gauge size={14} /> {hiz}x</button>
              <button onClick={uykuDegistir} style={cip(uyku > 0)}><Moon size={14} /> {uyku > 0 ? sureYaz(uyku) : "Uyku"}</button>
              <button onClick={() => { const y = !seslendirme; setSeslendirme(y); if (!y) konusmayiDurdur(); else if (caliyor) konusmayiBaslat(aktif, aktifBolumIx, 0); }} style={cip(seslendirme)}>
                <Volume2 size={14} /> Sesli okuma
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AltMenu = () => (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "min(480px, 100%)", background: "rgba(20,24,31,0.96)", backdropFilter: "blur(10px)", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", zIndex: 30 }}>
      {[
        { id: "ana", ad: "Ana Sayfa", Ico: Home },
        { id: "ara", ad: "Ara", Ico: Search },
        { id: "kitaplik", ad: "Kitaplığım", Ico: Library },
      ].map(({ id, ad, Ico }) => (
        <button key={id} onClick={() => { setSekme(id); setDetayId(null); }}
          style={{ flex: 1, background: "none", border: "none", padding: "10px 0 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: sekme === id && !detayId ? S.vurgu : S.soluk, fontFamily: "inherit" }}>
          <Ico size={20} /><span style={{ fontSize: 10 }}>{ad}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div style={govde}>
      {detayId ? <DetaySayfa /> : sekme === "ana" ? <AnaSayfa /> : sekme === "ara" ? <AramaSayfa /> : <KitaplikSayfa />}
      <MiniOynatici />
      <TamOynatici />
      <AltMenu />
    </div>
  );
}
