var path = require('path')
var cp = require('shelljs').cp
var config = require('../config')
var ora = require('ora')
var exec = require('child_process').exec
var package = require('../package.json')

// copy addition files for docker image
var dockerFilesPath = path.resolve(__dirname, 'docker/*')
cp('-R', dockerFilesPath, config.build.assetsRoot)

// indicate building process is running
var spinner = ora('Building docker image...')
spinner.start()

// run docker bash command to build image
exec(`docker build -t evacloud/${package.name}:${package.version} .`, {
  cwd: config.build.assetsRoot
}, (error, stdout, stderr) => {
  spinner.stop()

  // print out docker logs
  console.log('\n\n=========== Docker image building output ===========')
  if (error) {
    console.error(`Error when building docker image: ${error}`)
    return
  }
  console.log(`Stdout: ${stdout}`)
  console.log(`Stderr: ${stderr}`)
  console.log('====================================================\n')
})
