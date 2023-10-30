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
using System.Reflection;
using WinUIEx;
using Microsoft.UI.System;

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
    }
}
