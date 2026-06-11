import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Calendar, 
  ExternalLink, 
  Filter, 
  Search, 
  SlidersHorizontal,
  X,
  Sparkles,
  BookOpen,
  Eye
} from 'lucide-react';

export default function NewsFeed({ 
  articles, 
  savedArticles, 
  toggleSaveArticle, 
  globalSearchQuery,
  activeCategoryFilter = 'All' 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(activeCategoryFilter);
  const [minScore, setMinScore] = useState(1);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'importance'
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Sync with activeCategoryFilter prop if it changes
  useEffect(() => {
    setSelectedCategory(activeCategoryFilter);
  }, [activeCategoryFilter]);

  // Sync with globalSearchQuery if it changes
  useEffect(() => {
    setSearchQuery(globalSearchQuery);
  }, [globalSearchQuery]);

  // Simulate skeleton screen loader on filter adjustment
  const handleFilterChange = (updaterFn) => {
    setLoading(true);
    updaterFn();
    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const categories = ['All', 'AI', 'Cybersecurity', 'Startups', 'Cloud Computing', 'Software Development'];

  // Apply filters
  const filteredArticles = articles.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.source.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesScore = art.importanceScore >= minScore;
    
    return matchesSearch && matchesCategory && matchesScore;
  });

  // Sort results
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.pubDate) - new Date(a.pubDate);
    if (sortBy === 'oldest') return new Date(a.pubDate) - new Date(b.pubDate);
    if (sortBy === 'importance') return b.importanceScore - a.importanceScore;
    return 0;
  });

  const getScoreColor = (score) => {
    if (score >= 9.0) return 'rgb(239, 68, 68)'; // red critical
    if (score >= 8.0) return 'rgb(249, 115, 22)'; // orange high
    return 'rgb(59, 130, 246)'; // blue medium/low
  };

  const formatDate = (isoString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(isoString).toLocaleDateString('en-US', options);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Search & Filter Header Control Bar */}
      <div 
        className="glass-panel"
        style={{
          padding: '1.25rem',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Quick Filters Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Filter size={16} />
            <span>Filters ({sortedArticles.length} articles found)</span>
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => handleFilterChange(() => setSortBy(e.target.value))}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '0.35rem 0.65rem',
                color: 'var(--text-main)',
                fontSize: '0.8rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="importance">Highest Importance</option>
            </select>
          </div>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}
        >
          {/* Category Dropdown Filter */}
          <div className="form-group" style={{ margin: 0 }}>
            <label>Topic Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleFilterChange(() => setSelectedCategory(e.target.value))}
              style={{
                width: '100%',
                padding: '0.55rem',
                borderRadius: '8px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)'
              }}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Importance Score Slider */}
          <div className="form-group" style={{ margin: 0, justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <label>Min Importance Score</label>
              <span style={{ fontWeight: 700, color: 'rgb(6, 182, 212)' }}>{minScore.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={minScore}
              onChange={(e) => handleFilterChange(() => setMinScore(parseFloat(e.target.value)))}
              style={{
                width: '100%',
                marginTop: '0.45rem',
                cursor: 'pointer',
                accentColor: 'rgb(59, 130, 246)'
              }}
            />
          </div>

          {/* Text Search Input Filter */}
          <div className="form-group" style={{ margin: 0 }}>
            <label>Keyword Filter</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Search source/summary..."
                value={searchQuery}
                onChange={(e) => handleFilterChange(() => setSearchQuery(e.target.value))}
                className="form-input"
                style={{ paddingLeft: '2.25rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid / Skeletons / Empty state */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className="glass-panel" 
              style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="skeleton" style={{ width: '60px', height: '20px', borderRadius: '10px' }} />
                <div className="skeleton" style={{ width: '80px', height: '20px', borderRadius: '10px' }} />
              </div>
              <div className="skeleton skeleton-title" style={{ width: '80%', height: '24px' }} />
              <div className="skeleton skeleton-text" style={{ height: '14px' }} />
              <div className="skeleton skeleton-text" style={{ width: '90%', height: '14px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <div className="skeleton" style={{ width: '100px', height: '32px', borderRadius: '6px' }} />
                <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : sortedArticles.length === 0 ? (
        /* Empty State */
        <div 
          className="glass-panel"
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}
          >
            <BookOpen size={28} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No Research Found</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '380px' }}>
            No articles match the current filtering matrix. Try lowering the importance threshold or typing a different keyword.
          </p>
          <button 
            onClick={() => handleFilterChange(() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setMinScore(1);
            })}
            className="btn btn-secondary btn-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        /* News List */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {sortedArticles.map((art) => {
            const isSaved = savedArticles.some(s => s.id === art.id);
            const badgeClass = `badge badge-${art.category.toLowerCase().split(' ')[0]}`;
            
            return (
              <article 
                key={art.id}
                className="glass-panel hover-card"
                style={{
                  padding: '1.5rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
              >
                {/* Meta details header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span className={badgeClass}>{art.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} />
                      {formatDate(art.pubDate)}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• {art.source}</span>
                  </div>
                  
                  {/* Importance score pill */}
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>IMPORTANCE</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: getScoreColor(art.importanceScore) }}>
                      {art.importanceScore.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.3 }}>{art.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{art.summary}</p>

                {/* Footer Controls */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0.5rem',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '0.75rem'
                  }}
                >
                  <button 
                    onClick={() => setSelectedArticle(art)}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '4px' }}
                  >
                    <Eye size={14} />
                    <span>Read Analysis</span>
                  </button>

                  <button 
                    onClick={() => toggleSaveArticle(art)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: isSaved ? 'rgb(139, 92, 246)' : 'var(--text-muted)',
                      padding: '8px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isSaved ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSaved ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid var(--border-color)',
                      transition: 'all var(--transition-fast)'
                    }}
                    title={isSaved ? "Saved to Bookmarks" : "Save Article"}
                  >
                    <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '720px',
              maxHeight: '85vh',
              overflowY: 'auto',
              borderRadius: '16px',
              backgroundColor: 'var(--bg-sidebar)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-lg)',
              animation: 'slideUp 0.3s ease-out',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span className={`badge badge-${selectedArticle.category.toLowerCase().split(' ')[0]}`}>
                  {selectedArticle.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {formatDate(selectedArticle.pubDate)}
                </span>
              </div>
              <button 
                onClick={() => setSelectedArticle(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Importance & Metadata info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>Source: <strong>{selectedArticle.source}</strong></span>
                  <span style={{ margin: '0 8px' }}>|</span>
                  <span>Author: {selectedArticle.author || 'Staff'}</span>
                  <span style={{ margin: '0 8px' }}>|</span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>IMPORTANCE SCORE</span>
                  <span 
                    style={{ 
                      padding: '4px 10px', 
                      borderRadius: '8px', 
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.9rem', 
                      fontWeight: 800, 
                      color: getScoreColor(selectedArticle.importanceScore) 
                    }}
                  >
                    {selectedArticle.importanceScore.toFixed(1)} / 10.0
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, lineHeight: 1.3 }}>
                {selectedArticle.title}
              </h2>

              {/* Executive summary block (highlighted) */}
              <div 
                style={{
                  padding: '1.15rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(139, 92, 246, 0.06)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'rgb(216, 180, 254)', textTransform: 'uppercase' }}>
                  <Sparkles size={14} />
                  AI Executive Summary
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {selectedArticle.summary}
                </p>
              </div>

              {/* Full Content */}
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Detailed Article Content</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {selectedArticle.content}
                </p>
              </div>

              {/* Why it matters section */}
              {selectedArticle.whyItMatters && (
                <div 
                  style={{
                    padding: '1.15rem',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(59, 130, 246, 0.06)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'rgb(147, 197, 253)', textTransform: 'uppercase' }}>
                    <BookOpen size={14} />
                    Why It Matters (AI Analyst View)
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                    {selectedArticle.whyItMatters}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div 
              style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }}
            >
              <a 
                href={selectedArticle.url} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary btn-sm"
                style={{ gap: '6px' }}
              >
                <span>Read Original RSS Feed</span>
                <ExternalLink size={12} />
              </a>

              <button 
                onClick={() => {
                  toggleSaveArticle(selectedArticle);
                }}
                className="btn btn-secondary btn-sm"
              >
                <Bookmark size={12} fill={savedArticles.some(s => s.id === selectedArticle.id) ? "currentColor" : "none"} />
                <span>
                  {savedArticles.some(s => s.id === selectedArticle.id) ? 'Saved' : 'Bookmark'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
