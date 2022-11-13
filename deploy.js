const {exec} = require('child_process');

function main() {
  const projects = [
    {folder: 'grpc-nest-api-gateway', cmd: 'yarn proto:all'},
    {folder: 'grpc-nest-auth-svc', cmd: 'yarn proto:auth'},
    {folder: 'grpc-nest-order-svc', cmd: 'yarn proto:all'},
    {folder: 'grpc-nest-product-svc', cmd: 'yarn proto:product'},
  ];

  const delayLoop = (fn, delay) => {
    return (item, i) => {
      setTimeout(() => {
        fn(item);
      }, i * delay);
    }
  };

  projects.forEach(delayLoop(
    (project) => {
      console.info(`## - Move to ${project.folder}`);
      exec(`cd ../${project.folder} && ${project.cmd}`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }

        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }

        console.log(`stdout: ${stdout}`);
      });
    },
    1500
  ));
}

main();
