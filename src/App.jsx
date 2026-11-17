import React, { useEffect, useMemo, useState } from 'react';
import {
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flag,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Download,
  RefreshCw,
  CheckSquare,
  Square,
  Award,
  Eye,
  Play,
  Lock
} from 'lucide-react';

const SCHOOL = 'SMP Negeri 4 Rambang Kuang';
const TEACHER = 'Azizil Alim, S.Sos.';
const EXAM_TITLE = 'SMART EXAM INFORMATIKA IX';

// Bank Soal Lengkap (30 Soal: 15 PG, 5 PGK, 10 Benar-Salah)
const QUESTIONS_BANK = [
  { id: 1, tp: 'TP1', type: 'PG', text: 'Sekelompok siswa menggunakan komputer untuk mengolah data kehadiran, membuat grafik, dan menyampaikan hasilnya. Kegiatan tersebut paling tepat menunjukkan bahwa informatika adalah ilmu yang mempelajari ....', options: ['cara menggunakan komputer untuk bermain saja', 'pengolahan informasi dengan komputasi untuk menyelesaikan masalah', 'cara memperbaiki semua perangkat elektronik', 'kegiatan mengetik tanpa mengolah data'], answer: 1 },
  { id: 2, tp: 'TP1', type: 'PG', text: 'Ketua kelas ingin mengetahui jumlah siswa yang hadir setiap hari selama satu bulan. Pemanfaatan informatika yang paling tepat adalah ....', options: ['mencatat data secara terstruktur lalu mengolahnya', 'menghafal seluruh nama siswa', 'menghapus data setiap akhir hari', 'mengira-ngira jumlah kehadiran'], answer: 0 },
  { id: 3, tp: 'TP2', type: 'PG', text: 'Empat unsur utama berpikir komputasional yang dipelajari adalah ....', options: ['mengetik, mencetak, menyimpan, menghapus', 'dekomposisi, pengenalan pola, abstraksi, algoritma', 'membaca, menulis, berhitung, menggambar', 'monitor, CPU, keyboard, mouse'], answer: 1 },
  { id: 4, tp: 'TP2', type: 'PG', text: 'Saat menghadapi tugas besar, Rani membaginya menjadi beberapa tugas kecil agar mudah dikerjakan. Ia sedang menerapkan ....', options: ['abstraksi', 'algoritma', 'dekomposisi', 'enkripsi'], answer: 2 },
  { id: 5, tp: 'TP3', type: 'PG', text: 'Panitia gotong royong harus mengatur alat, peserta, lokasi, dan jadwal. Pembagian masalah yang paling masuk akal adalah ....', options: ['menggabungkan semua tugas pada satu orang', 'membagi pekerjaan menjadi tim perlengkapan, peserta, lokasi, dan jadwal', 'mengabaikan jadwal agar lebih cepat', 'memilih pekerjaan secara acak tanpa koordinasi'], answer: 1 },
  { id: 6, tp: 'TP3', type: 'PG', text: 'Perpustakaan mengalami antrean panjang saat peminjaman buku. Langkah dekomposisi yang tepat adalah ....', options: ['menganalisis proses pencarian buku, pencatatan anggota, dan transaksi peminjaman', 'mengganti seluruh buku dengan buku baru', 'menutup perpustakaan setiap hari', 'meminta siswa datang bersamaan'], answer: 0 },
  { id: 7, tp: 'TP4', type: 'PG', text: 'Jadwal piket kelas menunjukkan bahwa setiap hari ada kelompok yang bertugas menyapu, menghapus papan, dan merapikan meja. Kesamaan kegiatan yang dapat dijadikan pola adalah ....', options: ['semua siswa selalu hadir', 'jenis tugas kebersihan berulang setiap hari', 'semua kelompok memiliki nama sama', 'jadwal tidak pernah berubah'], answer: 1 },
  { id: 8, tp: 'TP4', type: 'PG', text: 'Dalam membuat peta rute ke sekolah, informasi yang paling penting dipertahankan adalah ....', options: ['warna setiap rumah', 'merek kendaraan tetangga', 'jalan dan persimpangan yang dilalui', 'jumlah jendela setiap bangunan'], answer: 2 },
  { id: 9, tp: 'TP5', type: 'PG', text: 'Urutan algoritma meminjam buku yang paling logis adalah ....', options: ['membawa buku pulang, mencari kartu, lalu memilih buku', 'memilih buku, menyerahkan kartu anggota, petugas mencatat, menerima buku', 'mengembalikan buku, memilih buku, lalu mendaftar anggota', 'menutup perpustakaan, memilih buku, lalu mencatat'], answer: 1 },
  { id: 10, tp: 'TP5', type: 'PG', text: 'Sebuah algoritma harus memiliki langkah yang ....', options: ['jelas, logis, dan berurutan', 'panjang dan sulit dipahami', 'berubah tanpa aturan', 'hanya diketahui pembuatnya'], answer: 0 },
  { id: 11, tp: 'TP6', type: 'PG', text: 'Siswa membuat program sederhana untuk menghitung total sampah plastik yang dikumpulkan tiap kelompok. Agar hasilnya mudah dipahami warga sekolah, mereka sebaiknya ....', options: ['menyimpan hasil tanpa penjelasan', 'menampilkan ringkasan dan grafik serta menjelaskan cara menghitungnya', 'menghapus data kelompok lain', 'hanya menyebutkan angka tanpa konteks'], answer: 1 },
  { id: 12, tp: 'TP6', type: 'PG', text: 'Saat hasil pengolahan data kehadiran berbeda dari catatan kelas, tindakan terbaik adalah ....', options: ['langsung menyalahkan petugas', 'memeriksa data masukan dan langkah pengolahan', 'menghapus semua catatan', 'mengubah hasil agar terlihat bagus'], answer: 1 },
  { id: 13, tp: 'TP2', type: 'PG', text: 'Menyaring informasi yang tidak relevan ketika membuat solusi disebut ....', options: ['abstraksi', 'duplikasi', 'simulasi', 'instalasi'], answer: 0 },
  { id: 14, tp: 'TP3', type: 'PG', text: 'Untuk mengatur antrean kantin, bagian masalah yang perlu dianalisis antara lain ....', options: ['jumlah pembeli, loket layanan, dan alur antrean', 'warna sepatu pembeli', 'jenis musik di kelas', 'jumlah pohon di halaman'], answer: 0 },
  { id: 15, tp: 'TP5', type: 'PG', text: 'Jika langkah pertama algoritma tidak dijalankan, kemungkinan yang paling tepat adalah ....', options: ['hasil pasti tetap sama', 'urutan proses dapat terganggu dan hasil menjadi tidak tepat', 'komputer otomatis memperbaiki semua langkah', 'tidak ada pengaruh pada proses apa pun'], answer: 1 },
  { id: 16, tp: 'TP2', type: 'PGK', text: 'Pilih semua kegiatan yang menunjukkan berpikir komputasional.', options: ['membagi proyek kelas menjadi beberapa tugas', 'mencari kesamaan pola data kehadiran', 'menyusun langkah peminjaman buku', 'menebak jawaban tanpa memeriksa informasi'], answer: [0, 1, 2] },
  { id: 17, tp: 'TP3', type: 'PGK', text: 'Pilih semua bagian yang dapat dipisahkan saat merancang kegiatan bazar sekolah.', options: ['pendataan stan', 'pengaturan tempat', 'jadwal petugas', 'warna favorit semua orang yang tidak terkait kegiatan'], answer: [0, 1, 2] },
  { id: 18, tp: 'TP4', type: 'PGK', text: 'Pilih semua informasi yang relevan untuk menyusun rute tercepat ke sekolah.', options: ['jarak jalan', 'kondisi kemacetan', 'persimpangan yang harus dilalui', 'warna tas pengendara'], answer: [0, 1, 2] },
  { id: 19, tp: 'TP5', type: 'PGK', text: 'Pilih semua ciri algoritma yang baik.', options: ['langkahnya jelas', 'urutan masuk akal', 'dapat diuji atau diikuti', 'instruksinya sengaja dibuat membingungkan'], answer: [0, 1, 2] },
  { id: 20, tp: 'TP6', type: 'PGK', text: 'Pilih semua tindakan yang tepat saat menyajikan hasil pengolahan data kelas.', options: ['menjelaskan sumber data', 'menyampaikan hasil dengan tabel atau grafik yang sesuai', 'menyebutkan keterbatasan data jika ada', 'mengubah angka agar sesuai keinginan'], answer: [0, 1, 2] },
  { id: 21, tp: 'TP1', type: 'BS', text: 'Informatika hanya mempelajari cara mengoperasikan komputer dan tidak berkaitan dengan pemecahan masalah.', answer: false },
  { id: 22, tp: 'TP2', type: 'BS', text: 'Berpikir komputasional dapat digunakan untuk menyelesaikan masalah sehari-hari, meskipun tidak selalu menggunakan komputer.', answer: true },
  { id: 23, tp: 'TP3', type: 'BS', text: 'Dekomposisi membantu menyederhanakan masalah kompleks dengan membaginya menjadi bagian yang lebih kecil.', answer: true },
  { id: 24, tp: 'TP4', type: 'BS', text: 'Pengenalan pola berarti mencari kesamaan atau keteraturan yang muncul pada beberapa masalah atau data.', answer: true },
  { id: 25, tp: 'TP4', type: 'BS', text: 'Abstraksi mengharuskan kita memasukkan semua detail, termasuk yang tidak berhubungan dengan masalah.', answer: false },
  { id: 26, tp: 'TP5', type: 'BS', text: 'Algoritma merupakan urutan langkah yang logis dan terstruktur untuk menyelesaikan suatu tugas.', answer: true },
  { id: 27, tp: 'TP5', type: 'BS', text: 'Dalam algoritma, urutan langkah tidak penting selama semua instruksi pernah dilakukan.', answer: false },
  { id: 28, tp: 'TP6', type: 'BS', text: 'Solusi komputasi sederhana sebaiknya diuji untuk mengetahui apakah hasilnya sesuai kebutuhan.', answer: true },
  { id: 29, tp: 'TP6', type: 'BS', text: 'Saat mempresentasikan hasil, siswa boleh mengubah data tanpa alasan agar hasil terlihat lebih baik.', answer: false },
  { id: 30, tp: 'TP2', type: 'BS', text: 'Memilih informasi penting dan mengabaikan detail yang tidak relevan merupakan contoh abstraksi.', answer: true }
];

// Data awal hasil ujian untuk simulasi dashboard guru
const INITIAL_RESULTS = [
  { id: 'res-1', student_name: 'Ahmad Fauzi', class_name: 'IX-A', score: 90, correct: 27, total: 30, violations: 0, submitted_at: '2026-11-17 08:45' },
  { id: 'res-2', student_name: 'Siti Aminah', class_name: 'IX-A', score: 83, correct: 25, total: 30, violations: 0, submitted_at: '2026-11-17 08:52' },
  { id: 'res-3', student_name: 'Budi Santoso', class_name: 'IX-B', score: 70, correct: 21, total: 30, violations: 2, submitted_at: '2026-11-17 09:05' },
  { id: 'res-4', student_name: 'Rina Marlina', class_name: 'IX-B', score: 97, correct: 29, total: 30, violations: 0, submitted_at: '2026-11-17 09:10' },
];

export default function App() {
  // Navigation & Auth State
  const [page, setPage] = useState('home'); // 'home' | 'login' | 'student-home' | 'exam' | 'result' | 'dashboard'
  const [role, setRole] = useState('student'); // 'student' | 'teacher'
  const [user, setUser] = useState(null);

  // Login Form State
  const [nameInput, setNameInput] = useState('');
  const [classInput, setClassInput] = useState('IX-A');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Exam Settings (Managed by Teacher)
  const [settings, setSettings] = useState({
    duration_minutes: 90,
    exam_active: true,
    kktp: 75,
    warning_limit: 3
  });

  // Exam Active Session State
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remaining, setRemaining] = useState(5400);
  const [violations, setViolations] = useState(0);
  const [violationLogs, setViolationLogs] = useState([]);
  const [warningModal, setWarningModal] = useState('');
  const [confirmSubmitModal, setConfirmSubmitModal] = useState(false);

  // Results & Teacher Dashboard State
  const [results, setResults] = useState(INITIAL_RESULTS);
  const [latestResult, setLatestResult] = useState(null);
  const [dashboardTab, setDashboardTab] = useState('rekap'); // 'rekap' | 'soal' | 'pengaturan'
  const [toastMsg, setToastMsg] = useState('');

  const currentQuestion = QUESTIONS_BANK[currentIndex];

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Timer Effect during Exam
  useEffect(() => {
    if (page !== 'exam') return;
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [page]);

  // Anti-cheat Focus & Tab Visibility Detection
  useEffect(() => {
    if (page !== 'exam') return;

    const recordViolation = (reason) => {
      setViolations((prev) => {
        const next = prev + 1;
        setViolationLogs((logs) => [
          ...logs,
          { time: new Date().toLocaleTimeString('id-ID'), reason }
        ]);
        setWarningModal(`${reason} (Peringatan ${next}/${settings.warning_limit})`);
        if (next >= settings.warning_limit) {
          setTimeout(() => handleFinishExam(true), 1500);
        }
        return next;
      });
    };

    const onBlur = () => recordViolation('Jendela ujian kehilangan fokus');
    const onVisibilityChange = () => {
      if (document.hidden) recordViolation('Berpindah tab atau meminimalkan browser');
    };

    window.addEventListener('blur', onBlur);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [page, settings.warning_limit]);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');

    if (role === 'teacher') {
      if (!emailInput.trim() || !passwordInput.trim()) {
        setAuthError('Masukkan email dan kata sandi guru.');
        return;
      }
      setUser({
        name: TEACHER,
        email: emailInput,
        role: 'teacher'
      });
      setPage('dashboard');
    } else {
      if (!nameInput.trim()) {
        setAuthError('Nama lengkap peserta ujian wajib diisi.');
        return;
      }
      setUser({
        name: nameInput.trim(),
        class_name: classInput,
        role: 'student'
      });
      setPage('student-home');
    }
  };

  const handleQuickDemoLogin = (targetRole) => {
    if (targetRole === 'teacher') {
      setUser({ name: TEACHER, email: 'azizil.alim@smpn4rk.sch.id', role: 'teacher' });
      setPage('dashboard');
    } else {
      setUser({ name: 'Siswa Demo IX-A', class_name: 'IX-A', role: 'student' });
      setPage('student-home');
    }
  };

  const handleLogout = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setUser(null);
    setPage('home');
  };

  // Start Exam
  const startExam = async () => {
    if (!settings.exam_active) {
      showToast('Ujian sedang dinonaktifkan oleh guru.');
      return;
    }
    setAnswers({});
    setMarked([]);
    setCurrentIndex(0);
    setRemaining(settings.duration_minutes * 60);
    setViolations(0);
    setViolationLogs([]);
    setWarningModal('');
    setConfirmSubmitModal(false);
    setPage('exam');

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Ignore fullscreen denial in sandboxed iframe
    }
  };

  // Answer Selection Logic
  const handleSelectAnswer = (qid, value, type) => {
    setAnswers((prev) => {
      if (type === 'PGK') {
        const existing = Array.isArray(prev[qid]) ? prev[qid] : [];
        const updated = existing.includes(value)
          ? existing.filter((item) => item !== value)
          : [...existing, value].sort((a, b) => a - b);
        if (updated.length === 0) {
          const copy = { ...prev };
          delete copy[qid];
          return copy;
        }
        return { ...prev, [qid]: updated };
      }
      return { ...prev, [qid]: value };
    });
  };

  const toggleMarkQuestion = (qid) => {
    setMarked((prev) =>
      prev.includes(qid) ? prev.filter((id) => id !== qid) : [...prev, qid]
    );
  };

  // Calculate Score & Submit Exam
  const handleFinishExam = (autoSubmit = false) => {
    setConfirmSubmitModal(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    let correctCount = 0;
    QUESTIONS_BANK.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns === undefined) return;

      if (q.type === 'PG' || q.type === 'BS') {
        if (userAns === q.answer) correctCount += 1;
      } else if (q.type === 'PGK' && Array.isArray(userAns)) {
        const isExact =
          userAns.length === q.answer.length &&
          q.answer.every((val, idx) => val === userAns[idx]);
        if (isExact) correctCount += 1;
      }
    });

    const finalScore = Math.round((correctCount / QUESTIONS_BANK.length) * 100);
    const nowStr = new Date().toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const resultRecord = {
      id: `res-${Date.now()}`,
      student_name: user?.name || 'Peserta Ujian',
      class_name: user?.class_name || 'IX-A',
      score: finalScore,
      correct: correctCount,
      total: QUESTIONS_BANK.length,
      violations,
      auto_submitted: autoSubmit,
      submitted_at: nowStr
    };

    setLatestResult(resultRecord);
    setResults((prev) => [resultRecord, ...prev]);
    setPage('result');
  };

  // Export CSV for Teacher
  const exportCSV = () => {
    const header = ['Nama Siswa', 'Kelas', 'Benar', 'Total Soal', 'Nilai Akhir', 'Pelanggaran', 'Waktu Submit'];
    const rows = results.map((r) => [
      r.student_name,
      r.class_name,
      r.correct,
      r.total,
      r.score,
      r.violations,
      r.submitted_at
    ]);
    const csvContent = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
      .join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rekap-nilai-informatika-ix.csv';
    link.click();
    URL.revokeObjectURL(url);
    showToast('File CSV rekap nilai berhasil diunduh.');
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  // Analytics for Teacher Dashboard
  const stats = useMemo(() => {
    if (results.length === 0) return { avg: 0, highest: 0, passed: 0 };
    const scores = results.map((r) => r.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const highest = Math.max(...scores);
    const passed = scores.filter((s) => s >= settings.kktp).length;
    return { avg, highest, passed };
  }, [results, settings.kktp]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-slate-800 border border-cyan-500/40 px-4 py-3 text-sm text-cyan-100 shadow-2xl">
          <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ==================== 1. LANDING PAGE ==================== */}
      {page === 'home' && (
        <div className="min-h-screen flex flex-col justify-between bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-950/50 via-slate-950 to-slate-950 px-6 py-8 md:px-14 lg:px-20">
          {/* Top Brand */}
          <header className="flex items-center justify-between max-w-6xl w-full mx-auto">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20">
                <BookOpen className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-xl text-white">
                  SMART<span className="text-cyan-400">EXAM</span>
                </span>
                <p className="text-[11px] text-slate-400 tracking-wider uppercase">Informatika Kelas IX</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-900/90 border border-slate-800 px-4 py-1.5 text-xs text-slate-300">
              <GraduationCap className="h-4 w-4 text-cyan-400" />
              <span>{SCHOOL}</span>
            </div>
          </header>

          {/* Main Hero Grid */}
          <main className="max-w-6xl w-full mx-auto my-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-cyan-300 uppercase">
                <ShieldCheck className="h-4 w-4" />
                Asesmen Digital • Kurikulum Merdeka
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Ujian Jujur, <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Berpikir Kritis.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Platform asesmen sumatif Informatika kelas IX yang aman, terukur, dan interaktif untuk menguji pemahaman Berpikir Komputasional.
              </p>

              {/* Login Role Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => {
                    setRole('student');
                    setAuthError('');
                    setPage('login');
                  }}
                  className="group flex items-center justify-between sm:justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-500/25 hover:brightness-110 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Users className="h-5 w-5" />
                    Login Siswa
                  </span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setRole('teacher');
                    setAuthError('');
                    setPage('login');
                  }}
                  className="group flex items-center justify-between sm:justify-center gap-3 rounded-2xl bg-slate-900 border border-slate-700/80 px-7 py-4 font-semibold text-white hover:bg-slate-800 hover:border-slate-600 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <ShieldCheck className="h-5 w-5 text-cyan-400" />
                    Login Guru
                  </span>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Quick Demo Access */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span>Akses Cepat Simulasi:</span>
                <button
                  onClick={() => handleQuickDemoLogin('student')}
                  className="underline decoration-cyan-500/50 text-cyan-300 hover:text-cyan-200 cursor-pointer"
                >
                  Masuk sebagai Siswa Demo
                </button>
                <span>•</span>
                <button
                  onClick={() => handleQuickDemoLogin('teacher')}
                  className="underline decoration-cyan-500/50 text-cyan-300 hover:text-cyan-200 cursor-pointer"
                >
                  Masuk sebagai Guru Pengampu
                </button>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-2xl pointer-events-none" />
              <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-7 shadow-2xl backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-medium text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    SECURE EXAM MODE
                  </span>
                  <span className="text-xs font-mono text-slate-400">TP1 – TP6</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">INFORMATIKA IX</h2>
                    <p className="text-sm text-slate-400">Semester Ganjil · TP 2026/2027</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Komposisi Butir Soal</span>
                    <span className="text-cyan-300 font-medium">15 PG · 5 PGK · 10 B/S</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
                    <div className="bg-cyan-400 w-1/2" />
                    <div className="bg-blue-500 w-1/6" />
                    <div className="bg-indigo-500 w-1/3" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-3 text-center">
                    <div className="text-lg font-bold text-white">30</div>
                    <div className="text-[11px] text-slate-400">Butir Soal</div>
                  </div>
                  <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-3 text-center">
                    <div className="text-lg font-bold text-cyan-400">{settings.duration_minutes}m</div>
                    <div className="text-[11px] text-slate-400">Durasi Ujian</div>
                  </div>
                  <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-3 text-center">
                    <div className="text-lg font-bold text-emerald-400">100</div>
                    <div className="text-[11px] text-slate-400">Skor Maks</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-xl bg-slate-950/70 border border-slate-800 px-4 py-3 text-xs text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>Pemantauan fokus layar & perpindahan tab otomatis aktif</span>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="max-w-6xl w-full mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <div>
              Guru Pengampu: <strong className="text-slate-200">{TEACHER}</strong>
            </div>
            <div>© 2026 {SCHOOL}</div>
          </footer>
        </div>
      )}

      {/* ==================== 2. LOGIN SCREEN ==================== */}
      {page === 'login' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950">
          <div className="w-full max-w-md space-y-6">
            <button
              onClick={() => setPage('home')}
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              Kembali ke Beranda
            </button>

            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl space-y-6">
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  {role === 'teacher' ? <ShieldCheck className="h-6 w-6" /> : <Users className="h-6 w-6" />}
                </div>
                <div className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
                  {role === 'teacher' ? 'Area Administrator & Guru' : 'Area Peserta Didik'}
                </div>
                <h1 className="text-2xl font-bold text-white">
                  Login {role === 'teacher' ? 'Guru' : 'Siswa'}
                </h1>
                <p className="text-sm text-slate-400">
                  {SCHOOL} · Informatika Kelas IX
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {role === 'student' ? (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Nama Lengkap Peserta</label>
                      <input
                        type="text"
                        required
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="Contoh: Ahmad Fauzi"
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Kelas</label>
                      <select
                        value={classInput}
                        onChange={(e) => setClassInput(e.target.value)}
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="IX-A">Kelas IX-A</option>
                        <option value="IX-B">Kelas IX-B</option>
                        <option value="IX-C">Kelas IX-C</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Email Guru</label>
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="azizil.alim@smpn4rk.sch.id"
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Kata Sandi</label>
                      <input
                        type="password"
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {authError && (
                  <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 font-bold text-slate-950 hover:brightness-110 transition cursor-pointer"
                >
                  Masuk ke Aplikasi
                </button>
              </form>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Ingin langsung mencoba?</span>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin(role)}
                  className="text-cyan-400 font-medium hover:underline cursor-pointer"
                >
                  Isi Otomatis & Masuk →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3. STUDENT LOBBY / PAKTA INTEGRITAS ==================== */}
      {page === 'student-home' && (
        <div className="min-h-screen flex flex-col bg-slate-950">
          <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur px-6 py-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="font-bold text-white">
                  SMART<span className="text-cyan-400">EXAM</span>
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </header>

          <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-10 space-y-8">
            <div className="space-y-2">
              <div className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
                Halo, Peserta Ujian
              </div>
              <h1 className="text-3xl font-extrabold text-white">
                Selamat datang, {user?.name}
              </h1>
              <p className="text-sm text-slate-400">
                {SCHOOL} · Kelas {user?.class_name} · Guru Pengampu: {TEACHER}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-2">
                <BookOpen className="h-6 w-6 text-cyan-400" />
                <div className="font-bold text-white text-lg">30 Butir Soal</div>
                <p className="text-xs text-slate-400">15 Pilihan Ganda · 5 PG Kompleks · 10 Benar-Salah</p>
              </div>
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-2">
                <Clock3 className="h-6 w-6 text-amber-400" />
                <div className="font-bold text-white text-lg">{settings.duration_minutes} Menit</div>
                <p className="text-xs text-slate-400">Waktu berjalan otomatis setelah tombol mulai ditekan</p>
              </div>
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-2">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
                <div className="font-bold text-white text-lg">Mode Aman</div>
                <p className="text-xs text-slate-400">Maksimal {settings.warning_limit}x peringatan pindah tab/jendela</p>
              </div>
            </div>

            {/* Pakta Kejujuran */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-cyan-500/30 p-7 space-y-5">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold">
                <ShieldCheck className="h-5 w-5" />
                <span>Pakta Integritas & Komitmen Kejujuran</span>
              </div>
              <blockquote className="text-slate-200 text-base sm:text-lg italic leading-relaxed border-l-2 border-cyan-500 pl-4">
                “Saya berkomitmen mengikuti asesmen Informatika kelas IX ini dengan jujur, mandiri, bertanggung jawab, tidak membuka catatan atau tab lain, dan menghargai hasil usaha sendiri.”
              </blockquote>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  onClick={startExam}
                  disabled={!settings.exam_active}
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 disabled:opacity-50 transition cursor-pointer"
                >
                  <Play className="h-5 w-5 fill-current" />
                  Saya Siap Mengerjakan Ujian dengan Jujur
                </button>

                {!settings.exam_active && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-400">
                    <Lock className="h-4 w-4" /> Ujian belum diaktifkan oleh guru.
                  </span>
                )}
              </div>
            </div>
          </main>
        </div>
      )}

      {/* ==================== 4. ACTIVE EXAM INTERFACE ==================== */}
      {page === 'exam' && currentQuestion && (
        <div className="min-h-screen flex flex-col bg-slate-950 select-none">
          {/* Anti-Cheat Warning Modal */}
          {warningModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-rose-500/50 p-6 text-center space-y-4 shadow-2xl">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Peringatan Pengawas Sistem!</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{warningModal}</p>
                <p className="text-xs text-slate-400">
                  Tetap berada di halaman ujian. Jika peringatan mencapai batas maksimal ({settings.warning_limit}x), ujian akan dikumpulkan otomatis.
                </p>
                <button
                  onClick={() => setWarningModal('')}
                  className="w-full rounded-xl bg-rose-500 py-3 font-bold text-white hover:bg-rose-600 transition cursor-pointer"
                >
                  Saya Mengerti & Kembali Mengerjakan
                </button>
              </div>
            </div>
          )}

          {/* Confirm Submit Modal */}
          {confirmSubmitModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-slate-700 p-6 space-y-5 shadow-2xl">
                <h3 className="text-xl font-bold text-white">Kumpulkan Jawaban Ujian?</h3>
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Soal Terjawab:</span>
                    <span className="font-bold text-emerald-400">{answeredCount} / {QUESTIONS_BANK.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ditandai Ragu-ragu:</span>
                    <span className="font-bold text-amber-400">{marked.length} Soal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sisa Waktu:</span>
                    <span className="font-mono font-bold text-cyan-400">{formatTimer(remaining)}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  Pastikan seluruh jawaban sudah diperiksa. Setelah dikumpulkan, Anda tidak dapat mengubah jawaban kembali.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setConfirmSubmitModal(false)}
                    className="rounded-xl bg-slate-800 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
                  >
                    Periksa Lagi
                  </button>
                  <button
                    onClick={() => handleFinishExam(false)}
                    className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-bold text-slate-950 hover:brightness-110 transition cursor-pointer"
                  >
                    Ya, Kumpulkan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Exam Topbar */}
          <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900/95 backdrop-blur px-4 sm:px-6 py-3">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-extrabold text-sm sm:text-base text-white">
                  SMART EXAM <span className="text-cyan-400">INFORMATIKA IX</span>
                </div>
                <div className="text-xs text-slate-400">
                  {user?.name} · Kelas {user?.class_name}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {violations > 0 && (
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 text-xs font-semibold text-rose-400">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Peringatan: {violations}/{settings.warning_limit}
                  </span>
                )}

                <div
                  className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 font-mono text-sm font-bold ${
                    remaining < 300
                      ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 animate-pulse'
                      : 'bg-slate-950 border-slate-800 text-cyan-400'
                  }`}
                >
                  <Clock3 className="h-4 w-4" />
                  <span>{formatTimer(remaining)}</span>
                </div>

                <button
                  onClick={() => setConfirmSubmitModal(true)}
                  className="rounded-xl bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 hover:bg-emerald-400 transition cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          </header>

          {/* Main Exam Content Grid */}
          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Question Card */}
            <section className="lg:col-span-8 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-xl bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-300">
                    Soal No. {currentIndex + 1} / {QUESTIONS_BANK.length}
                  </span>
                  <span className="rounded-xl bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                    {currentQuestion.type === 'PG' && 'Pilihan Ganda'}
                    {currentQuestion.type === 'PGK' && 'Pilihan Ganda Kompleks (Pilih > 1)'}
                    {currentQuestion.type === 'BS' && 'Benar / Salah'}
                  </span>
                  <span className="rounded-xl bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 text-xs font-mono text-indigo-300">
                    {currentQuestion.tp}
                  </span>
                </div>

                <button
                  onClick={() => toggleMarkQuestion(currentQuestion.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold border transition cursor-pointer ${
                    marked.includes(currentQuestion.id)
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Flag className="h-3.5 w-3.5" />
                  {marked.includes(currentQuestion.id) ? 'Ditandai Ragu' : 'Tandai Ragu'}
                </button>
              </div>

              {/* Question Prompt */}
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium">
                {currentQuestion.text}
              </p>

              {/* Answer Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.type === 'PG' &&
                  currentQuestion.options.map((opt, idx) => {
                    const selected = answers[currentQuestion.id] === idx;
                    const letter = String.fromCharCode(65 + idx);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(currentQuestion.id, idx, 'PG')}
                        className={`w-full text-left flex items-start gap-3.5 rounded-2xl border p-4 transition cursor-pointer ${
                          selected
                            ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                        }`}
                      >
                        <span
                          className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                            selected
                              ? 'bg-cyan-400 text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm sm:text-base pt-0.5">{opt}</span>
                      </button>
                    );
                  })}

                {currentQuestion.type === 'PGK' &&
                  currentQuestion.options.map((opt, idx) => {
                    const selectedArr = Array.isArray(answers[currentQuestion.id])
                      ? answers[currentQuestion.id]
                      : [];
                    const selected = selectedArr.includes(idx);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(currentQuestion.id, idx, 'PGK')}
                        className={`w-full text-left flex items-start gap-3.5 rounded-2xl border p-4 transition cursor-pointer ${
                          selected
                            ? 'bg-cyan-500/15 border-cyan-400 text-white'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                        }`}
                      >
                        <span className="pt-0.5 text-cyan-400 shrink-0">
                          {selected ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-slate-500" />}
                        </span>
                        <span className="text-sm sm:text-base">{opt}</span>
                      </button>
                    );
                  })}

                {currentQuestion.type === 'BS' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {[
                      { label: 'BENAR', val: true },
                      { label: 'SALAH', val: false }
                    ].map((choice) => {
                      const selected = answers[currentQuestion.id] === choice.val;
                      return (
                        <button
                          key={choice.label}
                          onClick={() => handleSelectAnswer(currentQuestion.id, choice.val, 'BS')}
                          className={`flex items-center justify-center gap-3 rounded-2xl border p-5 font-bold text-base transition cursor-pointer ${
                            selected
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/10'
                              : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <CheckCircle2 className={`h-5 w-5 ${selected ? 'text-cyan-400' : 'text-slate-600'}`} />
                          <span>{choice.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Prev / Next Controls */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Sebelumnya
                </button>

                {currentIndex < QUESTIONS_BANK.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((i) => Math.min(QUESTIONS_BANK.length - 1, i + 1))}
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition cursor-pointer"
                  >
                    Selanjutnya
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmSubmitModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition cursor-pointer"
                  >
                    Kumpulkan Ujian
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </section>

            {/* Right: Question Navigation Grid */}
            <aside className="lg:col-span-4 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-sm text-white">Navigasi Nomor Soal</h2>
                <span className="text-xs font-medium text-cyan-400">
                  {answeredCount}/{QUESTIONS_BANK.length} Dijawab
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2">
                {QUESTIONS_BANK.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isMarked = marked.includes(q.id);
                  const isCurrent = idx === currentIndex;

                  let btnClass = 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600';
                  if (isMarked) {
                    btnClass = 'bg-amber-500/20 border-amber-500/60 text-amber-300';
                  } else if (isAnswered) {
                    btnClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-10 rounded-xl border text-xs font-bold transition cursor-pointer ${btnClass} ${
                        isCurrent ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-emerald-500/30 border border-emerald-500" />
                  <span>Sudah Dijawab</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-amber-500/30 border border-amber-500" />
                  <span>Ragu-ragu</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-slate-950 border border-slate-700" />
                  <span>Belum Dijawab</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded ring-2 ring-cyan-400" />
                  <span>Soal Aktif</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* ==================== 5. STUDENT EXAM RESULT ==================== */}
      {page === 'result' && latestResult && (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
          <div className="max-w-lg w-full rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center space-y-6 shadow-2xl">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="h-9 w-9" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
                Ujian Telah Diselesaikan
              </div>
              <h1 className="text-2xl font-extrabold text-white">{latestResult.student_name}</h1>
              <p className="text-sm text-slate-400">
                Kelas {latestResult.class_name} · {SCHOOL}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 space-y-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider">Nilai Akhir Asesmen</div>
              <div
                className={`text-5xl font-black ${
                  latestResult.score >= settings.kktp ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {latestResult.score}
              </div>
              <div className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300">
                {latestResult.score >= settings.kktp
                  ? `Tuntas (KKTP ≥ ${settings.kktp})`
                  : `Perlu Pengayaan (KKTP ${settings.kktp})`}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3">
                <div className="text-slate-400">Jawaban Benar</div>
                <div className="text-base font-bold text-white mt-0.5">
                  {latestResult.correct} / {latestResult.total}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3">
                <div className="text-slate-400">Peringatan</div>
                <div className="text-base font-bold text-amber-400 mt-0.5">{latestResult.violations}x</div>
              </div>
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3">
                <div className="text-slate-400">Status</div>
                <div className="text-base font-bold text-cyan-400 mt-0.5">Tercatat</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-slate-800 py-3.5 text-sm font-semibold text-white hover:bg-slate-700 transition cursor-pointer"
              >
                Kembali ke Halaman Utama
              </button>
              <button
                onClick={() => handleQuickDemoLogin('teacher')}
                className="flex-1 rounded-xl bg-cyan-500 py-3.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition cursor-pointer"
              >
                Lihat di Dashboard Guru →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 6. TEACHER DASHBOARD ==================== */}
      {page === 'dashboard' && (
        <div className="min-h-screen flex flex-col bg-slate-950">
          {/* Top Navbar */}
          <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-extrabold text-white">
                    PANEL GURU · <span className="text-cyan-400">SMART EXAM</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {TEACHER} · {SCHOOL}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={exportCSV}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 px-4 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 transition cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  Unduh Rekap CSV
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Keluar
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
            {/* Summary Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                <div className="text-xs text-slate-400">Total Peserta Selesai</div>
                <div className="text-2xl font-extrabold text-white mt-1">{results.length} Siswa</div>
              </div>
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                <div className="text-xs text-slate-400">Rata-rata Nilai</div>
                <div className="text-2xl font-extrabold text-cyan-400 mt-1">{stats.avg}</div>
              </div>
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                <div className="text-xs text-slate-400">Nilai Tertinggi</div>
                <div className="text-2xl font-extrabold text-emerald-400 mt-1">{stats.highest}</div>
              </div>
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                <div className="text-xs text-slate-400">Ketuntasan (KKTP ≥ {settings.kktp})</div>
                <div className="text-2xl font-extrabold text-indigo-400 mt-1">
                  {stats.passed} / {results.length}
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setDashboardTab('rekap')}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                  dashboardTab === 'rekap'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Rekap Nilai Siswa
              </button>
              <button
                onClick={() => setDashboardTab('soal')}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                  dashboardTab === 'soal'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Eye className="h-4 w-4" />
                Bank Soal & Kunci (30)
              </button>
              <button
                onClick={() => setDashboardTab('pengaturan')}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                  dashboardTab === 'pengaturan'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Settings className="h-4 w-4" />
                Pengaturan Ujian
              </button>
            </div>

            {/* TAB 1: REKAP NILAI */}
            {dashboardTab === 'rekap' && (
              <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/60 text-xs uppercase text-slate-400">
                        <th className="py-4 px-5">Nama Peserta</th>
                        <th className="py-4 px-5">Kelas</th>
                        <th className="py-4 px-5">Benar</th>
                        <th className="py-4 px-5">Nilai</th>
                        <th className="py-4 px-5">Status</th>
                        <th className="py-4 px-5">Peringatan</th>
                        <th className="py-4 px-5">Waktu Submit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70 text-sm">
                      {results.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-3.5 px-5 font-semibold text-white">{r.student_name}</td>
                          <td className="py-3.5 px-5 text-slate-300">{r.class_name}</td>
                          <td className="py-3.5 px-5 text-slate-300">
                            {r.correct}/{r.total}
                          </td>
                          <td className="py-3.5 px-5 font-extrabold text-cyan-400">{r.score}</td>
                          <td className="py-3.5 px-5">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                r.score >= settings.kktp
                                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {r.score >= settings.kktp ? 'Tuntas' : 'Remedial'}
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            <span
                              className={`text-xs font-medium ${
                                r.violations > 0 ? 'text-rose-400' : 'text-slate-400'
                              }`}
                            >
                              {r.violations}x
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-xs text-slate-400">{r.submitted_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: BANK SOAL */}
            {dashboardTab === 'soal' && (
              <div className="space-y-4">
                {QUESTIONS_BANK.map((q) => (
                  <div key={q.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-cyan-400">#{q.id}</span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">{q.type}</span>
                      <span className="rounded bg-indigo-500/15 px-2 py-0.5 text-indigo-300">{q.tp}</span>
                    </div>
                    <p className="text-sm text-slate-200 font-medium">{q.text}</p>
                    {q.type === 'BS' ? (
                      <div className="text-xs font-semibold text-emerald-400">
                        Kunci Jawaban: {q.answer ? 'BENAR' : 'SALAH'}
                      </div>
                    ) : (
                      <ul className="space-y-1 text-xs">
                        {q.options.map((opt, idx) => {
                          const isCorrect = Array.isArray(q.answer)
                            ? q.answer.includes(idx)
                            : q.answer === idx;
                          return (
                            <li
                              key={idx}
                              className={`px-3 py-1.5 rounded-lg ${
                                isCorrect
                                  ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30'
                                  : 'text-slate-400'
                              }`}
                            >
                              {String.fromCharCode(65 + idx)}. {opt} {isCorrect && '✓'}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: PENGATURAN */}
            {dashboardTab === 'pengaturan' && (
              <div className="max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5">
                <h2 className="text-lg font-bold text-white">Konfigurasi Pelaksanaan Ujian</h2>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Durasi Ujian (Menit)</label>
                  <input
                    type="number"
                    min={10}
                    max={180}
                    value={settings.duration_minutes}
                    onChange={(e) =>
                      setSettings({ ...settings, duration_minutes: Number(e.target.value) || 90 })
                    }
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={settings.kktp}
                    onChange={(e) => setSettings({ ...settings, kktp: Number(e.target.value) || 75 })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Batas Toleransi Pelanggaran Tab</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={settings.warning_limit}
                    onChange={(e) =>
                      setSettings({ ...settings, warning_limit: Number(e.target.value) || 3 })
                    }
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-sm font-semibold text-white">Status Akses Ujian</div>
                    <div className="text-xs text-slate-400">Izinkan siswa memulai sesi ujian baru</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, exam_active: !settings.exam_active })}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                      settings.exam_active
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {settings.exam_active ? 'AKTIF' : 'NONAKTIF'}
                  </button>
                </div>

                <button
                  onClick={() => showToast('Pengaturan ujian berhasil disimpan.')}
                  className="w-full rounded-xl bg-cyan-500 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition cursor-pointer"
                >
                  Simpan Pengaturan
                </button>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}