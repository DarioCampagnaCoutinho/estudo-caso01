# Deploy de Aplicação Node.js no Kubernetes com Kind

Este projeto demonstra como fazer o deploy de uma aplicação Node.js em um cluster Kubernetes local usando Kind (Kubernetes IN Docker).

## 📋 Pré-requisitos

- Docker instalado e rodando
- Kind instalado ([guia de instalação](https://kind.sigs.k8s.io/docs/user/quick-start/))
- kubectl instalado e configurado
- Aplicação Node.js containerizada (imagem `node-api-docker`)

## 🏗️ Estrutura do Projeto

```
estudo-caso01/
├── kubernetes/
│   └── manifest.yaml    # Manifesto com deployment e service
├── Dockerfile           # Para criar a imagem node-api-docker
├── app.js              # Aplicação Node.js
└── README.md           # Este arquivo
```

## 🚀 Passo a Passo para Deploy

### 1. Preparar o Cluster Kind

```bash
# Criar o cluster (se não existir)
kind create cluster --name cluster-apis

# Verificar se o cluster foi criado
kind get clusters

# Configurar kubectl para usar o cluster
kubectl config use-context kind-cluster-apis
```

### 2. Carregar a Imagem Docker

```bash
# Carregar a imagem local no cluster Kind
kind load docker-image node-api-docker --name cluster-apis
```

**Saída esperada:**
```
Image: "node-api-docker" with ID "sha256:ec855033d9f..." not yet present on node "cluster-apis-control-plane", loading...
```

### 3. Deploy da Aplicação

```bash
# Aplicar os manifestos Kubernetes
kubectl apply -f .\kubernetes\manifest.yaml
```

**Saída esperada:**
```
deployment.apps/api-node created
service/api-node created
```

### 4. Verificar o Deploy

```bash
# Verificar status dos pods
kubectl get pods
```

**Saída esperada:**
```
NAME                        READY   STATUS    RESTARTS   AGE
api-node-5b7f9957db-l6tg5   1/1     Running   0          58s
```

```bash
# Verificar logs da aplicação
kubectl logs deploy/api-node
```

**Saída esperada:**
```
Servidor rodando na porta 8080
```

## 🔍 Comandos de Verificação

### Status Geral
```bash
# Ver todos os recursos
kubectl get all

# Ver detalhes do deployment
kubectl describe deployment api-node

# Ver detalhes do service
kubectl describe service api-node
```

### Logs e Monitoramento
```bash
# Logs em tempo real
kubectl logs -f deploy/api-node

# Logs de um pod específico
kubectl logs api-node-5b7f9957db-l6tg5
```

### Informações do Cluster
```bash
# Ver contexto atual
kubectl config current-context

# Informações do cluster
kubectl cluster-info

# Listar nodes
kubectl get nodes
```

## 🌐 Acessando a Aplicação

Para acessar a aplicação, você pode usar port-forward:

```bash
# Fazer port-forward do service
kubectl port-forward service/api-node 8080:8080
```

Depois acesse: `http://localhost:8080`

## 🧹 Limpeza

### Remover a Aplicação
```bash
# Remover recursos da aplicação
kubectl delete -f .\kubernetes\manifest.yaml
```

### Remover o Cluster
```bash
# Deletar o cluster Kind (opcional)
kind delete cluster --name cluster-apis
```

## 📝 Notas Importantes

1. **Imagem Local**: A imagem `node-api-docker` deve existir localmente antes de carregar no Kind
2. **Contexto**: Certifique-se de estar no contexto correto (`kind-cluster-apis`)
3. **Namespace**: Por padrão, os recursos são criados no namespace `default`
4. **Port-forward**: Necessário para acessar a aplicação externamente

## 🐛 Solução de Problemas

### Cluster não encontrado
```bash
# Verificar clusters disponíveis
kind get clusters

# Se não existir, criar
kind create cluster --name cluster-apis
```

### Pod não inicia
```bash
# Ver eventos do pod
kubectl describe pod <nome-do-pod>

# Ver logs detalhados
kubectl logs <nome-do-pod> --previous
```

### Imagem não encontrada
```bash
# Verificar se a imagem foi carregada
docker exec -it cluster-apis-control-plane crictl images

# Recarregar se necessário
kind load docker-image node-api-docker --name cluster-apis
```

## ✅ Status do Deploy

- [x] Cluster Kind criado
- [x] Imagem Docker carregada
- [x] Deployment criado
- [x] Service criado  
- [x] Pod rodando com sucesso
- [x] Aplicação respondendo na porta 8080

---

**Desenvolvido como parte do estudo de Kubernetes com Kind** 🚀