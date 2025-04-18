"use client";

import {BotList} from '@/components/bot-list';
import {Toaster} from "@/components/ui/toaster";
import {Button} from "@/components/ui/button";
import {Sun} from "lucide-react";
import {ModeToggle} from "@/components/mode-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Telegram Bot Manager</h1>
        <div className="flex items-center space-x-2">
          <Link href="/configure-bot">
            <Button>Configure New Bot</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
      <BotList/>
      <Toaster />
    </div>
  );
}

