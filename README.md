[![npm](https://img.shields.io/npm/v/@first-lego-league/ms-configuration.svg)](https://www.npmjs.com/package/@first-lego-league/ms-configuration)
[![codecov](https://codecov.io/gh/FirstLegoLeague/ms-configuration/branch/master/graph/badge.svg)](https://codecov.io/gh/FirstLegoLeague/ms-configuration)
[![Build status](https://ci.appveyor.com/api/projects/status/ec89gr4r94v7haxt/branch/master?svg=true)](https://ci.appveyor.com/project/2roy999/ms-configuration/branch/master)
[![GitHub](https://img.shields.io/github/license/FirstLegoLeague/ms-configuration.svg)](https://github.com/FirstLegoLeague/ms-configuration/blob/master/LICENSE)

[![David Dependency Status](https://david-dm.org/FirstLegoLeague/ms-configuration.svg)](https://david-dm.org/FirstLegoLeague/ms-configuration)
[![David Dev Dependency Status](https://david-dm.org/FirstLegoLeague/ms-configuration/dev-status.svg)](https://david-dm.org/FirstLegoLeague/ms-configuration#info=devDependencies)
[![David Peer Dependencies Status](https://david-dm.org/FirstLegoLeague/ms-configuration/peer-status.svg)](https://david-dm.org/FirstLegoLeague/ms-configuration?type=peer)

# MS-Configuration

A configuration package supporting the MS (Module Standard)

## Usage

First, install the package:
`npm install @first-lego-league/ms-configuration`

Or use yarn (prefered):  
`yarn add @first-lego-league/ms-configuration`

After the installation, you can set and get fields:  
```javascript
const config = require('ms-configuration')

config.set('some-field-name', someFieldValue)

config.get('some-field-name')

config.setMultiple([{ name: 'field1-name', value: 'field1-value' }, { name: 'field2-name', value: 'field2-value' }, ...])

```

If you add the environment variable `DEV=true`, the module would log into the `default` Mhub node instead of the MS sepcified `configuration` node.

## Development
1. Fork this repository
2. make some changes
3. create a Pull Request
4. Wait for a CR from the code owner
5. make sure everything is well
6. merge

A few things to notice while developing:
* Use `yarn` not `npm`
* Follow javascript standard as described [here](https://standardjs.com/)
* Keep the package lightweight and easy to use
* Don't break API if not neccessary
* Be creative and have fun
