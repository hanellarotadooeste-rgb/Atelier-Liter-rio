import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Calendar, Heart, Star, Sparkles, Image as ImageIcon, 
  Trash2, Edit3, Plus, Download, Share2, Layers, Palette, ChevronLeft, 
  ChevronRight, Bookmark, Settings, Filter, Check, LayoutGrid, Type,
  Sticker, RefreshCw, Smartphone, Monitor
} from 'lucide-react';

const PALETTES = {
  terracotta: {
    name: "Atelier Terracota",
    bgMain: "bg-[#FDFBF7]",
    bgCard: "bg-[#F7F3ED]",
    bgSidebar: "bg-[#FAF7F2]",
    textPrimary: "text-[#2C221E]",
    textSecondary: "text-[#7A6B63]",
    accent: "bg-[#C46D4E]",
    accentHover: "hover:bg-[#A8583B]",
    accentText: "text-[#C46D4E]",
    border: "border-[#E8E1D7]",
    cardBorder: "border-[#EFE9E0]",
    badgeBg: "bg-[#F3ECE1]",
    activeNav: "bg-[#EFE9E0] text-[#2C221E] font-medium"
  },
  rose: {
    name: "Rose Gold & Latte",
    bgMain: "bg-[#FAF5F5]",
    bgCard: "bg-[#F5ECEC]",
    bgSidebar: "bg-[#F7EFEB]",
    textPrimary: "text-[#3D2C2E]",
    textSecondary: "text-[#8A7375]",
    accent: "bg-[#C87D87]",
    accentHover: "hover:bg-[#B36872]",
    accentText: "text-[#C87D87]",
    border: "border-[#EADAD9]",
    cardBorder: "border-[#F0E2E1]",
    badgeBg: "bg-[#F0DFE1]",
    activeNav: "bg-[#F0DFE1] text-[#3D2C2E] font-medium"
  },
  sage: {
    name: "Sage & Linen",
    bgMain: "bg-[#F7F9F7]",
    bgCard: "bg-[#EEF2EE]",
    bgSidebar: "bg-[#F2F5F2]",
    textPrimary: "text-[#232F27]",
    textSecondary: "text-[#65776A]",
    accent: "bg-[#5B7B67]",
    accentHover: "hover:bg-[#486352]",
    accentText: "text-[#5B7B67]",
    border: "border-[#D8E2DA]",
    cardBorder: "border-[#E1EAE3]",
    badgeBg: "bg-[#DFE7E1]",
    activeNav: "bg-[#DFE7E1] text-[#232F27] font-medium"
  },
  darkAcademia: {
    name: "Dark Academia",
    bgMain: "bg-[#1C1816]",
    bgCard: "bg-[#282320]",
    bgSidebar: "bg-[#221D1A]",
    textPrimary: "text-[#E8E0D7]",
    textSecondary: "text-[#A3978C]",
    accent: "bg-[#8C5E3C]",
    accentHover: "hover:bg-[#734A2E]",
    accentText: "text-[#C6926A]",
    border: "border-[#3A322C]",
    cardBorder: "border-[#3D352F]",
    badgeBg: "bg-[#362E28]",
    activeNav: "bg-[#362E28] text-[#E8E0D7] font-medium"
  },
  matcha: {
    name: "Matcha & Vanilla",
    bgMain: "bg-[#F9FAEE]",
    bgCard: "bg-[#F1F3DF]",
    bgSidebar: "bg-[#F5F7E6]",
    textPrimary: "text-[#273019]",
    textSecondary: "text-[#6A7554]",
    accent: "bg-[#768A48]",
    accentHover: "hover:bg-[#607238]",
    accentText: "text-[#768A48]",
    border: "border-[#E0E4C9]",
    cardBorder: "border-[#E7EBCE]",
    badgeBg: "bg-[#E3E8C9]",
    activeNav: "bg-[#E3E8C9] text-[#273019] font-medium"
  },
  lavender: {
    name: "Lavender Dream",
    bgMain: "bg-[#FAFAFD]",
    bgCard: "bg-[#F0F0F7]",
    bgSidebar: "bg-[#F4F4FA]",
    textPrimary: "text-[#272635]",
    textSecondary: "text-[#74728E]",
    accent: "bg-[#7C7C9E]",
    accentHover: "hover:bg-[#656586]",
    accentText: "text-[#7C7C9E]",
    border: "border-[#E0E0EC]",
    cardBorder: "border-[#E6E6F2]",
    badgeBg: "bg-[#E2E2F0]",
    activeNav: "bg-[#E2E2F0] text-[#272635] font-medium"
  }
};

const INITIAL_BOOKS = [
  {
    id: "1",
    title: "A Biblioteca da Meia-Noite",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    pages: 308,
    genre: "Ficção Contemporânea",
    startDate: "2026-10-02",
    endDate: "2026-10-12",
    rating: 5,
    status: "Lido",
    month: "10-2026",
    quote: "Entre a vida e a morte existe uma biblioteca, e os prateleiras vão até o infinito.",
    review: "Um livro tocante sobre escolhas, arrependimentos e as infinitas possibilidades de existência."
  },
  {
    id: "2",
    title: "O Povo do Ar: O Príncipe Cruel",
    author: "Holly Black",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    pages: 368,
    genre: "Fantasia",
    startDate: "2026-10-14",
    endDate: "2026-10-25",
    rating: 4,
    status: "Lido",
    month: "10-2026",
    quote: "Se eu não posso ser melhor que eles, serei muito pior.",
    review: "Intrigas políticas feéricas fascinantes e personagens moralmente cinzentos."
  },
  {
    id: "3",
    title: "Tudo O Que Sei Sobre o Amor",
    author: "Dolly Alderton",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
    pages: 350,
    genre: "Memórias / Não-Ficção",
    startDate: "2026-10-26",
    endDate: "2026-10-31",
    rating: 5,
    status: "Lido",
    month: "10-2026",
    quote: "Quase tudo o que sei sobre o amor, aprendi com as minhas amizades femininas.",
    review: "Divertido, honesto e incrivelmente acolhedor."
  }
];

export default function App() {
  const [currentThemeKey, setCurrentThemeKey] = useState(() => {
    return localStorage.getItem('atelier_theme') || 'terracotta';
  });
  const theme = PALETTES[currentThemeKey] || PALETTES.terracotta;

  const [activeTab, setActiveTab] = useState('home');
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('atelier_books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  const [selectedMonth, setSelectedMonth] = useState('10-2026');
  const [monthlyGoal, setMonthlyGoal] = useState(4);
  const [editingBook, setEditingBook] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Estados do Gerador de Photo Dump
  const [dumpFormat, setDumpFormat] = useState('feed'); // feed (4:5), story (9:16), square (1:1)
  const [dumpStyle, setDumpStyle] = useState('canva'); // pinterest, clean, scrapbook, dark, lifestyle, journal, canva
  const [stickerCutout, setStickerCutout] = useState(true);
  const [showImessage, setShowImessage] = useState(true);
  const [showSparkles, setShowSparkles] = useState(true);
  const [showTagTitle, setShowTagTitle] = useState(true);
  const [dumpTitle, setDumpTitle] = useState("leituras de outubro ✨");
  const [imessageText, setImessageText] = useState("tudo que não tem saído da minha mente ☕️📚");
  const [personalPhoto, setPersonalPhoto] = useState("https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop");

  const canvasRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('atelier_theme', currentThemeKey);
  }, [currentThemeKey]);

  useEffect(() => {
    localStorage.setItem('atelier_books', JSON.stringify(books));
  }, [books]);

  const monthBooks = books.filter(b => b.month === selectedMonth && b.status === 'Lido');
  const totalPagesMonth = monthBooks.reduce((acc, b) => acc + Number(b.pages || 0), 0);
  const top1Book = monthBooks.reduce((prev, curr) => (prev.rating > curr.rating ? prev : curr), monthBooks[0]);

  const handleSaveBook = (bookData) => {
    if (editingBook) {
      setBooks(books.map(b => b.id === editingBook.id ? { ...bookData, id: b.id } : b));
    } else {
      setBooks([...books, { ...bookData, id: Date.now().toString() }]);
    }
    setIsBookModalOpen(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (id) => {
    if (confirm("Deseja remover este livro da sua biblioteca?")) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  // Simulação de exportação de PNG do Dump
  const handleExportPNG = () => {
    alert("Exportando seu Photo Dump em Alta Resolução (PNG 1080px)... Suas imagens estão prontas para salvar e postar!");
  };

  return (
    <div className={`min-h-screen ${theme.bgMain} ${theme.textPrimary} flex flex-col md:flex-row font-serif transition-colors duration-300`}>
      
      {/* BARRA LATERAL / NAVEGAÇÃO */}
      <aside className={`w-full md:w-64 ${theme.bgSidebar} border-b md:border-b-0 md:border-r ${theme.border} p-6 flex flex-col justify-between`}>
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-10 h-10 rounded-full ${theme.accent} text-white flex items-center justify-center shadow-md`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-tight">Atelier</h1>
              <p className={`text-xs ${theme.textSecondary} font-sans tracking-widest uppercase`}>Diário Literário</p>
            </div>
          </div>

          <nav className="space-y-1 font-sans text-sm">
            {[
              { id: 'home', label: 'Meu Mês Literário', icon: Calendar },
              { id: 'library', label: 'Biblioteca Pessoal', icon: BookOpen },
              { id: 'closing', label: 'Fechamento Mensal', icon: Bookmark },
              { id: 'dump', label: 'Gerador Photo Dump', icon: Sparkles },
              { id: 'stats', label: 'Estatísticas & Retrospectiva', icon: LayoutGrid }
            ].map(item => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === item.id ? theme.activeNav : `${theme.textSecondary} hover:bg-black/5`
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* SELETOR DE COR DO APP (TEMA DA INTERFACE) */}
        <div className={`mt-8 pt-6 border-t ${theme.border} font-sans`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold ${theme.textSecondary} uppercase tracking-wider flex items-center gap-1.5`}>
              <Palette className="w-3.5 h-3.5" /> Cor do App
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(PALETTES).map(([key, p]) => (
              <button
                key={key}
                onClick={() => setCurrentThemeKey(key)}
                className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-center transition-all ${
                  currentThemeKey === key ? `${theme.border} ring-2 ring-offset-1 ring-neutral-400 font-bold` : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: p.name.includes("Dark") ? '#282320' : '#F5F0EB' }}
                title={p.name}
              >
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: key === 'terracotta' ? '#C46D4E' : key === 'rose' ? '#C87D87' : key === 'sage' ? '#5B7B67' : key === 'darkAcademia' ? '#8C5E3C' : key === 'matcha' ? '#768A48' : '#7C7C9E' }}></div>
                <span className="truncate text-[10px]">{key}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">

        {/* TELA 1: MEU MÊS LITERÁRIO */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/60 pb-6">
              <div>
                <span className={`text-xs ${theme.textSecondary} font-sans uppercase tracking-widest`}>Visão Geral</span>
                <h2 className="text-3xl font-serif font-semibold">Outubro 2026</h2>
              </div>

              <div className="flex items-center gap-3 font-sans">
                <button 
                  onClick={() => { setEditingBook(null); setIsBookModalOpen(true); }}
                  className={`${theme.accent} ${theme.accentHover} text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm transition-all`}
                >
                  <Plus className="w-4 h-4" /> Adicionar Leitura
                </button>
              </div>
            </header>

            {/* METRICAS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              <div className={`${theme.bgCard} p-6 rounded-2xl border ${theme.cardBorder}`}>
                <p className={`text-xs ${theme.textSecondary} uppercase tracking-wider mb-2` font-medium}>Livros Lidos</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-bold">{monthBooks.length}</span>
                  <span className={`text-xs ${theme.textSecondary}`}>de {monthlyGoal} meta</span>
                </div>
                <div className="w-full bg-black/5 h-2 rounded-full mt-4 overflow-hidden">
                  <div 
                    className={`h-full ${theme.accent} transition-all duration-500`} 
                    style={{ width: `${Math.min((monthBooks.length / monthlyGoal) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className={`${theme.bgCard} p-6 rounded-2xl border ${theme.cardBorder}`}>
                <p className={`text-xs ${theme.textSecondary} uppercase tracking-wider mb-2` font-medium}>Páginas Lidas</p>
                <span className="text-4xl font-serif font-bold">{totalPagesMonth}</span>
                <p className={`text-xs ${theme.textSecondary} mt-2`}>Média de ~{Math.round(totalPagesMonth / 31 || 0)} pág/dia</p>
              </div>

              <div className={`${theme.bgCard} p-6 rounded-2xl border ${theme.cardBorder} flex flex-col justify-between`}>
                <p className={`text-xs ${theme.textSecondary} uppercase tracking-wider mb-2` font-medium}>Livro Favorito (Top 1)</p>
                {top1Book ? (
                  <div className="flex items-center gap-3">
                    <img src={top1Book.cover} alt={top1Book.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                    <div>
                      <h4 className="font-serif font-bold text-sm line-clamp-1">{top1Book.title}</h4>
                      <p className={`text-xs ${theme.textSecondary}`}>{top1Book.author}</p>
                      <div className="flex text-amber-500 text-xs mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < top1Book.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className={`text-xs ${theme.textSecondary} italic`}>Nenhum livro concluído neste mês ainda.</p>
                )}
              </div>
            </div>

            {/* GALERIA DO MÊS */}
            <section className="space-y-4">
              <h3 className="text-xl font-serif font-semibold">Galeria de Leituras do Mês</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {monthBooks.map(book => (
                  <div key={book.id} className={`group ${theme.bgCard} rounded-2xl p-4 border ${theme.cardBorder} transition-all hover:shadow-md`}>
                    <div className="aspect-[2/3] overflow-hidden rounded-xl mb-3 shadow-sm relative">
                      <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full font-sans flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {book.rating}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base line-clamp-1">{book.title}</h4>
                    <p className={`text-xs ${theme.textSecondary} font-sans`}>{book.author}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TELA 4: GERADOR DE PHOTO DUMP (AESTHETIC CANVA / PINTEREST SCRAPBOOK) */}
        {activeTab === 'dump' && (
          <div className="space-y-8 animate-fadeIn">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/60 pb-6">
              <div>
                <span className={`text-xs ${theme.textSecondary} font-sans uppercase tracking-widest`}>Estúdio de Criação Visual</span>
                <h2 className="text-3xl font-serif font-semibold">Gerador de Photo Dump Instagram</h2>
              </div>
              <button 
                onClick={handleExportPNG}
                className={`${theme.accent} ${theme.accentHover} text-white px-6 py-3 rounded-full text-sm font-sans font-medium flex items-center gap-2 shadow-md transition-all`}
              >
                <Download className="w-4 h-4" /> Baixar Imagens (PNG Alta Resolução)
              </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
              
              {/* PAINEL DE EDICAO & CONTROLES */}
              <div className="lg:col-span-4 space-y-6">
                <div className={`${theme.bgCard} p-6 rounded-2xl border ${theme.cardBorder} space-y-5`}>
                  <h3 className="font-serif font-bold text-lg flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Estilo & Formato
                  </h3>

                  <div>
                    <label className={`text-xs ${theme.textSecondary} font-medium uppercase tracking-wider block mb-2`}>Proporção da Tela</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'story', label: 'Stories (9:16)' },
                        { id: 'feed', label: 'Feed (4:5)' },
                        { id: 'square', label: 'Quadrado (1:1)' }
                      ].map(f => (
                        <button
                          key={f.id}
                          onClick={() => setDumpFormat(f.id)}
                          className={`py-2 px-1 text-xs rounded-xl border text-center transition-all ${
                            dumpFormat === f.id ? `${theme.accent} text-white border-transparent` : `${theme.bgMain} ${theme.border}`
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ELEMENTOS ESTILO CANVA / PINTEREST */}
                  <div className="space-y-3 pt-3 border-t border-neutral-200/60">
                    <label className={`text-xs ${theme.textSecondary} font-medium uppercase tracking-wider block`}>Efeitos Aesthetic (Fotos/Capas)</label>
                    
                    <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-lg hover:bg-black/5">
                      <span>Borda Adesivo (Contorno Branco)</span>
                      <input 
                        type="checkbox" 
                        checked={stickerCutout} 
                        onChange={(e) => setStickerCutout(e.target.checked)}
                        className="rounded accent-neutral-800"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-lg hover:bg-black/5">
                      <span>Caixa de Mensagem (iMessage)</span>
                      <input 
                        type="checkbox" 
                        checked={showImessage} 
                        onChange={(e) => setShowImessage(e.target.checked)}
                        className="rounded accent-neutral-800"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-lg hover:bg-black/5">
                      <span>Título Estilo Etiqueta Amarela</span>
                      <input 
                        type="checkbox" 
                        checked={showTagTitle} 
                        onChange={(e) => setShowTagTitle(e.target.checked)}
                        className="rounded accent-neutral-800"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-lg hover:bg-black/5">
                      <span>Adesivos de Estrelas & Brilhos</span>
                      <input 
                        type="checkbox" 
                        checked={showSparkles} 
                        onChange={(e) => setShowSparkles(e.target.checked)}
                        className="rounded accent-neutral-800"
                      />
                    </label>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-neutral-200/60">
                    <label className={`text-xs ${theme.textSecondary} font-medium uppercase tracking-wider block`}>Textos do Dump</label>
                    <div>
                      <span className="text-[11px] text-neutral-500">Título Principal</span>
                      <input 
                        type="text" 
                        value={dumpTitle} 
                        onChange={(e) => setDumpTitle(e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-xl border ${theme.border} ${theme.bgMain} mt-1`}
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-500">Texto Balão iMessage</span>
                      <input 
                        type="text" 
                        value={imessageText} 
                        onChange={(e) => setImessageText(e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-xl border ${theme.border} ${theme.bgMain} mt-1`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CANVA PREVIEW EN VIVO */}
              <div className="lg:col-span-8 flex flex-col items-center justify-center">
                <div className="text-center mb-4">
                  <span className={`text-xs ${theme.textSecondary} uppercase tracking-widest`}>Prévia em tempo real</span>
                </div>

                <div 
                  ref={canvasRef}
                  className={`relative overflow-hidden shadow-2xl transition-all duration-300 ${
                    dumpFormat === 'story' ? 'w-[320px] h-[568px]' : dumpFormat === 'feed' ? 'w-[360px] h-[450px]' : 'w-[380px] h-[380px]'
                  }`}
                  style={{
                    backgroundImage: `url(${personalPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* OVERLAY ESCURO SUAVE */}
                  <div className="absolute inset-0 bg-black/25" />

                  {/* ADESIVOS DE BRILHOS / SPARKLES */}
                  {showSparkles && (
                    <>
                      <div className="absolute top-6 left-6 text-yellow-300 animate-pulse text-2xl drop-shadow">✨</div>
                      <div className="absolute top-1/2 right-4 text-yellow-300 text-xl drop-shadow">⭐</div>
                      <div className="absolute bottom-12 left-8 text-yellow-200 text-lg drop-shadow">✨</div>
                    </>
                  )}

                  {/* TITULO ETIQUETA / SCRAPBOOK */}
                  <div className="absolute top-10 left-6 right-6 flex flex-col items-start gap-2">
                    {showTagTitle ? (
                      <span className="bg-[#FFE566] text-[#2C221E] px-4 py-1.5 rounded-md font-sans font-black text-lg tracking-tight uppercase shadow-md transform -rotate-1 border border-black/10">
                        {dumpTitle}
                      </span>
                    ) : (
                      <h3 className="text-white font-serif text-2xl font-bold drop-shadow-md">{dumpTitle}</h3>
                    )}
                  </div>

                  {/* ELEMENTO CENTRAL: CHA / CAFÉ COM BORDA ADESIVO (CUTOUT STICKER) */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className={`relative transition-all ${stickerCutout ? 'p-1.5 bg-white rounded-3xl shadow-2xl ring-4 ring-white/80' : ''}`}>
                      <img 
                        src={top1Book ? top1Book.cover : "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"} 
                        alt="Livro Destaque" 
                        className="w-32 h-44 object-cover rounded-2xl"
                      />
                      {stickerCutout && (
                        <span className="absolute -bottom-3 -right-3 bg-white text-black font-sans font-bold text-[10px] px-2.5 py-1 rounded-full shadow-lg border border-neutral-200">
                          TOP 1 ⭐️
                        </span>
                      )}
                    </div>
                  </div>

                  {/* BALAO ESTILO iMESSAGE */}
                  {showImessage && (
                    <div className="absolute bottom-8 left-6 right-6">
                      <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-white/40 flex items-center justify-between gap-2">
                        <span className="text-xs font-sans text-neutral-800 font-medium line-clamp-1">
                          {imessageText}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px]">
                          ↑
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* OUTRAS TELAS REUTILIZAVEIS DA BIBLIOTECA */}
        {activeTab === 'library' && (
          <div className="space-y-6 font-sans">
            <h2 className="text-2xl font-serif font-bold">Biblioteca Pessoal ({books.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {books.map(b => (
                <div key={b.id} className={`${theme.bgCard} p-4 rounded-2xl border ${theme.cardBorder} flex flex-col justify-between`}>
                  <img src={b.cover} alt={b.title} className="w-full aspect-[2/3] object-cover rounded-xl mb-3" />
                  <div>
                    <h4 className="font-serif font-bold text-sm line-clamp-1">{b.title}</h4>
                    <p className={`text-xs ${theme.textSecondary}`}>{b.author}</p>
                    <span className="inline-block mt-2 text-[10px] bg-black/5 px-2 py-0.5 rounded-full font-medium">{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'closing' && (
          <div className="space-y-6 font-sans">
            <h2 className="text-2xl font-serif font-bold">Fechamento Mensal</h2>
            <p className={`text-sm ${theme.textSecondary}`}>Selecione os livros concluídos e organize o registro do mês.</p>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6 font-sans">
            <h2 className="text-2xl font-serif font-bold">Estatísticas & Retrospectiva</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${theme.bgCard} p-6 rounded-2xl border ${theme.cardBorder}`}>
                <p className={`text-xs ${theme.textSecondary} uppercase`}>Total de Leituras</p>
                <span className="text-3xl font-serif font-bold">{books.length} livros</span>
              </div>
              <div className={`${theme.bgCard} p-6 rounded-2xl border ${theme.cardBorder}`}>
                <p className={`text-xs ${theme.textSecondary} uppercase`}>Páginas Acumuladas</p>
                <span className="text-3xl font-serif font-bold">{books.reduce((a,b) => a + Number(b.pages||0), 0)}</span>
              </div>
              <div className={`${theme.bgCard} p-6 rounded-2xl border ${theme.cardBorder}`}>
                <p className={`text-xs ${theme.textSecondary} uppercase`}>Média de Avaliação</p>
                <span className="text-3xl font-serif font-bold">4.8 ⭐️</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL ADICIONAR / EDITAR LIVRO */}
      {isBookModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-sans">
          <div className={`${theme.bgMain} rounded-3xl p-6 max-w-md w-full border ${theme.border} space-y-4`}>
            <h3 className="font-serif font-bold text-xl">Novo Livro</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleSaveBook({
                title: formData.get('title'),
                author: formData.get('author'),
                cover: formData.get('cover') || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
                pages: formData.get('pages'),
                genre: formData.get('genre'),
                rating: Number(formData.get('rating')),
                status: 'Lido',
                month: selectedMonth
              });
            }} className="space-y-3">
              <input name="title" required placeholder="Título do Livro" className={`w-full p-2.5 text-xs rounded-xl border ${theme.border}`} />
              <input name="author" required placeholder="Autor" className={`w-full p-2.5 text-xs rounded-xl border ${theme.border}`} />
              <input name="cover" placeholder="URL da Capa da Imagem" className={`w-full p-2.5 text-xs rounded-xl border ${theme.border}`} />
              <div className="grid grid-cols-2 gap-2">
                <input name="pages" type="number" placeholder="Nº Páginas" className={`p-2.5 text-xs rounded-xl border ${theme.border}`} />
                <input name="rating" type="number" min="1" max="5" defaultValue="5" placeholder="Nota (1-5)" className={`p-2.5 text-xs rounded-xl border ${theme.border}`} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsBookModalOpen(false)} className="px-4 py-2 text-xs rounded-xl border">Cancelar</button>
                <button type="submit" className={`px-4 py-2 text-xs rounded-xl ${theme.accent} text-white font-medium`}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
