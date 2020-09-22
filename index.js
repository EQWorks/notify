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
      .option('status', { type: 'string', description: 'CI status, success|failure|cancelled' })
      .option('success', { type: 'boolean', description: 'DEPRECATED, use status instead' })
      .option('stage', { type: 'string', default: 'dev', description: 'Project stage' })
      .option('commit', { type: 'string' })
      .option('build_link', { type: 'string' })
      .option('slack_hook', { description: 'Slack webhook, falls back to $SLACK_HOOK env var' })
    ,
    lib.deployment,
  )
  .command(
    'send <title>',
    'Notify Slack with <title> message',
    yargs => yargs
      .positional('title', { type: 'string', alias: 'message' })
      .option('status', { type: 'string', description: 'CI status, success|failure|cancelled' })
      .option('link', { type: 'string', description: 'URL the message should be linked to' })
      .option('slack_hook', { description: 'Slack webhook, falls back to $SLACK_HOOK env var' })
    ,
    lib.send,
  )
  .demandCommand()
  .help()
  .argv
} else {
  module.exports = lib
}
