import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <main className="flex flex-row justify-stretch p-0 min-h-screen">
      <Sidebar />

      <div className="flex flex-col items-center justify-center p-8 grow">
        <img
          src="/lemon-studios.svg"
          width={128}
          style={{
            mixBlendMode: "luminosity",
            filter: "contrast(0.6) brightness(0.3)",
          }}
        />
        <p className="opacity-30 font-medium text-2xl">Lemon Studios</p>
      </div>
    </main>
  );
}
