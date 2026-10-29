import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-20">
      <p className="label text-raspberry-deep">404 · No signal here</p>
      <h1 className="display-xl mt-4 max-w-3xl">This page doesn&rsquo;t exist — or it moved.</h1>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Back to the start
        </Link>
        <Link href="/work" className="btn-ghost">
          See the work
        </Link>
      </div>
    </section>
  );
}
