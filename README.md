# SMART EXAM INFORMATIKA IX

Aplikasi asesmen sumatif Informatika kelas IX (Fase D), SMP Negeri 4 Rambang Kuang.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

## Deploy

Project menggunakan Vite dan GitHub Actions. Setelah workflow berjalan, buka **Settings → Pages** dan pastikan **Build and deployment → Source** dipilih **GitHub Actions**.

Alamat situs yang direncanakan: https://azizilalim333-blip.github.io/smart-exam-informatika-ix/

## Catatan penting sebelum digunakan untuk ujian resmi

- Versi saat ini merupakan prototipe sisi-klien. Data hasil, akun, dan pengaturan tersimpan di memori browser dan belum tersinkron antarperangkat.
- Login guru pada kode sumber saat ini belum menggunakan autentikasi server; jangan gunakan kredensial nyata atau menganggapnya sebagai sistem login yang aman.
- Data contoh pada dashboard perlu dibedakan dari hasil ujian sungguhan.
- Deteksi perpindahan tab/fokus browser hanya bersifat peringatan dan tidak dapat memblokir siswa membuka aplikasi atau perangkat lain.
- Untuk penggunaan resmi, perlu backend/database, autentikasi guru, penyimpanan hasil terpusat, dan pengujian menyeluruh.
