const { notarize } = require('electron-notarize')

exports.default = async function notarizing(context) {
  if (process.env.DEPLOY_ENV === "local") return

  const { electronPlatformName, appOutDir } = context
  const appName = context.packager.appInfo.productFilename
  const isMac = electronPlatformName === 'darwin'
  if (!isMac) return

  await notarize({
    appBundleId: 'io.fourside.client',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD
  })
}
