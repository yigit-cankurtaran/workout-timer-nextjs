export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 sm:px-6 md:px-8 bg-[#f5f5f7] dark:bg-black border-t border-[#d2d2d7]/20 dark:border-[#38383a]/30">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center">
          <p className="text-sm text-[#86868b] dark:text-[#86868b]">
            Made by{" "}
            <a
              href="https://github.com/yigit-cankurtaran"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071e3] dark:text-[#0077ed] hover:underline transition-all duration-200"
            >
              Yiğit Cankurtaran
            </a>{" "}
            with ❤️
          </p>
          <p className="text-xs text-[#86868b] dark:text-[#86868b] mt-2">
            © {new Date().getFullYear()} Workout Timer
          </p>
        </div>
      </div>
    </footer>
  );
}
