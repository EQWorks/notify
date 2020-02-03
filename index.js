#!/usr/bin/env node
const lib = require('./lib')

if (require.main === module) {
  require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command(
    'deployment <project>',
    'Notify Slack of given <project>',
    yargs => yargs
      .positional('project', { type: 'string' })
      .option('success', {
        type: 'boolean',
        default: true,
        description: 'Deployment was successful or not',
      })
      .option('stage', {
        type: 'string',
        default: 'dev',
        description: 'Project stage',
      })
      .option('commit', { type: 'string' })
      .option('build_link', { type: 'string' })
      .option(
        'slack_hook',
        { description: 'Slack Incoming Webhook, falls back to $SLACK_HOOK env variable' },
      )
    ,
    lib.deployment,
  )
  .demandCommand()
  .help()
  .argv
} else {
  module.exports = lib
}
