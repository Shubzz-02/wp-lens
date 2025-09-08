let reportData = null

// DOM elements
let uploadSection, reportContent, uploadArea, fileInput

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements after page loads
  uploadSection = document.getElementById('uploadSection')
  reportContent = document.getElementById('reportContent')
  uploadArea = document.getElementById('uploadArea')
  fileInput = document.getElementById('fileInput')

  initializeEventListeners()
})

function initializeEventListeners () {
  // console.log('Initializing event listeners')

  // File input change event
  if (fileInput) {
    fileInput.removeEventListener('change', handleFileSelect)
    fileInput.addEventListener('change', handleFileSelect)
  }

  // Drag and drop events
  if (uploadArea) {
    uploadArea.removeEventListener('dragover', handleDragOver)
    uploadArea.removeEventListener('dragleave', handleDragLeave)
    uploadArea.removeEventListener('drop', handleDrop)

    uploadArea.addEventListener('dragover', handleDragOver)
    uploadArea.addEventListener('dragleave', handleDragLeave)
    uploadArea.addEventListener('drop', handleDrop)
  }
}

function handleDragOver (e) {
  e.preventDefault()
  uploadArea.classList.add('dragover')
}

function handleDragLeave (e) {
  e.preventDefault()
  uploadArea.classList.remove('dragover')
}

function handleDrop (e) {
  e.preventDefault()
  uploadArea.classList.remove('dragover')

  const files = e.dataTransfer.files
  if (files.length > 0) {
    processFile(files[0])
  }
}

function handleFileSelect (e) {
  // console.log('File select event triggered')
  const file = e.target.files[0]
  if (file) {
    // console.log('File selected:', file.name, 'Size:', file.size)
    processFile(file)
  }
}

function processFile (file) {
  // console.log('Processing file:', file.name, 'Type:', file.type)

  if (!file.name.toLowerCase().endsWith('.json')) {
    showError('Please select a valid JSON file')
    return
  }

  // Show loading state immediately
  showLoadingState()

  const reader = new FileReader()

  reader.onload = function (e) {
    // console.log('File read successfully, parsing JSON...')
    try {
      reportData = JSON.parse(e.target.result)
      // console.log('JSON parsed successfully, displaying report...')
      displayReport()
    } catch (error) {
      console.error('JSON parsing error:', error)
      showError('Error parsing JSON file: ' + error.message)
      resetUploadArea()
    }
  }

  reader.onerror = function (error) {
    console.error('File reading error:', error)
    showError('Error reading file')
    resetUploadArea()
  }

  // console.log('Starting to read file...')
  reader.readAsText(file)
}

function showLoadingState () {
  const uploadArea = document.getElementById('uploadArea')
  if (uploadArea) {
    uploadArea.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <h3>Processing...</h3>
            <p>Reading and parsing your WPScan report...</p>
        `
  }
}

function showError (message) {
  // Create toast notification
  const toast = document.createElement('div')
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `
  toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; margin-left: 10px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `
  document.body.appendChild(toast)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove()
    }
  }, 5000)
}

function resetUploadArea () {
  // console.log('Resetting upload area')
  const uploadArea = document.getElementById('uploadArea')
  if (uploadArea) {
    uploadArea.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <h3>Import WPScan Report</h3>
            <p>Drag & drop your wpscan-report.json file here or click to browse</p>
            <input type="file" id="fileInput" accept=".json" hidden>
            <button class="upload-btn" onclick="triggerFileInput()">
                <i class="fas fa-folder-open"></i> Choose File
            </button>
        `

    // Re-initialize event listeners for the new elements
    setTimeout(() => {
      fileInput = document.getElementById('fileInput')
      if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect)
      }
    }, 100)
  }
}

// Simple function to trigger file input (for button onclick)
// eslint-disable-next-line no-unused-vars
function triggerFileInput () {
  // console.log('Trigger file input called')
  const currentFileInput = document.getElementById('fileInput')
  if (currentFileInput) {
    // console.log('File input found, clicking...')
    currentFileInput.click()
  } else {
    // console.log('File input not found!')
  }
}

function displayReport () {
  if (!reportData) {return}

  uploadSection.style.display = 'none'
  reportContent.style.display = 'block'

  // Populate report data efficiently
  populateReportHeader()
  populateOverview()
  populateWordPressInfo()
  populatePlugins()
  populateThemes()
  populateVulnerabilities()
  populateUsers()
  populateFindings()
}

function populateReportHeader () {
  document.getElementById('targetUrl').textContent = reportData.target_url || 'N/A'
  document.getElementById('targetIp').textContent = reportData.target_ip || 'N/A'

  if (reportData.start_time) {
    const date = new Date(reportData.start_time * 1000)
    document.getElementById('scanDate').textContent = date.toLocaleString()
  }

  if (reportData.elapsed) {
    const minutes = Math.floor(reportData.elapsed / 60)
    const seconds = reportData.elapsed % 60
    document.getElementById('scanDuration').textContent = `${minutes}m ${seconds}s`
  }
}

function populateOverview () {
  // Count vulnerabilities efficiently
  let vulnCount = 0
  if (reportData.plugins) {
    Object.values(reportData.plugins).forEach(plugin => {
      if (plugin.vulnerabilities) {
        vulnCount += plugin.vulnerabilities.length
      }
    })
  }
  if (reportData.themes) {
    Object.values(reportData.themes).forEach(theme => {
      if (theme.vulnerabilities) {
        vulnCount += theme.vulnerabilities.length
      }
    })
  }
  if (reportData.version && reportData.version.vulnerabilities) {
    vulnCount += reportData.version.vulnerabilities.length
  }

  // Update stats quickly
  document.getElementById('vulnCount').textContent = vulnCount
  document.getElementById('pluginCount').textContent = reportData.plugins ? Object.keys(reportData.plugins).length : 0
  document.getElementById('themeCount').textContent = reportData.themes ? Object.keys(reportData.themes).length : 0
  document.getElementById('userCount').textContent = reportData.users ? Object.keys(reportData.users).length : 0

  // Create overview summary efficiently
  const overviewContent = document.getElementById('overviewContent')
  const scanInfo = [
    { label: 'Target URL', value: reportData.target_url || 'N/A' },
    { label: 'Target IP', value: reportData.target_ip || 'N/A' },
    { label: 'Scanner Version', value: reportData.banner?.version || 'N/A' },
    { label: 'Requests Made', value: reportData.requests_done || 'N/A' },
    { label: 'Data Received', value: reportData.data_received_humanised || 'N/A' },
    { label: 'Memory Used', value: reportData.used_memory_humanised || 'N/A' }
  ]

  overviewContent.innerHTML = `
        <div class="info-card">
            <h3><i class="fas fa-info-circle"></i> Scan Summary</h3>
            <ul class="info-list">
                ${scanInfo.map(item => `<li>${item.label}: <span>${item.value}</span></li>`).join('')}
            </ul>
        </div>
    `
}

function populateWordPressInfo () {
  const wordpressContent = document.getElementById('wordpressContent')
  let html = ''

  if (reportData.version) {
    const wpInfo = [
      { label: 'Version', value: reportData.version.number || 'Unknown', badge: 'version-badge' },
      { label: 'Release Date', value: reportData.version.release_date || 'N/A' },
      { label: 'Status', value: reportData.version.status || 'Unknown', badge: reportData.version.status === 'latest' ? 'current-badge' : 'outdated-badge' },
      { label: 'Confidence', value: (reportData.version.confidence || 'N/A') + '%' },
      { label: 'Detection Method', value: reportData.version.found_by || 'N/A' }
    ]

    html += `
            <div class="info-card">
                <h3><i class="fab fa-wordpress"></i> WordPress Version</h3>
                <ul class="info-list">
                    ${wpInfo.map(item => `
                        <li>${item.label}: 
                            <span class="${item.badge || ''}">${item.value}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `
  }

  if (reportData.main_theme) {
    const themeInfo = [
      { label: 'Name', value: reportData.main_theme.slug || 'Unknown' },
      { label: 'Version', value: reportData.main_theme.version?.number || 'Unknown', badge: 'version-badge' },
      { label: 'Latest Version', value: reportData.main_theme.latest_version || 'N/A' },
      { label: 'Status', value: reportData.main_theme.outdated ? 'Outdated' : 'Current', badge: reportData.main_theme.outdated ? 'outdated-badge' : 'current-badge' },
      { label: 'Author', value: reportData.main_theme.author || 'N/A' }
    ]

    html += `
            <div class="info-card">
                <h3><i class="fas fa-paint-brush"></i> Active Theme</h3>
                <ul class="info-list">
                    ${themeInfo.map(item => `
                        <li>${item.label}: 
                            <span class="${item.badge || ''}">${item.value}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `
  }

  wordpressContent.innerHTML = html || '<div class="no-data">No WordPress information available</div>'
}

function populatePlugins () {
  const pluginsContent = document.getElementById('pluginsContent')

  if (!reportData.plugins || Object.keys(reportData.plugins).length === 0) {
    pluginsContent.innerHTML = '<div class="no-data">No plugins detected</div>'
    return
  }

  const pluginCards = Object.entries(reportData.plugins).map(([slug, plugin]) => {
    const hasVulns = plugin.vulnerabilities && plugin.vulnerabilities.length > 0
    const pluginInfo = [
      { label: 'Version', value: plugin.version?.number || 'Unknown', badge: 'version-badge' },
      { label: 'Latest', value: plugin.latest_version || 'N/A' },
      { label: 'Status', value: plugin.outdated ? 'Outdated' : 'Current', badge: plugin.outdated ? 'outdated-badge' : 'current-badge' },
      { label: 'Confidence', value: (plugin.confidence || 'N/A') + '%' },
      { label: 'Detection', value: plugin.found_by || 'N/A' }
    ]

    return `
            <div class="plugin-card ${hasVulns ? 'has-vulnerabilities' : ''}">
                <div class="plugin-header">
                    <div class="plugin-name">${slug}</div>
                    ${hasVulns ? `<span class="outdated-badge">${plugin.vulnerabilities.length} Vuln${plugin.vulnerabilities.length > 1 ? 's' : ''}</span>` : ''}
                </div>
                <ul class="plugin-info">
                    ${pluginInfo.map(item => `
                        <li>${item.label}: <span class="${item.badge || ''}">${item.value}</span></li>
                    `).join('')}
                </ul>
            </div>
        `
  })

  pluginsContent.innerHTML = `<div class="plugin-grid">${pluginCards.join('')}</div>`
}

function populateThemes () {
  const themesContent = document.getElementById('themesContent')

  if (!reportData.themes || Object.keys(reportData.themes).length === 0) {
    themesContent.innerHTML = '<div class="no-data">No themes detected</div>'
    return
  }

  const themeCards = Object.entries(reportData.themes).map(([slug, theme]) => {
    const hasVulns = theme.vulnerabilities && theme.vulnerabilities.length > 0
    const themeInfo = [
      { label: 'Version', value: theme.version?.number || 'Unknown', badge: 'version-badge' },
      { label: 'Latest', value: theme.latest_version || 'N/A' },
      { label: 'Status', value: theme.outdated ? 'Outdated' : 'Current', badge: theme.outdated ? 'outdated-badge' : 'current-badge' },
      { label: 'Confidence', value: (theme.confidence || 'N/A') + '%' },
      { label: 'Author', value: theme.author || 'N/A' }
    ]

    return `
            <div class="theme-card ${hasVulns ? 'has-vulnerabilities' : ''}">
                <div class="theme-header">
                    <div class="theme-name">${slug}</div>
                    ${hasVulns ? `<span class="outdated-badge">${theme.vulnerabilities.length} Vuln${theme.vulnerabilities.length > 1 ? 's' : ''}</span>` : ''}
                </div>
                <ul class="theme-info">
                    ${themeInfo.map(item => `
                        <li>${item.label}: <span class="${item.badge || ''}">${item.value}</span></li>
                    `).join('')}
                </ul>
            </div>
        `
  })

  themesContent.innerHTML = `<div class="theme-grid">${themeCards.join('')}</div>`
}

function populateVulnerabilities () {
  const vulnerabilitiesContent = document.getElementById('vulnerabilitiesContent')
  let html = ''

  // WordPress core vulnerabilities
  if (reportData.version?.vulnerabilities?.length > 0) {
    html += '<h3><i class="fab fa-wordpress"></i> WordPress Core Vulnerabilities</h3>'
    reportData.version.vulnerabilities.forEach(vuln => {
      html += createVulnerabilityCard(vuln, 'WordPress Core')
    })
  }

  // Plugin vulnerabilities
  if (reportData.plugins) {
    Object.entries(reportData.plugins).forEach(([slug, plugin]) => {
      if (plugin.vulnerabilities?.length > 0) {
        html += `<h3><i class="fas fa-puzzle-piece"></i> ${slug} Plugin Vulnerabilities</h3>`
        plugin.vulnerabilities.forEach(vuln => {
          html += createVulnerabilityCard(vuln, slug)
        })
      }
    })
  }

  // Theme vulnerabilities
  if (reportData.themes) {
    Object.entries(reportData.themes).forEach(([slug, theme]) => {
      if (theme.vulnerabilities?.length > 0) {
        html += `<h3><i class="fas fa-paint-brush"></i> ${slug} Theme Vulnerabilities</h3>`
        theme.vulnerabilities.forEach(vuln => {
          html += createVulnerabilityCard(vuln, slug)
        })
      }
    })
  }

  vulnerabilitiesContent.innerHTML = html || '<div class="no-data">No vulnerabilities detected</div>'
}

function createVulnerabilityCard (vuln, component) {
  let referencesHtml = ''

  // Process references efficiently
  if (vuln.references) {
    const refTypes = [
      { key: 'cve', label: 'CVE', class: 'cve-link', urlPrefix: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=' },
      { key: 'url', label: 'Reference', class: 'reference-link', urlPrefix: '' },
      { key: 'wpvulndb', label: 'WPVDB', class: 'wpvulndb-link', urlPrefix: 'https://wpvulndb.com/vulnerabilities/' },
      { key: 'metasploit', label: 'Metasploit', class: 'metasploit-link', urlPrefix: '' }
    ]

    refTypes.forEach(refType => {
      const refs = vuln.references[refType.key]
      if (refs && refs.length > 0) {
        const links = refs.map(ref => {
          if (refType.key === 'metasploit') {
            return `<span class="${refType.class}"><i class="fas fa-terminal"></i> ${ref}</span>`
          } else {
            const url = refType.urlPrefix + ref
            return `<a href="${url}" target="_blank" class="${refType.class}"><i class="fas fa-external-link-alt"></i> ${refType.label}: ${ref}</a>`
          }
        }).join('')

        referencesHtml += `
                    <div class="vulnerability-detail">
                        <strong>${refType.label}:</strong>
                        <div class="reference-links">${links}</div>
                    </div>
                `
      }
    })
  }

  return `
        <div class="vulnerability-card">
            <h4>${vuln.title || 'Unknown Vulnerability'}</h4>
            <div class="vulnerability-details">
                <div class="vulnerability-detail">
                    <strong>Component:</strong>
                    <span>${component}</span>
                </div>
                <div class="vulnerability-detail">
                    <strong>Fixed In:</strong>
                    <span>${vuln.fixed_in || 'Not specified'}</span>
                </div>
                ${referencesHtml}
            </div>
        </div>
    `
}

function populateUsers () {
  const usersContent = document.getElementById('usersContent')

  if (!reportData.users || Object.keys(reportData.users).length === 0) {
    usersContent.innerHTML = '<div class="no-data">No users detected</div>'
    return
  }

  const userCards = Object.entries(reportData.users).map(([username, user]) => {
    const detectionMethods = []
    if (user.found_by) {detectionMethods.push(user.found_by)}
    if (user.confirmed_by) {
      Object.keys(user.confirmed_by).forEach(method => detectionMethods.push(method))
    }

    return `
            <div class="user-card">
                <div class="user-info">
                    <h4>${username}</h4>
                    <div class="user-id">ID: ${user.id || 'Unknown'}</div>
                </div>
                <div class="user-methods">
                    <strong>Detection Methods:</strong><br>
                    ${detectionMethods.slice(0, 2).join('<br>') || 'Unknown'}
                    ${detectionMethods.length > 2 ? `<br>+${detectionMethods.length - 2} more` : ''}
                </div>
            </div>
        `
  })

  usersContent.innerHTML = userCards.join('')
}

function populateFindings () {
  const findingsContent = document.getElementById('findingsContent')

  if (!reportData.interesting_findings || reportData.interesting_findings.length === 0) {
    findingsContent.innerHTML = '<div class="no-data">No interesting findings</div>'
    return
  }

  const findingCards = reportData.interesting_findings.map(finding => `
        <div class="finding-card">
            <div class="finding-header">
                <div>
                    <h4>${finding.to_s || 'Unknown Finding'}</h4>
                    <a href="${finding.url}" target="_blank" class="finding-url">${finding.url}</a>
                </div>
                <div>
                    <span class="finding-type">${finding.type || 'Unknown'}</span>
                    <span class="confidence-badge">${finding.confidence || 0}% confidence</span>
                </div>
            </div>
            <p><strong>Detection Method:</strong> ${finding.found_by || 'Unknown'}</p>
            ${finding.interesting_entries?.length > 0 ? `
            <div>
                <strong>Details:</strong>
                <ul style="margin-top: 10px; padding-left: 20px;">
                    ${finding.interesting_entries.map(entry => `<li style="margin-bottom: 5px; font-family: 'Courier New', monospace; font-size: 0.9rem;">${entry}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
    `)

  findingsContent.innerHTML = findingCards.join('')
}

// eslint-disable-next-line no-unused-vars
function showTab (tabName) {
  // Hide all tab panes efficiently
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active')
  })

  // Remove active class from all tab buttons
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active')
  })

  // Show selected tab pane
  document.getElementById(tabName).classList.add('active')

  // Add active class to clicked tab button
  event.target.classList.add('active')
}

// eslint-disable-next-line no-unused-vars
function resetViewer () {
  reportData = null
  uploadSection.style.display = 'block'
  reportContent.style.display = 'none'

  // Reset the upload area to its original state
  resetUploadArea()

  // Reset to overview tab
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active')
  })
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active')
  })
  document.getElementById('overview').classList.add('active')
  document.querySelector('.tab-button').classList.add('active')
}
