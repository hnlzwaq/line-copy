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

# 本地配置

初始化pnpm setup

``` js
pnpm setup
```

在每个子插件项目中执行以下命令：
 
``` shell 
Set-Location packages/common
pnpm link --global


Set-Location packages/vite-plugin
pnpm link --global


Set-Location packages/webpack-loader
pnpm link --global

 
 
 
pnpm list --global --depth 1
```

在目标项目中执行以下命令：

``` js 
pnpm link --save-dev @line-copy/vite-plugin 
pnpm link @line-copy/vite-plugin 
pnpm list @line-copy/vite-plugin

pnpm link --save-dev @line-copy/webpack-loader
pnpm list @line-copy/webpack-loader
 
```


恢复远程包

``` js 
pnpm remove @line-copy/vite-plugin
npm install @line-copy/vite-plugin --save-dev
pnpm list @line-copy/vite-plugin
``` 

恢复远程包

``` js 
pnpm remove @line-copy/vite-plugin
pnpm add @line-copy/vite-plugin --save-dev
pnpm list @line-copy/vite-plugin
``` 

# 本地安装

在根目录执行以下命令：

``` js
pnpm install
```

# 本地使用

``` js 使用
pnpm install
```