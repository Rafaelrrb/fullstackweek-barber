import { format } from "date-fns";
import { Header } from "../_components/header";
import { ptBR } from "date-fns/locale";
import { Search } from "./_components/search";
import { BookingItem } from "../_components/bookingItem";
import { db } from "../_lib/prisma";
import { BarbershopItem } from "./_components/barbershopItem";
import { Barbershop, Booking } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";



export default async function Home() {
  const session = await getServerSession(authOptions)

  const bookings = session?.user ? await db.booking.findMany({
    where:{
      userId: (session.user as any).id,
      date:{
        gte: new Date()
      }
    },
    include:{
      service: true,
      barbershop: true,
    }
  }): []

  const barbershops = await db.barbershop.findMany({})

  return (
    <>
      <Header/>
      
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">{session?.user ? `Olá, ${session.user.name?.split(' ')[0]}!` :'Olá! Vamos agendar um corte hoje ?'}</h2>
        <p className="capitalize text-sm">{format(new Date(),"EEEE',' d 'de' MMMM",{
          locale: ptBR
        })}</p>
      </div>

      <div className="px-5 mt-6">
        <Search/>
      </div>
      
      <div className="mt-6">
        {bookings.length > 0 &&
          <>
            <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
        
            <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {bookings.map((booking: Booking) => <BookingItem key={booking.id} booking={booking}/>)}
            </div>
          </>
        }
        
      </div>

       
      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>

        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: Barbershop)=>(
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem  barbershop={barbershop}/>
            </div>
          ))}
        </div>
        
       
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>

        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: Barbershop)=>(
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem  barbershop={barbershop}/>
            </div>
          ))}
        </div>
        
       
      </div>
      
    </>
  );
}
