[ ! -f node_modules/.bin/jake ] && echo "Building npm modules with Jake:"  && npm rebuild
node_modules/.bin/jake -f build/scripts/build.jakefile.js $*