import React, { useEffect, useState } from "react";

const Overview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "https://forge-frame-server.vercel.app/dashboard-stats"
        );
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
        setErr(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quick snapshot of your Stamp Collectors Corner dashboard.
          </p>
        </div>

        {/* Loading / error states */}
        {loading && (
          <div className="border border-gray-200 rounded-2xl shadow-sm py-10 flex items-center justify-center text-sm text-gray-500">
            Loading dashboard…
          </div>
        )}

        {!loading && err && (
          <div className="border border-red-200 rounded-2xl shadow-sm px-4 py-3 text-sm text-red-700">
            {err}
          </div>
        )}

        {!loading && stats && (
          <>
            {/* Stat cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              {[
                { label: "Users", value: stats.usersCount, icon: "👤", desc: "Registered stamp collectors." },
                { label: "Stamps", value: stats.productsCount, icon: "🏷️", desc: "Total stamps in your collection." },
                { label: "Reviews", value: stats.reviewsCount, icon: "⭐", desc: "Reviews from collectors on your stamps." },
                { label: "Orders", value: stats.ordersCount, icon: "📦", desc: "Total stamps sold or ordered." },
              ].map((card) => (
                <div
                  key={card.label}
                  className="border border-gray-200 rounded-2xl shadow-sm px-4 py-5 flex flex-col gap-2 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium tracking-widest uppercase text-gray-500">
                      {card.label}
                    </p>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-800 text-xs">
                      {card.icon}
                    </span>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">{card.value ?? 0}</p>
                  <p className="text-[11px] text-gray-400">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Small activity panel */}
            <div className="border border-gray-200 rounded-2xl shadow-sm px-5 py-4 text-sm text-gray-700">
              <p className="font-medium text-gray-900 mb-1">Store health snapshot</p>
              <p className="text-xs text-gray-600">
                You currently have{" "}
                <span className="font-semibold text-gray-900">{stats.productsCount ?? 0} stamps</span>,{" "}
                <span className="font-semibold text-gray-900">{stats.ordersCount ?? 0} orders</span> placed, and{" "}
                <span className="font-semibold text-gray-900">{stats.reviewsCount ?? 0} reviews</span> from{" "}
                <span className="font-semibold text-gray-900">{stats.usersCount ?? 0} collectors</span>.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
