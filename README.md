# 📔 TelegramDnevnik

> Удобный клиент для Электронного дневника Санкт-Петербурга — Telegram Mini App с оценками, расписанием, балансом питания и проходами СКУД.

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat&logo=fastapi&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-GPL--3.0-blue?style=flat)

## ✨ Возможности

- 🔑 **Вход по логину и паролю** от [dnevnik2.petersburgedu.ru](https://dnevnik2.petersburgedu.ru)
- 👨‍👩‍👧 **Несколько детей** — выбор ребёнка в один тап
- 🎓 **Оценки** — предметы, отметки и средние баллы за период
- 📅 **Расписание и домашние задания**
- 🍽 **Баланс питания** — счёт школьной столовой
- 🚪 **СКУД** — история проходов через школьные турникеты
- 👩‍🏫 **Учителя** — список преподавателей по предметам
- 🌗 **Тёмная и светлая тема**, нативный вид внутри Telegram
- 🛡 **Sentry** — мониторинг ошибок на фронте и бэке

## 🛠 Стек

| Часть | Технологии |
|---|---|
| **`web/`** | Next.js 15 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 3, Radix UI, zustand, vaul, `@telegram-apps/sdk-react`, Sentry |
| **`api/`** | Python 3.13, FastAPI, uvicorn (+uvloop), Beanie + motor (MongoDB), aiohttp-клиент к API ЭД СПБ, aiogram, Sentry |
| **Инфраструктура** | Docker Compose, nginx (реверс-прокси `/api`), Traefik labels |

## 🚀 Запуск

### Docker (рекомендуется)

```bash
docker compose up -d --build
```

Compose поднимает `api`, `web` и nginx-прокси. Требуется внешняя docker-сеть `virtual-hosts` и Traefik (конфигурация рассчитана на хост `dnevnik.kewldan.ru`). Данные API монтируются в `./data`.

### API локально

```bash
cd api
pip install -r requirements.txt
PYTHONPATH=src python src/main.py
```

При первом запуске создастся `data/config.json`, и процесс завершится — заполните конфиг и запустите снова:

| Ключ | Описание |
|---|---|
| `database_url` | Строка подключения MongoDB |
| `database_name` | Имя базы данных |
| `port` | Порт HTTP-сервера (по умолчанию 80) |
| `debug` | Режим отладки |

### Web локально

```bash
cd web
npm ci
npm run dev      # http://localhost:3000
```

Переменные окружения (`web/.env`):

| Переменная | Описание |
|---|---|
| `API_URL_ENDPOINT` | Адрес API — используется для SSR-запросов и rewrite `/api/*` |

## 📂 Структура

```
├── api/              # FastAPI-бэкенд
│   └── src/
│       ├── lib/dnevnik_api/   # клиент API ЭД СПБ
│       ├── database/          # Beanie-модели: account, child, subject
│       └── routes/            # /journal: token, children, subjects, acs, finance, teachers
├── web/              # Next.js Mini App
│   └── src/
│       ├── app/journal/       # оценки, расписание, ДЗ, настройки
│       ├── components/        # UI, drawers (баланс, СКУД), формы
│       └── lib/api/           # HTTP-клиент
├── conf.d/           # конфигурация nginx
└── docker-compose.yml
```

## 📄 Лицензия

Проект распространяется под лицензией [GPL-3.0](LICENSE).
