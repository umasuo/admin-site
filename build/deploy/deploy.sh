#! /bin/bash
set -e

#for credentials
echo '=============================gcloud config set certificate========================='
gcloud config set container/use_client_certificate True
echo '=============================finish gcloud config set certificate=================='

#decode gcloud service key to .json file
echo '=============================decode gcloud service key============================='
echo $GCLOUD_SERVICE_KEY | base64 --decode > ${HOME}/gcloud-service-key.json
echo '=============================finish decode gcloud service key======================'

#config gcloud auth activae service accout by .json file
echo '=============================gcloud auth accout config============================='
gcloud auth activate-service-account --key-file=${HOME}/gcloud-service-key.json
echo '=============================finish gcloud auth accout config======================'

#gcloud config project
#${PROJECT_NAME} come from travis setting
echo '=============================gcloud config project================================='
echo ${PROJECT_NAME}
gcloud --quiet config set project ${PROJECT_NAME}
echo '=============================finish gcloud config project=========================='

#gcloud config cluster
#${CLUSTER_NAME} come from travis setting
echo '=============================gcloud config container cluster======================='
echo ${CLUSTER_NAME}
gcloud --quiet config set container/cluster ${CLUSTER_NAME}
echo '=============================finish config container cluster======================='

#gcloud config compute zone
#${CLUSTER_COMPUTE_ZONE} come from travis setting
echo '=============================gcloud config compute zone============================'
echo ${CLUSTER_COMPUTE_ZONE}
gcloud --quiet config set compute/zone ${CLUSTER_COMPUTE_ZONE}
echo '=============================finish gcloud config compute zone====================='

#gcloud config cluster credentials
#${CLUSTER_NAME} come from travis setting
echo '=============================gcloud config cluster credentials====================='
echo ${CLUSTER_NAME}
gcloud --quiet container clusters get-credentials ${CLUSTER_NAME}
echo '=============================finish gcloud container cluster credentials==========='

#kubectl create deployments and service by .yaml file
echo '=============================kubectl create yaml==================================='
kubectl delete deployment developer-site --ignore-not-found=true
kubectl create -f ./build/deploy/k8s_deployment.yaml
echo '=============================finish kubectl create yaml============================'
