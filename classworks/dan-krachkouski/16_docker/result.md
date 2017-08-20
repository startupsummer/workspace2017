List of containers that is running on my machine:

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
97bba5679c57        hello-world         "/bin/sh -c 'node ..."   31 seconds ago      Up 30 seconds       0.0.0.0:3334->3000/tcp   objective_stallman
5152673c4a63        hello-world         "/bin/sh -c 'node ..."   53 seconds ago      Up 52 seconds       0.0.0.0:3333->3000/tcp   stoic_roentgen
```

Commands for replacement:

```
docker exec -it  objective_stallman bash
cat replacement.js > app.js 
exit
```

Logs:

```
Example app listening on port 3000!
This is the secret message for Startup Summer students!
This is SSSSUPER the secret message for Startup Summer students!
Example app listening on port 3000!
```

Commands for new file:

```
docker exec objective_stallman touch test-message.js
```

Logs:

```
This is the secret message for Startup Summer students!
This is SSSSUPER the secret message for Startup Summer students!
You have successfully completed your task. Congrats!
Your id is:  97bba5679c57
Example app listening on port 3000!
```

