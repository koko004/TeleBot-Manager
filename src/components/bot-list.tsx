"use client";

import {useEffect, useState} from 'react';
import {getTelegramBots, restartTelegramBot, startTelegramBot, stopTelegramBot, TelegramBot} from '@/services/telegram';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "@/hooks/use-toast";
import {Icons} from "@/components/icons";
import Link from "next/link";

export function BotList() {
  const [bots, setBots] = useState<TelegramBot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBots();
  }, []);

  const loadBots = async () => {
    setLoading(true);
    try {
      const botList = await getTelegramBots();
      setBots(botList);
    } catch (error) {
      console.error("Failed to load bots:", error);
      toast({
        title: "Error",
        description: "Failed to load bots. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartBot = async (botName: string) => {
    try {
      await startTelegramBot(botName);
      toast({
        title: "Success",
        description: `Bot "${botName}" started successfully.`,
      });
      await loadBots(); // Reload bots to update status
    } catch (error) {
      console.error("Failed to start bot:", error);
      toast({
        title: "Error",
        description: `Failed to start bot "${botName}". Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleStopBot = async (botName: string) => {
    try {
      await stopTelegramBot(botName);
      toast({
        title: "Success",
        description: `Bot "${botName}" stopped successfully.`,
      });
      await loadBots(); // Reload bots to update status
    } catch (error) {
      console.error("Failed to stop bot:", error);
      toast({
        title: "Error",
        description: `Failed to stop bot "${botName}". Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleRestartBot = async (botName: string) => {
    try {
      await restartTelegramBot(botName);
      toast({
        title: "Success",
        description: `Bot "${botName}" restarted successfully.`,
      });
      await loadBots(); // Reload bots to update status
    } catch (error) {
      console.error("Failed to restart bot:", error);
      toast({
        title: "Error",
        description: `Failed to restart bot "${botName}". Please try again.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        <div>Loading bots...</div>
      ) : bots.length > 0 ? (
        bots.map((bot) => (
          <Card key={bot.name}>
            <CardHeader>
              <CardTitle>{bot.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Status: {bot.status}</p>
              <div className="flex justify-between mt-4">
                <Button onClick={() => handleStartBot(bot.name)} disabled={bot.status === "active"}>
                  Start
                </Button>
                <Button onClick={() => handleStopBot(bot.name)} disabled={bot.status === "inactive"}>
                  Stop
                </Button>
                <Button onClick={() => handleRestartBot(bot.name)}>
                  Restart
                </Button>
                <Link href={`/configure-bot/${bot.name}`}>
                  <Button variant="secondary">
                    Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No bots configured.</div>
      )}
    </div>
  );
}
