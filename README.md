# notify

CLI for sending various notifications (currently only through Slack incoming webhooks).

## Usage

```shell
% npm i -g @eqworks/notify
% notify --help
% # Or through `npx`
% npx @eqworks/notify --help
```

To use the underlying library directly in supported JavaScript environments (local installation needed):

```js
const notify = require('@eqworks/notify/lib');
// or
import notify from '@eqworks/notify/lib';
```
