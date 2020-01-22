#!/usr/bin/env node
const axios = require('axios')

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
        description: 'Whether the deployment was successful',
      })
      .option('stage', {
        type: 'string',
        default: 'dev',
        description: 'Project stage'
      })
      .option('commit', { type: 'string' })
      .option('build_link', { type: 'string' })
      .option(
        'slack_hook',
        { description: 'Slack Incoming Webhook, falls back to $SLACK_HOOK env variable' },
      )
    ,
    ({ project, success, stage, commit, build_link, slack_hook }) => {
      const color = success ? 'good' : 'danger'
      const title = `${project} (${stage}) deployment ${success ? 'succeeded' : 'failed'}`
      const projLink = `https://github.com/${project}${commit ? `/commit/${commit}` : ''}`
      const footer = `<${projLink}|${project}${commit ? `#${commit}` : ''}>`
      const payload = {
        attachments: [{
          mrkdwn_in: ['text'],
          color,
          title,
          title_link: build_link,
          fallback: title,
          footer,
          ts: Math.floor(Date.now() / 1000),
        }],
      }
      const { SLACK_HOOK } = process.env
      axios.post(SLACK_HOOK || slack_hook, payload)
        .then(() => {
          console.log('Deployment notification sent to Slack')
        }).catch(e => console.error(e.response.data || e.toJSON()))
    },
  )
  .demandCommand()
  .help()
  .argv
