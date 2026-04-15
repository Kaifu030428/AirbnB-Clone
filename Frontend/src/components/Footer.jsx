const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-600">
        <p>© 2026 ArBn. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-900 transition">Privacy</a>
          <a href="#" className="hover:text-gray-900 transition">Terms</a>
          <a href="#" className="hover:text-gray-900 transition">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;