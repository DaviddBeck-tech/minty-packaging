import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center text-center p-6 font-sans transition-colors duration-300">
      <h2 className="text-4xl md:text-5xl font-black mb-4 hero-heading uppercase">
        404 - Không tìm thấy trang
      </h2>
      <p className="text-foreground/70 mb-8 max-w-md">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        href="/"
        className="rounded-full border-2 border-[#1F6E4E] text-[#1F6E4E] dark:border-[#D2E4DC] dark:text-[#D2E4DC] hover:bg-[#1F6E4E]/10 dark:hover:bg-[#D2E4DC]/10 px-8 py-3 uppercase tracking-wider text-sm font-medium transition-all"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
}
