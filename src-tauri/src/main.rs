// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, WindowEvent};
use window_shadows::set_shadow;

fn main() {
    tauri::Builder::default()
        .setup(move |app| {
            let Some(window) = app.get_window("main") else {
                return Ok(())
            };

            set_shadow(&window, true).unwrap();

            Ok(())
        })
        .on_window_event(|e| {
            if let WindowEvent::Resized(_) = e.event() {
                std::thread::sleep(std::time::Duration::from_millis(1))
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
