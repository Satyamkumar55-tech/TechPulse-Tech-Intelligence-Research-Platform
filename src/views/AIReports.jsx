import React, { useState } from 'react';
import { 
  FileDown, 
  Printer, 
  Share2, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  CheckCircle,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function AIReports({ reports, articles }) {
  const [selectedReportId, setSelectedReportId] = useState(reports[0]?.id || '');
  const [toastMessage, setToastMessage] = useState('');

  const activeReport = reports.find(r => r.id === selectedReportId) || reports[0];

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const getArticleDetails = (artId) => {
    return articles.find(a => a.id === artId);
  };

  const handleShare = () => {
    const shareUrl = `https://techpulse.ai/reports/share/${activeReport.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      triggerToast("Report link copied to clipboard successfully!");
    }).catch(() => {
      triggerToast("Failed to copy link. Please try again.");
    });
  };

  const handleDownloadMarkdown = () => {
    if (!activeReport) return;

    let md = `# ${activeReport.title} (${activeReport.date})\n\n`;
    md += `## Executive Summary\n${activeReport.summary}\n\n`;
    md += `## Key Takeaways\n`;
    activeReport.takeaways.forEach(tk => {
      md += `- ${tk.replace(/\*\*/g, '**')}\n`;
    });
    md += `\n## Selected Research Articles\n\n`;
    activeReport.articles.forEach(artId => {
      const art = getArticleDetails(artId);
      if (art) {
        md += `### ${art.title}\n`;
        md += `- **Source**: ${art.source}\n`;
        md += `- **Category**: ${art.category}\n`;
        md += `- **Importance Score**: ${art.importanceScore}/10.0\n`;
        md += `- **AI Summary**: ${art.summary}\n\n`;
      }
    });
    md += `## Industry Insights\n`;
    activeReport.insights.forEach(ins => {
      md += `- ${ins}\n`;
    });
    md += `\n## Why It Matters\n${activeReport.whyItMatters}\n\n`;
    md += `*Generated automatically by TechPulse AI News Research Agent.*`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${activeReport.title.toLowerCase().replace(/\s+/g, '-')}-${activeReport.date}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Markdown report file download started.");
  };

  const handlePrint = () => {
    window.print();
  };

  const getScoreColor = (score) => {
    if (score >= 9.0) return 'rgb(239, 68, 68)';
    if (score >= 8.0) return 'rgb(249, 115, 22)';
    return 'rgb(59, 130, 246)';
  };

  if (!activeReport) {
    return (
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderRadius: '12px' }}>
        No reports generated yet.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
      
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0.8rem 1.5rem',
            borderRadius: '24px',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            color: '#ffffff',
            fontSize: '0.82rem',
            fontWeight: 600,
            border: '1.5px solid rgba(139, 92, 246, 0.5)',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5), var(--shadow-glow-purple)',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle size={16} color="rgb(16, 185, 129)" />
          {toastMessage}
        </div>
      )}

      {/* Selector and Actions Bar */}
      <div 
        className="glass-panel hide-on-print"
        style={{
          padding: '1.25rem',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {/* Report Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Calendar size={18} color="var(--text-muted)" />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Select Report:</span>
          <select
            value={selectedReportId}
            onChange={(e) => setSelectedReportId(e.target.value)}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.45rem 0.85rem',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {reports.map((rep) => (
              <option key={rep.id} value={rep.id}>
                {rep.title} ({rep.date})
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            onClick={handleDownloadMarkdown} 
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
            title="Download Report in Markdown format"
          >
            <FileDown size={14} />
            <span>Markdown</span>
          </button>

          <button 
            onClick={handlePrint} 
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
            title="Print report or save as PDF"
          >
            <Printer size={14} />
            <span>Export PDF</span>
          </button>

          <button 
            onClick={handleShare} 
            className="btn btn-accent btn-sm"
            style={{ gap: '6px' }}
            title="Copy shareable link"
          >
            <Share2 size={14} />
            <span>Share Report</span>
          </button>
        </div>
      </div>

      {/* Main Report Document Print Container */}
      <div 
        className="glass-panel print-document"
        style={{
          padding: '2.5rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          backgroundColor: 'var(--bg-card)'
        }}
      >
        {/* Document Header */}
        <div 
          style={{ 
            borderBottom: '2px solid var(--border-color)', 
            paddingBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem' 
          }}
        >
          <div>
            <span 
              style={{ 
                fontSize: '0.72rem', 
                color: 'rgb(6, 182, 212)', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '4px'
              }}
            >
              Verified AI Analyst Briefing
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
              {activeReport.title}
            </h1>
          </div>
          
          <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div>Date Generated: <strong>{activeReport.date}</strong></div>
            <div>Classification: <strong>Enterprise Research</strong></div>
          </div>
        </div>

        {/* Executive Summary Card */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} color="rgb(59, 130, 246)" />
            Executive Summary
          </h2>
          <p 
            style={{ 
              fontSize: '0.92rem', 
              color: 'var(--text-main)', 
              lineHeight: 1.6,
              padding: '1.25rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.01)',
              border: '1px solid var(--border-color)' 
            }}
          >
            {activeReport.summary}
          </p>
        </div>

        {/* Articles List */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} color="rgb(139, 92, 246)" />
            Selected Core Research Articles
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activeReport.articles.map((artId, idx) => {
              const art = getArticleDetails(artId);
              if (!art) return null;
              
              return (
                <div 
                  key={artId}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>0{idx + 1}.</span>
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 700 }}>{art.title}</h3>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className={`badge badge-${art.category.toLowerCase().split(' ')[0]}`} style={{ fontSize: '0.68rem' }}>
                        {art.category}
                      </span>
                      <span 
                        style={{ 
                          fontSize: '0.72rem', 
                          fontWeight: 700,
                          color: getScoreColor(art.importanceScore),
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--border-color)'
                        }}
                      >
                        Score: {art.importanceScore.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                    <strong>AI Executive Summary:</strong> {art.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industry Insights Cards */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="rgb(6, 182, 212)" />
            Industry Insights
          </h2>
          
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem'
            }}
          >
            {activeReport.insights.map((ins, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '1.15rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(6, 182, 212, 0.05)',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  color: 'var(--text-main)'
                }}
              >
                <div style={{ fontWeight: 700, color: 'rgb(165, 243, 252)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} />
                  Insight 0{idx + 1}
                </div>
                {ins}
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaways */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={18} color="rgb(16, 185, 129)" />
            Key Takeaways
          </h2>
          <div
            style={{
              padding: '1.25rem',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'rgba(255,255,255,0.01)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}
          >
            {activeReport.takeaways.map((takeaway, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.85rem', lineHeight: 1.5 }}>
                <span style={{ color: 'rgb(16, 185, 129)', fontWeight: 700, marginTop: '2px' }}>✓</span>
                <span dangerouslySetInnerHTML={{ __html: takeaway }} />
              </div>
            ))}
          </div>
        </div>

        {/* Why it Matters professional card */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} color="rgb(249, 115, 22)" />
            Why It Matters (Analyst Assessment)
          </h2>
          <div 
            style={{
              padding: '1.25rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(249, 115, 22, 0.05)',
              border: '1px solid rgba(249, 115, 22, 0.2)',
              fontSize: '0.88rem',
              lineHeight: 1.6,
              color: 'var(--text-main)'
            }}
          >
            {activeReport.whyItMatters}
          </div>
        </div>

      </div>

      {/* Print Specific CSS Stylesheet injection */}
      <style>{`
        @media print {
          /* Hide app layout elements */
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          aside, header, .hide-on-print, .chat-fab, footer {
            display: none !important;
          }
          .main-content {
            margin: 0 !important;
            padding: 0 !important;
          }
          .content-body {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          .print-document {
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
            box-shadow: none !important;
            color: #000000 !important;
          }
          .print-document * {
            color: #000000 !important;
            border-color: #cccccc !important;
          }
          .print-document h1, .print-document h2, .print-document h3 {
            page-break-after: avoid;
          }
          .badge {
            border: 1px solid #000000 !important;
            color: #000000 !important;
            background: transparent !important;
          }
        }
      `}</style>

    </div>
  );
}
