using Microsoft.UI;
using Microsoft.UI.Windowing;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Controls.Primitives;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Navigation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Core;
using WinRT.Interop;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace Launcher
{
    /// <summary>
    /// An empty window that can be used on its own or navigated to within a Frame.
    /// </summary>

    public sealed partial class MainWindow : WinUIEx.WindowEx
    {
        private AppWindow m_AppWindow;

        // Initialize storage
        private Windows.Storage.ApplicationDataContainer localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;

        public MainWindow()
        {
            this.InitializeComponent();
            m_AppWindow = GetAppWindowForCurrentWindow();

            SetTransparency(true); // Use mica, not micaAlt
            SetTitleBar(AppTitleBar);
            m_AppWindow.TitleBar.ExtendsContentIntoTitleBar = true;
            m_AppWindow.TitleBar.PreferredHeightOption = TitleBarHeightOption.Tall;

            // Remove ugly black background on buttons
            m_AppWindow.TitleBar.ButtonBackgroundColor = Colors.Transparent;
            m_AppWindow.TitleBar.ButtonInactiveBackgroundColor = Colors.Transparent;

            // Navigate to home page by default
            ContentFrame.Navigate(typeof(HomePage));

            // WORKAROUND: Recieve event from SettingsPage to reload theme
            // TODO: This can probably be improved
            Windows.Storage.ApplicationData.Current.DataChanged += new TypedEventHandler<Windows.Storage.ApplicationData, object>(DataChangeHandler);
            // Reload theme
            Windows.Storage.ApplicationData.Current.SignalDataChanged();
        }

        private void DataChangeHandler(Windows.Storage.ApplicationData appData, object o)
        {
            string theme;
            if (localSettings.Values["theme"] != null)
            {
                theme = localSettings.Values["theme"].ToString() ?? "system";
            }
            else
            {
                theme = "system";
            }
            DispatcherQueue.TryEnqueue(Microsoft.UI.Dispatching.DispatcherQueuePriority.Normal, () =>
            {
                switch (theme.ToLower())
                {
                    case "light":
                        MainAppWindow.RequestedTheme = ElementTheme.Light;
                        break;
                    case "dark":
                        MainAppWindow.RequestedTheme = ElementTheme.Dark;
                        break;
                    case "system":
                        MainAppWindow.RequestedTheme = ElementTheme.Default;
                        break;
                }
            });
        }

        private AppWindow GetAppWindowForCurrentWindow()
        {
            IntPtr hWnd = WindowNative.GetWindowHandle(this);
            WindowId wndId = Microsoft.UI.Win32Interop.GetWindowIdFromWindow(hWnd);
            return AppWindow.GetFromWindowId(wndId);
        }

        private void SetTransparency(bool useMicaAlt)
        {
            if (Microsoft.UI.Composition.SystemBackdrops.MicaController.IsSupported())
            {
                // Apply mica if supported
                Microsoft.UI.Xaml.Media.MicaBackdrop micaBackdrop = new Microsoft.UI.Xaml.Media.MicaBackdrop();
                micaBackdrop.Kind = useMicaAlt ? Microsoft.UI.Composition.SystemBackdrops.MicaKind.BaseAlt : Microsoft.UI.Composition.SystemBackdrops.MicaKind.Base;
                this.SystemBackdrop = micaBackdrop;
            }
            else if (Microsoft.UI.Composition.SystemBackdrops.DesktopAcrylicController.IsSupported())
            {
                // Mica is not supported on this system.
                // Need to use acrylic instead
                Microsoft.UI.Xaml.Media.DesktopAcrylicBackdrop acrylicBackdrop = new Microsoft.UI.Xaml.Media.DesktopAcrylicBackdrop();
                this.SystemBackdrop = acrylicBackdrop;
            }
            // Acrylic isnt supported so no effect is applied
        }

        private void NavigationView_SelectionChanged(NavigationView sender, NavigationViewSelectionChangedEventArgs args)
        {
            if (args.IsSettingsSelected)
            {
                ContentFrame.Navigate(typeof(SettingsPage));
            }
            else if (args.SelectedItemContainer.Content.ToString() == "Home")
            {
                ContentFrame.Navigate(typeof(HomePage));
            }
            else if (args.SelectedItemContainer.Content.ToString() == "Installation")
            {
                ContentFrame.Navigate(typeof(InstallationPage));
            }
        }
    }
}
