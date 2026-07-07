import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Play, Pause, RotateCcw, RotateCw, Heart, Search, Home, Library, ChevronDown, ChevronLeft, Moon, Gauge, ListMusic, Volume2, BookOpen, Clock, Type, AlignJustify, Focus } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Katalog: telifsiz Türk klasikleri, örnek bölüm metinleriyle          */
/* ------------------------------------------------------------------ */
const KATALOG = [
  {
    id: "kurk-mantolu-madonna",
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
];

const RAFLAR_COCUK = [
  { ad: "Masal ile Okuma Pratiği", ids: ["keloglan-masallari", "andersen-masallari", "la-fontaine-fugue", "grimm-masallari", "ezop-masallari"] },
  { ad: "Kısa Odak Dinletileri", ids: ["ezop-masallari", "la-fontaine-fugue", "keloglan-masallari"] },
  { ad: "Sakinleşme ve Uyku Dinletileri", ids: ["andersen-masallari", "grimm-masallari", "keloglan-masallari"] },
];

const RAFLAR_YETISKIN = [
  { ad: "Yarım Kalan Kitaplara Dönüş", ids: ["kurk-mantolu-madonna", "mai-ve-siyah", "calikusu"] },
  { ad: "Kısa Klasikler", ids: ["yuksek-okceler", "pembe-incili-kaftan", "diyet"] },
  { ad: "Odaklanması Kolay Hikâyeler", ids: ["pembe-incili-kaftan", "yuksek-okceler", "diyet"] },
  { ad: "Türk Edebiyatı", ids: ["kurk-mantolu-madonna", "calikusu", "mai-ve-siyah"] },
];

const MODLAR = {
  cocuk: {
    ad: "Çocuk",
    baslik: "Dinle, takip et, okumaya başla.",
    aciklama: "Disleksi, ADHD veya okuma isteksizliği yaşayan çocuklar için sesli, vurgulu ve odaklı okuma deneyimi.",
    etiket: "Çocuk modu",
  },
  yetiskin: {
    ad: "Yetişkin",
    baslik: "Dinle, takip et, okumaya dön.",
    aciklama: "Disleksi, ADHD veya uzun metne odaklanmakta zorlanan yetişkinler için erişilebilir klasikler ve takipli sesli okuma.",
    etiket: "Yetişkin modu",
  },
};

/* ------------------------------------------------------------------ */
/* Yardımcılar                                                         */
/* ------------------------------------------------------------------ */
const kitapBul = (id) => KATALOG.find((k) => k.id === id);
const toplamSn = (kitap) => kitap.bolumler.reduce((t, b) => t + b.dk * 60, 0);
const bolumBasiSn = (kitap, i) => kitap.bolumler.slice(0, i).reduce((t, b) => t + b.dk * 60, 0);

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
/* Kalıcı durum: Cloudflare Pages için localStorage desteği             */
/* ------------------------------------------------------------------ */
const ANAHTAR = "dinleti-durum-v1";
const MOD_ANAHTAR = "dinleti-mod-v1";

async function depodanOku(anahtar) {
  try {
    if (typeof window !== "undefined" && window.storage?.get) {
      const r = await window.storage.get(anahtar);
      return r ? r.value : null;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(anahtar);
    }
  } catch {}
  return null;
}

async function depoyaYaz(anahtar, deger) {
  try {
    if (typeof window !== "undefined" && window.storage?.set) {
      await window.storage.set(anahtar, deger);
      return;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(anahtar, deger);
    }
  } catch {}
}

async function durumOku() {
  try {
    const r = await depodanOku(ANAHTAR);
    return r ? JSON.parse(r) : null;
  } catch { return null; }
}
async function durumYaz(durum) {
  try { await depoyaYaz(ANAHTAR, JSON.stringify(durum)); } catch {}
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
  const [mod, setMod] = useState("yetiskin"); // yetiskin | cocuk

  // Çalma durumu
  const [aktifId, setAktifId] = useState(null);
  const [pozisyon, setPozisyon] = useState(0);        // saniye, kitap bütünü
  const [caliyor, setCaliyor] = useState(false);
  const [hiz, setHiz] = useState(1);
  const [uyku, setUyku] = useState(0);                // kalan sn, 0 = kapalı
  const [seslendirme, setSeslendirme] = useState(true);
  const [favoriler, setFavoriler] = useState([]);
  const [ilerlemeler, setIlerlemeler] = useState({}); // {id:{pos,ts}}

  /* Erişilebilir okuma görünümü (disleksi/DEHB destekleri) */
  const PUNTOLAR = [15, 17, 20];
  const ARALIKLAR = [0, 0.07, 0.16];   // em cinsinden harf aralığı (Zorzi 2012 gerekçesi)
  const SATIRLAR = [1.7, 1.9, 2.15];
  const [okumaAcik, setOkumaAcik] = useState(true);
  const [ayar, setAyar] = useState({ punto: 1, aralik: 1, odak: false, vurgu: true });
  const [kelimeIx, setKelimeIx] = useState(0);

  const konusmaRef = useRef(null);
  const sonKayit = useRef(0);

  /* Yazı tipleri */
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap";
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
        const r = await depodanOku("dinleti-okuma-ayar-v1");
        if (r) setAyar((e) => ({ ...e, ...JSON.parse(r) }));
      } catch {}
    })();
    (async () => {
      try {
        const r = await depodanOku(MOD_ANAHTAR);
        if (r && MODLAR[JSON.parse(r)]) setMod(JSON.parse(r));
      } catch {}
    })();
  }, []);

  /* Okuma ayarlarını kaydet */
  const ilkAyar = useRef(true);
  useEffect(() => {
    if (ilkAyar.current) { ilkAyar.current = false; return; }
    (async () => { try { await depoyaYaz("dinleti-okuma-ayar-v1", JSON.stringify(ayar)); } catch {} })();
  }, [ayar]);

  useEffect(() => {
    (async () => { try { await depoyaYaz(MOD_ANAHTAR, JSON.stringify(mod)); } catch {} })();
  }, [mod]);

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
  const konusmayiBaslat = useCallback((kitap, bolumIx, oran) => {
    if (!seslendirme || !window.speechSynthesis) return;
    konusmayiDurdur();
    try {
      const b = kitap.bolumler[bolumIx];
      const u = new SpeechSynthesisUtterance(`${b.ad}. ${b.metin}`);
      u.lang = "tr-TR"; u.rate = hiz;
      const onek = b.ad.length + 2; // "Bölüm adı. " kısmı vurgulanmaz
      u.onboundary = (e) => {
        if (e.name && e.name !== "word") return;
        const ci = (e.charIndex || 0) - onek;
        if (ci < 0) { setKelimeIx(0); return; }
        const oncekiler = b.metin.slice(0, ci).trim();
        const idx = oncekiler ? oncekiler.split(/\s+/).length : 0;
        setKelimeIx(Math.min(idx, b.metin.trim().split(/\s+/).length - 1));
      };
      const sesler = window.speechSynthesis.getVoices();
      const tr = sesler.find((v) => v.lang && v.lang.startsWith("tr"));
      if (tr) u.voice = tr;
      konusmaRef.current = u;
      window.speechSynthesis.speak(u);
    } catch {}
  }, [seslendirme, hiz]);

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

  /* Kelime vurgusu: TTS yoksa zamana dayalı ilerlet (yaklaşık 160 kelime/dk x hız) */
  useEffect(() => {
    if (!caliyor || !aktif || !okumaAcik) return;
    const kelimeler = aktif.bolumler[aktifBolumIx].metin.trim().split(/\s+/);
    const ms = Math.max(110, Math.round(60000 / (160 * hiz)));
    const int = setInterval(() => setKelimeIx((i) => Math.min(kelimeler.length - 1, i + 1)), ms);
    return () => clearInterval(int);
  }, [caliyor, aktif, aktifBolumIx, hiz, okumaAcik]);

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
  const oynatDegistir = (kitapId) => {
    const id = kitapId || aktifId;
    if (!id) return;
    if (id !== aktifId) {
      konusmayiDurdur();
      setAktifId(id);
      const p = ilerlemeler[id]?.pos || 0;
      setPozisyon(p);
      setCaliyor(true);
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
    else { setCaliyor(true); konusmayiBaslat(aktif, aktifBolumIx, 0); }
  };

  const vurguHizala = (poz) => {
    if (!aktif) return;
    let t = 0;
    for (let i = 0; i < aktif.bolumler.length; i++) {
      const s = aktif.bolumler[i].dk * 60;
      if (poz < t + s) {
        const oran = (poz - t) / s;
        const ks = aktif.bolumler[i].metin.trim().split(/\s+/).length;
        setKelimeIx(Math.min(ks - 1, Math.max(0, Math.floor(oran * ks))));
        return;
      }
      t += s;
    }
  };
  const sar = (sn) => {
    if (!aktif) return;
    const yeni = Math.min(toplam, Math.max(0, pozisyon + sn));
    setPozisyon(yeni);
    vurguHizala(yeni);
  };
  const oranaSar = (oran) => {
    if (!aktif) return;
    const yeni = Math.floor(oran * toplam);
    setPozisyon(yeni);
    vurguHizala(yeni);
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
  const aktifMod = MODLAR[mod] || MODLAR.yetiskin;
  const aktifRaflar = mod === "cocuk" ? RAFLAR_COCUK : RAFLAR_YETISKIN;
  const modKitaplari = KATALOG.filter((k) => mod === "cocuk" ? Boolean(k.yas) : !k.yas);

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

  const ModSecici = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "18px 0 18px" }}>
      {["cocuk", "yetiskin"].map((id) => {
        const secili = mod === id;
        return (
          <button key={id} onClick={() => { setMod(id); setDetayId(null); }}
            style={{ background: secili ? "rgba(232,163,61,0.18)" : S.kart, border: `1px solid ${secili ? "rgba(232,163,61,0.55)" : "rgba(255,255,255,0.07)"}`, borderRadius: 14, padding: "13px 12px", color: secili ? S.vurgu : S.metin, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{MODLAR[id].ad}</div>
            <div style={{ color: secili ? "rgba(232,163,61,0.9)" : S.soluk, fontSize: 11, marginTop: 4 }}>{id === "cocuk" ? "Masal + kısa pratik" : "Klasikler + odak"}</div>
          </button>
        );
      })}
    </div>
  );

  const DestekSeridi = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
      {["Senkron kelime takibi", "Dikkat modu", "Rahat okuma aralığı", "Kaldığın yerden devam"].map((t) => (
        <div key={t} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 11px", color: "rgba(242,236,223,0.88)", fontSize: 12 }}>
          {t}
        </div>
      ))}
    </div>
  );

  const AnaSayfa = () => (
    <div style={{ padding: "24px 20px" }}>
      <div style={{ fontSize: 11, color: S.vurgu, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 6 }}>{aktifMod.etiket}</div>
      <div style={{ ...baslikStil, fontSize: 30, marginBottom: 4 }}>Dinleti</div>
      <div style={{ ...baslikStil, fontSize: 23, lineHeight: 1.2, marginBottom: 8 }}>{aktifMod.baslik}</div>
      <div style={{ color: S.soluk, fontSize: 14, lineHeight: 1.5 }}>{aktifMod.aciklama}</div>
      <ModSecici />
      <DevamKart />
      <DestekSeridi />
      {aktifRaflar.map((raf) => (
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
    const kaynak = modKitaplari;
    const sonuc = q ? kaynak.filter((k) => (k.baslik + " " + k.yazar + " " + k.kategori).toLowerCase().includes(q)) : kaynak;
    return (
      <div style={{ padding: "24px 20px" }}>
        <div style={{ ...baslikStil, fontSize: 26, marginBottom: 4 }}>Ara</div>
        <div style={{ color: S.soluk, fontSize: 13, marginBottom: 14 }}>{aktifMod.ad} kataloğunda ara</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: S.kart, borderRadius: 12, padding: "12px 14px", marginBottom: 20 }}>
          <Search size={18} color={S.soluk} />
          <input value={arama} onChange={(e) => setArama(e.target.value)} placeholder={mod === "cocuk" ? "Masal veya yazar ara" : "Kitap veya yazar ara"}
            style={{ background: "none", border: "none", outline: "none", color: S.metin, fontSize: 15, flex: 1, fontFamily: "inherit" }} />
        </div>
        {sonuc.length === 0 && <div style={{ color: S.soluk, fontSize: 14 }}>Sonuç bulunamadı. Başka bir kelime dene.</div>}
        {sonuc.map((k) => (
          <div key={k.id} onClick={() => setDetayId(k.id)} style={{ display: "flex", gap: 14, padding: "12px 0", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.06)", alignItems: "center" }}>
            <Kapak kitap={k} boyut={52} radius={6} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{k.baslik}</div>
              <div style={{ fontSize: 12, color: S.soluk, marginTop: 2 }}>{k.yazar} · {k.kategori}{k.yas ? ` · ${k.yas}` : ""} · {sureUzun(k.sureDk)}</div>
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
          {!k.yas && <span style={{ background: "rgba(232,163,61,0.15)", color: S.vurgu, borderRadius: 6, padding: "1px 7px" }}>Yetişkin</span>}
        </div>
        <button onClick={() => { oynatDegistir(k.id); setOynaticiAcik(true); }}
          style={{ width: "100%", marginTop: 18, background: S.vurgu, color: "#14181F", border: "none", borderRadius: 14, padding: "14px 0", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          {p > 10 ? `Devam et · ${sureYaz(p)}` : "Dinlemeye başla"}
        </button>
        <div style={{ marginTop: 22, fontSize: 14, lineHeight: 1.6, color: "rgba(242,236,223,0.85)" }}>{k.ozet}</div>
        <div style={{ marginTop: 14, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 12, fontSize: 12, lineHeight: 1.5, color: S.soluk }}>
          Dinleti bir tanı veya tedavi aracı değildir; disleksi, ADHD ve okuma güçlüğü yaşayan kullanıcılar için erişilebilir okuma deneyimini destekler.
        </div>
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
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 40, display: "flex", justifyContent: "center", background: "rgba(10,12,16,0.6)" }}>
        <div style={{ width: "min(480px, 100%)", background: `linear-gradient(180deg, ${aktif.renk[0]}55 0%, ${S.fon} 40%)`, backgroundColor: S.fon, display: "flex", flexDirection: "column", padding: "18px 24px 28px", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setOynaticiAcik(false)} aria-label="Kapat" style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: 8, color: S.metin, cursor: "pointer" }}><ChevronDown size={20} /></button>
            <div style={{ fontSize: 12, color: S.soluk, letterSpacing: "0.08em", textTransform: "uppercase" }}>Şimdi dinleniyor</div>
            <button onClick={() => favoriDegistir(aktif.id)} aria-label="Favori" style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
              <Heart size={18} color={favoriler.includes(aktif.id) ? S.vurgu : S.metin} fill={favoriler.includes(aktif.id) ? S.vurgu : "none"} />
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", margin: "26px 0 20px" }}><Kapak kitap={aktif} boyut={180} radius={14} /></div>
          <div style={{ ...baslikStil, fontSize: 22, textAlign: "center" }}>{aktif.baslik}</div>
          <div style={{ textAlign: "center", color: S.soluk, fontSize: 14, marginTop: 4 }}>{aktif.yazar} · {b.ad}</div>

          <div style={{ marginTop: 26 }}>
            <DalgaBar kitap={aktif} oran={oran} onSar={oranaSar} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: S.soluk, marginTop: 6 }}>
              <span>{sureYaz(pozisyon)}</span><span>-{sureYaz(toplam - pozisyon)}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 26, marginTop: 20 }}>
            <button onClick={() => sar(-15)} aria-label="15 saniye geri" style={{ background: "none", border: "none", color: S.metin, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <RotateCcw size={26} /><span style={{ fontSize: 10, color: S.soluk }}>15</span>
            </button>
            <button onClick={() => oynatDegistir()} aria-label={caliyor ? "Duraklat" : "Oynat"}
              style={{ width: 68, height: 68, borderRadius: 34, background: S.vurgu, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 6px 22px rgba(232,163,61,0.35)" }}>
              {caliyor ? <Pause size={28} color="#14181F" fill="#14181F" /> : <Play size={28} color="#14181F" fill="#14181F" style={{ marginLeft: 3 }} />}
            </button>
            <button onClick={() => sar(30)} aria-label="30 saniye ileri" style={{ background: "none", border: "none", color: S.metin, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <RotateCw size={26} /><span style={{ fontSize: 10, color: S.soluk }}>30</span>
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
            <button onClick={hizDegistir} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: "9px 14px", color: S.metin, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
              <Gauge size={15} /> {hiz}x
            </button>
            <button onClick={uykuDegistir} style={{ background: uyku > 0 ? "rgba(232,163,61,0.18)" : "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: "9px 14px", color: uyku > 0 ? S.vurgu : S.metin, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
              <Moon size={15} /> {uyku > 0 ? sureYaz(uyku) : "Uyku"}
            </button>
            <button onClick={() => { const y = !seslendirme; setSeslendirme(y); if (!y) konusmayiDurdur(); else if (caliyor) konusmayiBaslat(aktif, aktifBolumIx, 0); }}
              style={{ background: seslendirme ? "rgba(232,163,61,0.18)" : "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: "9px 14px", color: seslendirme ? S.vurgu : S.metin, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
              <Volume2 size={15} /> Sesli okuma
            </button>
          </div>

          {/* Erişilebilir okuma görünümü */}
          <div style={{ marginTop: 26, background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: S.soluk, fontSize: 13 }}><BookOpen size={15} /> Takipli metin</div>
              <button onClick={() => setOkumaAcik(!okumaAcik)} aria-label="Takipli metni aç kapat"
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
                  <div data-okuma-metin="1" style={{
                    fontSize: PUNTOLAR[ayar.punto], letterSpacing: `${ARALIKLAR[ayar.aralik]}em`,
                    lineHeight: SATIRLAR[ayar.aralik], wordSpacing: `${ARALIKLAR[ayar.aralik] * 2.2}em`,
                    color: "rgba(242,236,223,0.92)", minHeight: 60,
                  }}>
                    {gorunecek.map((k, i) => {
                      const gercekIx = i + kaydirma;
                      const aktifMi = ayar.vurgu && gercekIx === kelimeIx;
                      return <span key={gercekIx} data-aktif={aktifMi ? "1" : undefined} style={{
                        background: aktifMi ? "rgba(232,163,61,0.35)" : "none",
                        borderRadius: 4, padding: aktifMi ? "0 2px" : 0,
                        color: aktifMi ? "#FFF3DC" : undefined,
                      }}>{k}{" "}</span>;
                    })}
                  </div>
                  {ayar.odak && <div style={{ fontSize: 11, color: S.soluk, marginTop: 8 }}>Dikkat modu: cümle {cumleler.indexOf(aktifCumle) + 1} / {cumleler.length}</div>}
                  <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                    <button onClick={() => setAyar({ ...ayar, punto: (ayar.punto + 1) % PUNTOLAR.length })} aria-label="Yazı boyutu"
                      style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "7px 11px", color: S.metin, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
                      <Type size={13} /> {["Küçük", "Orta", "Büyük"][ayar.punto]}
                    </button>
                    <button onClick={() => setAyar({ ...ayar, aralik: (ayar.aralik + 1) % ARALIKLAR.length })} aria-label="Harf aralığı"
                      style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "7px 11px", color: S.metin, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
                      <AlignJustify size={13} /> Rahat aralık: {["Normal", "Geniş", "Ekstra"][ayar.aralik]}
                    </button>
                    <button onClick={() => setAyar({ ...ayar, odak: !ayar.odak })} aria-label="Dikkat modu"
                      style={{ background: ayar.odak ? "rgba(232,163,61,0.18)" : "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "7px 11px", color: ayar.odak ? S.vurgu : S.metin, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
                      <Focus size={13} /> Dikkat modu
                    </button>
                    <button onClick={() => setAyar({ ...ayar, vurgu: !ayar.vurgu })} aria-label="Senkron kelime takibi"
                      style={{ background: ayar.vurgu ? "rgba(232,163,61,0.18)" : "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "7px 11px", color: ayar.vurgu ? S.vurgu : S.metin, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
                      Kelime vurgusu
                    </button>
                  </div>
                </>
              );
            })()}
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: S.soluk, fontSize: 13, marginBottom: 8 }}><ListMusic size={15} /> Bölümler</div>
            {aktif.bolumler.map((bb, i) => (
              <div key={i} onClick={() => bolumeGit(i)} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", fontSize: 14, color: i === aktifBolumIx ? S.vurgu : S.metin, fontWeight: i === aktifBolumIx ? 600 : 400 }}>
                <span>{i + 1}. {bb.ad}</span><span style={{ color: S.soluk, fontSize: 12 }}>{bb.dk} dk</span>
              </div>
            ))}
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
