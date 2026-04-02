/**
 * ファイルドラッグ管理
 */
export default class FileDrag {
  private drop;

  onPushed: Function | null = null;

  constructor(drop: HTMLElement) {
    this.drop = drop;

    this.drop.addEventListener('dragover', this.onDragOverFile);
    this.drop.addEventListener('drop', this.onDropFile);
  }

  /** ドラッグしているとき */
  private onDragOverFile = (e: DragEvent) => {
    e.preventDefault(); // ドロップ無効を無効化する
  };

  /** ドロップ時 */
  private onDropFile = (e: DragEvent) => {
    e.preventDefault();

    const files = e.dataTransfer?.files;

    if (!files || files.length === 0) return;

    for (const file of files) {
      console.log('ファイル名:', file.name);
      console.log('タイプ:', file.type);
      console.log('サイズ:', file.size);

      // 画像だけ判定
      if (!file.type.startsWith('image/')) continue;

      // サムネイルURL生成
      const url = URL.createObjectURL(file);

      this.onPushed!(url);
    }
  };
}
