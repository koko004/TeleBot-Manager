use client";

import {BotConfiguration} from "@/components/bot-configuration";

interface Props {
  params: { botName: string }
}
export default function EditBot({ params: { botName } }: Props) {
  return (
    <div className="container mx-auto p-4">
      <BotConfiguration botName={botName} />
    </div>
  );
}
