 #!/bin/bash 
meteor build --debug --directory .test
dandelion --config=deploy-test.yml deploy
