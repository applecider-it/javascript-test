/** コンポーネント読み込み */
async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

/** アプリケーションのセットアップ */
function setup() {
  // コンポーネント
  loadComponent('app-header', '../layout/header.html');
  loadComponent('app-footer', '../layout/footer.html');

  // アプリケーション用コンテナ作成
  window.App = {
    services: {
      camera: {},
    },
  };
}

setup();
