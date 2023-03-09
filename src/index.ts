import { Context, Schema, Service } from 'koishi'
import { createClient,WebDAVClient } from 'webdav'


declare module 'koishi' {
  interface Context {
    webdavcli: WebDAVClient
  }
}

class Webdav extends Service {
  static readonly methods = ['webdav']
  cli:WebDAVClient

  constructor(ctx: Context, private config: Webdav.Config) {
    super(ctx, '__webdav__', true)
    this.cli = createClient(config.webdavLink,{
        'username':config.webdavUsername,
        'password':config.webdavPassword
      })
  }
}

namespace Webdav {
  export interface Config {
    webdavLink: string
    webdavUsername: string
    webdavPassword: string
  }

  export const Config: Schema<Config> = Schema.object({
    webdavLink: Schema.string().description('你的 webdav 地址'),
    webdavUsername: Schema.string().description('你的 webdav 账户'),
    webdavPassword: Schema.string().description('你的 webdav 协议密码')
  })
}

Context.service('__webdav__', Webdav)

export default Webdav

//let ctx:Context;ctx.webdavcli.copyFile
