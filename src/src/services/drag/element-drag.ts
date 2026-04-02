/** 掴んだ時の要素内のX座標 */
let offsetX = 0;
/** 掴んだ時の要素内のY座標 */
let offsetY = 0;

/** ドラッグしているとき */
export const onDragOverElement = (e: DragEvent) => {
  console.log('onDragOverElement');
  e.preventDefault(); // ドロップ無効を無効化する
};

/** ドラッグ開始時 */
export const onDragStartElement = (e: DragEvent) => {
  console.log('onDragStartElement', e);
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();

  console.log('rect', rect);

  // 要素内のどこを掴んだか保存
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  e.dataTransfer?.setData('text/plain', el.id);

  setDragImage(e);
};

/** ドロップ時 */
export const onDropElement = (e: DragEvent) => {
  console.log('onDropElement');
  e.preventDefault();

  const id = e.dataTransfer?.getData('text/plain');
  const element = document.getElementById(id!);
  const drop = e.currentTarget as HTMLElement;

  if (!element) return;

  const rect = drop.getBoundingClientRect();

  // オフセット分、位置をずらす
  const x = e.clientX - rect.left - offsetX;
  const y = e.clientY - rect.top - offsetY;

  element.style.position = 'absolute';
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;

  drop.appendChild(element);
};

/**
 * ドラッグ時の画像を設定
 *
 * 大きいエレメントだとゴーストがわかりにくくなるので、これで固定する。
 */
const setDragImage = (e: DragEvent) => {
  const dragImage = document.createElement('div');

  dragImage.style.width = '30px';
  dragImage.style.height = '30px';
  dragImage.style.background = '#ddd';
  dragImage.style.borderRadius = '50%';

  document.body.appendChild(dragImage);

  // これで、ドラッグ時の見た目を置き換える
  e.dataTransfer?.setDragImage(dragImage, 15, 15);

  // 画像を後で削除
  setTimeout(() => {
    document.body.removeChild(dragImage);
  });

  return dragImage;
};
