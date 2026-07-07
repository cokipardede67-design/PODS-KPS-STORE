import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-6 py-10">
      <h1 className="text-4xl font-bold text-green-600">PODS KPS</h1>
      <p className="text-gray-500 mt-2">WELCOME TO PODS KPS</p>
      <p className="text-gray-400 mb-10">Silakan pilih itemnya</p>

      <div className="w-full max-w-md space-y-4">
        <Link
          href="/saltnic"
          className="block text-center rounded-xl bg-green-600 text-white p-5 text-xl font-semibold"
        >
          🥶 SALTNIC
        </Link>
        <Link
          href="/cartridge"
          className="block text-center rounded-xl bg-black text-white p-5 text-xl font-semibold"
        >
          🔋 CARTRIDGE
        </Link>
        <Link
          href="/device"
          className="block text-center rounded-xl bg-zinc-800 text-white p-5 text-xl font-semibold"
        >
          📱 DEVICE
        </Link>
      </div>
    </main>
  );
}