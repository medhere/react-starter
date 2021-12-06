module.exports = {
  apps : [
  {
    name   : "reactapp",
    script : "react-scripts",
    args   :"start",
    ignore_watch: ['/node_modules','/server/sessions',]
  },
  {
    name   : "webapp",
    script : "serve",
    args   :"build, 5000",
    watch  : true,
    ignore_watch: ['/node_modules','/server/sessions','src']
  }
  ]
}
