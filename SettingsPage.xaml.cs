using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Windows.ApplicationModel.DataTransfer;
using System.Threading.Tasks;
using System;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace Launcher
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class SettingsPage : Page
    {
        // Initialize storage
        private Windows.Storage.ApplicationDataContainer localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;

        public SettingsPage()
        {
            this.InitializeComponent();

            // Load theme
            string theme;
            if (localSettings.Values["theme"] != null)
            {
                theme = localSettings.Values["theme"].ToString() ?? "system";
            }
            else
            {
                theme = "system";
            }
            switch (theme)
            {
                case "light":
                    ThemeRadioButtons.SelectedIndex = 0;
                    break;
                case "dark":
                    ThemeRadioButtons.SelectedIndex = 1;
                    break;
                case "system":
                    ThemeRadioButtons.SelectedIndex = 2;
                    break;
            }

            // Load beta setting
            bool isBeta;
            if (localSettings.Values["isBeta"] != null)
            {
                isBeta = (bool)(localSettings.Values["isBeta"] ?? false);
            }
            else
            {
                isBeta = false;
            }
            BetaToggleSwitch.IsOn = isBeta;
            BetaToggleSwitchLabel.Text = isBeta ? "On" : "Off";
        }

        private void ThemeRadioButtons_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            switch (ThemeRadioButtons.SelectedIndex)
            {
                case 0:
                    localSettings.Values["theme"] = "light";
                    break;
                case 1:
                    localSettings.Values["theme"] = "dark";
                    break;
                case 2:
                    localSettings.Values["theme"] = "system";
                    break;
            }

            // WORKAROUND: Send event to mainWindow to reload theme
            Windows.Storage.ApplicationData.Current.SignalDataChanged();
        }

        private void BetaToggleSwitch_Toggled(object sender, RoutedEventArgs e)
        {
            BetaToggleSwitchLabel.Text = BetaToggleSwitch.IsOn ? "On" : "Off";
            localSettings.Values["isBeta"] = BetaToggleSwitch.IsOn;
        }

        private async void CopyGitCmd_Click(object sender, RoutedEventArgs e)
        {
            DataPackage dataPackage = new DataPackage();
            dataPackage.RequestedOperation = DataPackageOperation.Copy;
            dataPackage.SetText(GitCmdText.Text);
            Clipboard.SetContent(dataPackage);
            CopyGitCmdIcon.Glyph = "\xE73E";
            await Task.Delay(2000);
            CopyGitCmdIcon.Glyph = "\xE8C8";
        }

        private async void IssueLink_Click(object sender, RoutedEventArgs e)
        {
            await Windows.System.Launcher.LaunchUriAsync(new System.Uri("https://github.com/lemons-studios/Mission-Monkey-Launcher/issues"));
        }
    }
}
