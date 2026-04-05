"use client";

import Script from "next/script";

const ElevenlabsConvai = "elevenlabs-convai" as any;

export default function RetellCallWidget() {
  const elevenlabsProps = {
    "agent-id": "agent_2801kneyq80jfr6tqhv5vcvp32gp",
  };

  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
      />

      <ElevenlabsConvai {...elevenlabsProps} />
    </>
  );
}

/**
 <Script
      id="retell-widget"
      src="https://dashboard.retellai.com/retell-widget.js"
      type="module"
      //   strategy="afterInteractive"
      data-public-key={process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY}
      data-agent-id={process.env.NEXT_PUBLIC_RETELL_AGENT_ID}
      data-widget="callback"
      data-phone-number={process.env.NEXT_PUBLIC_RETELL_PHONE_NUMBER}
      data-title="Talk to Gadgetoria"
      data-color="#D4483C"
    />
 <Script
      id="retell-widget"
      src="https://dashboard.retellai.com/retell-widget.js"
      type="module"
      strategy="afterInteractive"
      data-public-key={process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY}
      data-agent-id={process.env.NEXT_PUBLIC_RETELL_AGENT_ID}
      data-mode="webcall"
      data-title="Talk to Gadgetoria"
      data-color="#D4483C"
    />
*/
