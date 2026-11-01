# Plano — Export/Import JSON
1. Spec SDD em docs/specs/export-import-sdd.md.
2. TDD vitest: criar src/utils/__tests__/exportImport.test.js cobrindo serialize (lista vazia/completa), parse (JSON válido/malformado/não-array/item sem title) e merge (dedup por id, makeId para novos/colidentes).
3. Implementar src/utils/exportImport.js até os testes passarem.
4. UI em HomePage.jsx (+SCSS): botões Exportar/Importar no topo consumindo tokens DSv1 e SnackBar para feedback.
5. Smoke Playwright tests/e2e/export-import.pw.spec.ts do fluxo completo.
6. Rodar lint + test + test:e2e na branch feature/export-import-json.
7. Commit → push → PR para main → self-review COMMENT → merge squash.
8 Ao concluir desenvolvimento criar subtarefa dedicada de publicação.