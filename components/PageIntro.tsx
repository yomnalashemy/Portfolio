/** the shared opening of every inner page: label, headline, standfirst */
export default function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="shell grid gap-6 pb-12 pt-12 md:pb-16 md:pt-20 lg:grid-cols-12">
      <p className="label text-raspberry-deep lg:col-span-3 lg:pt-4">{label}</p>
      <div className="lg:col-span-9">
        <h1 className="display-xl text-balance">{title}</h1>
        {children && <div className="prose-body mt-6 max-w-2xl text-pretty">{children}</div>}
      </div>
    </header>
  );
}
