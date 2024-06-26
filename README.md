<h1 align="center">
  Lemon Studios Launcher
</h1>
<p align="center">
  <a href="https://tauri.app">
    <img src="https://img.shields.io/badge/tauri-%2324C8DB.svg?style=for-the-badge&logo=tauri&logoColor=%23FFFFFF">
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white">
  </a>
  <br>
  <i>A simple cross-platform app</i>
</p>
<hr>
<p align="center">
    <a href="https://github.com/lemons-studios/lemon-studios-launcher/releases/latest">
      <img alt="Version" src="https://img.shields.io/github/package-json/v/lemons-studios/lemon-studios-launcher?style=flat-square&label=Version">
    </a>
    <a href="https://github.com/lemons-studios/lemon-studios-launcher/blob/main/LICENSE">
      <img alt="License" src="https://img.shields.io/github/license/lemons-studios/lemon-studios-launcher?style=flat-square&label=License">
    </a>
    <br>
    <a href="https://github.com/lemons-studios/lemon-studios-launcher/actions/workflows/build.yml">
      <img alt="Build and release" src="https://img.shields.io/github/actions/workflow/status/lemons-studios/lemon-studios-launcher/build.yml?style=flat-square&label=Build%20and%20release">
    </a>
    <a href="https://github.com/lemons-studios/lemon-studios-launcher/actions/workflows/github-code-scanning/codeql">
        <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/lemons-studios/lemon-studios-launcher/github-code-scanning%2Fcodeql?style=flat-square&label=CodeQL" />
    </a>
    <br>
    <a href="https://github.com/lemons-studios/lemon-studios-launcher/issues">
      <img alt="Issue" src="https://img.shields.io/github/issues/lemons-studios/lemon-studios-launcher?style=flat-square&label=Issue">
    </a>
</p>

## 🗒️ Pre-requisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Rust](https://www.rust-lang.org/)

## 🛠️ Running from source

### 📥 Downloading source code

1. First, clone the GitHub repository

```sh
git clone https://github.com/lemon-studios/lemon-studios-launcher.git
cd lemon-studios-launcher
```

2. Install dependencies

```sh
npm install
```

### 🚀 Running the Tauri app

> [!NOTE]  
> When you first run the Tauri app, it will install and build the necessary Rust dependencies. This can take a few minutes.

```sh
npm run tauri dev
```

## 📦 Distributing

### 💻 Building locally

1. Create a Tauri app package using

```sh
npm run tauri build
```

2. Generated package can be found at `./src-tauri/target/release/`

### ☁️ Building with GitHub Actions

The GitHub Actions workflow can be found in `./.github/workflows/build.yml`.

## 📝 Contributing

Fork this repository and submit a pull request when you are ready.

Please do not modify `biome.json` or `.prettierrc`.

### 👕 Linting

This project primarily uses [Biome](https://biomejs.dev/) for linting. It is recommended to install the Biome plugin for your IDE or code editor. Alternatively, you may also run the linter using

```sh
npm run lint
```

### 🖋️ Formatting

For formatting file formats that are not supported by Biome, please use [Prettier](https://prettier.io/).

## 📜 Credits

- [Josefin Sans](https://fonts.google.com/specimen/Josefin+Sans), made by [Santiago Orozco](https://github.com/sannorozco)
- [Potra](https://rostype.com/potra-2/), made by [Alejo Bergmann](https://www.behance.net/alejobergmann)
