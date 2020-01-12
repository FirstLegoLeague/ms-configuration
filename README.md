[![npm](https://img.shields.io/npm/v/@first-lego-league/ms-configuration.svg)](https://www.npmjs.com/package/@first-lego-league/ms-configuration)
[![codecov](https://codecov.io/gh/FirstLegoLeague/ms-configuration/branch/master/graph/badge.svg)](https://codecov.io/gh/FirstLegoLeague/ms-configuration)
[![Build status](https://ci.appveyor.com/api/projects/status/ec89gr4r94v7haxt/branch/master?svg=true)](https://ci.appveyor.com/project/2roy999/ms-configuration/branch/master)
[![GitHub](https://img.shields.io/github/license/FirstLegoLeague/ms-configuration.svg)](https://github.com/FirstLegoLeague/ms-configuration/blob/master/LICENSE)

[![David Dependency Status](https://david-dm.org/FirstLegoLeague/ms-configuration.svg)](https://david-dm.org/FirstLegoLeague/ms-configuration)
[![David Dev Dependency Status](https://david-dm.org/FirstLegoLeague/ms-configuration/dev-status.svg)](https://david-dm.org/FirstLegoLeague/ms-configuration#info=devDependencies)
[![David Peer Dependencies Status](https://david-dm.org/FirstLegoLeague/ms-configuration/peer-status.svg)](https://david-dm.org/FirstLegoLeague/ms-configuration?type=peer)

# FIRST LEGO League Configuration
A Configuration package, working according to the _FIRST_ LEGO League TMS [Module Standard configuration section](https://github.com/FirstLegoLeague/architecture/blob/master/module-standard/v1.0-SNAPSHOT.md#configuration).

## Logic
This package is connected to the Launcher configuration MHub node, using the [ms-messenger](https://github/FirstLegoLeague/ms-messenger) package. It holds an in-memory state of the configuration data saved in the launcher, and allows the user to both get and set it, using MHub messages.

## Usage

You can set and get fields in the following ways:  
```javascript
const config = require('@first-lego-league/ms-configuration')
config.set('some-field-name', someFieldValue)
config.setMultiple([{ name: 'field1-name', value: 'field1-value' }, { name: 'field2-name', value: 'field2-value' }, ...])

config.get('some-field-name') // returns field value
config.all() // returns an object of key-value pairs containing all of the configuration field names.

```

## Contribution
To contribute to this repository, simply create a PR and set one of the Code Owners to be a reviewer.
Please notice the linting and UT, because they block merge.
Keep the package lightweight and easy to use.
Thank you for contributing!