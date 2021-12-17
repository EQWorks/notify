const axios = require('axios')


// success, failure, or cancelled
const statusColor = (status) => ({
  success: 'good',
  failure: 'danger',
  cancelled: 'warning',
}[status] || '#eee')

const send = (extra) => ({ title, link: title_link, status, slack_hook = process.env.SLACK_HOOK }) => {
  const color = statusColor(status)
  const attachment = {
    mrkdwn_in: ['text'],
    color,
    title,
    title_link,
    fallback: title,
    ts: Math.floor(Date.now() / 1000),
    ...extra,
  }
  return axios.post(slack_hook, { attachments: [attachment] })
    .then(() => console.log('Notification sent to Slack'))
    .catch(e => console.error((e.response || {}).data || e.toJSON()))
}

module.exports.send = send()

module.exports.deployment = (params) => {
  const { success = true, status, stage = 'dev', project, commit } = params
  const projLink = `https://github.com/${project}${commit ? `/commit/${commit}` : ''}`
  const extra = { footer: `<${projLink}|${project}${commit ? `#${commit}` : ''}>` }
  if (!status) {
    extra.color = success ? 'good' : 'danger'
  }
  const title = `${project} (${stage}) deployment: ${status ? status : (success ? 'succeeded' : 'failed')}`
  return send(extra)({ ...params, title })
}
