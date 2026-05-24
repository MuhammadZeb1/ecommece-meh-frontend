import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import UserCardProduct from "../components/UserCardProduct";

export default function ExpiredProducts() {
  const [expiryAlerts, setExpiryAlerts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExpiryAlerts = async () => {
      try {
        const { data } = await api.get("/products/alerts");
        setExpiryAlerts(data);
      } catch (err) {
        setError("Unable to load expiry alerts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpiryAlerts();
  }, []);

  const alertCount =
    (expiryAlerts?.expiringSoon?.length ?? 0) +
    (expiryAlerts?.expired?.length ?? 0) +
    (expiryAlerts?.lowStock?.length ?? 0);

  const renderAlertSection = (title, products, badgeColor, emptyMessage) => (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{title}</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{products?.length ?? 0} items</h2>
        </div>
        <span className={`inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold ${badgeColor}`}>
          {products?.length ?? 0}
        </span>
      </div>

      {products?.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <UserCardProduct key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
          {emptyMessage}
        </div>
      )}
    </section>
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2.5rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-600">Expiry Alerts</p>
              <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Expired & soon-to-expire pharmacy stock</h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                Keep your inventory safe and compliant with a dedicated page for expired items, low stock alerts, and medicines approaching expiry.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-emerald-50 p-6 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Total alerts</p>
                <p className="mt-3 text-4xl font-bold text-slate-900">{loading ? "..." : alertCount}</p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">Loading expiry alerts...</div>
        ) : error ? (
          <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700 shadow-sm">{error}</div>
        ) : (
          <div className="space-y-8">
            {renderAlertSection(
              "Expired Items",
              expiryAlerts.expired,
              "bg-rose-100 text-rose-700",
              "No expired products found. Your shelf is currently clear."
            )}
            {renderAlertSection(
              "Expiring Soon",
              expiryAlerts.expiringSoon,
              "bg-amber-100 text-amber-700",
              "No products are approaching expiry in the next few days."
            )}
            {renderAlertSection(
              "Low Stock",
              expiryAlerts.lowStock,
              "bg-emerald-100 text-emerald-700",
              "Everything is stocked well for now."
            )}
          </div>
        )}
      </div>
    </main>
  );
}
