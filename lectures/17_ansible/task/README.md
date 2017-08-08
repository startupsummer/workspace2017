## Lecture task

The main objective of the task is to learn docker deployment via Ansible

Mandatory task:

1. Create simple koa.js hello-world application (or you can reuse app which already exists)
2. Write Dockerfile for application deployment
3. Create ansible project structure in following way:
```
vars
   variables.yml
hosts
   local
files
   deploy-app.sh
roles
   angstwad.docker_ubuntu
deploy-app.yml
requirements.yml
ansible.cfg
.gitignore
```

3. Write ansible playbook which will deploy your app to `localhost`
4. App should be accessible at `localhost:9999`

### Once finished..

1. Call a lecturer and show that app is available on port 9999
2. show that you have built and running docker container
