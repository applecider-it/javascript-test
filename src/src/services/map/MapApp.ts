import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { getGPS } from '@/services/data/gps';

/**
 * マップアプリ
 */
export default class MapApp {
  private map;

  constructor(mapEl: HTMLElement) {
    // デフォルトのパス解決を無効化
    // これがないと、開発時にパスがおかしくなる
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    // デフォルト設定を上書き
    // これがないと、ビルドしたときに表示できない
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      iconRetinaUrl: markerRetina,
      shadowUrl: markerShadow,
    });

    this.map = L.map(mapEl);

    // タイル
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // 地図初期化
    // 東京駅
    this.map.setView([35.681236, 139.767125], 15);
  }

  /** GPSで位置を取得して地図を移動 */
  async findByGPS() {
    if (!navigator.geolocation) {
      console.error('このブラウザはGPSに対応していません');
      return;
    }

    try {
      const position = await getGPS();

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // 地図移動
      this.map.setView([lat, lng], 15);

      // マーカー
      L.marker([lat, lng]).addTo(this.map).bindPopup('現在地').openPopup();

      return { lat, lng };
    } catch (error) {
      console.error(error);
    }
  }
}
