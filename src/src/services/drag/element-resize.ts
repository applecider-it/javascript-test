/** リサイズ中はtrue */
let isResizing = false;

/** リサウンド中のエレメント */
let resizeTarget: HTMLElement | null = null;

/** マウスダウン開始位置X */
let startX = 0;
/** マウスダウン開始位置Y */
let startY = 0;

/** マウスダウンしたときの横幅 */
let startWidth = 0;
/** マウスダウンしたときの縦幅 */
let startHeight = 0;

/** リサイズカーソルをマウスダウンした時 */
export const onResizeMouseDown = (e: MouseEvent) => {
  e.preventDefault();
  //e.stopPropagation();

  const handle = e.currentTarget as HTMLElement;
  const el = handle.parentElement as HTMLElement;

  isResizing = true;
  resizeTarget = el;

  startX = e.clientX;
  startY = e.clientY;

  startWidth = el.offsetWidth;
  startHeight = el.offsetHeight;

  document.addEventListener('mousemove', onResizeMouseMove);
  document.addEventListener('mouseup', onResizeMouseUp);
};

/** リサイズカーソルをマウスダウンした後にマウス移動したとき */
const onResizeMouseMove = (e: MouseEvent) => {
  if (!isResizing || !resizeTarget) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  resizeTarget.style.width = `${startWidth + dx}px`;
  resizeTarget.style.height = `${startHeight + dy}px`;
};

/** リサイズカーソルをマウスダウンした後にマウスアップしたとき */
const onResizeMouseUp = () => {
  isResizing = false;
  resizeTarget = null;

  document.removeEventListener('mousemove', onResizeMouseMove);
  document.removeEventListener('mouseup', onResizeMouseUp);
};