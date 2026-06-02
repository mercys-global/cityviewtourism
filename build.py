#!/usr/bin/env python3
"""Rebuild CityView-Landing-standalone.html from the editable jsx/js sources.

The standalone HTML embeds each source file gzip+base64-encoded inside a
`__bundler/manifest` script block, keyed by a stable UUID. The in-browser loader
decompresses them with DecompressionStream('gzip') and feeds them to Babel.

Editing the .jsx files on disk does nothing until this script re-packs them into
the manifest. Run:  python3 build.py
"""
import json, gzip, base64, re, io, sys, os

HTML = os.path.join(os.path.dirname(__file__), 'CityView-Landing-standalone.html')

# UUID -> source file on disk (only the app sources; react/babel/fonts stay as-is)
UUID_FILE = {
    'bcaeae0d-a1b2-4b0c-869f-b7f30fd7d2c3': 'tweaks-panel.jsx',
    '82dbe5b8-6047-4778-bb07-c7a62e5fefee': 'landing-data.jsx',
    '7300b385-8670-40c0-bd90-8add8b9bd80f': 'landing-icons.jsx',
    'be22d42e-b475-4551-8566-a76f109e4053': 'landing-app.jsx',
    '4a0ca1be-045b-4145-85e3-a9a638cb0bb0': 'landing-sections.jsx',
}

def gz(data: bytes) -> bytes:
    buf = io.BytesIO()
    # mtime=0 keeps the output deterministic across rebuilds
    with gzip.GzipFile(fileobj=buf, mode='wb', mtime=0) as f:
        f.write(data)
    return buf.getvalue()

def main():
    html = open(HTML, encoding='utf-8').read()
    m = re.search(r'(<script type="__bundler/manifest">\s*)(\{.*?\})(\s*</script>)', html, re.S)
    if not m:
        sys.exit('manifest block not found')
    manifest = json.loads(m.group(2))

    changed = []
    for uuid, fn in UUID_FILE.items():
        if uuid not in manifest:
            sys.exit(f'manifest missing uuid for {fn}')
        path = os.path.join(os.path.dirname(__file__), fn)
        raw = open(path, 'rb').read()
        manifest[uuid]['compressed'] = True
        manifest[uuid]['data'] = base64.b64encode(gz(raw)).decode('ascii')
        changed.append(f'{fn} ({len(raw):,} bytes)')

    new_manifest = json.dumps(manifest, separators=(',', ':'), ensure_ascii=True)
    new_html = html[:m.start(2)] + new_manifest + html[m.end(2):]
    open(HTML, 'w', encoding='utf-8').write(new_html)
    print('Rebuilt', os.path.basename(HTML))
    for c in changed:
        print('  packed', c)

if __name__ == '__main__':
    main()
