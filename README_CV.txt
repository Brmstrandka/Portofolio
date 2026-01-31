==================================================================
    INSTRUKSI MENAMBAHKAN FILE CV (PDF)
==================================================================

📁 STRUKTUR FOLDER YANG DIPERLUKAN:
----------------------------------

Buat struktur folder seperti ini:

your-portfolio/
├── index.html
├── styles.css
├── script.js
├── files/
│   └── CV_Andika_Bramastra.pdf  ← Letakkan file CV Anda di sini
└── images/
    ├── project iot.jpeg
    ├── recell.jpeg
    ├── affiliate.jpeg
    ├── website.jpeg
    ├── website-porto.jpeg
    └── dpmd.jpeg


📝 LANGKAH-LANGKAH:
----------------------------------

1. BUAT FOLDER 'files'
   - Di folder yang sama dengan index.html
   - Buat folder baru bernama: files

2. TAMBAHKAN FILE CV
   - Simpan file CV Anda dalam format PDF
   - Rename file menjadi: CV_Andika_Bramastra.pdf
   - Letakkan di folder 'files'

3. ALTERNATIVE: GANTI NAMA FILE
   - Jika ingin menggunakan nama file CV yang berbeda
   - Edit di 2 tempat di index.html:
   
   Cari:
   href="files/CV_Andika_Bramastra.pdf"
   download="CV_Andika_Bramastra.pdf"
   
   Ganti dengan nama file Anda:
   href="files/NAMA_FILE_ANDA.pdf"
   download="NAMA_FILE_ANDA.pdf"


🎯 LOKASI TOMBOL DOWNLOAD CV:
----------------------------------

Tombol Download CV akan muncul di 2 tempat:

1. ✅ HERO SECTION (halaman utama)
   - Tombol pink "📄 DOWNLOAD CV"
   - Terletak di bawah hero stats
   - Bersama tombol "VIEW PROJECTS" dan "HIRE ME"

2. ✅ CONTACT SECTION
   - Card khusus untuk download CV
   - Icon 📥
   - Tombol "GET MY CV"


💡 TIPS:
----------------------------------

✓ Ukuran file CV maksimal: 5MB (untuk loading cepat)
✓ Format: PDF (lebih profesional)
✓ Nama file: Gunakan underscore (_) bukan spasi
✓ Pastikan file CV sudah final dan tidak ada typo

✓ Pastikan path file benar:
  - BENAR: files/CV_Andika_Bramastra.pdf
  - SALAH: Files/CV_Andika_Bramastra.pdf (huruf kapital)
  - SALAH: file/CV_Andika_Bramastra.pdf (tanpa 's')


🔧 TROUBLESHOOTING:
----------------------------------

MASALAH: Tombol download tidak bekerja
SOLUSI: 
- Pastikan folder 'files' sudah dibuat
- Pastikan nama file CV sesuai (case-sensitive)
- Check console browser untuk error
- Pastikan file CV ada di lokasi yang benar

MASALAH: File tidak terdownload otomatis
SOLUSI:
- Browser mungkin membuka PDF di tab baru
- Ini normal behavior, user bisa save dari sana
- Atau right-click tombol > "Save link as"


🎨 CUSTOMIZATION:
----------------------------------

Jika ingin mengubah warna tombol CV:
- Edit di styles.css
- Cari: .btn-cv
- Ubah: --accent-tertiary (warna pink)


==================================================================
    SELAMAT! CV ANDA SIAP UNTUK DI-DOWNLOAD 🚀
==================================================================

Jika ada pertanyaan atau masalah, periksa:
1. Struktur folder sudah benar
2. Nama file sama persis (case-sensitive)
3. File CV sudah di upload ke server
4. Path di index.html sudah benar
