import { Context, Schema, Service } from 'koishi'
import { createClient, WebDAVClient } from 'webdav'


declare module 'koishi' {
  interface Context {
    webdav: Webdav
  }
}

class Webdav extends Service {
  static readonly methods = ['webdav']
  cli: WebDAVClient

  constructor(ctx: Context, private config: Webdav.Config) {
    super(ctx, 'webdav')
  }

  start(){
    this.cli = createClient(this.config.webdavLink, {
      'username': this.config.webdavUsername,
      'password': this.config.webdavPassword
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

Context.service('webdav', Webdav)

export default Webdav

