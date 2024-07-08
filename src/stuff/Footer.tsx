export default function Footer() {
  return (
    <footer className="bg-gray-900 fixed bottom-0 text-gray-100 h-13 w-full">
      <div className="max-w-screen-xl mx-auto py-4">
        <p className="text-pretty text-center text-sm">
          Made by{" "}
          <a
            href="https://github.com/yigit-cankurtaran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            Yiğit Cankurtaran
          </a>{" "}
          with ❤️
        </p>
      </div>
    </footer>
  );
}
