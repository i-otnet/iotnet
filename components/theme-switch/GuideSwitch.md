# Penjelasan Interaksi Switch Theme

## File yang Terlibat

1. **components/theme-switch/LightDark.tsx**
	- Komponen React tombol switch theme (light/dark).
	- Menggunakan hook `useTheme` dari `lib/theme-switch/LightDark.ts` untuk membaca dan mengubah theme.
	- Saat tombol diklik, memanggil `setTheme` untuk mengganti theme ('light' ⇄ 'dark').
	- Ikon berubah sesuai theme (matahari/bulan).

2. **lib/theme-switch/LightDark.ts**
	- Mendefinisikan hook `useTheme` yang mengelola state theme (light/dark) di localStorage dan pada elemen `<html>`.
	- Saat theme berubah:
	  - Menyimpan theme ke localStorage.
	  - Mengatur atribut `data-theme` pada elemen `<html>`.
	- Mengembalikan `[theme, setTheme]` untuk digunakan di komponen switch.

3. **src/app/layout.tsx**
	- Root layout Next.js yang membungkus seluruh aplikasi.
	- Menampilkan komponen `<LightDark />` di pojok kanan atas, sehingga switch selalu tersedia di semua halaman.

4. **src/app/globals.css**
	- Berisi deklarasi CSS variable untuk warna background, foreground, dan skema warna lain berdasarkan theme.
	- Menggunakan selector seperti `[data-color-scheme="default"]`, `[data-color-scheme="default-dark"]`, dst, untuk mengatur warna utama (primary) sesuai theme.
	- *Catatan:* Saat ini hook mengubah `data-theme`, bukan `data-color-scheme`. Jika ingin sinkron, perlu penyesuaian agar perubahan theme memicu perubahan CSS variable.

## Tujuan Perubahan Theme

- Memberikan pengalaman pengguna yang lebih baik dengan pilihan tampilan terang (light) atau gelap (dark).
- Theme switcher mengubah tampilan warna seluruh website secara dinamis tanpa reload, menyesuaikan preferensi user atau sistem.
- Pengaturan theme disimpan di localStorage, sehingga preferensi user tetap konsisten saat membuka kembali website.

**Singkatnya:**
Switch di `<LightDark.tsx>` memanggil `setTheme` dari hook di `<LightDark.ts>`, yang mengubah atribut pada `<html>` dan localStorage. Perubahan ini seharusnya memicu perubahan CSS variable di `globals.css` (dengan penyesuaian selector jika perlu), sehingga seluruh tampilan web berubah sesuai theme yang dipilih. Komponen switch selalu tersedia karena dipasang di root layout (`layout.tsx`).
