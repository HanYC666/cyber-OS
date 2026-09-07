package main

import (
	"flag"
	"log"
	"net/http"
	"os"
)

func main() {
	address := flag.String("addr", "127.0.0.1:8010", "listen address")
	root := flag.String("root", ".", "directory containing the static CyberOS files")
	flag.Parse()

	info, err := os.Stat(*root)
	if err != nil || !info.IsDir() {
		log.Fatalf("invalid static root %q", *root)
	}

	files := http.FileServer(http.Dir(*root))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			w.Header().Set("Allow", http.MethodGet)
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}
		files.ServeHTTP(w, r)
	})

	log.Printf("CyberOS static server listening on http://%s", *address)
	log.Fatal(http.ListenAndServe(*address, nil))
}
