"use client";
import { useMemo, useState } from "react";

type Choice = { name: string; lastRank: number; source: string };
const sample: Choice[] = [
  { name: "Hedef program", lastRank: 18500, source: "https://yokatlas.yok.gov.tr/" },
  { name: "Dengeli program", lastRank: 32000, source: "https://yokatlas.yok.gov.tr/" },
  { name: "Güvenli program", lastRank: 51000, source: "https://yokatlas.yok.gov.tr/" },
];

function band(rank: number, lastRank: number) {
  const ratio = rank / lastRank;
  if (ratio <= 0.78) return ["Güvenli", "safe"];
  if (ratio <= 1.08) return ["Dengeli", "balanced"];
  return ["Riskli", "risk"];
}

export default function Home() {
  const [rank, setRank] = useState(30000);
  const [choices, setChoices] = useState(sample);
  const [name, setName] = useState("");
  const [lastRank, setLastRank] = useState("");
  const summary = useMemo(() => choices.reduce((acc, choice) => { const key = band(rank, choice.lastRank)[1]; acc[key] = (acc[key] || 0) + 1; return acc; }, {} as Record<string, number>), [rank, choices]);
  function add() { const value = Number(lastRank); if (!name.trim() || !Number.isInteger(value) || value < 1) return; setChoices([...choices, { name: name.trim(), lastRank: value, source: "https://yokatlas.yok.gov.tr/" }]); setName(""); setLastRank(""); }
  return <main><nav><b>tercih<span>dengesi</span></b><a href="https://yokatlas.yok.gov.tr/" target="_blank" rel="noreferrer">YÖK Atlas’ta doğrula ↗</a></nav><section className="hero"><p className="eyebrow">YKS TERCİH LİSTESİ STRES TESTİ</p><h1>“Bu liste gerçekçi mi?”<br /><em>Birlikte görelim.</em></h1><p>Başarı sıranı ve düşündüğün programların son yerleşen sıralarını gir. Listeyi riskli, dengeli ve güvenli katmanlara ayır.</p></section><section className="panel"><div className="rank"><label>Başarı sıran <input type="number" min="1" value={rank} onChange={(e) => setRank(Number(e.target.value))} /></label><small>Bu bir tahmin aracı değil; geçmiş yerleşme verisini görünür kılan bir kontrol listesi.</small></div><div className="summary"><div><b>{summary.risk || 0}</b><span>riskli</span></div><div><b>{summary.balanced || 0}</b><span>dengeli</span></div><div><b>{summary.safe || 0}</b><span>güvenli</span></div></div></section><section className="list"><div className="heading"><div><p className="eyebrow">LİSTEN</p><h2>Denge haritan</h2></div><p>Her satırı tercih dönemindeki güncel YÖK Atlas / ÖSYM bilgisiyle tekrar doğrula.</p></div>{choices.map((choice, index) => { const [label, className] = band(rank, choice.lastRank); return <article key={`${choice.name}-${index}`}><i>{String(index + 1).padStart(2, "0")}</i><div><h3>{choice.name}</h3><p>Geçmiş son yerleşen sıra: <strong>{choice.lastRank.toLocaleString("tr-TR")}</strong></p></div><span className={className}>{label}</span><a href={choice.source} target="_blank" rel="noreferrer">Doğrula ↗</a></article>})}<div className="add"><input aria-label="Program adı" value={name} onChange={(e) => setName(e.target.value)} placeholder="Program adı" /><input aria-label="Geçmiş son yerleşen sıra" value={lastRank} onChange={(e) => setLastRank(e.target.value)} type="number" min="1" placeholder="Geçmiş son sıra" /><button onClick={add}>Listeye ekle +</button></div></section><section className="note"><b>Önemli:</b> Geçmiş yıl sıralaması gelecek yıl yerleşme sonucu değildir. Kontenjan, program koşulları, puan türü ve güncel ÖSYM kılavuzu karar öncesinde kontrol edilmelidir.</section><footer>Tercih Dengesi · Kararı sen ver; tabloyu görünür kıl.</footer></main>;
}
