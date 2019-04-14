cf create-service postgresql v9.6-dev my-db
cf create-service xsuaa application my-uaa -c ../src/xsuaa/xs-security.json
cf create-service portal-services site-content my-portal-content -c portal-content/portal.json
cf create-service portal-services site-host my-portal-host -c portal-content/portal.json
cf create-service-key my-uaa run-local
cf create-service-key my-portal-host run-local
