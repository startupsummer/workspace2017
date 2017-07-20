const someFunction = () => {
  let promise = new Promise((resolve, reject) => {
    let variable = false

    // place for debugger

    setTimeout(() => {
      if (variable) {
        resolve('OK!')
      } else {
        reject(new Error('some problem'))
      }
    }, 500)
  })

  return promise
}

const anotherFunction = async () => {
  try {
    let result = await someFunction()
    console.log(result)
  } catch (err) {
    console.error(err.message)
  }
}

anotherFunction()
