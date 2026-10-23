# ⚡ Panduan Menghubungkan OtotKu ke Supabase Database

Aplikasi **OtotKu** sudah dilengkapi sistem sinkronisasi cloud dengan **Supabase**, termasuk fitur **Live Realtime Sync** (perubahan di HP otomatis muncul di laptop tanpa perlu refresh).

Ada **2 cara mudah** untuk memasukkan kunci Supabase Anda:

---

## 🚀 CARA TERCEPAT & DISARANKAN: Lewat File `supabase-config.js`
*Cukup isi sekali di komputer, SEMUA perangkat (Laptop, HP Android, iPhone, iPad) yang membuka OtotKu akan OTOMATIS langsung terhubung tanpa perlu repot mengetik kunci panjang di keyboard HP!*

1. Buka file [supabase-config.js](file:///c:/Users/Rifatghaisano/OneDrive/Documents/GitHub/fitness/supabase-config.js) di text editor / VS Code.
2. Masukkan **Project URL** dan **Anon Key** Supabase Anda:
   ```javascript
   window.SUPABASE_CONFIG = {
     url: 'https://xyzabcdefghijklm.supabase.co',      // URL Supabase Anda
     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', // Anon Public Key
     syncKey: 'rifat_fitness'                            // ID Pengguna Anda
   };
   ```
3. Simpan file (`Ctrl + S`).
4. Buka OtotKu di browser, lalu buka tab **Pengaturan** dan klik tombol **🧪 Tes Koneksi Supabase**.
5. Selesai!

---

## 📱 CARA KEDUA: Lewat Halaman Pengaturan di Web
*Jika Anda ingin memasukkan kunci langsung lewat antarmuka web:*

1. Buka aplikasi **OtotKu** di browser.
2. Buka tab **Pengaturan** (ikon ⚙️ di navigasi bawah).
3. Gulir ke bagian **☁️ Sinkronisasi Cloud (Supabase / Firebase)**.
4. Masukkan **Supabase Project URL** dan **Supabase Anon / Public Key**.
5. Centang **"Aktifkan Sinkronisasi Cloud Otomatis"**.
6. Klik **💾 Simpan Konfigurasi**.
7. Klik tombol **🧪 Tes Koneksi Supabase** untuk memastikan koneksi berhasil.

---

## 📜 Skrip SQL Supabase yang Wajib Dijalankan (Sekali Saja)

Agar database Supabase siap menerima data dari OtotKu dan mendukung Live Realtime Sync:

1. Buka dashboard project Anda di [supabase.com](https://supabase.com/dashboard).
2. Di menu sebelah kiri, klik **SQL Editor** (ikon terminal/dokumen).
3. Klik **New query** (atau tanda `+`), lalu **Salin & Tempel skrip SQL di bawah ini**:

```sql
-- 1. Buat tabel penyimpanan data OtotKu
create table if not exists public.ototku_sync (
  user_id text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Aktifkan Row Level Security (RLS)
alter table public.ototku_sync enable row level security;

-- 3. Berikan izin baca & tulis untuk OtotKu (Anon & Authenticated)
drop policy if exists "Public Access" on public.ototku_sync;
create policy "Public Access"
  on public.ototku_sync
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- 4. Aktifkan Realtime Live Sync antar-perangkat
alter publication supabase_realtime add table public.ototku_sync;
```

4. Klik tombol hijau **Run** (atau tekan `Ctrl + Enter`).
5. Muncul notifikasi `Success. No rows returned`. Database sudah 100% siap!

---

## 💡 Keuntungan Fitur Ini:
- **⚡ Live Realtime Sync**: Saat Anda mencatat menu makan atau centang set gym di HP, tampilan di layar laptop Anda akan langsung terupdate detik itu juga.
- **🛡️ Anti Kehilangan Data**: Semua log makanan, program gym, dan riwayat berat badan Anda tersimpan aman di cloud.
- **📱 Multi-Device**: Bebas buka di HP mana pun hanya dengan Kunci Pengguna (`syncKey`) yang sama.
