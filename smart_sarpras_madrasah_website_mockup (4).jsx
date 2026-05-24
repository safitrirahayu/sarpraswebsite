import { useMemo, useState } from "react";

const menus = [
  {
    title: "Inventaris Digital",
    desc: "Pendataan sarana dan prasarana sekolah berbasis QR Code.",
    icon: "📦",
  },
  {
    title: "Perpustakaan Digital",
    desc: "Akses e-book, modul, dan video pembelajaran secara online.",
    icon: "📚",
  },
  {
    title: "Pembelajaran Digital",
    desc: "Materi belajar, jadwal pelajaran, dan media pembelajaran.",
    icon: "💻",
  },
  {
    title: "Arsip Sekolah",
    desc: "Penyimpanan dokumen dan administrasi sekolah secara digital.",
    icon: "🗂️",
  },
];

const libraryCategories = [
  {
    name: "Buku Belajar",
    icon: "📘",
    color: "bg-emerald-100 text-emerald-700 border-emerald-500",
  },
  {
    name: "Video Pembelajaran",
    icon: "🎥",
    color: "bg-red-100 text-red-700 border-red-300",
  },
  {
    name: "Novel",
    icon: "📖",
    color: "bg-pink-100 text-pink-700 border-pink-300",
  },
  {
    name: "Cerpen",
    icon: "✍️",
    color: "bg-yellow-100 text-yellow-700 border-yellow-300",
  },
  {
    name: "Komik",
    icon: "💥",
    color: "bg-blue-100 text-blue-700 border-blue-300",
  },
  {
    name: "Ensiklopedia",
    icon: "🌍",
    color: "bg-purple-100 text-purple-700 border-purple-300",
  },
  {
    name: "Biografi",
    icon: "👤",
    color: "bg-orange-100 text-orange-700 border-orange-300",
  },
  {
    name: "Sejarah Islam",
    icon: "🕌",
    color: "bg-teal-100 text-teal-700 border-teal-300",
  },
];

const books = [
  {
    title: "English for Nusantara",
    description: "Buku Bahasa Inggris untuk SMP/MTs Kelas VII.",
    icon: "📘",
    link: "https://buku.kemendikdasmen.go.id/katalog/English-for-Nusantara-untuk-SMPMTs-Kelas-VII",
  },
  {
    title: "Panduan Guru Bahasa Indonesia",
    description:
      "Buku panduan Bahasa Indonesia SD/MI Kelas VI.",
    icon: "📗",
    link:
      "https://buku.kemendikdasmen.go.id/katalog/panduan-guru-bahasa-indonesia-anak-anak-yang-mengubah-dunia-untuk-sdmi-kelas-vi",
  },
];

const comics = [
  {
    title: "Di Balik Kisah Rawapening",
    description: "Komik edukasi digital dari Kemendikdasmen.",
    icon: "💥",
    link:
      "https://budi.kemendikdasmen.go.id/baca/komik/di-balik-kisah-rawapening",
  },
  {
    title: "Bolang Sahabat Alam",
    description: "Komik edukasi tentang alam dan lingkungan.",
    icon: "🌿",
    link:
      "https://budi.kemendikdasmen.go.id/baca/komik/bolang-sahabat-alam",
  },
];

export default function SmartSarprasWebsite() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedLibraryCategory, setSelectedLibraryCategory] =
    useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Proyektor Epson",
      code: "INV-001",
      location: "Lab Komputer",
      condition: "Baik",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    location: "",
    condition: "Baik",
  });

  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredComics = useMemo(() => {
    return comics.filter((comic) =>
      comic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleAddInventory = () => {
    if (!formData.name || !formData.code || !formData.location) {
      return;
    }

    setInventory((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData({
      name: "",
      code: "",
      location: "",
      condition: "Baik",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-linear-to-r from-emerald-600 to-teal-500 rounded-3xl p-10 text-white shadow-lg text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome To Smart Sarpras Madrasah
          </h1>

          <p className="text-lg opacity-90">
            Sistem Manajemen Terpadu Sarana dan Prasarana Madrasah Berbasis
            Digital
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {menus.map((item) => (
            <button
              key={item.title}
              onClick={() => {
                setSelectedMenu(item.title);
                setSelectedLibraryCategory(null);
              }}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
            >
              <div className="text-4xl mb-3">{item.icon}</div>

              <h2 className="font-bold text-lg mb-2 text-slate-800">
                {item.title}
              </h2>

              <p className="text-sm text-slate-600">{item.desc}</p>
            </button>
          ))}
        </div>

        {selectedMenu === "Inventaris Digital" && (
          <div className="mt-10 bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              Tambah Inventaris Baru
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nama Barang"
                className="p-3 rounded-xl border border-slate-300"
              />

              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                placeholder="Kode Inventaris"
                className="p-3 rounded-xl border border-slate-300"
              />

              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Lokasi Barang"
                className="p-3 rounded-xl border border-slate-300"
              />

              <select
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                className="p-3 rounded-xl border border-slate-300"
              >
                <option value="Baik">Baik</option>
                <option value="Perlu Perawatan">Perlu Perawatan</option>
                <option value="Rusak">Rusak</option>
              </select>
            </div>

            <div className="mt-5 flex flex-col md:flex-row gap-4 items-center">
              <button
                onClick={handleAddInventory}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all"
              >
                Simpan Inventaris
              </button>

              <div className="bg-slate-100 rounded-2xl p-5 flex items-center gap-4 w-full md:w-auto">
                <div className="text-5xl">📱</div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    QR Code Otomatis
                  </h3>

                  <p className="text-sm text-slate-600">
                    Setiap barang memiliki QR Code untuk pendataan inventaris.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-200 text-slate-700">
                    <th className="p-3 text-left rounded-l-xl">
                      Nama Barang
                    </th>
                    <th className="p-3 text-left">Kode</th>
                    <th className="p-3 text-left">Lokasi</th>
                    <th className="p-3 text-left rounded-r-xl">
                      Kondisi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b border-slate-200">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.code}</td>
                      <td className="p-3">{item.location}</td>
                      <td className="p-3">{item.condition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedMenu === "Perpustakaan Digital" && (
          <div className="mt-10 bg-white rounded-2xl p-6 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Perpustakaan Digital
                </h2>

                <p className="text-slate-600 mt-2">
                  Akses e-book, modul, dan video pembelajaran secara online.
                </p>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari buku atau materi..."
                className="p-3 rounded-xl border border-slate-300 w-full md:w-80"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {libraryCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedLibraryCategory(category.name)}
                  className={`${category.color} rounded-2xl p-4 text-center font-semibold hover:shadow-md transition-all border-2`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>

            {(!selectedLibraryCategory ||
              selectedLibraryCategory === "Buku Belajar") && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-bold text-slate-800">
                    Koleksi Buku Pelajaran
                  </h3>

                  {selectedLibraryCategory && (
                    <button
                      onClick={() => setSelectedLibraryCategory(null)}
                      className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-300 transition-all"
                    >
                      ← Semua Kategori
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {filteredBooks.map((book) => (
                    <div
                      key={book.title}
                      className="bg-slate-100 rounded-2xl p-5 hover:shadow-lg transition-all border border-slate-200"
                    >
                      <div className="text-5xl mb-4">{book.icon}</div>

                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {book.title}
                      </h3>

                      <p className="text-sm text-slate-600 mb-4">
                        {book.description}
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            window.open(
                              book.link,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-emerald-700 transition-all"
                        >
                          Baca Buku
                        </button>

                        <div className="bg-white rounded-xl px-3 py-2 text-sm shadow-sm">
                          QR Buku
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedLibraryCategory === "Komik" && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-bold text-slate-800">
                    Koleksi Komik Edukasi
                  </h3>

                  <button
                    onClick={() => setSelectedLibraryCategory(null)}
                    className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-300 transition-all"
                  >
                    ← Semua Kategori
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {filteredComics.map((comic) => (
                    <div
                      key={comic.title}
                      className="bg-slate-100 rounded-2xl p-5 hover:shadow-lg transition-all border border-slate-200"
                    >
                      <div className="text-5xl mb-4">{comic.icon}</div>

                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {comic.title}
                      </h3>

                      <p className="text-sm text-slate-600 mb-4">
                        {comic.description}
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            window.open(
                              comic.link,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition-all"
                        >
                          Baca Komik
                        </button>

                        <div className="bg-white rounded-xl px-3 py-2 text-sm shadow-sm">
                          QR Komik
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!selectedMenu && (
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Statistik Inventaris
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between bg-slate-100 p-3 rounded-xl">
                  <span>Total Barang</span>
                  <span className="font-bold">{inventory.length}</span>
                </div>

                <div className="flex justify-between bg-slate-100 p-3 rounded-xl">
                  <span>Kondisi Baik</span>
                  <span className="font-bold text-green-600">
                    {
                      inventory.filter((item) => item.condition === "Baik")
                        .length
                    }
                  </span>
                </div>

                <div className="flex justify-between bg-slate-100 p-3 rounded-xl">
                  <span>Perlu Perawatan</span>
                  <span className="font-bold text-orange-500">
                    {
                      inventory.filter(
                        (item) => item.condition === "Perlu Perawatan"
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Jadwal Sarpras
              </h3>

              <ul className="space-y-3 text-slate-700">
                <li className="bg-slate-100 p-3 rounded-xl">
                  Perawatan Proyektor - Senin
                </li>

                <li className="bg-slate-100 p-3 rounded-xl">
                  Pembersihan Lab Komputer - Rabu
                </li>

                <li className="bg-slate-100 p-3 rounded-xl">
                  Pemeriksaan Mushola - Jumat
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                QR Code Inventaris
              </h3>

              <div className="bg-slate-100 rounded-2xl h-52 flex items-center justify-center text-center p-4">
                <div>
                  <div className="text-6xl mb-2">📱</div>

                  <p className="font-semibold">Scan QR Code</p>

                  <p className="text-sm text-slate-600 mt-2">
                    Untuk melihat data inventaris dan laporan kerusakan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMenu && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                setSelectedMenu(null);
                setSelectedLibraryCategory(null);
              }}
              className="bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-all"
            >
              ← Kembali ke Home
            </button>
          </div>
        )}

        <div className="mt-10 bg-white rounded-2xl p-6 shadow-md text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Inovasi Pendidikan Berbasis Digital
          </h3>

          <p className="text-slate-600">
            Website Smart Sarpras dibuat untuk mendukung pengelolaan sarana dan
            prasarana sekolah yang efektif, efisien, modern, dan terintegrasi.
          </p>
        </div>
      </div>
    </div>
  );
}
