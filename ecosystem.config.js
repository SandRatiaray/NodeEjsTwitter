module.exports = {
  apps : [{
    script: './bin/www',
    watch: '.',
    instances:'max',
    env:{
      NODE_ENV:'development'
    },
    env_production:{
      NODE_ENV:'production'
    }
  }],
};
