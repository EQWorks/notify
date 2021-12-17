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
// since v2.0.0
const notify = require('@eqworks/notify/lib')
// or
import notify from '@eqworks/notify/lib'
```

Note: pre-v2.0.0, the library export was dispatched from the package index:

```js
// For @eqworks/notify < v2.0.0
const notify = require('@eqworks/notify')
// or
import notify from '@eqworks/notify'
```
