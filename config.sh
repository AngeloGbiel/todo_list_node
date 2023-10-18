#/bin/bash
# Instalação dos recursos necessários para rodar a aplicação Todo List
# Ao baixar esse arquivo, executar o comando chmod +x config.sh

installation_default(){ #instalação padrão para qualquer distribuição

    sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose #instala o docker compose
    chmod +x /usr/local/bin/docker-compose #torna o docker compose um executável
    systemctl start docker.service #inicia o docker (caso não esteja)
    systemctl enable docker.service #faz com que o docker inicie sempre que ligar a máquina
    echo "$(systemctl status docker.service)" > /tmp/logs_aplicação.txt # salva os logs

    curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl" #Baixa o kubectl
    chmod +x kubectl #torna o kubectl um executável
    sudo mv kubectl /usr/local/bin/ #move o kubectl para os arquivos de binário, permitindo executá-lo facilmente
    echo "$(kubectl version --client)" >> /tmp/logs_aplicação.txt # Salva os logs

    sleep 20 #dar um tempo de 20 segundos antes de atribuir o grupo docker ao usuário

    sudo usermod -aG docker $(whoami) # atribui ao usuário o grupo do docker
    
}

installation(){
    local PACKAGE_MANAGER=$1
    local diretory="$HOME/Downloads"
    if [ "$PACKAGE_MANAGER" == "apt-get" ]; then
        if [ -e "$diretory" ]; then
            cd $diretory
        fi
        sudo apt-get install -y docker.io git #instala o docker e o git (ubuntu)
        
        installation_default

        curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
        sudo dpkg -i minikube_latest_amd64.deb #instala o minikube (ubuntu)
        minikube start #inicia o minikube

        #Baixar e importar o Nodesource GPG key para o node.js
        sudo apt-get update
        sudo apt-get install -y ca-certificates curl gnupg
        sudo mkdir -p /etc/apt/keyrings
        curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
        
        #Baixar o node versão 18
        NODE_MAJOR=18 
        echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
        sudo apt-get update
        sudo apt-get install nodejs -y

        sudo reboot #reinicia a máquina

    elif [ "$PACKAGE_MANAGER" == "yum" ]; then 
        if [ -e "$diretory" ]; then
            cd $diretory
        fi
        sudo yum install -y docker git #instala o docker e o git (ubuntu)
        
        installation_default

        curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 #baixar o minikube
        sudo install minikube-linux-amd64 /usr/local/bin/minikube #instalar o minikube
        minikube start #inicia o minikube
        
        #Baixar o node versão 18
        sudo yum install https://rpm.nodesource.com/pub_18.x/nodistro/repo/nodesource-release-nodistro-1.noarch.rpm -y
        sudo yum install nodejs -y --setopt=nodesource-nodejs.module_hotfixes=1
        
        sudo reboot #reinicia a máquina

    fi
}

if command -v apt-get &> /dev/null; then
    PACKAGE_MANAGER="apt-get"
    installation $PACKAGE_MANAGER
    
elif command -v yum &> /dev/null; then
    PACKAGE_MANAGER="yum"
    installation $PACKAGE_MANAGER
fi
