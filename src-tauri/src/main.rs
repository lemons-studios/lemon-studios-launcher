// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use windows::Win32::{
    Foundation::HWND,
};
use tauri::Manager;

fn enable_window_shadow(window: &impl raw_window_handle::HasRawWindowHandle) {
    use windows::Win32::{Graphics::Dwm::DwmExtendFrameIntoClientArea, UI::Controls::MARGINS};

    match window.raw_window_handle() {
        #[cfg(target_os = "windows")]
        raw_window_handle::RawWindowHandle::Win32(handle) => {
            let m = 1;
            let margins = MARGINS {
                cxLeftWidth: m,
                cxRightWidth: m,
                cyTopHeight: m,
                cyBottomHeight: m,
            };
            unsafe {
                let _ = DwmExtendFrameIntoClientArea(HWND(handle.hwnd as _), &margins);
            };
        }
        _ => (),
    }
}

fn main() {
    tauri::Builder::default()
        .setup(move |app| {
            let window = app.get_window("main").unwrap();
            enable_window_shadow(&window);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
