import { STATUS_LABEL, type Status } from "@/data/projects";

// shape + text, never color alone: a filled dot means it runs in production,
// a ring means deployed but scoped, a dashed ring means prototype or study
const MARK: Record<Status, string> = {
  "in-use": "bg-raspberry-deep",
  "production-internal": "bg-raspberry-deep",
  deployed: "border-2 border-raspberry-deep",
  prototype: "border-2 border-dashed border-ink/70",
  study: "border-2 border-dashed border-ink/70",
};

export default function StatusTag({ status, className = "" }: { status: Status; className?: string }) {
  return (
    <span className={`label inline-flex items-center gap-2 text-ink/80 ${className}`}>
      <span aria-hidden className={`inline-block size-2.5 rounded-full ${MARK[status]}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}
