#配置
``` js
npm config set registry https://registry.npmjs.org
git config --global core.autocrlf true
git config --global core.safecrlf false
git config --global credential.helper store
 ```

# 安装 
``` js
npm install -g pnpm
pnpm add -D @changesets/cli
npx changeset init
```

# 生成修改
``` js
npx changeset
npx changeset version
```

# 发布线上
``` js
pnpm publish -r --access public
```

# 本地安装
``` js
pnpm install
```