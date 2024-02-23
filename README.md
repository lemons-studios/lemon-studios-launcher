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

## 🛠️ Running from source

### Pre-requisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Rust](https://www.rust-lang.org/)
- [Yarn](https://yarnpkg.com/)

### Downloading source code

1. First, clone the GitHub repository

```sh
git clone https://github.com/lemon-studios/lemon-studios-launcher.git
cd lemon-studios-launcher
```

2. Install dependencies

```sh
yarn install
```

### Running the Tauri app

> [!NOTE]  
> When you first run the Tauri app, it will install and build the necessary Rust dependencies. This can take a few minutes.

```sh
yarn tauri dev
```

## 🚀 Distributing

1. Create a Tauri app package using

```sh
yarn tauri build
```

2. Generated package can be found at `./src-tauri/target/release/Mission Monkey Installer.exe`

## 📜 Credits

- [Josefin Sans](https://fonts.google.com/specimen/Josefin+Sans), made by [Santiago Orozco](https://github.com/sannorozco)
- [Potra](https://rostype.com/potra-2/), made by [Alejo Bergmann](https://www.behance.net/alejobergmann)
