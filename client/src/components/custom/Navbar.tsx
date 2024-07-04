import { Link } from "react-router-dom";
import { History, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between items-center">
      <Link to="/" className="flex flex-row justify-center items-center">
        <span className="text-foreground text-xl md:text-3xl font-bold">
          Best
        </span>
        <span className="text-primary text-xl md:text-3xl font-bold">
          Value
        </span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/history")} className="font-bold text-foreground">History <DropdownMenuShortcut><History className="ml-2 w-5 h-5" /></DropdownMenuShortcut></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
