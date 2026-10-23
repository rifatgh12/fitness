# 📱 Panduan Menjalankan OtotKu di HP & Perangkat Lain

Aplikasi **OtotKu** sudah dilengkapi dukungan **Multi-Device**, **Progressive Web App (PWA)**, **Offline Support**, dan **Sinkronisasi Cloud**.

Anda memiliki **3 pilihan cara** untuk menjalankannya di perangkat lain (smartphone, tablet, atau laptop lain):

---

## ⚡ CARA 1: Jaringan Wi-Fi Lokal (Paling Cepat & Mudah)
*Gunakan cara ini jika HP dan laptop Anda terhubung ke Wi-Fi atau Hotspot yang sama.*

1. Di komputer/laptop Anda, buka folder project ini (`c:\fitness tracking`).
2. **Klik dua kali file:**
   👉 `jalankan_server.bat`
3. Jendela hitam (terminal) akan terbuka dan menampilkan:
   - **QR Code scannable**
   - **Alamat URL lokal**, contoh: `http://192.168.1.9:8000`
4. Di HP Anda:
   - Cukup **arahkan kamera HP** ke QR Code di layar monitor Anda, lalu ketuk notifikasi link yang muncul.
   - Atau buka browser (Chrome / Safari) di HP, lalu ketik alamat yang tertera di terminal.
5. Selesai! Web OtotKu langsung bisa digunakan di HP Anda.

> 💡 **Tips:** Anda juga bisa menekan tombol **📱 (Ikon HP)** di bagian atas header web untuk memunculkan QR Code kapan saja di layar browser!

---

## 📲 CARA 2: Pasang ke Layar Utama HP (Install PWA)
*Jadikan OtotKu seperti aplikasi native di HP dengan ikon tersendiri dan tampilan layar penuh tanpa bilah browser.*

Setelah web terbuka di browser HP Anda:

### 🤖 Untuk Android (Google Chrome / Edge):
1. Ketuk ikon **titik tiga (⋮)** di pojok kanan atas browser.
2. Pilih menu **"Instal aplikasi"** atau **"Tambahkan ke Layar Utama" (Add to Home screen)**.
3. Ketuk **Instal**.
4. Ikon **OtotKu** sekarang sudah ada di home screen HP Anda dan bisa dibuka layaknya aplikasi dari Play Store!

### 🍎 Untuk iPhone / iPad (Safari):
1. Buka link web di browser **Safari**.
2. Ketuk tombol **Bagikan (Share)** di bilah bawah layar (ikon kotak dengan panah ke atas).
3. Gulir ke bawah dan ketuk **"Tambah ke Layar Utama" (Add to Home Screen)**.
4. Ketuk **Tambah (Add)** di pojok kanan atas.
5. Ikon **OtotKu** akan langsung terpasang di home screen iPhone/iPad Anda!

---

## 🌐 CARA 3: Akses Online dari Mana Saja (Tanpa Perlu Laptop Menyala)
*Jika Anda ingin web ini bisa dibuka di luar rumah (menggunakan paket data HP) tanpa perlu menyalakan laptop.*

### Pilihan A — Netlify Drop (Paling Mudah, 30 Detik Tanpa Koding):
1. Buka situs [app.netlify.com/drop](https://app.netlify.com/drop) di browser laptop Anda.
2. Tarik & lepaskan (drag and drop) seluruh folder `fitness tracking` ke kotak unggah Netlify.
3. Dalam beberapa detik, Netlify akan memberikan link web publik gratis (contoh: `https://ototku-kamu.netlify.app`).
4. Buka link tersebut di HP Anda dari mana saja!

### Pilihan B — GitHub Pages:
1. Buat repository baru di [github.com](https://github.com).
2. Upload seluruh file project ini ke repository tersebut.
3. Buka menu *Settings → Pages*, lalu pilih branch `main` dan simpan.
4. Web Anda aktif gratis selamanya di URL GitHub Pages Anda.

---

## ☁️ Sinkronisasi Data Antar-Perangkat (Laptop ⟷ HP)
Agar catatan makan, jadwal gym, dan berat badan Anda otomatis sama antara laptop dan HP:

👉 **Cara Termudah (Otomatis):**
1. Buka file `supabase-config.js` di laptop Anda.
2. Masukkan `url` dan `anonKey` Supabase Anda.
3. Begitu disimpan, **SEMUA perangkat (Laptop & HP)** langsung otomatis terhubung tanpa perlu repot mengetik kunci panjang di HP!
4. Panduan lengkap dan skrip SQL Supabase ada di file `PANDUAN_SUPABASE.md`.

---

## 🛠️ File-File Pendukung yang Dibuat:
- `supabase-config.js` : Konfigurasi global database Supabase (auto-sync semua device).
- `PANDUAN_SUPABASE.md` : Panduan lengkap pengaturan database & skrip SQL Supabase.
- `jalankan_server.bat` : Launcher 1-klik untuk Windows.
- `serve.py` : Script server lokal dengan deteksi IP otomatis dan QR Code di terminal.
- `manifest.json` : Konfigurasi PWA agar aplikasi bisa di-instal di Android & iOS.
- `sw.js` : Service Worker untuk caching cepat dan akses offline.
- `icon-192.png`, `icon-512.png`, `icon.svg` : Ikon aplikasi resmi beresolusi tinggi.
- `qrcode.min.js` : Library QR Code offline yang terintegrasi di dalam aplikasi.
