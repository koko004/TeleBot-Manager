use client";

import {useState} from 'react';
import {configureTelegramBot} from '@/services/telegram';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

interface BotConfigurationProps {
  botName?: string;
}

export function BotConfiguration({ botName: initialBotName }: BotConfigurationProps) {
  const [botName, setBotName] = useState(initialBotName || '');
  const [apiToken, setApiToken] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const router = useRouter();

  const handleConfigureBot = async () => {
    setIsConfiguring(true);
    try {
      await configureTelegramBot(botName, apiToken);
      toast({
        title: "Success",
        description: `Bot "${botName}" configured successfully.`,
      });
      setBotName('');
      setApiToken('');
      router.push('/');
    } catch (error) {
      console.error("Failed to configure bot:", error);
      toast({
        title: "Error",
        description: `Failed to configure bot "${botName}". Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsConfiguring(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialBotName ? `Edit ${initialBotName}` : "Configure New Bot"}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="botName">Bot Name</Label>
          <Input
            id="botName"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            disabled={!!initialBotName}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="apiToken">API Token</Label>
          <Input
            id="apiToken"
            type="password"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
          />
        </div>
        <Button onClick={handleConfigureBot} disabled={isConfiguring}>
          {isConfiguring ? "Configuring..." : "Configure Bot"}
        </Button>
      </CardContent>
    </Card>
  );
}

