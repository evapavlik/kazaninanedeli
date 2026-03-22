import type { Metadata } from "next";
import SermonPreview from "@/components/kazani/SermonPreview";

export const metadata: Metadata = {
  title: "N\u00E1hled k\u00E1z\u00E1n\u00ED",
  description: "Va\u0161e k\u00E1z\u00E1n\u00ED z p\u0159\u00EDpravy \u2014 v\u0161e na jednom m\u00EDst\u011B.",
};

export default function SermonPage() {
  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <SermonPreview />
      </div>
    </div>
  );
}
