"use client"
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { SideMenu } from "./sideMenu";
import Link from "next/link";

export function Header() {
  
  return(
    <Card>
      <CardContent className="p-5 justify-between flex flex-row items-center">
        <Link href="/">
          <Image alt="FSW Barber" src="/logo.png" height={22} width={120}/>
        </Link>

       <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" >
            <MenuIcon size={18}/>
          </Button>
        </SheetTrigger>

        <SheetContent className="p-0">
          <SideMenu/>
        </SheetContent>
       </Sheet>
      </CardContent>
    </Card>
  );
} 