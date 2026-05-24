import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import laskarpelangi from "./assets/laskarpelangi.jpg";
import bumicinta from "./assets/bumicinta.jpg";
import englishfornusantara from "./assets/englishfornusantara.png";
import panduangurubahasaindonesia from "./assets/panduangurubahasaindonesia.png";

const WEBSITE_URL = "http://localhost:5173";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwhkTGgGiuig3GEL_g65mb6eZsbQp0QLo4E-ROP9umGa57s8pW3ntTTG0uoCvgiV2vf/exec";

const menus = [
  {
    title: "Inventaris Digital",
    desc: "Pendataan sarana dan prasarana sekolah berbasis QR Code.",
    icon: "📦",
  },
  {
    title: "Perpustakaan Digital",
    desc: "Akses e-book dan modul secara online.",
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
    image: englishfornusantara,
    link: "https://buku.kemendikdasmen.go.id/katalog/English-for-Nusantara-untuk-SMPMTs-Kelas-VII",
  },
  {
    title: "Panduan Guru Bahasa Indonesia",
    description:
      "Buku panduan Bahasa Indonesia SD/MI Kelas VI.",
    image: panduangurubahasaindonesia,
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

const novels = [
  {
    title: "Laskar Pelangi",
    description: "Novel karya Andrea Hirata tentang perjuangan pendidikan.",
    image: laskarpelangi,
    link: "https://online.fliphtml5.com/imzvb/nbmi/#p=1",
  },
  {
    title: "Bumi Cinta",
    description: "Novel karya Habiburrahman El shirazy pembangun jiwa.",
    image: bumicinta,
    link: "https://online.fliphtml5.com/aludp/zzwx/#p=1",
  },
];

const learningVideos = [
  {
    subject: "IPA",
    material: "Tata Surya",
    teacher: "Bu Wiwi",
    link: "https://www.youtube.com/watch?v=wAr5DARC6rc&t=59s",
  },
  {
    subject: "Matematika",
    material: "Pecahan",
    teacher: "Pak Ahmad",
    link: "https://www.youtube.com/watch?v=0hPRfqPFtt8",
  },
  {
    subject: "Fiqih",
    material: "Tata Cara Wudhu",
    teacher: "Bu Endah",
    link: "https://www.youtube.com/watch?v=LwnLurexn1Y",
  },
];

export default function SmartSarprasWebsite() {
const [isLogin, setIsLogin] = useState(false);

const [loginData, setLoginData] = useState({
  username: "",
  password: "",
});

const handleLogin = () => {
  if (
    loginData.username === "admin" &&
    loginData.password === "12345"
  ) {
    setIsLogin(true);
  } else {
    alert("Username atau password salah");
  }
};
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedLibraryCategory, setSelectedLibraryCategory] =
    useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLearningMenu, setSelectedLearningMenu] = useState(null);
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Proyektor Epson",
      code: "INV-001",
      location: "Lab Komputer",
      condition: "Baik",
      photo: ""
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    location: "",
    condition: "Baik",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
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

const filteredNovels = useMemo(() => {
  return novels.filter((novel) =>
    novel.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [searchQuery]);

  const handleAddInventory = async () => {
  if (!formData.name || !formData.code || !formData.location) {
    alert("Lengkapi data dulu");
    return;
  }

  try {
  const payload = {
    ...formData,
    photo: photoPreview,
  };

  const response = await fetch(WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });

    const result = await response.text();

    console.log(result);

    setInventory((prev) => [
  ...prev,
  {
    id: Date.now(),
    ...formData,
    photo: photoPreview,
  },
]);

    setFormData({
      name: "",
      code: "",
      location: "",
      condition: "Baik",
    });
    setPhoto(null);
    setPhotoPreview("");
    alert("Data berhasil disimpan!");
  } catch (error) {
    console.error(error);
    alert("Data gagal disimpan");
  }

};

if (!isLogin) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏫</div>

          <h1 className="text-3xl font-bold text-slate-800">
            Smart Sarpras
          </h1>

          <p className="text-slate-500 mt-2">
            Sistem Digital Sarana dan Prasarana Madrasah
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                username: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLogin}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all"
          >
            Login Dashboard
          </motion.button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          Username: admin <br />
          Password: 12345
        </div>
      </div>
    </div>
  );
}


  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-100 via-emerald-50 to-cyan-100 p-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 rounded-3xl p-10 text-white shadow-2xl text-center relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-52 h-52 bg-cyan-300/10 rounded-full blur-3xl"></div>
          <h1 className="text-5xl font-bold mb-4">
            Welcome To Smart Sarpras Madrasah
          </h1>

          <p className="text-lg opacity-90">
            Sistem Manajemen Terpadu Sarana dan Prasarana Madrasah Berbasis
            Digital
          </p>
      </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {menus.map((item, index) => (
        <motion.button
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{
            scale: 1.05,
            rotate: 1,
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setSelectedMenu(item.title);
            setSelectedLibraryCategory(null);
            setSelectedLearningMenu(null);
          }}
          className="bg-white rounded-3xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 text-left border border-slate-100"
        >
          <div className="text-5xl mb-4">{item.icon}</div>

          <h2 className="font-bold text-lg mb-2 text-slate-800">
            {item.title}
          </h2>

          <p className="text-sm text-slate-600">
            {item.desc}
          </p>
        </motion.button>
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
                        <div className="md:col-span-2">
            <label className="block font-semibold text-slate-700 mb-2">
              Upload Foto Barang
            </label>

            <div className="flex flex-col md:flex-row gap-3">

              <label className="bg-blue-600 text-white px-4 py-3 rounded-xl cursor-pointer hover:bg-blue-700 transition-all text-center">
                📁 Pilih Foto
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      setPhoto(file);

                      const reader = new FileReader();

                      reader.onloadend = () => {
                        setPhotoPreview(reader.result);
                      };

                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              <label className="bg-emerald-600 text-white px-4 py-3 rounded-xl cursor-pointer hover:bg-emerald-700 transition-all text-center">
                📷 Kamera
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      setPhoto(file);

                      const reader = new FileReader();

                      reader.onloadend = () => {
                        setPhotoPreview(reader.result);
                      };

                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            {photoPreview && (
              <div className="mt-4">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-2xl border"
                />
              </div>
            )}
          </div>
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
                    <th className="p-3 text-left">Kondisi</th>
                    <th className="p-3 text-left">Foto Barang</th>
                    <th className="p-3 text-left rounded-r-xl">
                      QR Code
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
                            <td className="p-3">
                              {item.photo ? (
                                <img
                                  src={item.photo}
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-xl border"
                                />
                              ) : (
                                <span className="text-slate-400 text-sm">
                                  Tidak ada foto
                                </span>
                              )}
                            </td>
                        <td className="p-3">
                          <div className="flex flex-col items-center gap-2">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${WEBSITE_URL}/barang/${item.code}`}
                              alt="QR Code"
                              className="rounded-lg border"
                            />

                            <a
                              href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${WEBSITE_URL}/barang/${item.code}`}
                              download={`${item.code}.png`}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-blue-700"
                            >
                              Download PNG
                            </a>

                            <button
                              onClick={() =>
                                window.open(
                                  `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${WEBSITE_URL}/barang/${item.code}`,
                                  "_blank"
                                )
                              }
                              className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-emerald-700"
                            >
                              Print Label
                            </button>
                          </div>
                        </td>
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
                  Akses e-book dan modul secara online.
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
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-32 h-44 object-cover rounded-xl mb-4 shadow-md"
                      />

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
            {selectedLibraryCategory === "Novel" && (
  <div className="mt-6">
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-2xl font-bold text-slate-800">
        Koleksi Novel
      </h3>

      <button
        onClick={() => setSelectedLibraryCategory(null)}
        className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-300 transition-all"
      >
        ← Semua Kategori
      </button>
    </div>

    <div className="grid md:grid-cols-2 gap-5">
      {filteredNovels.map((novel) => (
        <div
          key={novel.title}
          className="bg-slate-100 rounded-2xl p-5 hover:shadow-lg transition-all border border-slate-200"
        >
          <img
            src={novel.image}
            alt={novel.title}
            className="w-32 h-44 object-cover rounded-xl mb-4 shadow-md"
          />

          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {novel.title}
          </h3>

          <p className="text-sm text-slate-600 mb-4">
            {novel.description}
          </p>

          <button
            type="button"
            onClick={() =>
              window.open(
                novel.link,
                "_blank",
                "noopener,noreferrer"
              )
            }
            className="bg-pink-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-pink-700 transition-all"
          >
            Baca Novel
          </button>
        </div>
      ))}
    </div>
  </div>
)}
          </div>
        )}

       {selectedMenu === "Pembelajaran Digital" && (
  <div className="mt-10 bg-white rounded-2xl p-6 shadow-md">

    <div className="mb-6">
      <h2 className="text-3xl font-bold text-slate-800">
        Pembelajaran Digital
      </h2>

      <p className="text-slate-600 mt-2">
        Pilih layanan pembelajaran digital.
      </p>
    </div>

    {/* MENU PEMBELAJARAN */}
    <div className="grid md:grid-cols-3 gap-5 mb-8">

      <button
        onClick={() => setSelectedLearningMenu("video")}
        className="bg-red-50 border border-red-200 rounded-2xl p-5 hover:shadow-lg transition-all text-left"
      >
        <div className="text-5xl mb-4">🎥</div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Video Pembelajaran
        </h3>

        <p className="text-sm text-slate-600">
          Materi video pembelajaran interaktif.
        </p>
      </button>

      <button
        onClick={() => setSelectedLearningMenu("modul")}
        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 hover:shadow-lg transition-all text-left"
      >
        <div className="text-5xl mb-4">📘</div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Modul Ajar
        </h3>

        <p className="text-sm text-slate-600">
          Modul digital untuk guru dan siswa.
        </p>
      </button>

      <button
        onClick={() => setSelectedLearningMenu("quiz")}
        className="bg-blue-50 border border-blue-200 rounded-2xl p-5 hover:shadow-lg transition-all text-left"
      >
        <div className="text-5xl mb-4">📝</div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Quiz Interaktif
        </h3>

        <p className="text-sm text-slate-600">
          Evaluasi pembelajaran online.
        </p>
      </button>

    </div>

    {/* VIDEO PEMBELAJARAN */}
    {selectedLearningMenu === "video" && (
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-5">
          Video Pembelajaran
        </h3>

        <div className="grid md:grid-cols-3 gap-5">

          {learningVideos.map((video, index) => (
            <div
              key={index}
              className="bg-slate-100 rounded-2xl p-5 border hover:shadow-md transition-all"
            >
              <div className="space-y-3">

                <div>
                  <p className="text-sm text-slate-500">
                    Mata Pelajaran
                  </p>

                  <h4 className="font-bold text-lg text-slate-800">
                    {video.subject}
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Materi
                  </p>

                  <h4 className="font-semibold text-slate-700">
                    {video.material}
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Teacher
                  </p>

                  <h4 className="font-semibold text-slate-700">
                    {video.teacher}
                  </h4>
                </div>

              </div>

              <div className="mt-5 flex items-center justify-between gap-3">

                <button
                  onClick={() =>
                    window.open(video.link, "_blank")
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-all"
                >
                  ▶ Tonton
                </button>

                <div className="bg-white p-2 rounded-xl border">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${video.link}`}
                    alt="QR Video"
                    className="w-20 h-20"
                  />
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    )}

    {/* MODUL AJAR */}
    {selectedLearningMenu === "modul" && (
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-3">
          Modul Ajar
        </h3>

        <p className="text-slate-600 mb-4">
          Kumpulan modul ajar digital.
        </p>

        <button
          onClick={() =>
            window.open(
              "https://guru.kemdikbud.go.id/",
              "_blank"
            )
          }
          className="bg-emerald-600 text-white px-5 py-3 rounded-xl hover:bg-emerald-700 transition-all"
        >
          Buka Modul
        </button>
      </div>
    )}

    {/* QUIZ */}
    {selectedLearningMenu === "quiz" && (
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-3">
          Quiz Interaktif
        </h3>

        <p className="text-slate-600 mb-4">
          Kerjakan quiz pembelajaran online.
        </p>

        <button
          onClick={() =>
            window.open(
              "https://quizizz.com/",
              "_blank"
            )
          }
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-all"
        >
          Mulai Quiz
        </button>
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
