# WP-Lens 🔍

**Modern WordPress Security Scanner Report Viewer**

WP-Lens is a beautiful, fast, and comprehensive web application for analyzing WPScan security reports. It transforms complex JSON reports into crystal-clear, interactive visualizations that help you understand your WordPress security posture at a glance.

![WP-Lens Demo](https://img.shields.io/badge/Status-Active-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 🎨 **Beautiful Gradient UI** - Stunning visual design with smooth animations
- ⚡ **Lightning Fast** - Optimized performance with efficient rendering
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔒 **Comprehensive Analysis** - Complete WPScan report breakdown including:
  - WordPress core vulnerabilities
  - Plugin security issues
  - Theme vulnerabilities
  - User enumeration results
  - Interesting findings
  - Detailed security statistics
- 🎯 **Drag & Drop Upload** - Simply drag your JSON report or click to browse
- 📊 **Interactive Tabs** - Organized sections for easy navigation
- 🔗 **External References** - Direct links to CVE, WPVDB, and other security resources
- 🏷️ **Smart Badges** - Clear visual indicators for vulnerability severity and status

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/wp-lens.git
   cd wp-lens
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the application**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Development Mode

For development with auto-reload:

```bash
npm run dev
```

## 📋 Usage

1. **Start the application** using the installation steps above
2. **Upload your WPScan report** by either:
   - Dragging and dropping your `wpscan-report.json` file onto the upload area
   - Clicking "Choose File" and selecting your JSON report
3. **Explore the results** using the intuitive tab navigation:
   - **Overview**: Quick statistics and scan summary
   - **WordPress**: Core version and theme information
   - **Plugins**: Detected plugins with version and security status
   - **Themes**: Theme analysis and vulnerability detection
   - **Vulnerabilities**: Detailed security issues with references
   - **Users**: Enumerated users and detection methods
   - **Findings**: Interesting discoveries and potential issues

## 🔧 Project Structure

```
wp-lens/
├── public/              # Static web assets
│   ├── index.html      # Main HTML file
│   ├── script.js       # Client-side JavaScript
│   └── styles.css      # Optimized CSS
├── src/                # Source files
│   └── input.css       # Tailwind CSS input (optional)
├── web/                # Original reference implementation
├── file/               # Sample WPScan reports
├── server.js           # Express.js server
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🎨 Design Philosophy

WP-Lens was designed with these principles in mind:

- **Clarity First**: Security data should be immediately understandable
- **Performance Matters**: Fast loading and smooth interactions
- **Beautiful by Default**: Professional appearance that inspires confidence
- **Accessibility**: Usable by everyone, regardless of technical expertise

## 🛠️ API Endpoints

- `GET /` - Main application interface
- `POST /api/upload` - Upload and process WPScan JSON reports

## 📊 Supported WPScan Data

WP-Lens intelligently parses and displays:

- **Target Information**: URL, IP, scan timing
- **WordPress Core**: Version, status, vulnerabilities
- **Plugins**: Installed plugins, versions, security status
- **Themes**: Active and installed themes
- **Vulnerabilities**: CVEs, references, fix information
- **Users**: Enumerated accounts and detection methods
- **Findings**: Backup files, config files, interesting URLs

## 🔒 Security & Privacy

- **Client-Side Processing**: Your WPScan reports are processed locally in your browser
- **No Data Storage**: Reports are not saved or transmitted to external servers
- **Secure Upload**: File validation ensures only valid JSON files are processed
- **CORS Protection**: Secure cross-origin resource sharing

## 🎯 Performance Optimizations

- **Lightweight**: No heavy frameworks or unnecessary dependencies
- **Efficient Rendering**: Optimized DOM manipulation
- **Lazy Loading**: Content loads only when needed
- **Memory Efficient**: Proper cleanup and garbage collection

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development mode with auto-reload
- `npm run build` - Build optimized CSS
- `npm run watch-css` - Watch CSS changes during development

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use**

```bash
# Kill existing processes
pkill -f "node server.js"
# Or use a different port
PORT=3001 npm start
```

**Upload fails**

- Ensure your file is a valid JSON file
- Check file size (50MB limit)
- Verify the file is a valid WPScan report

**Slow performance**

- Close unnecessary browser tabs
- Check system resources
- Try clearing browser cache

## 📚 Resources

- [WPScan Documentation](https://wpscan.com/)
- [WordPress Security Handbook](https://developer.wordpress.org/advanced-administration/security/)
- [CVE Database](https://cve.mitre.org/)
- [WPVulnDB](https://wpvulndb.com/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- WPScan team for their excellent security scanner
- Font Awesome for beautiful icons
- The WordPress security community

## 📞 Support

- 🐛 [Report Issues](https://github.com/yourusername/wp-lens/issues)
- 💬 [Discussions](https://github.com/yourusername/wp-lens/discussions)
- 📧 Email: support@wp-lens.com

---

<div align="center">
  <strong>Made with ❤️ for WordPress Security</strong><br>
  <em>Focus on WordPress Security with Crystal Clear Analysis</em>
</div>
