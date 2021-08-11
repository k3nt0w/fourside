const { version } = require('./package.json')

const baseConfig = {
  productName: 'Fourside',
  appId: 'k3nt0w',
  directories: {
    output: 'Fourside'
  },
  extraMetadata: {
    name: '@fourside/electron'
  },
  releaseInfo: {
    releaseName: `${version}`
  },
  files: ['dist/**/*', 'build/**/*', 'public/**/*', 'package.json'],
  afterSign: 'build/notarize/index.js',
  mac: {
    category: 'public.app-category.test',
    target: [
      {
        target: 'zip',
        arch: 'x64'
      },
      {
        target:'dmg',
        arch: 'x64'
      }
    ],
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: 'build/notarize/entitlements.mac.plist',
    entitlementsInherit: 'build/notarize/entitlements.mac.plist'
  },
  win: {
    target: ['nsis']
  },
  nsis: {
    include: "build/installer.nsh",
  },
  extends: null
}


const publishGitHub = {
  provider: 'github',
  private: true,
  owner: 'k3nt0w',
  repo: 'fourside',
  token: process.env.GH_TOKEN,
  releaseType: process.env.IS_DRAFT ? 'draft' : 'release'
}

module.exports = process.env.DEPLOY_ELECTRON
  ? {
      ...baseConfig,
      publish: publishGitHub
    }
  : {
      ...baseConfig
    }
