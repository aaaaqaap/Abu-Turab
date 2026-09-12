let selectedCode = '964';
        let isSearching = false;
        let isFbSearching = false;

        document.querySelectorAll('.country-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                selectedCode = this.dataset.code;
                document.getElementById('phonePrefix').textContent = '+' + selectedCode;
            });
        });

        async function loadIPInfo() {
            try {
                let res = await fetch('/api/ipinfo');
                let data = await res.json();
                document.getElementById('userIP').textContent = data.ip || 'غير معروف';
                document.getElementById('userCountry').textContent = data.country || 'غير معروف';
                document.getElementById('userCity').textContent = data.city || 'غير معروف';
                document.getElementById('userISP').textContent = data.isp || 'غير معروف';
                document.getElementById('userRegion').textContent = data.region || 'غير معروف';
            } catch(e) {
                document.getElementById('userIP').textContent = 'خطأ في التحميل';
            }
        }
        loadIPInfo();

        async function searchFacebook() {
            if (isFbSearching) return;
            let query = document.getElementById('fbSearchInput').value.trim();
            if (!query) { alert('⚠️ الرجاء إدخال اسم الصفحة أو الشخص'); return; }
            
            isFbSearching = true;
            let loader = document.getElementById('fbLoader');
            let results = document.getElementById('fbResults');
            let searchBtn = document.getElementById('fbSearchBtn');
            
            loader.style.display = 'block';
            results.className = 'results-area';
            results.innerHTML = '';
            searchBtn.disabled = true;
            
            try {
                let res = await fetch('/api/facebook/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: query })
                });
                let data = await res.json();
                
                loader.style.display = 'none';
                searchBtn.disabled = false;
                isFbSearching = false;
                results.className = 'results-area active';
                
                if (data.error) {
                    results.innerHTML = `<div style="color:#ff6b6b;text-align:center;padding:30px;">⚠️ ${data.error}</div>`;
                    return;
                }
                
                if (data.results && data.results.length > 0) {
                    let html = `
                        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;background:rgba(0,0,0,0.25);border-radius:14px;padding:16px 20px;margin-bottom:20px;border:1px solid rgba(24,119,242,0.15);">
                            <div style="text-align:center;"><div style="color:var(--text-muted);font-size:11px;font-weight:700;">نتائج البحث</div><div style="color:#1877f2;font-size:16px;font-weight:900;">${data.results.length}</div></div>
                        </div>
                    `;
                    data.results.forEach((item, idx) => {
                        html += `
                            <div class="fb-result-item">
                                <div style="color:var(--text-muted);font-size:12px;font-weight:700;margin-bottom:8px;">✦ النتيجة ${idx+1}</div>
                                <div class="row"><span class="key">📌 الاسم</span><span class="val">${item.name}</span></div>
                                <div class="row"><span class="key">🆔 المعرف</span><span class="val">${item.id}</span></div>
                                <div class="row"><span class="key">🔗 الرابط</span><span class="val"><a href="${item.link}" target="_blank">${item.link}</a></span></div>
                            </div>
                        `;
                    });
                    results.innerHTML = html;
                } else {
                    results.innerHTML = `
                        <div style="text-align:center;padding:40px;color:var(--text-muted);">
                            <i class="fab fa-facebook" style="font-size:35px;display:block;margin-bottom:12px;color:#1877f2;"></i>
                            لا توجد نتائج
                        </div>
                    `;
                }
            } catch(e) {
                loader.style.display = 'none';
                searchBtn.disabled = false;
                isFbSearching = false;
                results.className = 'results-area active';
                results.innerHTML = '<div style="color:#ff6b6b;text-align:center;padding:30px;">⚠️ حدث خطأ</div>';
            }
        }

        async function startSearch() {
            if (isSearching) return;
            let phone = document.getElementById('phoneInput').value.trim();
            if (!phone) { alert(' الرجاء إدخال رقم الهاتف'); return; }
            phone = phone.replace(/[^0-9+]/g, '');
            if (phone.startsWith('+')) {
                let match = phone.match(/^\+(\d+)/);
                if (match) {
                    selectedCode = match[1];
                    phone = phone.substring(selectedCode.length + 1);
                    document.querySelectorAll('.country-btn').forEach(b => { b.classList.toggle('active', b.dataset.code === selectedCode); });
                    document.getElementById('phonePrefix').textContent = '+' + selectedCode;
                }
            }
            phone = phone.replace(/^0+/, '');
            if (!phone || phone.length < 6) { alert(' الرجاء إدخال رقم صحيح (6 أرقام على الأقل)'); return; }
            isSearching = true;
            let loader = document.getElementById('loaderArea');
            let results = document.getElementById('resultsArea');
            let searchBtn = document.getElementById('searchBtn');
            loader.style.display = 'block';
            results.className = 'results-area';
            results.innerHTML = '';
            searchBtn.disabled = true;
            try {
                let res = await fetch('/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: selectedCode, phone: phone })
                });
                let data = await res.json();
                loader.style.display = 'none';
                searchBtn.disabled = false;
                isSearching = false;
                results.className = 'results-area active';
                renderResults(data);
                updateStats();
            } catch (e) {
                loader.style.display = 'none';
                searchBtn.disabled = false;
                isSearching = false;
                results.className = 'results-area active';
                results.innerHTML = '<div style="color:#ff6b6b;text-align:center;padding:30px;"> حدث خطأ</div>';
            }
        }

        function renderResults(data) {
            let html = '';
            html += `
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;background:rgba(0,0,0,0.25);border-radius:14px;padding:16px 20px;margin-bottom:20px;border:1px solid rgba(212,175,55,0.08);">
                    <div style="text-align:center;"><div style="color:var(--text-muted);font-size:11px;font-weight:700;">رقم الهاتف</div><div style="color:var(--gold);font-size:16px;font-weight:900;">${data.phone || 'N/A'}</div></div>
                    <div style="text-align:center;"><div style="color:var(--text-muted);font-size:11px;font-weight:700;">المصدر</div><div style="font-size:14px;font-weight:700;color:${data.source === 'cache' ? '#4ade80' : '#ffd700'};">${data.source === 'cache' ? ' محفوظ' : 'جديد'}</div></div>
                    <div style="text-align:center;"><div style="color:var(--text-muted);font-size:11px;font-weight:700;">النتائج</div><div style="color:var(--gold);font-size:16px;font-weight:900;">${data.results ? data.results.length : 0}</div></div>
                </div>
            `;
            let cleanPhone = data.phone ? data.phone.replace('+', '') : '';
            html += `
                <div style="display:flex;gap:12px;margin-bottom:18px;flex-wrap:wrap;">
                    <a href="https://wa.me/${cleanPhone}" target="_blank" style="flex:1;background:#25D366;color:#fff;padding:14px;border-radius:14px;text-align:center;text-decoration:none;font-weight:800;min-width:120px;transition:all 0.3s;"><i class="fab fa-whatsapp"></i> واتساب</a>
                    <a href="https://t.me/${cleanPhone}" target="_blank" style="flex:1;background:#0088cc;color:#fff;padding:14px;border-radius:14px;text-align:center;text-decoration:none;font-weight:800;min-width:120px;transition:all 0.3s;"><i class="fab fa-telegram"></i> تليجرام</a>
                </div>
            `;
            if (data.results && data.results.length > 0) {
                data.results.forEach((item, idx) => {
                    html += `<div class="result-item">`;
                    html += `<div style="color:var(--text-muted);font-size:12px;font-weight:700;margin-bottom:8px;">✦ النتيجة ${idx+1}</div>`;
                    if (typeof item === 'object') {
                        for (let [key, value] of Object.entries(item)) {
                            if (value && value !== 'N/A' && value !== 'null') {
                                html += `<div class="row"><span class="key">${key}</span><span class="val">${value}</span></div>`;
                            }
                        }
                    }
                    html += `</div>`;
                });
            } else {
                html += `
                    <div style="text-align:center;padding:40px;color:var(--text-muted);">
                        <i class="fas fa-inbox" style="font-size:35px;display:block;margin-bottom:12px;color:var(--gold);"></i>
                        لا توجد نتائج
                    </div>
                `;
            }
            document.getElementById('resultsArea').innerHTML = html;
            document.getElementById('resultsArea').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        async function updateStats() {
            try {
                let res = await fetch('/api/stats');
                let data = await res.json();
                document.getElementById('statCache').textContent = data.cache_count || 0;
                document.getElementById('statSearches').textContent = data.total_searches || 0;
                document.getElementById('statUsers').textContent = data.total_users || 0;
                document.getElementById('statActive').textContent = data.active_users || 0;
            } catch (e) {}
        }

        updateStats();
        setInterval(updateStats, 10000);

        document.getElementById('phoneInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') startSearch();
        });
        document.getElementById('fbSearchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') searchFacebook();
        });
