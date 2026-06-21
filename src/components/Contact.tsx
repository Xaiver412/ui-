import './Contact.css'

const contacts = [
  {
    label: 'QQ',
    value: '2022657252',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
    ),
  },
  {
    label: '微信',
    value: 'Collapsar_Ari',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89l-.001-.032zm-2.131 2.5c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/>
      </svg>
    ),
  },
  {
    label: '邮箱',
    value: '2022657252@qq.com',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="contact__header">
        <p className="contact__eyebrow tag-mono">LET'S TALK</p>
        <h2 className="contact__name">叶晓璐</h2>
      </div>

      <div className="contact__divider" />

      <div className="contact__body container">
        <p className="contact__more-label">关于我的更多信息</p>
        <div className="contact__grid">
          {contacts.map((item) => (
            <div key={item.label} className="contact__item">
              <div className="contact__item-icon">{item.icon}</div>
              <div className="contact__item-content">
                <span className="contact__item-label">{item.label}</span>
                <span className="contact__item-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact__divider" />

      <div className="contact__footer">
        <p className="contact__copyright">© 2026 WILDLIN · 叶晓璐 · 界面与动效</p>
      </div>
    </footer>
  )
}
