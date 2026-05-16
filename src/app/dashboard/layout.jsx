import { Sidebar } from "@/components/dashboardComponents/Sidebar";

export const metadata = {
  title: "Admin Dashboard | Artizans' Mart",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 w-full min-h-screen">
        {/* On mobile, we add padding to the top so the content isn't hidden under the hamburger menu bar */}
        <main className="p-4 md:p-8 pt-20 md:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}