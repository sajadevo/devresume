// @components
import { AppSidenav } from "@/components/app-sidenav";
import { AppContent } from "@/components/app-content";

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:overflow-hidden">
      <AppSidenav />
      <AppContent />
    </div>
  );
}
