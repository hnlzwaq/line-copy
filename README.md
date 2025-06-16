npm config set registry https://registry.npmjs.org
git config --global core.autocrlf true
git config --global core.safecrlf false
git config --global credential.helper store
npm install --global lerna
npm install
npx lerna run remove-unnecessary-use-nx
lerna repair
npx lerna init
npx lerna publish
npx lerna publish --no-push