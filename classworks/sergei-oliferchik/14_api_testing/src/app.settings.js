module.exports = {
  joiOptions: {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: {
      objects: true
    }
  },
  notBlankRegExp: /[^\s]+/,
  uriOptions: {
    schema: [
      'https',
      'ftp',
      'gopher',
      'telnet',
      'file',
      'notes',
      'ms-help'
    ]
  },
  emailOptions: {
    minDomainAtoms: 2
  },
  hexRegExp: /^#(?:[0-9a-f]{3}){1,2}$/
}
