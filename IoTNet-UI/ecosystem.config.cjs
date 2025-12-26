module.exports = {
  apps: [
    {
      name: 'iotnet-web',
      script: 'node_modules/.bin/next',
      args: 'start -p 4000',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: '4000',
      },
      watch: false,
      out_file: 'logs/out.log',
      error_file: 'logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      autorestart: true,
      max_restarts: 5,
      restart_delay: 5000,
    },
  ],
}
