export default function Footer() {
  return (
    <footer className="flex items-center justify-center py-8 mt-10 space-x-2 text-lg text-neutral-600">
      <img src="/icons/github.svg" className="w-7 h-7" alt="Github" />
      <a
        href="https://github.com/Fedeya/aerolab-challenge"
        target="__blank"
        rel="noopener noreferrer"
      >
        View this repository
      </a>
    </footer>
  );
}
