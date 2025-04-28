"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOut, User, Settings } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SiteHeader() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user, refreshSession } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Function to get the initials from an email address
  const getInitials = (email?: string): string => {
    if (!email) return "U";
    const parts = email.split("@");
    return parts[0].charAt(0).toUpperCase();
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();

      // Refresh the session in the context
      if (refreshSession) {
        await refreshSession();
      }

      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-lg">
      <div className="container flex h-16 max-w-screen-2xl mx-auto items-center">
        <div className="mr-4 flex items-center"></div>
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 transition-colors hover:text-primary"
        >
          <span className="text-xl font-bold">Virtual Mirror</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-2">
            {["Explore", "Pricing", "Extension", "API"].map((item) => (
              <NavigationMenuItem key={item}>
                <Link href={`/${item.toLowerCase()}`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`
                    ${navigationMenuTriggerStyle()} 
                    px-4 font-medium text-foreground/80
                    hover:text-primary
                    transition-colors
                    relative after:absolute after:bottom-0 after:left-1/2 
                    after:w-0 after:h-[2px] after:bg-primary 
                    hover:after:w-full hover:after:left-0 
                    after:transition-all
                    bg-transparent
                  `}
                  >
                    {item}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex flex-1 items-center justify-end space-x-3">
          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0 border-none"
                  >
                    <Avatar className="h-9 w-9 border border-primary">
                      <AvatarImage
                        src={user?.user_metadata?.avatar_url || ""}
                        alt={user?.email || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user?.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">My Account</p>
                      
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                      {user?.user_metadata?.tier=== "free" && (
                        <p className="text-xs text-muted-foreground truncate">
                          Trial remaining: {user?.user_metadata?.trial_count}
                        </p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center cursor-pointer"
                    >
                      <User className="w-4 h-4 mr-2" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile/settings"
                      className="flex items-center cursor-pointer"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-3 py-1.5 font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-1.5 rounded-full border border-primary text-primary font-medium 
                       hover:bg-primary/10 hover:shadow-sm transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className="rounded-full w-10 h-10 hover:bg-accent/20"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
