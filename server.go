package main

import (
	"embed"
	"flag"
	"log"
	"net/http"
)

// web contains the complete CyberOS frontend, allowing the server binary to run alone.
//
//go:embed index.html styles.css app.js
var web embed.FS

func main() {
	address := flag.String("addr", "127.0.0.1:8010", "listen address")
	flag.Parse()

	files := http.FileServer(http.FS(web))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			w.Header().Set("Allow", http.MethodGet)
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}
		files.ServeHTTP(w, r)
	})

	log.Printf("CyberOS embedded static server listening on http://%s", *address)
	log.Fatal(http.ListenAndServe(*address, nil))
}
