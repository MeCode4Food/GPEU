
.PHONY: env
env: destroy
	docker-compose -f ./dockerfiles/docker-compose.yml up -d

.PHONY: destroy
destroy:
	docker-compose -f ./dockerfiles/docker-compose.yml down
