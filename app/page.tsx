export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        
        {/* Logo / Brand */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          LinkVault 🚀
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Save, organize, and share your links smarter.
          <br />
          Track engagement with built-in analytics.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="/signup"
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="bg-white border border-gray-300 px-8 py-3 rounded-xl shadow hover:bg-gray-50 transition duration-300"
          >
            Login
          </a>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🔐 Secure</h3>
            <p className="text-gray-600 text-sm">
              Row-level security ensures your links are fully protected.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🏷 Organized</h3>
            <p className="text-gray-600 text-sm">
              Use relational tags to keep your resources structured.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📊 Analytics</h3>
            <p className="text-gray-600 text-sm">
              Track clicks and view insights through your dashboard.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}