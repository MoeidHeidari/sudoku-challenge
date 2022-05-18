.PHONY: skaffold-dev
skaffold-dev:
	skaffold dev --auto-build --auto-deploy --tail --cleanup

.PHONY: skaffold-debug
skaffold-debug:
	skaffold debug --auto-build --auto-deploy --tail --cleanup

.PHONY: encrypt-secrets
encrypt-secrets:
	helm secrets enc k8s/secrets.yaml