 #!/bin/bash 
meteor build --directory .build
rsync -av --delete .build/bundle/ feinkick@sirius.uberspace.de:~/apps/kicken-wir-heute/
ssh feinkick@sirius.uberspace.de <<'ENDSSH'
cd ~/apps/kicken-wir-heute/programs/server
npm install
ENDSSH
