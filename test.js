const { HLTV } = require('hltv')
const fs = require('fs')
const { request } = require('http')

const {getDownloadUrl, parseFileName} = require('./util.js')

const cfg = {
  path: "./data",
  url: "http://www.hltv.org/download/demo/73220",
}

const main = async () => {
  // const resp = await HLTV.getMatch({id: 2357507, delayBetweenPageRequests: 250 })
  // // const resp = await HLTV.getEvent({id: 6637})
  
  // let val = JSON.stringify(resp)
  // console.log(val)

  // if (!fs.existsSync(cfg.path)) fs.mkdirSync(cfg.path)
  // fs.writeFileSync(cfg.path+"/test.json", val)

  // const resp = await request(cfg.url)
  
  // console.log(resp)

  const url = getDownloadUrl("https://www.hltv.org/download/demo/73220")
  console.log('url: ', url)
  console.log(parseFileName(url))
}

main()