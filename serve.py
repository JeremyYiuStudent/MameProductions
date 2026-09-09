"""Local dev server for the site.

    python serve.py            # http://127.0.0.1:8000
    python serve.py 8080       # another port

Identical to `python -m http.server` except every response carries
`Cache-Control: no-store`. Without it the browser applies heuristic caching to
the data files and stylesheet (the stock server sends no cache headers), and an
edit to data/members.js can take minutes to show up even after a reload.
GitHub Pages sets real cache headers in production, so this only matters here.
"""

import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoStoreHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    with ThreadingHTTPServer(("127.0.0.1", port), NoStoreHandler) as httpd:
        print(f"Serving on http://127.0.0.1:{port}  (Ctrl+C to stop)")
        httpd.serve_forever()
