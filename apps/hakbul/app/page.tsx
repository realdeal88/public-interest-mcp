"use client";

import { useMemo, useState } from "react";

type Program = {
  id: string;
  audience: string[];
  title: string;
  institution: string;
  summary: string;
  checklist: string;
  url: string;
  color: string;
};

const programs: Program[] = [
  { id: "student", audience: ["öğrenci", "üniversite", "burs", "yurt", "eğitim", "sınav"], title: "Öğrenci, burs ve yurt başlangıç noktası", institution: "Gençlik ve Spor Bakanlığı · e-Devlet", summary: "Burs, öğrenim kredisi ve yurt süreçleri için resmî hizmetlere tek yerden ulaşın.", checklist: "Kimlik bilgileri, okul/program bilgisi ve ilan dönemi", url: "https://www.turkiye.gov.tr/", color: "sun" },
  { id: "work", audience: ["iş", "işsiz", "çalış", "maaş", "meslek", "cv", "işsizlik"], title: "İş, meslek ve işsizlik süreçleri", institution: "İŞKUR · e-Devlet", summary: "İş arama, meslek danışmanlığı ve işsizlikle ilgili resmî kanalları kontrol edin.", checklist: "T.C. kimlik bilgileri, çalışma geçmişi ve başvuru tarihi", url: "https://www.iskur.gov.tr/", color: "coral" },
  { id: "family", audience: ["aile", "çocuk", "bebek", "gelir", "yardım", "sosyal", "anne", "baba"], title: "Aile ve sosyal destek rehberi", institution: "Aile ve Sosyal Hizmetler Bakanlığı · e-Devlet", summary: "Gelir, hane ve özel durumunuza göre sosyal yardım hizmetlerini resmî kaynaktan inceleyin.", checklist: "Hane bilgileri, gelir durumu ve istenebilecek belgeler", url: "https://www.aile.gov.tr/", color: "violet" },
  { id: "business", audience: ["girişim", "şirket", "esnaf", "kobi", "işletme", "yatırım", "destek"], title: "Girişimci ve KOBİ destekleri", institution: "KOSGEB", summary: "İş fikri, kuruluş ve büyüme aşamaları için güncel destek çağrılarını resmî sayfadan karşılaştırın.", checklist: "İşletme bilgisi, NACE faaliyeti, çağrı koşulları", url: "https://www.kosgeb.gov.tr/", color: "blue" },
  { id: "farmer", audience: ["çiftçi", "tarım", "hayvan", "üretim", "arazi", "mazot", "gübre"], title: "Tarım ve üretici destekleri", institution: "Tarım ve Orman Bakanlığı", summary: "Üretim türünüze göre duyuru, kayıt ve destek takvimlerini resmî kaynaktan takip edin.", checklist: "ÇKS/kayıt bilgisi, üretim türü ve ilan takvimi", url: "https://www.tarimorman.gov.tr/", color: "green" },
  { id: "access", audience: ["engelli", "erişilebilir", "bakım", "hasta", "yaşlı", "rehabilitasyon"], title: "Engellilik, bakım ve erişilebilirlik", institution: "Aile ve Sosyal Hizmetler Bakanlığı · e-Devlet", summary: "Hak, bakım ve erişilebilirlik başlıkları için güncel resmî hizmetleri yönlendirme sayfasından inceleyin.", checklist: "Duruma ilişkin resmî raporlar ve kimlik bilgileri", url: "https://www.turkiye.gov.tr/", color: "rose" },
];

const quickPrompts = ["Üniversite öğrencisiyim, burs ve yurt arıyorum", "Yeni işsiz kaldım, nereden başlamalıyım?", "Küçük bir işletme açmak istiyorum", "Çiftçiyim; hangi duyuruları takip etmeliyim?"];

function normalized(value: string) {
  return value.toLocaleLowerCase("tr-TR").replaceAll("ı", "i");
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);
  const results = useMemo(() => {
    const words = normalized(`${query} ${active.join(" ")}`);
    const matched = programs.filter((program) => program.audience.some((word) => words.includes(normalized(word))));
    return matched.length ? matched : programs.slice(0, 3);
  }, [query, active]);

  function toggle(group: string) {
    setActive((items) => items.includes(group) ? items.filter((item) => item !== group) : [...items, group]);
  }

  return (
    <main>
      <nav className="nav"><a className="brand" href="#top"><span>H</span> HakBul</a><a className="nav-link" href="#nasil">Nasıl çalışır?</a><a className="nav-link" href="#guven">Güven ilkesi</a></nav>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">RESMÎ KAYNAĞA GİDEN EN KISA YOL</p>
          <h1>“Bana uygun ne var?” sorusunu <em>resmî kaynağa</em> bağla.</h1>
          <p className="lede">HakBul; öğrencilerden çiftçilere, iş arayanlardan girişimcilere kadar herkesin hangi kamu desteklerini araştırabileceğini sade Türkçeyle gösterir.</p>
          <div className="trust-row"><span>✓ Ücretsiz</span><span>✓ Kayıt yok</span><span>✓ Başvuru kararı vermez</span></div>
        </div>
        <aside className="hero-note"><p>“Bir şeylere başvurmam gerekiyor ama nereden başlayacağımı bilmiyorum.”</p><strong>İşte HakBul bunun için var.</strong><i>01 / resmî kaynağa yönlendirme</i></aside>
      </section>

      <section className="finder" aria-labelledby="finder-title">
        <div className="finder-head"><div><p className="eyebrow">AKILLI ÖN ELEME</p><h2 id="finder-title">Durumunu kendi cümlenle anlat.</h2></div><p>Kimlik, T.C. no veya kişisel belge istemeyiz.</p></div>
        <label htmlFor="need" className="sr-only">İhtiyacını anlat</label>
        <textarea id="need" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Örn. Üniversite öğrencisiyim, ailemle kalıyorum ve burs imkânlarını araştırıyorum." rows={3} />
        <div className="chips" aria-label="Hızlı seçimler">{["Öğrenciyim", "İş arıyorum", "Ailem var", "Girişimciyim", "Çiftçiyim", "Erişilebilirlik"].map((item) => <button key={item} className={active.includes(item) ? "selected" : ""} onClick={() => toggle(item)}>{item}</button>)}</div>
        <button className="primary" onClick={() => setSearched(true)}>Resmî yolları göster <span>→</span></button>
        {!searched && <div className="prompt-row">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => { setQuery(prompt); setSearched(true); }}>{prompt}</button>)}</div>}
      </section>

      {searched && <section className="results" aria-live="polite"><div className="result-intro"><p className="eyebrow">BAŞLANGIÇ NOKTALARI</p><h2>İncelemen gereken {results.length} resmî kanal</h2><p>Bu sonuçlar bir uygunluk kararı değildir. Koşullar, tarihler ve belgeler kurumların kendi sayfalarında geçerlidir.</p></div><div className="cards">{results.map((program) => <article className={`card ${program.color}`} key={program.id}><div className="card-top"><span>{program.institution}</span><b>↗</b></div><h3>{program.title}</h3><p>{program.summary}</p><div className="check">Yanında bulundur: {program.checklist}</div><a href={program.url} target="_blank" rel="noreferrer">Resmî kaynağa git <span>→</span></a></article>)}</div></section>}

      <section className="principles" id="nasil"><div><p className="eyebrow">NEDEN FARKLI?</p><h2>Arama motoru değil,<br />kamuya erişim katmanı.</h2></div><div className="principle-list"><article><b>01</b><div><h3>İnsan diliyle başlar</h3><p>“Yurt arıyorum” ya da “işimi kaybettim” demen yeter; kurum adını bilmek zorunda değilsin.</p></div></article><article><b>02</b><div><h3>Resmî kaynağa döner</h3><p>Her öneri seni ilgili kurumun kendi sayfasına taşır. Aracı değil, yön bulma aracıdır.</p></div></article><article><b>03</b><div><h3>Mahremiyeti korur</h3><p>İlk sürümde form, hesap, takip veya kişisel veri toplama yoktur.</p></div></article></div></section>
      <section className="safety" id="guven"><span>!</span><p>HakBul; hukuki, mali veya sosyal yardım uygunluğu hakkında karar vermez. Yalnızca araştırmaya nereden başlayacağını gösterir. Son koşul her zaman resmî kurumun yayımladığı bilgidir.</p></section>
      <footer><a className="brand" href="#top"><span>H</span> HakBul</a><p>Türkiye’de kamuya erişimi biraz daha anlaşılır yapmak için.</p><p>v0.1 · Açık kaynak başlangıç</p></footer>
    </main>
  );
}
