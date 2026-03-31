/**
 * カメラアプリのセットアップ
 */

const app = new App.services.camera.CameraApp('video', 'canvas', 'take');

app.init();
