import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Heart, MessageCircle, Star, Plus, Search, Filter, User, 
  Home, Book, PenTool, Users, Calendar, Quote, Volume2, VolumeX,
  CloudRain, Moon, Sun, Settings, Coffee, Camera, Mic,
  Eye, EyeOff, Sparkles, MoreHorizontal, Edit, Trash2, Send
} from 'lucide-react';

const BookNookSisters = () => {
  const [currentView, setCurrentView] = useState('nook');
  const [selectedBook, setSelectedBook] = useState(null);
  const [user, setUser] = useState({ id: 1, name: '', avatar: '', isSetup: false });
  const [ambientMode, setAmbientMode] = useState('fireplace');
  const [ambientSound, setAmbientSound] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // User-generated data (empty by default)
  const [books, setBooks] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [sisters, setSisters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  // Forms and inputs
  const [newBookForm, setNewBookForm] = useState({ 
    title: '', author: '', status: 'want-to-read', isPrivate: false, tags: [] 
  });
  const [newNote, setNewNote] = useState('');
  const [isNotePrivate, setIsNotePrivate] = useState(false);
  const [newJournalEntry, setNewJournalEntry] = useState({ 
    title: '', content: '', mood: 'peaceful', isPrivate: true 
  });
  const [setupForm, setSetupForm] = useState({ name: '', avatar: '📚' });

  // Refs for animations
  const fireplaceRef = useRef(null);
  const sparkleRef = useRef(null);

  // Simulated real-time updates (in real app, this would be Firebase/Supabase)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time activity updates
      if (Math.random() > 0.95 && books.length > 0) {
        // Simulate sister activity
        console.log('Simulated real-time update');
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [books]);

  // Fireplace animation effect
  useEffect(() => {
    if (ambientMode === 'fireplace' && fireplaceRef.current) {
      const flames = fireplaceRef.current.querySelectorAll('.flame');
      flames.forEach((flame, index) => {
        flame.style.animationDelay = `${index * 0.2}s`;
      });
    }
  }, [ambientMode]);

  // Book search simulation (would connect to Google Books API)
  const searchBooks = async (query) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          id: `search-${Date.now()}-1`,
          title: query.includes('harry') ? 'Harry Potter and the Sorcerer\'s Stone' : `${query} - Book 1`,
          author: query.includes('harry') ? 'J.K. Rowling' : 'Author Name',
          cover: `https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop&q=${Math.random()}`,
          description: 'A captivating story that will transport you to another world...'
        },
        {
          id: `search-${Date.now()}-2`,
          title: query.includes('harry') ? 'Harry Potter and the Chamber of Secrets' : `${query} - Book 2`,
          author: query.includes('harry') ? 'J.K. Rowling' : 'Author Name',
          cover: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&q=${Math.random()}`,
          description: 'The thrilling continuation of an beloved series...'
        }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const addBookFromSearch = (searchBook) => {
    const newBook = {
      ...searchBook,
      id: `book-${Date.now()}`,
      status: newBookForm.status,
      progress: 0,
      rating: null,
      dateAdded: new Date().toISOString().split('T')[0],
      addedBy: user.name || 'You',
      notes: [],
      isPrivate: newBookForm.isPrivate,
      tags: newBookForm.tags
    };
    setBooks([...books, newBook]);
    setSearchResults([]);
    setSearchQuery('');
    setCurrentView('bookshelf');
  };

  const handleSetupUser = () => {
    if (setupForm.name.trim()) {
      setUser({
        ...user,
        name: setupForm.name,
        avatar: setupForm.avatar,
        isSetup: true
      });
    }
  };

  const handleAddNote = (bookId) => {
    if (newNote.trim()) {
      const updatedBooks = books.map(book => {
        if (book.id === bookId) {
          return {
            ...book,
            notes: [...book.notes, {
              id: `note-${Date.now()}`,
              author: user.name || 'You',
              content: newNote,
              isPrivate: isNotePrivate,
              date: new Date().toISOString().split('T')[0],
              comments: []
            }]
          };
        }
        return book;
      });
      setBooks(updatedBooks);
      setNewNote('');
      setIsNotePrivate(false);
    }
  };

  const handleAddJournalEntry = () => {
    if (newJournalEntry.title && newJournalEntry.content) {
      const entry = {
        id: `journal-${Date.now()}`,
        author: user.name || 'You',
        date: new Date().toISOString().split('T')[0],
        ...newJournalEntry
      };
      setJournalEntries([entry, ...journalEntries]);
      setNewJournalEntry({ title: '', content: '', mood: 'peaceful', isPrivate: true });
      setCurrentView('journal');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reading': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'finished': return 'bg-green-100 text-green-800 border-green-200';
      case 'want-to-read': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMoodEmoji = (mood) => {
    const moods = {
      peaceful: '🌸', grateful: '💕', excited: '✨', reflective: '🌙',
      cozy: '☕', dreamy: '💭', intense: '🔥', magical: '🦋'
    };
    return moods[mood] || '📖';
  };

  const getAmbientBackground = () => {
    switch (ambientMode) {
      case 'fireplace': return 'from-orange-900 via-red-900 to-yellow-800';
      case 'rain': return 'from-slate-800 via-gray-800 to-blue-900';
      case 'starry': return 'from-indigo-900 via-purple-900 to-pink-900';
      default: return 'from-orange-900 via-red-900 to-yellow-800';
    }
  };

  // Setup screen for first-time users
  if (!user.isSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-100 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md w-full border border-rose-200">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-3xl font-serif text-rose-800 mb-2">Welcome to Your Book Nook</h1>
            <p className="text-rose-600">Let's create your cozy reading sanctuary</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-rose-700 mb-2">Your name</label>
              <input
                type="text"
                value={setupForm.name}
                onChange={(e) => setSetupForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-4 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="What should we call you?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-rose-700 mb-2">Choose your avatar</label>
              <div className="grid grid-cols-4 gap-3">
                {['📚', '🌸', '☕', '🦋', '🌙', '✨', '💕', '🔥'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setSetupForm(prev => ({ ...prev, avatar: emoji }))}
                    className={`text-3xl p-3 rounded-xl border-2 transition-all ${
                      setupForm.avatar === emoji 
                        ? 'border-rose-500 bg-rose-50 scale-110' 
                        : 'border-rose-200 hover:border-rose-300'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleSetupUser}
              disabled={!setupForm.name.trim()}
              className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white p-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              Enter Your Book Nook
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderFireplace = () => (
    <div className="relative h-64 w-full rounded-2xl overflow-hidden" ref={fireplaceRef}>
      <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-orange-800 to-yellow-600"></div>
      
      {/* Animated flames */}
      <div className="absolute bottom-0 w-full h-32 flex justify-center items-end space-x-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flame bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full opacity-80"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 60 + 40}px`,
              animation: 'flicker 1s infinite alternate',
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
      
      {/* Sparks */}
      <div className="absolute inset-0" ref={sparkleRef}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60 + 20}%`,
              animation: 'sparkle 2s infinite',
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes flicker {
          0% { transform: scaleY(1) scaleX(1) rotate(-1deg); opacity: 0.8; }
          50% { transform: scaleY(1.1) scaleX(0.9) rotate(1deg); opacity: 0.9; }
          100% { transform: scaleY(0.9) scaleX(1.1) rotate(-0.5deg); opacity: 0.7; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0); }
          50% { opacity: 1; transform: translateY(-20px) scale(1); }
        }
        
        @keyframes rain {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );

  const renderBookNook = () => (
    <div className={`min-h-screen bg-gradient-to-br ${getAmbientBackground()} relative overflow-hidden`}>
      {/* Ambient background elements */}
      {ambientMode === 'rain' && (
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-8 bg-blue-300"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 2 + 1}s`,
                animationDelay: `${Math.random() * 2}s`,
                animation: 'rain 1s linear infinite'
              }}
            />
          ))}
        </div>
      )}
      
      {ambientMode === 'starry' && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: 'twinkle 3s ease-in-out infinite',
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main content overlay */}
      <div className="relative z-10 min-h-screen bg-black/30 backdrop-blur-sm">
        {/* Header with ambient controls */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{user.avatar}</div>
              <div>
                <h1 className="text-3xl font-serif text-white/90">Book Nook Sisters</h1>
                <p className="text-white/70">Welcome back, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Ambient mode selector */}
              <div className="flex bg-black/20 rounded-full p-2 space-x-2">
                <button
                  onClick={() => setAmbientMode('fireplace')}
                  className={`p-3 rounded-full transition-all ${
                    ambientMode === 'fireplace' 
                      ? 'bg-white/20 text-orange-400' 
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  <span className="text-lg">🔥</span>
                </button>
                <button
                  onClick={() => setAmbientMode('rain')}
                  className={`p-3 rounded-full transition-all ${
                    ambientMode === 'rain' 
                      ? 'bg-white/20 text-blue-400' 
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  <CloudRain className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setAmbientMode('starry')}
                  className={`p-3 rounded-full transition-all ${
                    ambientMode === 'starry' 
                      ? 'bg-white/20 text-purple-400' 
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Sound toggle */}
              <button
                onClick={() => setAmbientSound(!ambientSound)}
                className={`p-3 rounded-full transition-all ${
                  ambientSound ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white/80'
                }`}
              >
                {ambientSound ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Cozy reading room layout */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left column - Fireplace and current reading */}
            <div className="space-y-8">
              {/* Fireplace */}
              <div className="bg-black/20 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
                <h2 className="text-xl font-serif text-white/90 mb-4 flex items-center">
                  <span className="text-xl mr-2">🔥</span>
                  Cozy Corner
                </h2>
                {renderFireplace()}
                
                {/* Quick stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <div className="text-2xl font-bold text-white/90">{books.length}</div>
                    <div className="text-sm text-white/70">Books Added</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <div className="text-2xl font-bold text-white/90">{journalEntries.length}</div>
                    <div className="text-sm text-white/70">Journal Entries</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center column - Main bookshelf */}
            <div className="space-y-8">
              <div className="bg-black/20 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif text-white/90 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Your Books
                  </h2>
                  <button
                    onClick={() => setCurrentView('add-book')}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Book</span>
                  </button>
                </div>

                {books.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <p className="text-white/70 mb-4">Your bookshelf is waiting for its first story</p>
                    <button
                      onClick={() => setCurrentView('add-book')}
                      className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
                    >
                      Add Your First Book
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4 max-h-96 overflow-y-auto">
                    {books.map(book => (
                      <div
                        key={book.id}
                        onClick={() => setSelectedBook(book)}
                        className="flex space-x-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
                      >
                        <img src={book.cover} alt={book.title} className="w-12 h-16 object-cover rounded-lg shadow-lg" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white/90 truncate">{book.title}</h3>
                          <p className="text-white/70 text-sm truncate">{book.author}</p>
                          <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(book.status)}`}>
                            {book.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right column - Recent activity and navigation */}
            <div className="space-y-8">
              <div className="bg-black/20 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
                <h2 className="text-xl font-serif text-white/90 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Reading Journey
                </h2>
                
                <div className="space-y-4">
                  <button
                    onClick={() => setCurrentView('journal')}
                    className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-xl text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <PenTool className="w-5 h-5 text-white/70" />
                        <div>
                          <div className="text-white/90 font-medium">Journal</div>
                          <div className="text-white/60 text-sm">{journalEntries.length} entries</div>
                        </div>
                      </div>
                      <div className="text-white/40 group-hover:text-white/60 transition-colors">→</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setCurrentView('bookshelf')}
                    className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-xl text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Book className="w-5 h-5 text-white/70" />
                        <div>
                          <div className="text-white/90 font-medium">Full Bookshelf</div>
                          <div className="text-white/60 text-sm">Organize & explore</div>
                        </div>
                      </div>
                      <div className="text-white/40 group-hover:text-white/60 transition-colors">→</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setCurrentView('sisters')}
                    className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-xl text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-white/70" />
                        <div>
                          <div className="text-white/90 font-medium">Sister Circle</div>
                          <div className="text-white/60 text-sm">Connect & share</div>
                        </div>
                      </div>
                      <div className="text-white/40 group-hover:text-white/60 transition-colors">→</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddBook = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setCurrentView('nook')}
          className="mb-6 text-rose-600 hover:text-rose-800 flex items-center space-x-2 transition-colors"
        >
          ← Back to Book Nook
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-rose-200">
          <h2 className="text-3xl font-serif text-rose-800 mb-8 text-center">Add a New Book</h2>
          
          {/* Book search */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-rose-700 mb-2">Search for books</label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchBooks(searchQuery)}
                className="flex-1 p-4 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Search by title or author..."
              />
              <button
                onClick={() => searchBooks(searchQuery)}
                disabled={isSearching}
                className="bg-rose-500 text-white px-6 py-4 rounded-xl hover:bg-rose-600 disabled:opacity-50 transition-all"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search results */}
          {isSearching && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-rose-600">Searching for books...</p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-serif text-rose-800 mb-4">Search Results</h3>
              <div className="grid gap-4">
                {searchResults.map(book => (
                  <div key={book.id} className="flex space-x-4 p-6 bg-rose-50 rounded-xl border border-rose-200">
                    <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover rounded-lg shadow-sm" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{book.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                      <p className="text-gray-600 text-xs mb-4">{book.description}</p>
                      <div className="flex space-x-3">
                        <select
                          value={newBookForm.status}
                          onChange={(e) => setNewBookForm(prev => ({ ...prev, status: e.target.value }))}
                          className="px-3 py-2 border border-rose-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500"
                        >
                          <option value="want-to-read">Want to Read</option>
                          <option value="reading">Currently Reading</option>
                          <option value="finished">Finished</option>
                        </select>
                        <button
                          onClick={() => addBookFromSearch(book)}
                          className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 text-sm transition-all"
                        >
                          Add to Shelf
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manual book entry */}
          <div className="border-t border-rose-200 pt-8">
            <h3 className="text-lg font-serif text-rose-800 mb-4">Or add manually</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-2">Book Title</label>
                <input
                  type="text"
                  value={newBookForm.title}
                  onChange={(e) => setNewBookForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-4 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter book title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-2">Author</label>
                <input
                  type="text"
                  value={newBookForm.author}
                  onChange={(e) => setNewBookForm(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full p-4 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter author name..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setCurrentView('nook')}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newBookForm.title && newBookForm.author) {
                    const newBook = {
                      id: `book-${Date.now()}`,
                      title: newBookForm.title,
                      author: newBookForm.author,
                      status: newBookForm.status,
                      progress: 0,
                      rating: null,
                      dateAdded: new Date().toISOString().split('T')[0],
                      addedBy: user.name || 'You',
                      cover: `https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop&q=${Math.random()}`,
                      notes: [],
                      isPrivate: newBookForm.isPrivate,
                      tags: newBookForm.tags
                    };
                    setBooks([...books, newBook]);
                    setNewBookForm({ title: '', author: '', status: 'want-to-read', isPrivate: false, tags: [] });
                    setCurrentView('nook');
                  }
                }}
                disabled={!newBookForm.title || !newBookForm.author}
                className="bg-rose-500 text-white px-6 py-3 rounded-xl hover:bg-rose-600 disabled:opacity-50 transition-all"
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookshelf = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => setCurrentView('nook')}
          className="mb-6 text-rose-600 hover:text-rose-800 flex items-center space-x-2 transition-colors"
        >
          ← Back to Book Nook
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-rose-200">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif text-rose-800">Your Bookshelf</h2>
            <button
              onClick={() => setCurrentView('add-book')}
              className="bg-rose-500 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-rose-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Book</span>
            </button>
          </div>

          {books.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-20 h-20 text-rose-300 mx-auto mb-6" />
              <h3 className="text-xl font-serif text-rose-600 mb-4">Your bookshelf awaits</h3>
              <p className="text-rose-500 mb-8">Start building your personal library by adding your first book</p>
              <button
                onClick={() => setCurrentView('add-book')}
                className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all"
              >
                Add Your First Book
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map(book => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="bg-gradient-to-br from-white to-rose-50 rounded-2xl shadow-lg border border-rose-100 p-6 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                >
                  <div className="flex space-x-4 mb-4">
                    <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover rounded-lg shadow-md" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 mb-2 leading-tight">{book.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(book.status)}`}>
                        {book.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 flex justify-between items-center">
                    <span>Added by {book.addedBy}</span>
                    <span>{book.notes.length} notes</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderJournal = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setCurrentView('nook')}
          className="mb-6 text-rose-600 hover:text-rose-800 flex items-center space-x-2 transition-colors"
        >
          ← Back to Book Nook
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-rose-200">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif text-rose-800">Reading Journal</h2>
            <button
              onClick={() => setCurrentView('new-journal')}
              className="bg-rose-500 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-rose-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>New Entry</span>
            </button>
          </div>

          {journalEntries.length === 0 ? (
            <div className="text-center py-16">
              <PenTool className="w-20 h-20 text-rose-300 mx-auto mb-6" />
              <h3 className="text-xl font-serif text-rose-600 mb-4">Begin your reading journey</h3>
              <p className="text-rose-500 mb-8">Capture your thoughts, feelings, and discoveries from your reading adventures</p>
              <button
                onClick={() => setCurrentView('new-journal')}
                className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all"
              >
                Write Your First Entry
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {journalEntries.map(entry => (
                <div key={entry.id} className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg border border-rose-100 p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{getMoodEmoji(entry.mood)}</div>
                      <div>
                        <h3 className="text-xl font-serif text-rose-800 mb-1">{entry.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{entry.author}</span>
                          <span>•</span>
                          <span>{entry.date}</span>
                          {entry.isPrivate && (
                            <>
                              <span>•</span>
                              <Eye className="w-4 h-4 text-gray-400" />
                              <span>Private</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderNewJournal = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setCurrentView('journal')}
          className="mb-6 text-rose-600 hover:text-rose-800 flex items-center space-x-2 transition-colors"
        >
          ← Back to Journal
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-rose-200">
          <h2 className="text-3xl font-serif text-rose-800 mb-8 text-center">New Journal Entry</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-rose-700 mb-2">Title</label>
              <input
                type="text"
                value={newJournalEntry.title}
                onChange={(e) => setNewJournalEntry(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-4 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Give your entry a meaningful title..."
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-2">Mood</label>
                <select
                  value={newJournalEntry.mood}
                  onChange={(e) => setNewJournalEntry(prev => ({ ...prev, mood: e.target.value }))}
                  className="w-full p-4 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="peaceful">🌸 Peaceful</option>
                  <option value="grateful">💕 Grateful</option>
                  <option value="excited">✨ Excited</option>
                  <option value="reflective">🌙 Reflective</option>
                  <option value="cozy">☕ Cozy</option>
                  <option value="dreamy">💭 Dreamy</option>
                  <option value="intense">🔥 Intense</option>
                  <option value="magical">🦋 Magical</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-2">Privacy</label>
                <div className="flex items-center space-x-4 p-4 border border-rose-200 rounded-xl">
                  <button
                    onClick={() => setNewJournalEntry(prev => ({ ...prev, isPrivate: true }))}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      newJournalEntry.isPrivate ? 'bg-rose-100 text-rose-800' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Private</span>
                  </button>
                  <button
                    onClick={() => setNewJournalEntry(prev => ({ ...prev, isPrivate: false }))}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      !newJournalEntry.isPrivate ? 'bg-rose-100 text-rose-800' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Share with Sisters</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-rose-700 mb-2">Your Thoughts</label>
              <textarea
                value={newJournalEntry.content}
                onChange={(e) => setNewJournalEntry(prev => ({ ...prev, content: e.target.value }))}
                rows={10}
                className="w-full p-4 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                placeholder="Pour your heart out... What are you reading? How does it make you feel? What memories or thoughts does it stir up?"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setCurrentView('journal')}
                className="px-8 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddJournalEntry}
                disabled={!newJournalEntry.title || !newJournalEntry.content}
                className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg disabled:opacity-50 transition-all"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSisters = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setCurrentView('nook')}
          className="mb-6 text-rose-600 hover:text-rose-800 flex items-center space-x-2 transition-colors"
        >
          ← Back to Book Nook
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-rose-200">
          <h2 className="text-3xl font-serif text-rose-800 mb-8 text-center">Sister Circle</h2>
          
          <div className="text-center py-16">
            <Users className="w-20 h-20 text-rose-300 mx-auto mb-6" />
            <h3 className="text-xl font-serif text-rose-600 mb-4">Your circle awaits</h3>
            <p className="text-rose-500 mb-8">Invite your sisters to join your cozy reading sanctuary and share the magic of stories together</p>
            <button className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all">
              Invite Sisters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  if (currentView === 'nook') return renderBookNook();
  if (currentView === 'add-book') return renderAddBook();
  if (currentView === 'bookshelf') return renderBookshelf();
  if (currentView === 'journal') return renderJournal();
  if (currentView === 'new-journal') return renderNewJournal();
  if (currentView === 'sisters') return renderSisters();
  
  return renderBookNook();
};

export default BookNookSisters;