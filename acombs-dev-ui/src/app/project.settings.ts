// Generated from project.json and state\cognito-pool.json by Sync-UiConfig in scripts\common.ps1,
// which start-all and deploy-ui run before building. Edit those files, not this one.
export const PROJECT_SETTINGS = {
  appName: 'acombs-dev',
  developerName: 'Adam Combs',
  apiUrl: 'https://api.acombs-dev.com',
  auth: {
    userPoolId: 'us-east-2_Rs0wQBcYd',
    userPoolClientId: '14119jlt4r39s6m8rb7h4rl89k',
    domain: 'acombs-dev-acombs.auth.us-east-2.amazoncognito.com',
    redirectSignIn: ['http://localhost:4200/', 'https://acombs-dev.com/'],
    redirectSignOut: ['http://localhost:4200/', 'https://acombs-dev.com/'],
  },
};
