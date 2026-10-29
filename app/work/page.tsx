import PageIntro from "@/components/PageIntro";
import WorkIndex from "@/components/WorkIndex";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Every project Yomna Alshemy has built — production tools, shipped products, research prototypes, and front-end studies — each labelled with what state it is actually in.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageIntro label="Work" title={<>Everything I&rsquo;ve built, <span className="font-italic italic">labelled honestly.</span></>}>
        <p>
          Production tools, shipped products, research prototypes, and studies. Each one says what state it is
          actually in, and each case study covers the problem, the decisions, and what&rsquo;s still unfinished.
        </p>
      </PageIntro>
      <section aria-label="Project archive" className="shell pb-24">
        <WorkIndex />
      </section>
    </>
  );
}
