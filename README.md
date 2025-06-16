npm config set registry https://registry.npmjs.org
npm install --global lerna
npm install
npx lerna run remove-unnecessary-use-nx
lerna repair
npx lerna init
npx lerna publish