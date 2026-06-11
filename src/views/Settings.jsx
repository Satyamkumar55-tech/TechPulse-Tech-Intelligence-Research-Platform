import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Sliders, 
  Link, 
  Cpu, 
  Sun, 
  Moon, 
  Check, 
  RefreshCw, 
  Database, 
  Mail, 
  MessageSquare, 
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function SettingsView({ 
  theme, 
  toggleTheme, 
  user, 
  updateUser 
}) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifPreferences, setNotifPreferences] = useState({
    dailyReport: true,
    breakingNews: true,
    weeklyDigest: false,
    emailAlerts: true,
    discordPush: false
  });
  const [preferredCats, setPreferredCats] = useState(['AI', 'Cybersecurity', 'Software Development']);
  
  // Integration endpoints state
  const [n8nWebhook, setN8nWebhook] = useState('https://n8n.internal.techpulse.ai/webhook/v1/sync');
  const [openaiKey, setOpenaiKey] = useState('sk-proj-••••••••••••••••••••');
  const [gSheetsUrl, setGSheetsUrl] = useState('https://docs.google.com/spreadsheets/d/1tPulseAI...');
  const [gmailAddr, setGmailAddr] = useState('satyam.dev@gmail.com');
  const [discordWebhook, setDiscordWebhook] = useState('https://discord.com/api/webhooks/9821...');
  
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const categories = ['AI', 'Cybersecurity', 'Startups', 'Cloud Computing', 'Software Development'];

  const handleTogglePref = (pref) => {
    setNotifPreferences(prev => ({ ...prev, [pref]: !prev[pref] }));
  };

  const handleToggleCat = (cat) => {
    if (preferredCats.includes(cat)) {
      setPreferredCats(prev => prev.filter(c => c !== cat));
    } else {
      setPreferredCats(prev => [...prev, cat]);
    }
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    updateUser({ name, email });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleTriggerSync = () => {
    setSyncing(true);
    setSyncSuccess(false);
    
    // Simulate n8n workflow execution latency
    setTimeout(() => {
      setSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top section grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}
        className="settings-grid"
      >
        
        {/* Account Details Form */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Settings size={16} color="rgb(59, 130, 246)" />
            Account Management
          </h3>

          <form onSubmit={handleSaveAccount} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Researcher Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label>Registered Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-sm"
              style={{ alignSelf: 'flex-start', marginTop: '0.5rem', minWidth: '100px' }}
            >
              {saveSuccess ? 'Changes Saved!' : 'Save Profile'}
            </button>
          </form>
        </div>

        {/* Theme and Preferences */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Theme switcher */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sun size={16} color="rgb(249, 115, 22)" />
              Interface Theme
            </h3>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => theme === 'light' && toggleTheme()}
                className={`btn btn-sm ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, gap: '4px' }}
              >
                <Moon size={14} />
                <span>Dark Theme</span>
              </button>
              <button
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`btn btn-sm ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, gap: '4px' }}
              >
                <Sun size={14} />
                <span>Light Theme</span>
              </button>
            </div>
          </div>

          {/* Preferred Categories */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sliders size={15} color="rgb(139, 92, 246)" />
              Topic Preferences
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {categories.map((cat) => {
                const isSelected = preferredCats.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => handleToggleCat(cat)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: isSelected ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-input)',
                      borderColor: isSelected ? 'rgba(139, 92, 246, 0.4)' : 'var(--border-color)',
                      color: isSelected ? 'rgb(216, 180, 254)' : 'var(--text-muted)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {isSelected && <Check size={12} />}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Notifications Preferences */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Bell size={16} color="rgb(6, 182, 212)" />
          Notification Control Matrix
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input 
              type="checkbox" 
              checked={notifPreferences.dailyReport} 
              onChange={() => handleTogglePref('dailyReport')}
            />
            <div>
              <strong>Daily AI Briefing Notification</strong>
              <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Receive an alert when the Daily Research Report executes</span>
            </div>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input 
              type="checkbox" 
              checked={notifPreferences.breakingNews} 
              onChange={() => handleTogglePref('breakingNews')}
            />
            <div>
              <strong>Critical Zero-Day Vulnerability Alert</strong>
              <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Send urgent popups for importance score &gt; 9.0 security patches</span>
            </div>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input 
              type="checkbox" 
              checked={notifPreferences.weeklyDigest} 
              onChange={() => handleTogglePref('weeklyDigest')}
            />
            <div>
              <strong>Weekly Tech Digest Briefing</strong>
              <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Deliver summarized developer stack indexes every Monday morning</span>
            </div>
          </label>
        </div>
      </div>

      {/* Integrations Panel & Workflow sync */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Link size={16} color="rgb(16, 185, 129)" />
              SaaS Integrations (n8n / AI Backend Hookups)
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Simulated connections mapping to production automation pipelines.
            </p>
          </div>

          <button
            onClick={handleTriggerSync}
            disabled={syncing}
            className={`btn btn-sm ${syncSuccess ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              gap: '6px', 
              backgroundColor: syncSuccess ? 'rgb(16, 185, 129)' : syncing ? 'rgba(255,255,255,0.05)' : 'var(--bg-card)',
              color: syncSuccess ? '#fff' : 'var(--text-main)'
            }}
          >
            <RefreshCw size={14} className={syncing ? 'sync-spinner' : ''} />
            <span>{syncing ? 'Contacting n8n...' : syncSuccess ? 'Sync Completed!' : 'Run Workflow Sync'}</span>
          </button>
        </div>

        {/* Sync Success notification */}
        {syncSuccess && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.85rem 1.15rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: 'rgb(167, 243, 208)',
              fontSize: '0.8rem',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <CheckCircle2 size={18} color="rgb(16, 185, 129)" />
            <div>
              <strong>Sync Connection Success:</strong> n8n trigger received status 200 OK. 12 RSS nodes parsed, OpenAI summary compiled, Google Sheets database updated, Discord/Gmail dispatches completed.
            </div>
          </div>
        )}

        {/* Inputs list */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}
        >
          {/* n8n Webhook */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RefreshCw size={12} color="rgb(249, 115, 22)" />
              n8n Webhook Endpoint
            </label>
            <input 
              type="text" 
              value={n8nWebhook}
              onChange={(e) => setN8nWebhook(e.target.value)}
              className="form-input" 
              style={{ fontSize: '0.78rem' }}
            />
          </div>

          {/* OpenAI Key */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Cpu size={12} color="rgb(139, 92, 246)" />
              OpenAI API Key
            </label>
            <input 
              type="text" 
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="form-input" 
              style={{ fontSize: '0.78rem' }}
            />
          </div>

          {/* Google Sheets URL */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Database size={12} color="rgb(16, 185, 129)" />
              Google Sheets DB URI
            </label>
            <input 
              type="text" 
              value={gSheetsUrl}
              onChange={(e) => setGSheetsUrl(e.target.value)}
              className="form-input" 
              style={{ fontSize: '0.78rem' }}
            />
          </div>

          {/* Gmail Target */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail size={12} color="rgb(59, 130, 246)" />
              Gmail Alert Recipient
            </label>
            <input 
              type="text" 
              value={gmailAddr}
              onChange={(e) => setGmailAddr(e.target.value)}
              className="form-input" 
              style={{ fontSize: '0.78rem' }}
            />
          </div>

          {/* Discord Webhook */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MessageSquare size={12} color="rgb(6, 182, 212)" />
              Discord Webhook URI
            </label>
            <input 
              type="text" 
              value={discordWebhook}
              onChange={(e) => setDiscordWebhook(e.target.value)}
              className="form-input" 
              style={{ fontSize: '0.78rem' }}
            />
          </div>
        </div>

      </div>

      <style>{`
        .sync-spinner {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}
