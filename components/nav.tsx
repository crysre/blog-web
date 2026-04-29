"use client"

import React, { useState } from "react";
import {motion } from "motion/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const navItems = [
            {
                title:"home",
                href:"/",
            },
            {
                title:"discover",
                href:"/discover",
            }
        ]

export function Nav(){
    const [hover, setHover] = useState<number|null>(null);
    const {data:session, status} = useSession()

    return <motion.nav
    initial={{y:-100}}
    animate={{y:0}}
    transition={{delay:0.05}}
    
    className=" flex z-15 w-full top-0 bg-neutral-900 shadow-2xl justify-between items-center px-8 py-4" >
        <motion.div
        initial={{y:-100}}
        animate={{y:0}}
        transition={{delay:0.05}}
        
        className="cursor-pointer font-bold tracking-tight text-neutral-300 hover:text-white text-xl"
        >
            BlogWeb
        </motion.div>

        <div className="  w-full flex max-w-xl   rounded-4xl text-center text-xs text-neutral-300" >
            {navItems.map((items, index)=>(
            <motion.div
            key={items.title}
            initial={{y:-100}}
            animate={{y:0}}
            transition={{delay:0.05}}
            whileHover={{scale:1.1}}
            onMouseEnter={()=>{setHover(index)}}
            onMouseLeave={()=>{setHover(null)}}
            

            className="group relative  cursor-pointer w-full py-4"
            >
                <span className="relative group-hover:text-white z-25" >{items.title}</span>

                {hover == index && <motion.div layoutId="hover" className="absolute inset-0 rounded-xl w-full bg-black z-20" ></motion.div>}
            </motion.div>
        ))}
        
        </div>
        <Field className="w-50" orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
        <div
        className="cursor-pointer text-neutral-200"
        >
        <button
        
        className=" text-xl rounded-md p-2 cursor-pointer hover:text-white" >{

            (status === "authenticated" && session.user?.image)?
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div  >
                        <Image className="rounded-full" src={session.user?.image} width={40} height={40} alt="Profile Image"/>
         
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent  >
                    <DropdownMenuGroup>
                         <DropdownMenuItem className=" flex justify-center items-center cursor-pointer"><Link href="/home/profile" className="flex">Account <User className="h-4 w-4 ml-2"/> </Link></DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                         <DropdownMenuItem onClick={()=> signOut({callbackUrl:"/"})} className="flex justify-center items-center cursor-pointer" >Signout <LogOut className="h-4 w-4 ml-2" /> </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            :"bye"

        }</button>
        </div>
    </motion.nav>
}

