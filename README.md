# Músicas App

App mobile para cadastrar músicas descobertas. Feito com React Native e Expo.

## Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR Code com o app **Expo Go** no celular, ou pressione `a` para abrir no emulador Android.

> **Atenção:** antes de rodar, verifique o endereço da API em `src/services/api.js`:
> - Emulador Android: `http://10.0.2.2:3333`
> - Celular físico: `http://SEU_IP:3333`

## O que o app faz

- Listar músicas cadastradas
- Adicionar nova música (título, artista, gênero, nota)
- Editar uma música existente
- Deletar uma música

## Dependências principais

- Expo ~52
- React Navigation
- Axios
