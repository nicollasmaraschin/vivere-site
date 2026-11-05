import Link from "next/link";

export default function NotFound() {
  return (
    <section className="sr-top" style={{ paddingBottom: 96 }}>
      <div className="wrap">
        <h1 className="h1">Página não encontrada</h1>
        <p className="lead">O imóvel pode ter sido vendido ou o link mudou.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
          <Link className="btn btn-navy" href="/busca">Ver imóveis disponíveis</Link>
          <Link className="btn btn-line" href="/">Página inicial</Link>
        </div>
      </div>
    </section>
  );
}
