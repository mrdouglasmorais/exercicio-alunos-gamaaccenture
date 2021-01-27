# Webpack

## Como configurar o webpack pro nosso projeto

### Instalar modulos necessários

```
npm i -D clean-webpack-plugin webpack-dev-server webpack-merge
```
O `clean-webpack-plugin` apaga a pasta `dist` para nós
O `webpack-dev-server` substitui o `live-server` e já integra o webpack
O `webpack-merge` junta as configurações de dev e prod

### Configurar o webpack

Separar o arquivo `webpack.config.js` em 3 arquivos `webpack.common.js`, `webpack.dev.js` e `webpack.prod.js`

O `webpack.common.js` fica assim:
```javascript
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pathToMainJs = require.resolve("./src/app.js");
const pathToIndexCss = require.resolve("./src/css/style.css");
const pathToIndexHtml = require.resolve("./src/index.html");
const pathToIndexFavicon16 = require.resolve("./src/img/favicon-16x16.png");
const pathToIndexFavicon32 = require.resolve("./src/img/favicon-32x32.png");

module.exports =  {
  entry: [
    '@babel/polyfill',
    pathToMainJs,
    pathToIndexHtml,
    pathToIndexCss,
    pathToIndexFavicon16,
    pathToIndexFavicon32,
  ],
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        type: 'asset/resource',
        generator: {
          filename: 'css/[name][ext][query]'
        }
      },
      {
        test: /\.html$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext][query]'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext][query]'
        }
      },
    ]
  }
};
```

Essas variáveis são dos aquivos que quero que o webpack faça o build:
```javascript
const pathToMainJs = require.resolve("./src/app.js");
const pathToIndexCss = require.resolve("./src/css/style.css");
const pathToIndexHtml = require.resolve("./src/index.html");
const pathToIndexFavicon16 = require.resolve("./src/img/favicon-16x16.png");
const pathToIndexFavicon32 = require.resolve("./src/img/favicon-32x32.png");
```


O `webpack.dev.js` fica assim:
```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
});
```

O `webpack.prod.js` fica assim:
```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
});
```

No `package.json` adicionar os scripts:
```json
...
"scripts": {
  "start": "webpack serve --open --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js",
  "server": "live-server dist --verbose",
  "test": "echo \"Error: no test specified\" && exit 1"
},
...
```

### Corrigir o código

No código, trocar a chamada de imagens de

```javascript
let img = `<div class="col-md-6 m-auto d-flex pb-3">
             <img src="/img/logo.png" class="img-fluid m-auto" width="80%" alt="Imagem resposiva">
          </div>`;

```
por

```javascript
import logo from './img/logo.png';

let img = `<div class="col-md-6 m-auto d-flex pb-3">
             <img src=${logo} class="img-fluid m-auto" width="80%" alt="Imagem resposiva">
          </div>`;

```

No `index.html` trocar de

```javascript
<script typpe="module" src="./app.js"></script>
```
por

```javascript
<script src="./app.js"></script>
```

### Rodar o código para desenvolvimento

Para rodar o códico como faziamos no `live-server` é só usar o script:

```
npm run start
```

### Fazer o build para produção
Para gerar os arquivos para prod é só usar o script:

```
npm run build
```
Ele vai gerar a pasta `dist` com os arquivos do projeto.

E caso queira ver se o que está no `dist` está funcionando é só rodar o script:

```
npm run server
```
