export const appLoading = {
  SHOW_MAIN_WINDOW: '@ipc/app-loading/SHOW_MAIN_WINDOW'
} as const

export const appLoadingOnReceived = {
  COMPLETED_CHECKING_UPDATE: '@ipc/app-loading/RECIEVED_COMPLETED_CHECKING_UPDATE',
  COMPLETED_LOADING_MAIN_WINDOW_DOM: '@ipc/app-loading/RECIEVED_COMPLETED_LOADING_MAIN_WINDOW_DOM'
} as const
