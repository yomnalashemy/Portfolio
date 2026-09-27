export default function ArchiveFooter() {
  return (
    <footer className="border-t border-steel/15 px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-[11px] text-steel">© {new Date().getFullYear()} Yomna Alshemy</p>
        <p className="font-mono text-[11px] text-steel">ARCHIVE / END OF FILE</p>
      </div>
    </footer>
  );
}
