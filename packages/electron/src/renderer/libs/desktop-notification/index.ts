import { ipcRenderer } from 'electron'
import { commonIpcMessages } from '@shared/ipc'
import AppIcon from './icon.png'

export class DesktopNotification {
  #notification: Notification
  constructor(title: string, options?: Omit<NotificationOptions, 'icon'> & { onClick?: () => void }) {
    const icon = process.platform === 'darwin' ? undefined : AppIcon
    this.#notification = new Notification(title, { icon, ...options })
    this.#notification.onclick = () => {
      ipcRenderer.invoke(commonIpcMessages.SHOW_MAIN_WINDOW)
      options?.onClick?.()
    }
  }
}
