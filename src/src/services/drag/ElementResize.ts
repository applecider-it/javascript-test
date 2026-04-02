/**
 * 要素リサイズ管理
 */
export default class ElementResize {
  /** リサイズ中はtrue */
  private isResizing = false;

  /** リサウンド中のエレメント */
  private resizeTarget: HTMLElement | null = null;

  /** マウスダウン開始位置X */
  private startX = 0;
  /** マウスダウン開始位置Y */
  private startY = 0;

  /** マウスダウンしたときの横幅 */
  private startWidth = 0;
  /** マウスダウンしたときの縦幅 */
  private startHeight = 0;

  /** リサイズカーソルをマウスダウンした時 */
  onResizeMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    //e.stopPropagation();

    const handle = e.currentTarget as HTMLElement;
    const el = handle.parentElement as HTMLElement;

    this.isResizing = true;
    this.resizeTarget = el;

    this.startX = e.clientX;
    this.startY = e.clientY;

    this.startWidth = el.offsetWidth;
    this.startHeight = el.offsetHeight;

    document.addEventListener('mousemove', this.onResizeMouseMove);
    document.addEventListener('mouseup', this.onResizeMouseUp);
  };

  /** リサイズカーソルをマウスダウンした後にマウス移動したとき */
  private onResizeMouseMove = (e: MouseEvent) => {
    if (!this.isResizing || !this.resizeTarget) return;

    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;

    this.resizeTarget.style.width = `${this.startWidth + dx}px`;
    this.resizeTarget.style.height = `${this.startHeight + dy}px`;
  };

  /** リサイズカーソルをマウスダウンした後にマウスアップしたとき */
  private onResizeMouseUp = () => {
    this.isResizing = false;
    this.resizeTarget = null;

    document.removeEventListener('mousemove', this.onResizeMouseMove);
    document.removeEventListener('mouseup', this.onResizeMouseUp);
  };
}
