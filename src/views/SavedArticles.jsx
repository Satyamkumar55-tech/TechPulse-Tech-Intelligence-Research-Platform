import React, { useState } from 'react';
import { Bookmark, Search, Trash2, Calendar, Eye, BookmarkCheck } from 'lucide-react';

export default function SavedArticles({ 
  savedArticles, 
  toggleSaveArticle, 
  setSelectedArticleDetails 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI', 'Cybersecurity', 'Startups', 'Cloud Computing', 'Software Development'];

  // Apply filters
  const filteredSaved = savedArticles.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.source.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (isoString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(isoString).toLocaleDateString('en-US', options);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Search and Category filters */}
      {savedArticles.length > 0 && (
        <div 
          className="glass-panel"
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          {/* Keyword Search Input */}
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search saved research..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.25rem', paddingTop: '0.45rem', paddingBottom: '0.45rem' }}
            />
          </div>

          {/* Category Filter Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.45rem 0.75rem',
                color: 'var(--text-main)',
                fontSize: '0.82rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {savedArticles.length === 0 ? (
        /* Empty Bookmark State */
        <div 
          className="glass-panel"
          style={{
            padding: '5rem 2rem',
            textAlign: 'center',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem'
          }}
        >
          <div 
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'rgba(139, 92, 246, 0.08)',
              border: '2px dashed rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgb(216, 180, 254)'
            }}
          >
            <BookmarkCheck size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Saved Research Portfolio Empty</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '420px', marginTop: '0.4rem', lineHeight: 1.5 }}>
              Use the bookmark buttons on the <strong>News Feed</strong> or within <strong>AI Reports</strong> to pin critical technology articles here for offline research.
            </p>
          </div>
        </div>
      ) : filteredSaved.length === 0 ? (
        /* Search Empty State */
        <div 
          className="glass-panel"
          style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No saved articles match your search criteria.
          </p>
        </div>
      ) : (
        /* Saved Articles Grid */
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filteredSaved.map((art) => {
            const badgeClass = `badge badge-${art.category.toLowerCase().split(' ')[0]}`;
            return (
              <div 
                key={art.id}
                className="glass-panel hover-card"
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  position: 'relative'
                }}
              >
                {/* Meta details Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={badgeClass} style={{ fontSize: '0.68rem' }}>{art.category}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={10} />
                    {formatDate(art.pubDate)}
                  </span>
                </div>

                {/* Content */}
                <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, height: '2.6rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {art.title}
                </h3>
                
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, height: '4.2rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                  {art.summary}
                </p>

                {/* Controls */}
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '0.75rem',
                    marginTop: '0.5rem'
                  }}
                >
                  <button 
                    onClick={() => setSelectedArticleDetails(art)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', gap: '4px' }}
                  >
                    <Eye size={12} />
                    <span>View Analysis</span>
                  </button>

                  <button 
                    onClick={() => toggleSaveArticle(art)}
                    className="btn btn-outline btn-sm"
                    style={{ 
                      padding: '6px', 
                      borderRadius: '50%', 
                      color: 'rgb(239, 68, 68)',
                      borderColor: 'rgba(239, 68, 68, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Remove Bookmark"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
