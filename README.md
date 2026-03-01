## genindex

genindexは、ファイルの一覧のインデックスを生成することができるコマンドラインのツールです。  
Cloudflare Workersなどで静的なウェブサイトをデプロイするようなときに適しているのかもしれません。

## インストール

```bash
$ npm install --global @kokiito0926/genindex
```

## 使用方法

カレントディレクトリのファイルの一覧からインデックスを生成します。

```bash
$ genindex .
```

--baseのオプションを用いると、ベースのディレクトリを設定することができます。

```bash
$ genindex . --base "./example/"
```

--includeのオプションを用いると、特定のファイルのみを含めることができます。

```bash
$ genindex . --include "**/*.json"
```

--ignoreのオプションを用いると、特定のファイルを除外することができます。

```bash
$ genindex . --include "**/*.js" --ignore "**/node_modules/**"
```

## ライセンス

[MIT](LICENSE)
