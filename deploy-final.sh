 #!/bin/bash 
meteor build --directory .build
rsync -av --delete .build/bundle/ feinkick@sirius.uberspace.de:~/apps/kicken-wir-heute/

