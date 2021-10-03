module.exports = {
  apps : [{
    name   : "project08",
    script : "./bin/www",
    env: {
      "NODE_ENV": "production",     
      "PORT": "3008",
    }
  }]
}
