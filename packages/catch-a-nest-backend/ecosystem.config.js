module.exports = {
  apps: [
    {
      name: 'catch-a-nest-backend',
      script: 'ts-node',
      args: '-r tsconfig-paths/register --transpile-only src/index.ts',
      exec_mode: 'cluster',
      instances: 2,
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      key: '~/documents/pem/gh_rsa',
      user: 'ubuntu',
      host: process.env.HOST_ADDRESS,
      ref: 'origin/master',
      repo: 'https://github.com/JHSeo-git/catch-a-nest',
      path: '/home/ubuntu/catch-a-nest',
      'pre-deploy-local': '',
      'post-deploy': 'yarn install && yarn reload:pm2',
      'pre-setup': '',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
