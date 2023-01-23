### Discord Bot

> (Open Source Project) Simple discord bot application integrated with open ai, Quran, and Prayer Schedule

---

## Table of contents

- [Table of contents](#table-of-contents)
- [Prerequiste](#prerequiste)
- [Depedencies](#depedencies)
- [Resources](#resources)
- [Installation and Cofiguration](#installation)
- [Screen Capture](#capture)

## Prerequiste

- [node js](https://nodejs.org/en/) - Download and Install Composer

## Depedencies

- dotenv
- date-fns
- discord.js
- openai

## Resources

- [Jadwal Sholat / Prayer Schedule](https://github.com/lakuapik/jadwalsholatorg)
- [surah](https://github.com/rioastamal/quran-json)
- [Open AI](https://beta.openai.com/docs/introduction)

## Installation

1. Clone repository

```bash
$ git clone https://github.com/Zainal21/discord-bot.git
```

2. move to directory project and Install depedencies

```bash

$ cd discord-bot

$ yarn install or npm install
```

3. Setup your environment variabl in `.env` files or rename `.env.example to .env`.

4. run script and scan qr code to your phone

```bash
$  node deploy-command.js // for initialize discord command handler
$  node app.js
```

## Screen Capture Result

- Jadwal Sholat / Prayer Schedule
  ![result](screen/image1.png)

- Surah
  ![surah](screen/image3.png)

- Open AI Answer Question
  ![result](screen/image2.png)

---

Copyright © 2023 by Muhamad Zainal Arifin
