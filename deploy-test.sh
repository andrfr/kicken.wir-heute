 #!/bin/bash 
meteor build --debug --directory .test
rsync -av --delete .test/bundle/ feintest@arcturus.uberspace.de:~/html/kicken-wir-heute/

