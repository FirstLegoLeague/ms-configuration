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
