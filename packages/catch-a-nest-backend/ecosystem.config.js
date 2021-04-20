module.exports = {
  apps: [
    {
      name: 'catch-a-nest-backend',
      script: 'ts-node',
      args: '-r tsconfig-paths/register --transpile-only src/index.ts',
      exec_mode: 'cluster',
      instances: 2,
    },
  ],
};
