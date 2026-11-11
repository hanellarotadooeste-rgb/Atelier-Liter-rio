import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Plus, Sparkles, Calendar, Star, BarChart3, Image as ImageIcon, 
  Trash2, Edit3, Download, Heart, BookMarked, Sticker, Sliders, Type, Layout, RefreshCw, Palette
} from 'lucide-react';

// --- APP PALETTES / SCHEMES ---
const APP_COLOR_SCHEMES = [
  {
    id: 'terracotta',
    name: 'Atelier Terracota',
    sidebarBg: '#F4EFEA',
    mainBg: '#FAF8F5',
    accent: '#8C4A3E',
    accentHover: '#723B31',
    text: '#2C2A29',
    mutedText: '#7D7571',
    border: '#E8DFD8',
    cardBg: '#FFFFFF'
  },
  {
    id: 'rosegold',
    name: 'Rose Gold & Latte',
    sidebarBg: '#F7EBEB',
    mainBg: '#FAF5F5',
    accent: '#B86B77',
    accentHover: '#9C5460',
    text: '#362226',
    mutedText: '#876D72',
    border: '#EAD5D7',
    cardBg: '#FFFFFF'
  },
  {
    id: 'sage',
    name: 'Sage & Linen',
    sidebarBg: '#EFEFEA',
    mainBg: '#F6F6F2',
    accent: '#5E7059',
    accentHover: '#4B5A47',
    text: '#262D24',
    mutedText: '#707A6D',
    border: '#DBE0D7',
    cardBg: '#FFFFFF'
  },
  {
    id: 'dark_academia',
    name: 'Dark Academia',
    sidebarBg: '#1C1917',
    mainBg: '#262320',
    accent: '#C68B59',
    accentHover: '#B07848',
    text: '#EFEBE7',
    mutedText: '#A8A099',
    border: '#3D3834',
    cardBg: '#2C2825'
  },
  {
    id: 'matcha',
    name: 'Matcha & Vanilla',
    sidebarBg: '#F2F5ED',
    mainBg: '#FAFBF7',
    accent: '#738A58',
    accentHover: '#5C7044',
    text: '#242B1C',
    mutedText: '#76826B',
    border: '#DCEDB',
    cardBg: '#FFFFFF'
  },
  {
    id: 'lavender',
    name: 'Lavender Dream',
    sidebarBg: '#F1EFF7',
    mainBg: '#F8F7FC',
    accent: '#7B68EE',
    accentHover: '#6554D4',
    text: '#27233D',
    mutedText: '#787394',
    border: '#DFDAF0',
    cardBg: '#FFFFFF'
  }
];

// --- INITIAL MOCK DATA ---
const INITIAL_BOOKS = [
  {
    id: '1',
    title: 'A Paciente Silenciosa',
    author: 'Alex Michaelides',
    genre: 'Thriller',
    pages: 350,
    startDate: '2026-03-01',
    endDate: '2026-03-08',
    rating: 5,
    status: 'Lido',
    monthRead: '2026-03',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
    review: 'Um suspense psicológico impactante com um plot twist inesquecível no final. A narrativa te prende do início ao fim.',
    quotes: ['A arte fala quando as palavras falham.', 'Todos nós somos um pouco loucos de formas que escondemos do mundo.']
  },
  {
    id: '2',
    title: 'Os Sete Maridos de Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    genre: 'Ficção Contemporânea',
    pages: 360,
    startDate: '2026-03-10',
    endDate: '2026-03-18',
    rating: 5,
    status: 'Lido',
    monthRead: '2026-03',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    review: 'Uma história emocionante sobre ambição, amor verdadeiro e os custos da fama na Era de Ouro de Hollywood.',
    quotes: ['Eles são apenas maridos. Eu sou Evelyn Hugo.', 'Quando a vida lhe der uma oportunidade, agarre com força.']
  },
  {
    id: '3',
    title: 'Tudo O Que Sei Sobre O Amor',
    author: 'Dolly Alderton',
    genre: 'Memórias / Biografia',
    pages: 320,
    startDate: '2026-03-20',
    endDate: '2026-03-27',
    rating: 4,
    status: 'Lido',
    monthRead: '2026-03',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600',
    review: 'Uma ode às amizades femininas e às confusões dos 20 e poucos anos. Divertido e profundamente confortador.',
    quotes: ['As amizades femininas são os grandes romances da minha vida.']
  },
  {
    id: '4',
    title: 'Corte de Espinhos e Rosas',
    author: 'Sarah J. Maas',
    genre: 'Fantasia',
    pages: 432,
    startDate: '2026-03-28',
    endDate: '2026-03-31',
    rating: 5,
    status: 'Lido',
    monthRead: '2026-03',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600',
    review: 'Universo envolvente com personagens inesquecíveis e um romance eletrizante.',
    quotes: ['Não declare guerra contra mim, realeza feérica.', 'Pelas estrelas que escutam e pelos sonhos que são respondidos.']
  }
];

const INITIAL_MONTHLY_CLOSURES = {
  '2026-03': {
    top1Id: '2',
    favoritesIds: ['1', '2', '4'],
    readingGoal: 4,
    personalNotes: 'Um mês com ótimas leituras e finais de semana ensolarados no café!',
    quotes: [
      'Eles são apenas maridos. Eu sou Evelyn Hugo.',
      'A arte fala quando as palavras falham.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=600'
    ]
  }
};

const DUMP_THEMES = [
  { id: 'scrapbook_aesthetic', name: 'Aesthetic Pinterest Dump', bg: '#EAE5D9', cardBg: '#FFFDF9', text: '#1E1B18', accent: '#D9534F', font: 'font-sans' },
  { id: 'pinterest', name: 'Pinterest Editorial', bg: '#F9F6F0', cardBg: '#FFFFFF', text: '#2C2A29', accent: '#8C4A3E', font: 'font-serif' },
  { id: 'clean', name: 'Clean Minimalista', bg: '#FFFFFF', cardBg: '#FAFAFA', text: '#18181B', accent: '#52525B', font: 'font-sans' },
  { id: 'scrapbook', name: 'Scrapbook Cutout', bg: '#F4EFEA', cardBg: '#FFFDF9', text: '#3D352E', accent: '#A0522D', font: 'font-mono' },
  { id: 'dark_academia', name: 'Dark Academia', bg: '#1A1817', cardBg: '#2A2624', text: '#E8E2D9', accent: '#D4A373', font: 'font-serif' },
  { id: 'lifestyle', name: 'Instagram Lifestyle', bg: '#F5F5F7', cardBg: '#FFFFFF', text: '#1D1D1F', accent: '#E07A5F', font: 'font-sans' },
  { id: 'journal', name: 'Literary Journal', bg: '#FAF4E8', cardBg: '#FFFFFF', text: '#2B2D42', accent: '#6B705C', font: 'font-serif' }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedMonth, setSelectedMonth] = useState('2026-03');
  
  // App Color Theme State
  const [appThemeId, setAppThemeId] = useState(() => {
    try {
      return localStorage.getItem('literary_app_theme') || 'terracotta';
    } catch (e) {
      return 'terracotta';
    }
  });

  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem('literary_journal_books');
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch (e) {
      return INITIAL_BOOKS;
    }
  });

  const [closures, setClosures] = useState(() => {
    try {
      const saved = localStorage.getItem('literary_journal_closures');
      return saved ? JSON.parse(saved) : INITIAL_MONTHLY_CLOSURES;
    } catch (e) {
      return INITIAL_MONTHLY_CLOSURES;
    }
  });

  // Photo Dump Design State
  const [dumpTheme, setDumpTheme] = useState('scrapbook_aesthetic');
  const [dumpRatio, setDumpRatio] = useState('4:5');
  const [dumpPageIndex, setDumpPageIndex] = useState(0);
  const [customTitle, setCustomTitle] = useState('minhas obsessões recentes');
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');
  
  // Pinterest / Scrapbook Cutout Features
  const [showStickerBorder, setShowStickerBorder] = useState(true);
  const [stickerBorderWidth, setStickerBorderWidth] = useState(5);
  const [showImessagePopup, setShowImessagePopup] = useState(true);
  const [imessageText, setImessageText] = useState('tudo que não tem saído da minha mente ☕✨📚');
  const [showStarsOverlay, setShowStarsOverlay] = useState(true);
  const [labelStyleText, setLabelStyleText] = useState(true);
  const [stickerRotation, setStickerRotation] = useState(true);

  // Modals & Editing
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    localStorage.setItem('literary_app_theme', appThemeId);
  }, [appThemeId]);

  useEffect(() => {
    localStorage.setItem('literary_journal_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('literary_journal_closures', JSON.stringify(closures));
  }, [closures]);

  const currentAppScheme = APP_COLOR_SCHEMES.find(s => s.id === appThemeId) || APP_COLOR_SCHEMES[0];

  const currentMonthBooks = books.filter(b => b.monthRead === selectedMonth && b.status === 'Lido');
  const currentClosure = closures[selectedMonth] || {
    top1Id: null,
    favoritesIds: [],
    readingGoal: 4,
    personalNotes: '',
    quotes: [],
    photos: []
  };

  const totalPagesMonth = currentMonthBooks.reduce((sum, b) => sum + (Number(b.pages) || 0), 0);
  const top1Book = books.find(b => b.id === currentClosure.top1Id) || currentMonthBooks[0];

  const handleSaveBook = (bookData) => {
    if (editingBook) {
      setBooks(books.map(b => b.id === editingBook.id ? { ...bookData, id: editingBook.id } : b));
    } else {
      setBooks([...books, { ...bookData, id: Date.now().toString() }]);
    }
    setIsBookModalOpen(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este livro da biblioteca?')) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  const getMonthName = (monthStr) => {
    if (!monthStr) return '';
    const [year, month] = monthStr.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const navItems = [
    { id: 'home', label: 'Meu Mês Literário', Icon: Calendar },
    { id: 'library', label: 'Biblioteca Pessoal', Icon: BookMarked },
    { id: 'closure', label: 'Fechamento Mensal', Icon: Heart },
    { id: 'photodump', label: 'Gerador Photo Dump', Icon: Sparkles },
    { id: 'stats', label: 'Estatísticas & Meta', Icon: BarChart3 }
  ];

  return (
    <div 
      className="min-h-screen font-sans antialiased flex flex-col md:flex-row transition-colors duration-300"
      style={{ backgroundColor: currentAppScheme.mainBg, color: currentAppScheme.text }}
    >
      {/* Sidebar Navigation */}
      <aside 
        className="w-full md:w-64 border-r p-6 flex flex-col justify-between shrink-0 transition-colors duration-300"
        style={{ backgroundColor: currentAppScheme.sidebarBg, borderColor: currentAppScheme.border }}
      >
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md text-white transition-colors duration-300"
              style={{ backgroundColor: currentAppScheme.accent }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-tight">Atelier Literário</h1>
              <p 
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: currentAppScheme.accent }}
              >
                Diário & Photo Dump
              </p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const NavIcon = item.Icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                    isActive ? 'shadow-sm font-semibold text-white' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? currentAppScheme.accent : 'transparent',
                    color: isActive ? '#FFFFFF' : currentAppScheme.mutedText
                  }}
                >
                  <NavIcon className="w-4 h-4" style={{ color: isActive ? '#FFFFFF' : currentAppScheme.accent }} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 space-y-6 pt-6 border-t" style={{ borderColor: currentAppScheme.border }}>
          {/* Seletor de Cores do App */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-2 flex items-center space-x-1" style={{ color: currentAppScheme.accent }}>
              <Palette className="w-3.5 h-3.5" />
              <span>Tema do Aplicativo</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {APP_COLOR_SCHEMES.map(scheme => (
                <button
                  key={scheme.id}
                  onClick={() => setAppThemeId(scheme.id)}
                  title={scheme.name}
                  className={`h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                    appThemeId === scheme.id ? 'scale-105 shadow-md' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ 
                    backgroundColor: scheme.sidebarBg, 
                    borderColor: appThemeId === scheme.id ? currentAppScheme.accent : scheme.border 
                  }}
                >
                  <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: scheme.accent }}></div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: currentAppScheme.accent }}>
              Mês Selecionado
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: currentAppScheme.cardBg, 
                borderColor: currentAppScheme.border,
                color: currentAppScheme.text 
              }}
            />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl">
        {currentTab === 'home' && (
          <HomeView 
            appScheme={currentAppScheme}
            selectedMonth={selectedMonth} 
            setSelectedMonth={setSelectedMonth}
            monthBooks={currentMonthBooks} 
            closure={currentClosure} 
            top1Book={top1Book}
            totalPages={totalPagesMonth}
            onOpenAddBook={() => { setEditingBook(null); setIsBookModalOpen(true); }}
            onGoToDump={() => setCurrentTab('photodump')}
            getMonthName={getMonthName}
          />
        )}

        {currentTab === 'library' && (
          <LibraryView 
            appScheme={currentAppScheme}
            books={books} 
            onAddBook={() => { setEditingBook(null); setIsBookModalOpen(true); }}
            onEditBook={(book) => { setEditingBook(book); setIsBookModalOpen(true); }}
            onDeleteBook={handleDeleteBook}
          />
        )}

        {currentTab === 'closure' && (
          <ClosureView 
            appScheme={currentAppScheme}
            selectedMonth={selectedMonth} 
            books={books}
            closure={currentClosure}
            onSaveClosure={(updated) => {
              setClosures({ ...closures, [selectedMonth]: updated });
            }}
            getMonthName={getMonthName}
          />
        )}

        {currentTab === 'photodump' && (
          <PhotoDumpView 
            appScheme={currentAppScheme}
            selectedMonth={selectedMonth}
            monthBooks={currentMonthBooks}
            closure={currentClosure}
            top1Book={top1Book}
            theme={dumpTheme}
            setTheme={setDumpTheme}
            ratio={dumpRatio}
            setRatio={setDumpRatio}
            pageIndex={dumpPageIndex}
            setPageIndex={setDumpPageIndex}
            customTitle={customTitle}
            setCustomTitle={setCustomTitle}
            bgColor={bgColor}
            setBgColor={setBgColor}
            textColor={textColor}
            setTextColor={setTextColor}
            showStickerBorder={showStickerBorder}
            setShowStickerBorder={setShowStickerBorder}
            stickerBorderWidth={stickerBorderWidth}
            setStickerBorderWidth={setStickerBorderWidth}
            showImessagePopup={showImessagePopup}
            setShowImessagePopup={setShowImessagePopup}
            imessageText={imessageText}
            setImessageText={setImessageText}
            showStarsOverlay={showStarsOverlay}
            setShowStarsOverlay={setShowStarsOverlay}
            labelStyleText={labelStyleText}
            setLabelStyleText={setLabelStyleText}
            stickerRotation={stickerRotation}
            setStickerRotation={setStickerRotation}
            getMonthName={getMonthName}
          />
        )}

        {currentTab === 'stats' && (
          <StatsView appScheme={currentAppScheme} books={books} getMonthName={getMonthName} />
        )}
      </main>

      {/* Book Form Modal */}
      {isBookModalOpen && (
        <BookFormModal 
          appScheme={currentAppScheme}
          editingBook={editingBook} 
          selectedMonth={selectedMonth}
          onClose={() => setIsBookModalOpen(false)}
          onSave={handleSaveBook}
        />
      )}
    </div>
  );
}

// ==========================================
// 1. HOME VIEW
// ==========================================
function HomeView({ appScheme, selectedMonth, setSelectedMonth, monthBooks, closure, top1Book, totalPages, onOpenAddBook, onGoToDump, getMonthName }) {
  const goalProgress = Math.min(100, Math.round((monthBooks.length / (closure.readingGoal || 4)) * 100));

  return (
    <div className="space-y-8 animate-fade-in">
      <div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 rounded-2xl border shadow-sm transition-colors"
        style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}
      >
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: appScheme.accent }}>Resumo Pessoal</span>
          <h2 className="text-3xl font-serif font-bold capitalize">{getMonthName(selectedMonth)}</h2>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={onOpenAddBook}
            className="flex items-center space-x-2 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm"
            style={{ backgroundColor: appScheme.accent }}
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Leitura</span>
          </button>
          <button 
            onClick={onGoToDump}
            className="flex items-center space-x-2 border px-4 py-2.5 rounded-xl text-sm font-medium transition"
            style={{ backgroundColor: appScheme.sidebarBg, borderColor: appScheme.border, color: appScheme.accent }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Gerar Photo Dump</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: appScheme.mutedText }}>Livros Lidos</span>
            <BookOpen className="w-4 h-4" style={{ color: appScheme.accent }} />
          </div>
          <div className="text-3xl font-serif font-bold">{monthBooks.length}</div>
          <p className="text-xs mt-1" style={{ color: appScheme.mutedText }}>Concluídos este mês</p>
        </div>

        <div className="p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: appScheme.mutedText }}>Páginas Lidas</span>
            <BookMarked className="w-4 h-4" style={{ color: appScheme.accent }} />
          </div>
          <div className="text-3xl font-serif font-bold">{totalPages}</div>
          <p className="text-xs mt-1" style={{ color: appScheme.mutedText }}>Total acumulado</p>
        </div>

        <div className="p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: appScheme.mutedText }}>Meta Mensal</span>
            <span className="text-xs font-bold" style={{ color: appScheme.accent }}>{goalProgress}%</span>
          </div>
          <div className="text-3xl font-serif font-bold">{monthBooks.length} / {closure.readingGoal || 4}</div>
          <div className="w-full h-2 rounded-full mt-3 overflow-hidden" style={{ backgroundColor: appScheme.sidebarBg }}>
            <div className="h-full transition-all duration-500" style={{ width: `${goalProgress}%`, backgroundColor: appScheme.accent }}></div>
          </div>
        </div>
      </div>

      {/* Top 1 Favorite Highlight */}
      {top1Book && (
        <div 
          className="p-6 rounded-2xl border flex flex-col md:flex-row items-center gap-6 shadow-sm"
          style={{ backgroundColor: appScheme.sidebarBg, borderColor: appScheme.border }}
        >
          <div className="w-32 h-48 rounded-xl overflow-hidden shadow-md shrink-0 border-2 border-white">
            <img src={top1Book.cover} alt={top1Book.title} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-2 flex-1">
            <span className="inline-block text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: appScheme.accent }}>
              ★ Grande Favorito do Mês (Top 1)
            </span>
            <h3 className="text-2xl font-serif font-bold">{top1Book.title}</h3>
            <p className="text-sm font-medium" style={{ color: appScheme.mutedText }}>{top1Book.author}</p>
            {top1Book.review && (
              <p className="text-sm italic pl-3 py-1 border-l-2" style={{ borderColor: appScheme.accent, color: appScheme.text }}>
                "{top1Book.review}"
              </p>
            )}
          </div>
        </div>
      )}

      {/* Books Gallery */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif font-bold">Galeria de Leituras do Mês</h3>
        {monthBooks.length === 0 ? (
          <div className="p-8 rounded-2xl text-center border border-dashed space-y-3" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
            <BookOpen className="w-8 h-8 mx-auto opacity-40" style={{ color: appScheme.accent }} />
            <p className="text-sm" style={{ color: appScheme.mutedText }}>Nenhum livro cadastrado como lido para este mês.</p>
            <button 
              onClick={onOpenAddBook}
              className="text-xs text-white px-3 py-1.5 rounded-lg inline-block font-medium"
              style={{ backgroundColor: appScheme.accent }}
            >
              Adicionar Primeiro Livro
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {monthBooks.map(book => (
              <div key={book.id} className="p-3 rounded-2xl border shadow-sm hover:shadow-md transition group" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
                <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3 relative">
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute top-2 right-2 bg-black/60 text-yellow-400 text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    <span>{book.rating}</span>
                  </div>
                </div>
                <h4 className="font-serif font-bold text-sm truncate">{book.title}</h4>
                <p className="text-xs truncate" style={{ color: appScheme.mutedText }}>{book.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. LIBRARY VIEW
// ==========================================
function LibraryView({ appScheme, books, onAddBook, onEditBook, onDeleteBook }) {
  const [filterStatus, setFilterStatus] = useState('Todos');

  const filteredBooks = filterStatus === 'Todos' 
    ? books 
    : books.filter(b => b.status === filterStatus);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: appScheme.accent }}>Acervo Pessoal</span>
          <h2 className="text-3xl font-serif font-bold">Biblioteca Pessoal</h2>
        </div>
        <button 
          onClick={onAddBook}
          className="flex items-center space-x-2 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-sm"
          style={{ backgroundColor: appScheme.accent }}
        >
          <Plus className="w-4 h-4" />
          <span>Novo Livro</span>
        </button>
      </div>

      <div className="flex space-x-2 border-b pb-2 overflow-x-auto" style={{ borderColor: appScheme.border }}>
        {['Todos', 'Lido', 'Lendo', 'Quero ler', 'Abandonado'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition`}
            style={{
              backgroundColor: filterStatus === status ? appScheme.accent : 'transparent',
              color: filterStatus === status ? '#FFFFFF' : appScheme.mutedText
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <div key={book.id} className="p-4 rounded-2xl border shadow-sm flex space-x-4" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
            <div className="w-24 aspect-[2/3] rounded-xl overflow-hidden shrink-0 shadow">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-block mb-1" style={{ backgroundColor: appScheme.sidebarBg, color: appScheme.accent }}>
                  {book.status}
                </span>
                <h4 className="font-serif font-bold text-base leading-snug">{book.title}</h4>
                <p className="text-xs" style={{ color: appScheme.mutedText }}>{book.author}</p>
                <p className="text-[11px] opacity-75 mt-1">{book.genre || 'Sem gênero'} • {book.pages} págs</p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: appScheme.border }}>
                <div className="flex items-center text-amber-400 text-xs space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < book.rating ? 'fill-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <div className="flex space-x-1">
                  <button onClick={() => onEditBook(book)} className="p-1.5 opacity-70 hover:opacity-100 rounded">
                    <Edit3 className="w-3.5 h-3.5" style={{ color: appScheme.accent }} />
                  </button>
                  <button onClick={() => onDeleteBook(book.id)} className="p-1.5 text-red-500 rounded">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. CLOSURE VIEW
// ==========================================
function ClosureView({ appScheme, selectedMonth, books, closure, onSaveClosure, getMonthName }) {
  const monthReadBooks = books.filter(b => b.monthRead === selectedMonth && b.status === 'Lido');
  const [top1, setTop1] = useState(closure.top1Id || '');
  const [notes, setNotes] = useState(closure.personalNotes || '');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photosList, setPhotosList] = useState(closure.photos || []);

  const handleAddPhoto = () => {
    if (photoUrl.trim()) {
      const updated = [...photosList, photoUrl.trim()];
      setPhotosList(updated);
      setPhotoUrl('');
      onSaveClosure({ ...closure, photos: updated, top1Id: top1, personalNotes: notes });
    }
  };

  const handleSave = () => {
    onSaveClosure({
      ...closure,
      top1Id: top1,
      personalNotes: notes,
      photos: photosList
    });
    alert('Fechamento mensal salvo com sucesso!');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: appScheme.accent }}>Registro & Memórias</span>
          <h2 className="text-3xl font-serif font-bold">Fechamento Mensal ({getMonthName(selectedMonth)})</h2>
        </div>
        <button 
          onClick={handleSave}
          className="text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-sm"
          style={{ backgroundColor: appScheme.accent }}
        >
          Salvar Fechamento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl border shadow-sm space-y-6" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
          <h3 className="font-serif text-lg font-bold">Seleção de Livros Destaque</h3>

          <div>
            <label className="block text-xs uppercase font-bold tracking-wider mb-2" style={{ color: appScheme.accent }}>
              Escolher Top 1 Favorito do Mês
            </label>
            <select 
              value={top1} 
              onChange={(e) => setTop1(e.target.value)}
              className="w-full border rounded-xl p-3 text-sm"
              style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
            >
              <option value="">Selecione um livro...</option>
              {monthReadBooks.map(b => (
                <option key={b.id} value={b.id}>{b.title} — {b.author}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold tracking-wider mb-2" style={{ color: appScheme.accent }}>
              Notas & Impressões do Mês
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Como foi seu mês de leitura? Descreva a vibe, momentos marcantes..."
              className="w-full border rounded-xl p-3 text-sm resize-none"
              style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl border shadow-sm space-y-6" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
          <h3 className="font-serif text-lg font-bold">Fotos do Mês (Café, Livros, Vibes)</h3>
          
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Cole a URL da imagem..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="flex-1 border rounded-xl px-3 py-2 text-sm"
              style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
            />
            <button 
              onClick={handleAddPhoto}
              className="text-white px-4 py-2 rounded-xl text-xs font-semibold"
              style={{ backgroundColor: appScheme.accent }}
            >
              Adicionar
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {photosList.map((url, idx) => (
              <div key={idx} className="aspect-square rounded-xl overflow-hidden relative group">
                <img src={url} alt="Foto Mensal" className="w-full h-full object-cover" />
                <button 
                  onClick={() => {
                    const filtered = photosList.filter((_, i) => i !== idx);
                    setPhotosList(filtered);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. PHOTO DUMP GENERATOR & CANVAS EDITOR
// ==========================================
function PhotoDumpView({ 
  appScheme,
  selectedMonth, monthBooks, closure, top1Book, 
  theme, setTheme, ratio, setRatio, pageIndex, setPageIndex, 
  customTitle, setCustomTitle, bgColor, setBgColor, textColor, setTextColor,
  showStickerBorder, setShowStickerBorder, stickerBorderWidth, setStickerBorderWidth,
  showImessagePopup, setShowImessagePopup, imessageText, setImessageText,
  showStarsOverlay, setShowStarsOverlay, labelStyleText, setLabelStyleText,
  stickerRotation, setStickerRotation,
  getMonthName 
}) {
  const canvasRef = useRef(null);
  const activeTheme = DUMP_THEMES.find(t => t.id === theme) || DUMP_THEMES[0];

  const handleExportImage = () => {
    if (!canvasRef.current) return;

    const element = canvasRef.current;
    const width = element.offsetWidth * 2;
    const height = element.offsetHeight * 2;

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="transform: scale(2); transform-origin: 0 0;">
            ${element.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `;

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const a = document.createElement('a');
      a.download = `PhotoDump_${selectedMonth}_Pagina_${pageIndex + 1}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const getRatioStyle = () => {
    if (ratio === '9:16') return 'aspect-[9/16] max-w-[360px]';
    if (ratio === '1:1') return 'aspect-square max-w-[440px]';
    return 'aspect-[4/5] max-w-[400px]';
  };

  const currentBg = bgColor || activeTheme.bg;
  const currentText = textColor || activeTheme.text;

  const getStickerStyle = (customAngle = 0) => {
    const baseStyle = showStickerBorder ? {
      border: `${stickerBorderWidth}px solid #FFFFFF`,
      boxShadow: '0 10px 25px rgba(0,0,0,0.18), 0 3px 8px rgba(0,0,0,0.12)',
      borderRadius: '16px'
    } : {
      borderRadius: '12px'
    };

    if (stickerRotation && customAngle !== 0) {
      return { ...baseStyle, transform: `rotate(${customAngle}deg)` };
    }
    return baseStyle;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: appScheme.accent }}>Editor de Photo Dump Aesthetic</span>
          <h2 className="text-3xl font-serif font-bold">Estilo Colagem & Canva</h2>
        </div>
        <button 
          onClick={handleExportImage}
          className="flex items-center space-x-2 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-md"
          style={{ backgroundColor: appScheme.accent }}
        >
          <Download className="w-4 h-4" />
          <span>Baixar Imagem High-Res</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Sidebar */}
        <div className="lg:col-span-4 p-6 rounded-2xl border shadow-sm space-y-6 max-h-[800px] overflow-y-auto" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
          <h3 className="font-serif text-lg font-bold">Personalização Visual</h3>
          
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider mb-2" style={{ color: appScheme.accent }}>Formato de Publicação</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Feed (4:5)', val: '4:5' },
                { label: 'Stories (9:16)', val: '9:16' },
                { label: 'Quadrado (1:1)', val: '1:1' }
              ].map(r => (
                <button
                  key={r.val}
                  onClick={() => setRatio(r.val)}
                  className={`py-2 px-1 text-xs rounded-lg border font-medium transition text-center`}
                  style={{
                    backgroundColor: ratio === r.val ? appScheme.sidebarBg : 'transparent',
                    borderColor: ratio === r.val ? appScheme.accent : appScheme.border,
                    color: ratio === r.val ? appScheme.accent : appScheme.mutedText
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold tracking-wider mb-2" style={{ color: appScheme.accent }}>Estilo & Tema Visual</label>
            <div className="space-y-2">
              {DUMP_THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition`}
                  style={{
                    backgroundColor: theme === t.id ? appScheme.sidebarBg : 'transparent',
                    borderColor: theme === t.id ? appScheme.accent : appScheme.border
                  }}
                >
                  <span>{t.name}</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: t.bg }}></div>
                    <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: t.accent }}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Efeitos de Colagem Pinterest / Canva */}
          <div className="space-y-3 pt-4 border-t" style={{ borderColor: appScheme.border }}>
            <h4 className="text-xs uppercase font-bold tracking-wider flex items-center space-x-1" style={{ color: appScheme.accent }}>
              <Sticker className="w-3.5 h-3.5" />
              <span>Adesivos & Efeitos Aesthetic</span>
            </h4>

            <div className="flex items-center justify-between py-1">
              <span className="text-xs font-medium">Contorno Branco (Efeito Adesivo)</span>
              <input 
                type="checkbox" 
                checked={showStickerBorder} 
                onChange={(e) => setShowStickerBorder(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
                style={{ accentColor: appScheme.accent }}
              />
            </div>

            {showStickerBorder && (
              <div>
                <label className="block text-[11px] mb-1" style={{ color: appScheme.mutedText }}>Espessura do Contorno ({stickerBorderWidth}px)</label>
                <input 
                  type="range" 
                  min="2" 
                  max="12" 
                  value={stickerBorderWidth} 
                  onChange={(e) => setStickerBorderWidth(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: appScheme.accent }}
                />
              </div>
            )}

            <div className="flex items-center justify-between py-1">
              <span className="text-xs font-medium">Rotação Casual dos Elementos</span>
              <input 
                type="checkbox" 
                checked={stickerRotation} 
                onChange={(e) => setStickerRotation(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
                style={{ accentColor: appScheme.accent }}
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-xs font-medium">Título Estilo Etiqueta Amarela</span>
              <input 
                type="checkbox" 
                checked={labelStyleText} 
                onChange={(e) => setLabelStyleText(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
                style={{ accentColor: appScheme.accent }}
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-xs font-medium">Brilhos & Estrelas (Overlay)</span>
              <input 
                type="checkbox" 
                checked={showStarsOverlay} 
                onChange={(e) => setShowStarsOverlay(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
                style={{ accentColor: appScheme.accent }}
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-xs font-medium">Caixa de Mensagem (iMessage)</span>
              <input 
                type="checkbox" 
                checked={showImessagePopup} 
                onChange={(e) => setShowImessagePopup(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
                style={{ accentColor: appScheme.accent }}
              />
            </div>

            {showImessagePopup && (
              <div>
                <label className="block text-[11px] mb-1" style={{ color: appScheme.mutedText }}>Texto do Popup</label>
                <input 
                  type="text"
                  value={imessageText}
                  onChange={(e) => setImessageText(e.target.value)}
                  className="w-full border rounded-lg px-3 py-1.5 text-xs"
                  style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase font-bold tracking-wider mb-2" style={{ color: appScheme.accent }}>Seletor de Página</label>
            <div className="grid grid-cols-3 gap-2">
              {['Pág 1: Colagem', 'Pág 2: Destaques', 'Pág 3: Mood'].map((pLabel, idx) => (
                <button
                  key={idx}
                  onClick={() => setPageIndex(idx)}
                  className={`py-2 text-xs rounded-lg border font-medium transition text-center`}
                  style={{
                    backgroundColor: pageIndex === idx ? appScheme.accent : 'transparent',
                    color: pageIndex === idx ? '#FFFFFF' : appScheme.mutedText,
                    borderColor: pageIndex === idx ? appScheme.accent : appScheme.border
                  }}
                >
                  Página {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t" style={{ borderColor: appScheme.border }}>
            <div>
              <label className="block text-xs mb-1" style={{ color: appScheme.mutedText }}>Título Personalizado</label>
              <input 
                type="text"
                placeholder={getMonthName(selectedMonth)}
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-1.5 text-xs"
                style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-xs mb-1" style={{ color: appScheme.mutedText }}>Cor do Fundo</label>
                <input 
                  type="color" 
                  value={currentBg}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-8 rounded border cursor-pointer"
                  style={{ borderColor: appScheme.border }}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1" style={{ color: appScheme.mutedText }}>Cor do Texto</label>
                <input 
                  type="color" 
                  value={currentText}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-8 rounded border cursor-pointer"
                  style={{ borderColor: appScheme.border }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Canvas Preview Area */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-6 rounded-2xl border min-h-[550px]" style={{ backgroundColor: appScheme.sidebarBg, borderColor: appScheme.border }}>
          <div 
            ref={canvasRef}
            className={`w-full ${getRatioStyle()} shadow-2xl rounded-sm p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${activeTheme.font}`}
            style={{ backgroundColor: currentBg, color: currentText }}
          >
            {/* Overlay Elements (Estrelas & Brilhos) */}
            {showStarsOverlay && (
              <>
                <span className="absolute top-5 left-6 text-amber-300 text-xl font-bold animate-pulse z-10 select-none">✦</span>
                <span className="absolute top-16 right-8 text-yellow-400 text-2xl font-bold z-10 select-none">★</span>
                <span className="absolute bottom-20 left-8 text-amber-200 text-lg z-10 select-none">✨</span>
                <span className="absolute top-1/2 right-5 text-yellow-300 text-xl z-10 select-none">✦</span>
              </>
            )}

            {/* PAGE 1: COLAGEM ESTILO CANVA / PINTEREST */}
            {pageIndex === 0 && (
              <div className="h-full flex flex-col justify-between space-y-4 relative z-0">
                <div className="text-center pt-2">
                  <span className="text-[9px] tracking-widest font-bold uppercase block mb-1 opacity-75" style={{ color: activeTheme.accent }}>
                    {getMonthName(selectedMonth)} • READS DUMP
                  </span>
                  
                  {labelStyleText ? (
                    <div className="inline-block bg-[#FEE440] text-black px-4 py-1.5 rounded-lg shadow-md font-bold text-xl md:text-2xl transform -rotate-2 border border-black/10">
                      {customTitle || 'minhas obsessões recentes'}
                    </div>
                  ) : (
                    <h2 className="text-2xl font-serif font-bold tracking-tight">
                      {customTitle || 'minhas obsessões recentes'}
                    </h2>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 my-auto relative">
                  {(closure.photos.length > 0 ? closure.photos : [
                    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600'
                  ]).slice(0, 2).map((photo, i) => (
                    <div 
                      key={i} 
                      className="aspect-square overflow-hidden transition duration-300"
                      style={getStickerStyle(i === 0 ? -4 : 3)}
                    >
                      <img src={photo} alt="Rotina" className="w-full h-full object-cover" />
                    </div>
                  ))}

                  {monthBooks.slice(0, 2).map((book, i) => (
                    <div 
                      key={book.id}
                      className={`aspect-[2/3] w-24 overflow-hidden absolute bottom-[-10px] ${i === 0 ? 'left-4' : 'right-4'} z-20`}
                      style={getStickerStyle(i === 0 ? 6 : -6)}
                    >
                      <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {showImessagePopup && (
                  <div className="mx-auto w-11/12 bg-white/95 backdrop-blur-md text-black rounded-2xl p-2.5 shadow-lg border border-gray-200 flex items-center space-x-2 z-30">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      +
                    </div>
                    <p className="text-[10px] font-medium leading-tight flex-1 text-gray-800">
                      {imessageText}
                    </p>
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] shrink-0">
                      ↑
                    </div>
                  </div>
                )}

                <div className="text-center pt-1">
                  <p className="text-[8px] uppercase tracking-widest font-semibold opacity-60">Atelier Literário • Aesthetic Dump</p>
                </div>
              </div>
            )}

            {/* PAGE 2: DESTAQUES DO MÊS */}
            {pageIndex === 1 && (
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-baseline border-b pb-2" style={{ borderColor: `${currentText}20` }}>
                  <span className="text-[10px] tracking-widest font-bold uppercase" style={{ color: activeTheme.accent }}>
                    Destaques & Favoritos
                  </span>
                  <span className="text-[10px] opacity-60">Página 2</span>
                </div>

                {top1Book ? (
                  <div className="my-auto space-y-4">
                    <div className="flex gap-4 items-center p-3 rounded-xl border" style={{ backgroundColor: activeTheme.cardBg, borderColor: `${currentText}15` }}>
                      <div className="w-24 aspect-[2/3] rounded overflow-hidden shrink-0" style={getStickerStyle(0)}>
                        <img src={top1Book.cover} alt={top1Book.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded text-white" style={{ backgroundColor: activeTheme.accent }}>Top 1 do Mês</span>
                        <h3 className="text-base font-serif font-bold leading-tight">{top1Book.title}</h3>
                        <p className="text-xs opacity-70">{top1Book.author}</p>
                        <div className="text-amber-500 text-xs">★ {top1Book.rating} / 5</div>
                      </div>
                    </div>

                    {top1Book.review && (
                      <div className="p-3 rounded-lg text-xs italic border-l-2" style={{ backgroundColor: activeTheme.cardBg, borderColor: activeTheme.accent }}>
                        "{top1Book.review}"
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-xs opacity-60">Nenhum livro selecionado como favorito.</div>
                )}

                <div className="text-center pt-2 border-t" style={{ borderColor: `${currentText}20` }}>
                  <p className="text-[9px] uppercase tracking-widest font-semibold opacity-60">Momento Leitura</p>
                </div>
              </div>
            )}

            {/* PAGE 3: MOOD & ROTINA */}
            {pageIndex === 2 && (
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-baseline border-b pb-2" style={{ borderColor: `${currentText}20` }}>
                  <span className="text-[10px] tracking-widest font-bold uppercase" style={{ color: activeTheme.accent }}>
                    Mood & Rotina
                  </span>
                  <span className="text-[10px] opacity-60">Página 3</span>
                </div>

                <div className="my-auto space-y-3">
                  <p className="text-xs font-serif italic text-center px-4">
                    "{closure.personalNotes || 'Um mês dedicado às boas histórias e cafés quentes.'}"
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {(closure.photos.length > 0 ? closure.photos : [
                      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600',
                      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600'
                    ]).slice(0, 4).map((photo, i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden" style={getStickerStyle(i % 2 === 0 ? -2 : 2)}>
                        <img src={photo} alt="Rotina" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-2 border-t" style={{ borderColor: `${currentText}20` }}>
                  <p className="text-[9px] uppercase tracking-widest font-semibold opacity-60">Photo Dump Literário</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. STATS VIEW
// ==========================================
function StatsView({ appScheme, books, getMonthName }) {
  const readBooks = books.filter(b => b.status === 'Lido');
  const totalPages = readBooks.reduce((sum, b) => sum + (Number(b.pages) || 0), 0);
  const avgRating = readBooks.length > 0 
    ? (readBooks.reduce((sum, b) => sum + (Number(b.rating) || 0), 0) / readBooks.length).toFixed(1)
    : 0;

  const topBook = readBooks.length > 0 
    ? [...readBooks].sort((a, b) => b.rating - a.rating)[0]
    : null;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: appScheme.accent }}>Análise de Leitura</span>
        <h2 className="text-3xl font-serif font-bold">Estatísticas & Retrospectiva</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
          <span className="text-xs font-medium uppercase tracking-wider block mb-1" style={{ color: appScheme.mutedText }}>Total de Livros</span>
          <div className="text-3xl font-serif font-bold">{readBooks.length}</div>
        </div>

        <div className="p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
          <span className="text-xs font-medium uppercase tracking-wider block mb-1" style={{ color: appScheme.mutedText }}>Páginas Lidas</span>
          <div className="text-3xl font-serif font-bold">{totalPages}</div>
        </div>

        <div className="p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
          <span className="text-xs font-medium uppercase tracking-wider block mb-1" style={{ color: appScheme.mutedText }}>Média de Notas</span>
          <div className="text-3xl font-serif font-bold">★ {avgRating}</div>
        </div>

        <div className="p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border }}>
          <span className="text-xs font-medium uppercase tracking-wider block mb-1" style={{ color: appScheme.mutedText }}>Top Avaliado</span>
          <div className="text-sm font-serif font-bold truncate">{topBook ? topBook.title : 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. BOOK FORM MODAL
// ==========================================
function BookFormModal({ appScheme, editingBook, selectedMonth, onClose, onSave }) {
  const [formData, setFormData] = useState(editingBook || {
    title: '',
    author: '',
    genre: '',
    pages: '',
    startDate: '',
    endDate: '',
    rating: 5,
    status: 'Lido',
    monthRead: selectedMonth,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
    review: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="rounded-2xl p-6 max-w-lg w-full shadow-2xl border space-y-4 my-8" style={{ backgroundColor: appScheme.cardBg, borderColor: appScheme.border, color: appScheme.text }}>
        <h3 className="font-serif text-xl font-bold">
          {editingBook ? 'Editar Livro' : 'Adicionar Novo Livro'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-1" style={{ color: appScheme.accent }}>Título</label>
            <input 
              required
              type="text" 
              value={formData.title} 
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full border rounded-xl p-2.5 text-sm"
              style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1" style={{ color: appScheme.accent }}>Autor</label>
              <input 
                required
                type="text" 
                value={formData.author} 
                onChange={e => setFormData({ ...formData, author: e.target.value })}
                className="w-full border rounded-xl p-2.5 text-sm"
                style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1" style={{ color: appScheme.accent }}>Gênero</label>
              <input 
                type="text" 
                value={formData.genre} 
                onChange={e => setFormData({ ...formData, genre: e.target.value })}
                className="w-full border rounded-xl p-2.5 text-sm"
                style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1" style={{ color: appScheme.accent }}>Nº de Páginas</label>
              <input 
                type="number" 
                value={formData.pages} 
                onChange={e => setFormData({ ...formData, pages: e.target.value })}
                className="w-full border rounded-xl p-2.5 text-sm"
                style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1" style={{ color: appScheme.accent }}>Status</label>
              <select 
                value={formData.status} 
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full border rounded-xl p-2.5 text-sm"
                style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
              >
                <option value="Lido">Lido</option>
                <option value="Lendo">Lendo</option>
                <option value="Quero ler">Quero ler</option>
                <option value="Abandonado">Abandonado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1" style={{ color: appScheme.accent }}>URL da Capa</label>
            <input 
              type="text" 
              value={formData.cover} 
              onChange={e => setFormData({ ...formData, cover: e.target.value })}
              className="w-full border rounded-xl p-2.5 text-sm"
              style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1" style={{ color: appScheme.accent }}>Avaliação (0 a 5)</label>
            <input 
              type="number" 
              min="0" 
              max="5" 
              value={formData.rating} 
              onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="w-full border rounded-xl p-2.5 text-sm"
              style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1" style={{ color: appScheme.accent }}>Resenha / Comentário</label>
            <textarea 
              rows={3}
              value={formData.review} 
              onChange={e => setFormData({ ...formData, review: e.target.value })}
              className="w-full border rounded-xl p-2.5 text-sm resize-none"
              style={{ backgroundColor: appScheme.mainBg, borderColor: appScheme.border }}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-80"
              style={{ color: appScheme.mutedText }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white shadow-sm"
              style={{ backgroundColor: appScheme.accent }}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
