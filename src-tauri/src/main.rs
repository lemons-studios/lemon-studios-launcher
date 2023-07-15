// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![cfg(target_os = "windows")]
use tauri::Manager;
use window_vibrancy::{apply_acrylic, apply_mica};
pub use windows_sys::Win32::{
    Foundation::*,
    System::{LibraryLoader::*, SystemInformation::*},
};

fn get_function_impl(library: &str, function: &str) -> Option<FARPROC> {
    assert_eq!(library.chars().last(), Some('\0'));
    assert_eq!(function.chars().last(), Some('\0'));

    let module = unsafe { LoadLibraryA(library.as_ptr()) };
    if module == 0 {
        return None;
    }
    Some(unsafe { GetProcAddress(module, function.as_ptr()) })
}

macro_rules! get_function {
    ($lib:expr, $func:ident) => {
        get_function_impl(concat!($lib, '\0'), concat!(stringify!($func), '\0'))
            .map(|f| std::mem::transmute::<::windows_sys::Win32::Foundation::FARPROC, $func>(f))
    };
}

/// Returns a tuple of (major, minor, buildnumber)
fn get_windows_ver() -> Option<(u32, u32, u32)> {
    type RtlGetVersion = unsafe extern "system" fn(*mut OSVERSIONINFOW) -> i32;
    let handle = unsafe { get_function!("ntdll.dll", RtlGetVersion) };
    if let Some(rtl_get_version) = handle {
        unsafe {
            let mut vi = OSVERSIONINFOW {
                dwOSVersionInfoSize: 0,
                dwMajorVersion: 0,
                dwMinorVersion: 0,
                dwBuildNumber: 0,
                dwPlatformId: 0,
                szCSDVersion: [0; 128],
            };

            let status = (rtl_get_version)(&mut vi as _);

            if status >= 0 {
                Some((vi.dwMajorVersion, vi.dwMinorVersion, vi.dwBuildNumber))
            } else {
                None
            }
        }
    } else {
        None
    }
}

fn is_at_least_build(build: u32) -> bool {
    let v = get_windows_ver().unwrap_or_default();
    v.2 >= build
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            if is_at_least_build(22000) {
                apply_mica(&window, None)
                .expect("Unsupported platform! 'apply_mica' is only supported on Windows");
            }
            else if is_at_least_build(19043) {
                apply_acrylic(&window, None)
                   .expect("Unsupported platform! 'apply_acrylic' is only supported on Windows 10 1903 or higher");
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
