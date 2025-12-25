import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="font-semibold text-gray-800">
        Principal Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell size={18} />
        </Button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
            P
          </div>
          <span className="text-sm text-gray-700">
            Principal
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
