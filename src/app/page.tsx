import Menu from "@/components/Menu";

export default function Home() {
  return (
    <main className="container" style={{ padding: "4rem 24px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 className="animate-fade-in" style={{ fontSize: "4rem", letterSpacing: "-1px", marginBottom: "1rem" }}>
          Square <span style={{ color: "var(--color-orange)" }}>One</span>
        </h1>
        <p className="animate-fade-in" style={{ color: "var(--text-secondary)", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", animationDelay: "0.1s" }}>
          Experience culinary excellence with our carefully curated menu of premium ingredients and bold flavors.
        </p>
      </header>

      <div style={{ flex: 1 }}>
        <Menu />
      </div>

      <footer style={{ marginTop: "4rem", textAlign: "center", padding: "2rem 0", borderTop: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
        <p>&copy; {new Date().getFullYear()} Square One. All rights reserved.</p>
        <div style={{ marginTop: "1rem" }}>
          <a href="/admin" style={{ fontSize: "0.8rem", opacity: 0.5 }}>Admin Login</a>
        </div>
      </footer>
    </main>
  );
}
