using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Controls.Primitives;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Navigation;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace Launcher
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class InstallationPage : Page
    {
        public InstallationPage()
        {
            this.InitializeComponent();

            SetReleaseInstalled(true);
            SetBetaInstalled(false);
        }

        private void SetReleaseInstalled(bool installed)
        {
            ReleaseFilePath.Visibility = installed ? Visibility.Visible : Visibility.Collapsed;
            ReleaseDownloadButton.Visibility = installed ? Visibility.Collapsed : Visibility.Visible;
        }

        private void SetBetaInstalled(bool installed)
        {
            BetaFilePath.Visibility = installed ? Visibility.Visible : Visibility.Collapsed;
            BetaDownloadButton.Visibility = installed ? Visibility.Collapsed : Visibility.Visible;
        }
    }
}
