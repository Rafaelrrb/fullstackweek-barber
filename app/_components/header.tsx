"use client"
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";


export function Header() {
  const {data,status} = useSession()

  const handleLogoutClick = () => signOut();
  const handleLoginClick = () => signIn("google");
  return(
    <Card>
      <CardContent className="p-5 justify-between flex flex-row items-center">
        <Image alt="FSW Barber" src="/logo.png" height={22} width={120}/>

       <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" >
            <MenuIcon size={18}/>
          </Button>
        </SheetTrigger>

        <SheetContent className="p-0">
          <SheetHeader className="border-b border-solid border-secondary p-5">
            <SheetTitle>
              Menu
            </SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <div className="flex justify-between px-5 py-6 items-center">
              <div className="flex items-center gap-3 ">
                <Avatar>
                  <AvatarImage src={data.user?.image ?? ''}/>
                </Avatar>

                <h2 className="font-bolt">{data.user.name}</h2>
              </div>

              <Button onClick={handleLogoutClick} variant="secondary" size="icon">
                <LogOutIcon/>
              </Button>
            </div>
            ):(
              <div className="flex flex-col gap-3 px-5 py-6">
                <div className="flex items-center gap-2">
                  <UserIcon size={32}/>
                  <h2 className="font-bold">Olá, faça seu login!</h2>
                </div>
                <Button 
                  variant="secondary" className="w-full flex gap-2 justify-start"
                  onClick={handleLoginClick}
                >
                  <LogInIcon size={18}/>
                  Fazer Login
                </Button>
              </div>
            )
          }

          <div className="flex flex-col gap-3 px-5">
            <Button variant="outline" className="justify-start flex gap-2" asChild>
              <Link href="/">
                <HomeIcon size={18}/>
                Inicio
              </Link>
            </Button>

            {data?.user && (
              <Button variant="outline" className="justify-start flex gap-2" asChild>
                <Link href="/bookings">
                  <CalendarIcon size={18}/>
                  Agendamentos
                </Link>
              </Button>
            )}
          </div>
        </SheetContent>
       </Sheet>
      </CardContent>
    </Card>
  );
} 