using Microsoft.UI.Xaml.Controls;
using System.Numerics;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace Launcher
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class HomePage : Page
    {
        public HomePage()
        {
            this.InitializeComponent();

            ImageBanner.Translation += new Vector3(0, 0, 16);
            LaunchGameButton.Translation += new Vector3(0, 0, 32);
        }
    }
}
