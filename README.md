<h1 align="center">
  Mission: Monkey Installer
</h1>
<p align="center">
  <a href="https://tauri.app">
    <img src="https://img.shields.io/badge/tauri-%2324C8DB.svg?style=for-the-badge&logo=tauri&logoColor=%23FFFFFF">
  </a>
  <a href="https://www.rust-lang.org">
    <img src="https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white">
  </a>
  <a href="https://unity.com">
    <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white">
  </a>
</p>
<p align="center"><i>Why did I even learn Tauri 😢</i></p>
<p align="center">Also small app built with C++ to get Windows accent color because there was no other way.</p>
<hr>

## 🛠️ Running from source
### Building WinAccentColor.exe C++ project
1. Install Visual Studio 2019 or later with the `UWP development` workload. Make sure to also check the optional `C++ (v14x) UWP tools` feature.
2. Open the solution file (`.sln`) found in `./getWinAccentClrCpp`.
3. Once the solution is loaded, select the `Release` config at the top.
4. Go to Build > Build Solution.
5. The `.exe` can be found in `./getWinAccentClrCpp/x64/Release`.
6. Rename the file to `WinAccentColor.exe` and copy it into `./src-tauri/binaries/`
### Running Tauri app
```sh
npm run tauri dev
```

## 🚀 Distributing
1. Create a Tauri app package using
```sh
npm run tauri build
```
2. Generated package can be found at `./src-tauri/target/release/Mission Monkey Installer.exe`
