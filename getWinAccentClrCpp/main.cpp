#include "pch.h"

using namespace winrt;
namespace winrt_vm = winrt::Windows::UI::ViewManagement;

int main()
{
    init_apartment();
    winrt_vm::UISettings settings;
    auto accent = settings.GetColorValue(winrt_vm::UIColorType::Accent);
    auto accentdark1 = settings.GetColorValue(winrt_vm::UIColorType::AccentDark1);
    auto accentdark2 = settings.GetColorValue(winrt_vm::UIColorType::AccentDark2);
    auto accentdark3 = settings.GetColorValue(winrt_vm::UIColorType::AccentDark2);
    auto accentlight1 = settings.GetColorValue(winrt_vm::UIColorType::AccentLight1);
    auto accentlight2 = settings.GetColorValue(winrt_vm::UIColorType::AccentLight2);
    auto accentlight3 = settings.GetColorValue(winrt_vm::UIColorType::AccentLight3);
    printf("Accent: rgb(%u, %u, %u)\n", accent.R, accent.G, accent.B);
    printf("Accent dark 1: rgb(%u, %u, %u)\n", accentdark1.R, accentdark1.G, accentdark1.B);
    printf("Accent dark 2: rgb(%u, %u, %u)\n", accentdark2.R, accentdark2.G, accentdark2.B);
    printf("Accent dark 3: rgb(%u, %u, %u)\n", accentdark3.R, accentdark3.G, accentdark3.B);
    printf("Accent light 1: rgb(%u, %u, %u)\n", accentlight1.R, accentlight1.G, accentlight1.B);
    printf("Accent light 2: rgb(%u, %u, %u)\n", accentlight2.R, accentlight2.G, accentlight2.B);
    printf("Accent light 3: rgb(%u, %u, %u)\n", accentlight3.R, accentlight3.G, accentlight3.B);
}
