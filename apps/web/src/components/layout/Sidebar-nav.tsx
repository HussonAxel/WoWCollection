import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"; 
import {
  PlusCircledIcon,
  DashboardIcon,
  ListBulletIcon,
  BarChartIcon,
  ReaderIcon, 
  PersonIcon, 
  ArchiveIcon, 
  FileTextIcon,
  MagicWandIcon,
  DotsHorizontalIcon,
  GearIcon,
  QuestionMarkCircledIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { href: "/lifecycle", label: "Lifecycle", icon: ListBulletIcon },
  { href: "/analytics", label: "Analytics", icon: BarChartIcon },
  { href: "/projects", label: "Projects", icon: ReaderIcon },
  { href: "/team", label: "Team", icon: PersonIcon },
];

const documentsNavItems = [
  { href: "/data-library", label: "Data Library", icon: ArchiveIcon },
  { href: "/reports", label: "Reports", icon: FileTextIcon },
  { href: "/word-assistant", label: "Word Assistant", icon: MagicWandIcon },
];

const secondaryNavItems = [
  { href: "/settings", label: "Settings", icon: GearIcon },
  { href: "/help", label: "Get Help", icon: QuestionMarkCircledIcon },
  { href: "/search", label: "Search", icon: MagnifyingGlassIcon },
];

export function SidebarNav() {
  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/01.png", 
    fallback: "CN",
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">🚀 Acme Inc.</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
        <div className="px-2">
          <Button className="w-full justify-start">
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Quick Create
          </Button>
        </div>

        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start"
              asChild 
            >
              <Link to={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <Separator />

        <div className="px-3 py-2">
          <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">
            Documents
          </h2>
          <nav className="space-y-1">
            {documentsNavItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        <Separator />

        <nav className="space-y-1">
          {secondaryNavItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link to={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.fallback}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
