"use client";

import ToolWrapper from "./ToolWrapper";
import NarrativeTypeIdentifier from "@/components/tools/NarrativeTypeIdentifier";
import LiturgicalCalendar from "@/components/tools/LiturgicalCalendar";
import BibleBookContext from "@/components/tools/BibleBookContext";
import TextAnnotation from "@/components/tools/TextAnnotation";
import RoleIdentifier from "@/components/tools/RoleIdentifier";
import FCFHelper from "@/components/tools/FCFHelper";
import OutlineBuilder from "@/components/tools/OutlineBuilder";

interface ToolConfig {
  title: string;
  subtitle: string;
  icon: string;
  variant: "brick" | "sage";
  component: React.ReactNode;
}

function getToolsForStep(slug: string): ToolConfig[] {
  switch (slug) {
    case "cteni":
      return [
        {
          title: `Typ textu`,
          subtitle: `Ur\u010Dete \u017E\u00E1nr a specifika pozorov\u00E1n\u00ED`,
          icon: "\uD83D\uDD0D",
          variant: "sage",
          component: <NarrativeTypeIdentifier slug={slug} />,
        },
      ];
    case "kontext":
      return [
        {
          title: `Liturgick\u00FD kalend\u00E1\u0159`,
          subtitle: `Aktu\u00E1ln\u00ED obdob\u00ED c\u00EDrkevn\u00EDho roku`,
          icon: "\uD83D\uDCC5",
          variant: "sage",
          component: <LiturgicalCalendar />,
        },
        {
          title: `Biblick\u00E1 kniha`,
          subtitle: `Autor, datace, t\u00E9mata, struktura`,
          icon: "\uD83D\uDCD6",
          variant: "brick",
          component: <BibleBookContext slug={slug} />,
        },
      ];
    case "vyklad":
      return [
        {
          title: `Anotace textu`,
          subtitle: `Ozna\u010Dte kl\u00ED\u010Dov\u00E1 slova a motivy`,
          icon: "\u270F\uFE0F",
          variant: "brick",
          component: <TextAnnotation slug={slug} />,
        },
      ];
    case "aktualizace":
      return [
        {
          title: `Role v p\u0159\u00EDb\u011Bhu`,
          subtitle: `Kdo je kdo \u2014 tehdy a dnes`,
          icon: "\uD83C\uDFAD",
          variant: "brick",
          component: <RoleIdentifier slug={slug} />,
        },
        {
          title: `FCF \u2014 lidsk\u00E1 pot\u0159eba`,
          subtitle: `Fallen Condition Focus`,
          icon: "\uD83D\uDCA1",
          variant: "sage",
          component: <FCFHelper slug={slug} />,
        },
      ];
    case "stavba":
      return [
        {
          title: `Osnova k\u00E1z\u00E1n\u00ED`,
          subtitle: `Centr\u00E1ln\u00ED my\u0161lenka, body, ilustrace`,
          icon: "\uD83D\uDDD2\uFE0F",
          variant: "brick",
          component: <OutlineBuilder slug={slug} />,
        },
      ];
    default:
      return [];
  }
}

export default function StepTools({ slug }: { slug: string }) {
  const tools = getToolsForStep(slug);

  if (tools.length === 0) return null;

  return (
    <div className="mb-2">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-light">
        {`N\u00E1stroje`}
      </p>
      {tools.map((tool, i) => (
        <ToolWrapper
          key={i}
          title={tool.title}
          subtitle={tool.subtitle}
          icon={tool.icon}
          variant={tool.variant}
        >
          {tool.component}
        </ToolWrapper>
      ))}
    </div>
  );
}
