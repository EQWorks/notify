const axios = require('axios')

module.exports.deployment = ({
  project = 'Unknown Project',
  success = true,
  stage = 'dev',
  commit = 'Unknown Commit',
  build_link: title_link = '',
  slack_hook = process.env.SLACK_HOOK,
}) => {
  const color = success ? 'good' : 'danger'
  const title = `${project} (${stage}) deployment ${success ? 'succeeded' : 'failed'}`
  const projLink = `https://github.com/${project}${commit ? `/commit/${commit}` : ''}`
  const footer = `<${projLink}|${project}${commit ? `#${commit}` : ''}>`
  const attachment = {
    mrkdwn_in: ['text'],
    color,
    title,
    title_link,
    fallback: title,
    footer,
    ts: Math.floor(Date.now() / 1000),
  }
  return axios.post(slack_hook, { attachments: [attachment] })
    .then(() => {
      console.log('Deployment notification sent to Slack')
    }).catch(e => console.error(e.response.data || e.toJSON()))
}
