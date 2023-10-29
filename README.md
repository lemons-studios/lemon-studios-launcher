<h1 align="center">
  Mission: Monkey Launcher
</h1>
<p align="center">
  <a href="https://learn.microsoft.com/en-us/dotnet/csharp">
    <img src="https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white">
  </a>
  <a href="https://learn.microsoft.com/en-us/dotnet/csharp">
    <img src="https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white">
  </a>
</p>
<p align="center">Simple WinUI3 app that makes updating <i>Mission: Monkey</i> a hassle-free experience</p>
<hr>

## 🛠️ Running from source
### 📑 Prerequisites
1. Install Visual Studio 2022 or later with the `.NET desktop development` workload. Make sure to also check the optional `MSIX Packaging Tools` and `Windows App SDK C# Templates` feature.

### 🧪 Developing
1. Open the solution in Visual Studio.
2. Select `Debug` and `x64` in the solution configuration at the top of the window.
3. Select the `Launcher (Package)` launch option and run the app with debugger.

### 🚀 Building and Distributing
1. Open the solution in Visual Studio.
2. Select `Release` and `x64` in the solution configuration at the top of the window.
3. In the Solution Explorer, select the `Launcher` project.
4. Go to Build > Publish Selection.
5. Select the x64 profile and click on the `Publish` button.
5. The compiled app can be found in `.\bin\win10-x64\publish\win10-x64`.