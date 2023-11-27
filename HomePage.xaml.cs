using Microsoft.UI.Xaml.Controls;
using System.Numerics;
using Windows.System;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace Launcher
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class HomePage : Page
    {
        // Initialize storage
        private Windows.Storage.ApplicationDataContainer localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;

        public HomePage()
        {
            this.InitializeComponent();

            LaunchBar.Translation += new Vector3(0, 0, 1);

            LoadVersions();
        }

        private void LoadVersions()
        {
            // Load versions
            string version;
            if (localSettings.Values["selectedLaunchVer"] != null)
            {
                version = localSettings.Values["selectedLaunchVer"].ToString() ?? "release";
            }
            else
            {
                version = "release";
            }
            switch (version)
            {
                case "release":
                    VersionSelect.Content = "Release";
                    break;
                case "beta":
                    VersionSelect.Content = "Beta";
                    break;
            }
            BetaVersionText.IsEnabled = false;
        }

        private void ReleaseVersion_Click(object sender, Microsoft.UI.Xaml.RoutedEventArgs e)
        {
            VersionSelect.Content = "Release";
            localSettings.Values["selectedLaunchVer"] = "release";
        }

        private void BetaVersion_Click(object sender, Microsoft.UI.Xaml.RoutedEventArgs e)
        {
            VersionSelect.Content = "Beta";
            localSettings.Values["selectedLaunchVer"] = "beta";
        }
    }
}
