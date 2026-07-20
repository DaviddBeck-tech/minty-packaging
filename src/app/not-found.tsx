import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center text-center p-6 font-sans transition-colors duration-300">
      <h2 className="text-4xl md:text-5xl font-black mb-4 hero-heading uppercase">
        404 - Page Not Found
      </h2>
      <p className="text-foreground/70 mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full border-2 border-[#1F6E4E] text-[#1F6E4E] hover:bg-[#1F6E4E]/10 px-8 py-3 uppercase tracking-wider text-sm font-medium transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
