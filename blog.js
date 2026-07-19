// this is so fucking ugly

function mdToHtml(md) {
    md = md.replace(/^---[\s\S]*?---\n*/, '');
    return md
        .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
            const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const langClass = lang ? ` class="lang-${lang}"` : '';
            return `<pre><code${langClass}>${escaped}</code></pre>`;
        })
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/^> (.*?)(\n|$)/gm, '<blockquote><p>$1</p></blockquote>\n')
        .replace(/^---$/gm, '<hr>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
        .replace(/((?:<li>.*<\/li>\n?)+)/g, match => `<ul>\n${match}</ul>\n`)
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^([^<].+)$/gm, '<p>$1</p>')
        .replace(/<p>\s*<\/p>/g, '')
        .replace(/<\/blockquote>\n<blockquote>/g, '\n');
}

// this is probably a TERRIBLE way to do this
function highlightCode(container) {
    container.querySelectorAll('pre code').forEach(el => {
        const text = el.textContent;
        const lang = el.className.replace('lang-', '') || 'text';
        const keywords = {
            c: ['int', 'void', 'char', 'return', 'if', 'else', 'for', 'while', 'include', 'define', 'stdio', 'printf', 'main', 'unsigned', 'long', 'const', 'static', 'struct', 'typedef', 'enum', 'NULL', 'sizeof'],
            nix: ['description', 'inputs', 'outputs', 'url', 'github', 'nixpkgs', 'legacyPackages', 'x86_64-linux', 'self', 'nixos', 'unstable', 'imports', 'system', 'config', 'pkgs', 'lib', 'with', 'in', 'let', 'rec'],
            python: ['def', 'return', 'if', 'else', 'elif', 'for', 'in', 'while', 'class', 'import', 'from', 'as', 'print', 'True', 'False', 'None', 'self', 'str', 'int', 'list', 'dict', 'f', 'async', 'await', 'range', 'len', 'type']
        };
        const kw = keywords[lang] || [];
        const html = text.split(/(#[^\n]*|\/\/[^\n]*|"[^"]*"|'[^']*'|\b\d+\.?\d*\b|\b\w+\b|\S)/g).map(token => {
            if (kw.includes(token)) return `<span class="hl-kw">${token}</span>`;
            if (/^"[^"]*"$/.test(token) || /^'[^']*'$/.test(token)) return `<span class="hl-str">${token}</span>`;
            if (/^\d+\.?\d*$/.test(token)) return `<span class="hl-num">${token}</span>`;
            if (/^\/\/.*/.test(token) || /^#.*/.test(token)) return `<span class="hl-cm">${token}</span>`;
            return token;
        }).join('');
        el.innerHTML = html;
    });
}

function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function initBlog() {
    const posts = [
        { slug: 'hello-world', title: 'hello, world!', date: '2026-07-20' }
    ];

    const postList = document.getElementById('post-list');
    const blogList = document.getElementById('blog-list');
    const blogView = document.getElementById('blog-view');
    const blogContent = document.getElementById('blog-content');
    const backBtn = document.getElementById('blog-back');

    postList.innerHTML = posts.map(p =>
        `<li><a href="#">${esc(p.title)}</a><span class="post-date">${esc(p.date)}</span></li>`
    ).join('\n');

    postList.querySelectorAll('a').forEach((a, i) => {
        a.addEventListener('click', e => {
            e.preventDefault();
            openPost(posts[i].slug);
        });
    });

    async function openPost(slug) {
        try {
            const resp = await fetch(`/blog/${slug}.md`);
            if (!resp.ok) throw Error('not found');
            let md = await resp.text();
            const html = mdToHtml(md);
            blogContent.innerHTML = html;
            highlightCode(blogContent);
            blogList.style.display = 'none';
            blogView.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch {
            blogContent.innerHTML = '<p>post not found!</p>';
        }
    }

    backBtn.addEventListener('click', () => {
        blogView.style.display = 'none';
        blogList.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
