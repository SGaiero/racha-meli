import BottomNav from "@/components/BottomNav";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
      <BottomNav />
    </div>
  );
}
