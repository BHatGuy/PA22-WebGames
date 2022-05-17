all: 
    just watch

release: check-types clean
    esbuild src/main.ts --minify --bundle --outfile=build/main.js 
    cp src/index.html static/* build

@build: check-types
    esbuild src/main.ts --bundle --sourcemap --outfile=build/main.js 
    cp src/index.html static/* build
    echo $(date +%H:%M:%S) "build ready"

@check-types:
    tsc --noEmit

serve: 
    python -m http.server --directory build/ &> /dev/null


watch: 
    just serve &
    watchexec --on-busy-update restart -i "build/*" -e ts,html,css,json just build

clean:
    rm -rf build/

# this does not deploy the backend currently
