import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import api from '../services/api';

const features = [
  {
    title: 'Fast Medicine Delivery',
    desc: 'Same-day delivery for prescriptions, vitamins, and everyday wellness essentials.',
    icon: '💊',
  },
  {
    title: 'Trusted Pharmacists',
    desc: 'Licensed experts available to answer your health questions and medication needs.',
    icon: '🩺',
  },
  {
    title: 'Wellness Support',
    desc: 'Natural supplements, immunity boosters, and personal care items selected for you.',
    icon: '🌿',
  },
];

const categories = [
  { name: 'Prescriptions', detail: 'Refills, new orders, and secure prescription management.', icon: '🧾' },
  { name: 'Vitamins & Supplements', detail: 'Daily vitamins, minerals, and immunity support products.', icon: '🌱' },
  { name: 'Personal Care', detail: 'Skincare, hygiene, and health essentials for the whole family.', icon: '🛁' },
];

const sliderItems = [
  {
    tag: 'Pharmacy highlight',
    title: 'Fast prescription delivery in your neighborhood',
    description: 'Order refills and prescription medications with convenient delivery, backed by licensed pharmacy care.',
    image: '🚚',
    features: ['Same-day arrivals', 'Secure packaging', 'Easy order tracking'],
  },
  {
    tag: 'Wellness spotlight',
    title: 'Immune support and daily vitamins',
    description: 'Choose from top-rated supplements and wellness formulas chosen for family health.',
    image: '🌿',
    features: ['Doctor-approved brands', 'Natural ingredients', 'Everyday wellness packs'],
  },
  {
    tag: 'Health care services',
    title: 'Expert pharmacist guidance',
    description: 'Speak with a licensed pharmacist for medication advice, safety checks, and care recommendations.',
    image: '🩺',
    features: ['Medication review', 'Dose reminders', 'Health support'],
  },
];

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [expiryAlerts, setExpiryAlerts] = useState(null);
  const [alertLoading, setAlertLoading] = useState(true);
  const [alertError, setAlertError] = useState('');
  const alertTotal =
    (expiryAlerts?.expiringSoon?.length ?? 0) +
    (expiryAlerts?.expired?.length ?? 0) +
    (expiryAlerts?.lowStock?.length ?? 0);

  useEffect(() => {
    const fetchExpiryAlerts = async () => {
      try {
        const { data } = await api.get('/products/alerts');
        setExpiryAlerts(data);
      } catch (error) {
        setAlertError('Unable to load expiry alerts.');
      } finally {
        setAlertLoading(false);
      }
    };

    fetchExpiryAlerts();
  }, []);

  const handlePrescriptionFile = (event) => {
    setPrescriptionFile(event.target.files?.[0] ?? null);
    setScanResult(null);
  };

  const handleScanPrescription = async () => {
    if (!prescriptionFile) return;

    setScanLoading(true);
    setScanResult(null);

    try {
      const formData = new FormData();
      formData.append('file', prescriptionFile);
      const response = await api.post('/prescriptions/scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setScanResult(response.data.prescription);
    } catch (error) {
      setScanResult({ error: 'Prescription scan failed. Try a clearer image.' });
    } finally {
      setScanLoading(false);
    }
  };

  const handleDownloadPrescriptionPdf = () => {
    if (!scanResult || scanResult.error) return;

    const doc = new jsPDF();
    const header = 'Prescription OCR Result';
    const filename = 'prescription-scan.pdf';

    doc.setFontSize(16);
    doc.text(header, 14, 20);

    doc.setFontSize(11);
    doc.text(`Source file: ${prescriptionFile?.name || 'Uploaded prescription'}`, 14, 32);
    if (scanResult.fileType) {
      doc.text(`File type: ${scanResult.fileType}`, 14, 38);
    }

    const lines = [
      'Extracted text:',
      scanResult.rawText || 'No text detected',
      '',
      'Detected medicines:',
    ];

    scanResult.extractedItems?.forEach((item, index) => {
      const doseLabel = item.dosage ? ` (${item.dosage})` : '';
      lines.push(`${index + 1}. ${item.name}${doseLabel}`);
    });

    doc.text(lines, 14, 48, { maxWidth: 180 });
    doc.save(filename);
  };

  return (
    <div className="min-h-screen bg-[#eef7f2] font-sans text-slate-900">
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-emerald-200 opacity-80" />

        <section className="relative pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm shadow-emerald-200/80">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
                  Trusted pharmacy care, delivered fast
                </div>

                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Your local pharmacy for <span className="text-emerald-700">health, wellness</span> and everyday care.
                </h1>

                <p className="max-w-2xl text-lg leading-8 text-slate-700">
                  Shop trusted medicines, supplements and personal care products with expert guidance from licensed pharmacists. Safe, convenient, and built around your health.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-8 py-4 text-white font-semibold shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800">
                    Shop Medicines
                  </button>
                  <button className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-slate-800 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50 transition">
                    Pharmacy Services
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 text-center text-slate-600 opacity-90">
                  <div>
                    <p className="text-3xl font-bold text-emerald-700">24/7</p>
                    <p className="text-sm">Online support</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-emerald-700">10k+</p>
                    <p className="text-sm">Happy customers</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-emerald-700">Safe</p>
                    <p className="text-sm">Certified products</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[2rem] bg-white/80 p-8 shadow-2xl shadow-slate-400/10 ring-1 ring-slate-200 backdrop-blur">
                  <div className="flex h-72 items-center justify-center rounded-[1.75rem] bg-emerald-50">
                    <span className="text-[6rem]">💊</span>
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-4">
                      <p className="text-sm uppercase tracking-[0.25em] text-emerald-700">Featured care</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">Daily Wellness Essentials</p>
                      <p className="mt-1 text-slate-600">Vitamins, supplements and support formulas trusted by families.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {categories.map((category) => (
                        <div key={category.name} className="rounded-3xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
                          <div className="text-2xl">{category.icon}</div>
                          <h3 className="mt-4 text-lg font-semibold text-slate-900">{category.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{category.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Featured slider</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Pharmacy highlights</h2>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev + sliderItems.length - 1) % sliderItems.length)}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev + 1) % sliderItems.length)}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {sliderItems.map((slide) => (
                  <div key={slide.title} className="min-w-full p-8">
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] items-center">
                      <div className="rounded-[2rem] bg-emerald-50 p-8 text-center">
                        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-5xl">
                          {slide.image}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">{slide.tag}</p>
                        <h3 className="mt-4 text-2xl font-semibold text-slate-900">{slide.title}</h3>
                        <p className="mt-4 max-w-xl text-slate-600 leading-7">{slide.description}</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                          {slide.features.map((feature) => (
                            <span key={feature} className="rounded-full bg-emerald-100 px-4 py-2 text-sm text-emerald-800">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] items-start rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Prescription Scanner</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900">Upload a prescription image for smart text extraction</h2>
                </div>
                <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-white p-6">
                  <label className="block text-sm font-semibold text-slate-700">Prescription image or PDF</label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handlePrescriptionFile}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={handleScanPrescription}
                    disabled={!prescriptionFile || scanLoading}
                    className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300"
                  >
                    {scanLoading ? 'Scanning...' : 'Scan Prescription'}
                  </button>
                </div>

                {scanResult && (
                  <div className="rounded-[1.75rem] border border-emerald-100 bg-emerald-50 p-6">
                    <h3 className="text-xl font-semibold text-slate-900">Scan result</h3>
                    {scanResult.error ? (
                      <p className="mt-4 text-sm text-red-700">{scanResult.error}</p>
                    ) : (
                      <div className="mt-4 space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-sm text-slate-700">Extracted prescription text:</p>
                          <button
                            type="button"
                            onClick={handleDownloadPrescriptionPdf}
                            disabled={!scanResult || scanResult.error}
                            className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:bg-emerald-300 disabled:text-slate-500"
                          >
                            Download PDF
                          </button>
                        </div>
                        <div className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                          {scanResult.rawText || 'No text detected'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Detected medicines</p>
                          <ul className="mt-3 space-y-3 text-slate-700">
                            {scanResult.extractedItems?.map((item, index) => (
                              <li key={index} className="rounded-2xl border border-slate-200 bg-white p-4">
                                <p className="font-semibold text-slate-900">{item.name}</p>
                                <p className="text-sm text-slate-600">Dosage: {item.dosage || 'N/A'}</p>
                                <p className="mt-2 text-sm text-slate-500">{item.rawText}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div id="expiry-alerts-summary" className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Expiry Alerts</p>
                  <h3 className="mt-3 text-2xl font-bold text-slate-900">Smart expiry tracking for your stock</h3>
                </div>
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Total active pharmacy alerts</p>
                  <p className="mt-3 text-4xl font-bold text-slate-900">{alertTotal}</p>
                  <p className="mt-1 text-sm text-slate-600">Expiring soon, expired, or low stock items</p>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/expired-products"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    View detailed alerts
                  </Link>
                </div>
                {alertLoading ? (
                  <p className="text-slate-600">Loading expiry alerts...</p>
                ) : alertError ? (
                  <p className="text-red-700">{alertError}</p>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-3xl bg-emerald-50 p-5 text-center">
                        <p className="text-3xl font-bold text-emerald-700">{expiryAlerts?.expiringSoon?.length ?? 0}</p>
                        <p className="mt-2 text-sm text-slate-600">Expiring soon</p>
                      </div>
                      <div className="rounded-3xl bg-rose-50 p-5 text-center">
                        <p className="text-3xl font-bold text-rose-600">{expiryAlerts?.expired?.length ?? 0}</p>
                        <p className="mt-2 text-sm text-slate-600">Expired items</p>
                      </div>
                      <div className="rounded-3xl bg-amber-50 p-5 text-center">
                        <p className="text-3xl font-bold text-amber-700">{expiryAlerts?.lowStock?.length ?? 0}</p>
                        <p className="mt-2 text-sm text-slate-600">Low stock</p>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm text-slate-600">Next expiry threshold: {expiryAlerts?.thresholdDays} days</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Pharmacy benefits</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Everything your health routine needs</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Find fast refills, certified products, and caring guidance in one easy pharmacy experience.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:shadow-xl">
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-slate-600 leading-7">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 rounded-full bg-emerald-700/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-white">+</span>
                PharmaCare
              </div>
              <p className="max-w-md text-slate-300 leading-7">
                Your trusted neighborhood pharmacy for prescriptions, wellness products, and caring support whenever you need it.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Quick Links</h3>
                <ul className="mt-5 space-y-3 text-slate-300">
                  <li>Shop Medicines</li>
                  <li>Refill Prescriptions</li>
                  <li>Wellness Guides</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Contact</h3>
                <ul className="mt-5 space-y-3 text-slate-300">
                  <li>Phone: (555) 123-4567</li>
                  <li>Email: support@pharmacare.com</li>
                  <li>Open daily: 8am – 8pm</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
            © {new Date().getFullYear()} PharmaCare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
