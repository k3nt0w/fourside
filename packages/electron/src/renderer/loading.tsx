import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { ipcRenderer, ipcRendererOn } from 'src/renderer/libs/electron'
import { autoUpdaterIpcMessagesOnReceived } from '@shared/ipc/auto-updater'
// import { Logger } from 'src/renderer/libs/electron'
import { AutoUpdateMessage, AutoUpdateMessageNumber } from '@shared/interfaces'
import { appLoading, appLoadingOnReceived } from '@shared/ipc'
import { useEffect } from 'react'
import { isLocalDeployEnv } from '@shared/utils'
import { Box, createStyles, LinearProgress, makeStyles } from '@material-ui/core'

const ipcRendererOnWrapperForAutoUpdater = (channel: string, setMessage: (message: string) => void) => {
  ipcRendererOn(channel, (_: Electron.IpcRendererEvent, data: AutoUpdateMessage) => {
    // Logger.info(`ipcRendererOnWrapperForLoading: ${channel}`)
    // Logger.info(data)
    setMessage(data.message)
  })
}

const ipcRendererOnRecivedNumberWrapperForAutoUpdater = (channel: string, setNumber: (number: number) => void) => {
  ipcRendererOn(channel, (_: Electron.IpcRendererEvent, data: AutoUpdateMessageNumber) => {
    // Logger.info(`ipcRendererOnWrapperForLoading: ${channel}`)
    // Logger.info(data)
    setNumber(data.message)
  })
}

const ipcRendererOnWrapperForAppLoading = (channel: string, setFlag: (flag: boolean) => void) => {
  ipcRendererOn(channel, () => {
    // Logger.info(`ipcRendererOnWrapperForAppLoading: ${channel}`)
    setFlag(true)
  })
}

const useStyles = makeStyles(() => {
  return createStyles({
    root: {},
    progressBar: {
      backgroundColor: '#AECAEA',
      borderBottom: '1px solid white',
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#3576CB'
      }
    }
  })
})

const Loading = () => {
  const classes = useStyles()

  const [message, setMessage] = useState('starting...')
  const [percentage, setPercentage] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  console.log(errorMessage)

  const [isLoadedMainDom, setIsLoadedMainDom] = useState(false)

  // NOTE: localでパッケージングされてない場合はauto updaterが走らないので初めからtrueにする
  const [isCheckedUpdateVersion, setIsCheckedUpdateVersion] = useState(isLocalDeployEnv)

  useEffect(() => {
    if (isLoadedMainDom && isCheckedUpdateVersion) {
      // Logger.info(`ipcRendererInvoke: ${appLoading.SHOW_MAIN_WINDOW}`)
      ipcRenderer.invoke(appLoading.SHOW_MAIN_WINDOW)
    }
  }, [isLoadedMainDom, isCheckedUpdateVersion])

  ipcRendererOnWrapperForAutoUpdater(autoUpdaterIpcMessagesOnReceived.CHECK_FOR_UPDATE, setMessage)
  ipcRendererOnWrapperForAutoUpdater(autoUpdaterIpcMessagesOnReceived.UPDATE_AVAILABLE, setMessage)
  ipcRendererOnWrapperForAutoUpdater(autoUpdaterIpcMessagesOnReceived.UPDATE_UNAVAILABLE, setMessage)
  ipcRendererOnWrapperForAutoUpdater(autoUpdaterIpcMessagesOnReceived.UPDATE_DOWNLOADED, setMessage)

  ipcRendererOnWrapperForAutoUpdater(autoUpdaterIpcMessagesOnReceived.DOWNLOAD_PROGRESS, setMessage)

  ipcRendererOnRecivedNumberWrapperForAutoUpdater(
    autoUpdaterIpcMessagesOnReceived.DOWNLOAD_PROGRESS_PERSENTAGE,
    setPercentage
  )

  ipcRendererOnWrapperForAutoUpdater(autoUpdaterIpcMessagesOnReceived.ERROR, setMessage)
  ipcRendererOnWrapperForAutoUpdater(autoUpdaterIpcMessagesOnReceived.ERROR, setErrorMessage)

  ipcRendererOnWrapperForAppLoading(appLoadingOnReceived.COMPLETED_CHECKING_UPDATE, setIsCheckedUpdateVersion)
  ipcRendererOnWrapperForAppLoading(appLoadingOnReceived.COMPLETED_LOADING_MAIN_WINDOW_DOM, setIsLoadedMainDom)

  return (
    <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box p="16px" width="100%" maxWidth="400px" display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" mb="32px" maxWidth="280px"></Box>

        <Box color="white" fontSize="12px" textAlign="center" mb="8px">
          {message}
        </Box>

        {/* percentag があれば表示する */}
        {percentage !== 0 && (
          <Box display="flex" alignItems="center" width="100%">
            <Box width="100%">
              <LinearProgress className={classes.progressBar} variant="determinate" value={percentage} />
            </Box>
            {/* 小数点以下は切り捨てる */}
            <Box color="white" fontSize="12px" ml="8px" mr="-20px">
              {percentage | 0}%
            </Box>
          </Box>
        )}
        {console.log(ipcRenderer)}
      </Box>
    </Box>
  )
}

ReactDOM.render(<Loading />, document.getElementById('loading') as HTMLElement)
