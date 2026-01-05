PRAGMA foreign_keys = ON;

-- users: пользователи маркетплейса
CREATE TABLE IF NOT EXISTS users (
    id          TEXT PRIMARY KEY,          -- id пользователя (строковый, например "U1" или UUID)
    nickname    TEXT NOT NULL,             -- отображаемый никнейм
    role        TEXT NOT NULL,             -- роль пользователя
    login       TEXT NOT NULL UNIQUE,      -- логин (не сменяемый, уникальный)
    created_at  INTEGER NOT NULL           -- timestamp создания (INTEGER; единицы выбираете вы: сек/мс)
);

-- users_auth: аутентификация пользователя (1↔1 с users через UNIQUE(user_id))
CREATE TABLE IF NOT EXISTS users_auth (
    id          TEXT PRIMARY KEY,          -- id записи аутентификации (строковый)
    user_id     TEXT NOT NULL UNIQUE,      -- FK на users.id (1↔1)
    token_hash  TEXT NOT NULL,             -- хеш пароля/токена
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- user_restrictions: ограничения пользователя (1↔N)
CREATE TABLE IF NOT EXISTS user_restrictions (
    id          TEXT PRIMARY KEY,          -- id ограничения
    user_id     TEXT NOT NULL,             -- кому выдано (FK users.id)
    type        TEXT NOT NULL              -- тип ограничения
    CHECK (type IN ('CHAT','SELL','BUY','WITHDRAW','LOGIN')),
    until_ts    INTEGER NOT NULL,          -- до какого времени действует (INTEGER)
    reason      TEXT NOT NULL,             -- причина
    by_id       TEXT,                      -- кто выдал (может быть не users, например "U_ADMIN"; поэтому без FK)
    created_at  INTEGER NOT NULL,          -- когда выдано (INTEGER)
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- listings: объявления
CREATE TABLE IF NOT EXISTS listings (
    id          TEXT PRIMARY KEY,          -- id объявления
    seller_id   TEXT NOT NULL,             -- продавец (FK users.id)
    type        TEXT NOT NULL              -- тип товара/объявления
    CHECK (type IN ('CARD')),
    created_at  INTEGER NOT NULL,          -- время создания (INTEGER)
    status      TEXT NOT NULL              -- статус объявления
    CHECK (status IN ('DRAFT','ACTIVE','RESERVED','SOLD','ARCHIVED')),
    name        TEXT NOT NULL,             -- название объявления
    description TEXT NOT NULL,             -- описание объявления
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- item_cards: детали товара типа CARD (1↔1 к listing через UNIQUE(listing_id))
CREATE TABLE IF NOT EXISTS item_cards (
    id          TEXT PRIMARY KEY,          -- id записи деталей товара
    listing_id  TEXT NOT NULL UNIQUE,      -- к какому объявлению (FK listings.id), 1↔1
    bank        TEXT NOT NULL,             -- "bank" из доменной модели
    holder_name TEXT NOT NULL,             -- "name" из доменной модели (имя на карте)
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- deals: сделки (объявление может быть продано в рамках максимум 1 сделки => UNIQUE(listing_id))
CREATE TABLE IF NOT EXISTS deals (
    id          TEXT PRIMARY KEY,          -- id сделки
    listing_id  TEXT NOT NULL UNIQUE,      -- объявление (FK listings.id), 1↔1 listing->deal
    seller_id   TEXT NOT NULL,             -- продавец (FK users.id)
    buyer_id    TEXT NOT NULL,             -- покупатель (FK users.id)
    status      TEXT NOT NULL              -- статус сделки
    CHECK (status IN ('PENDING_PAYMENT','IN_ESCROW','FULFILLED','COMPLETE','CANCELLED','DISPUTED')),
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE RESTRICT,
    FOREIGN KEY (seller_id)  REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (buyer_id)   REFERENCES users(id) ON DELETE RESTRICT
);

-- payments: платежи (1↔1 к deal через UNIQUE(deal_id))
CREATE TABLE IF NOT EXISTS payments (
    id          TEXT PRIMARY KEY,          -- id платежа
    deal_id     TEXT NOT NULL UNIQUE,      -- к какой сделке (FK deals.id), 1↔1
    status      TEXT NOT NULL              -- статус платежа
    CHECK (status IN ('INIT','AUTHORIZED','IN_ESCROW','RELEASED','REFUNDED','FAILED')),
    price       INTEGER NOT NULL,          -- цена в минимальных единицах (например, копейки)
    FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE CASCADE
);

-- deliveries: доставка (1↔1 к deal через UNIQUE(deal_id))
CREATE TABLE IF NOT EXISTS deliveries (
    id              TEXT PRIMARY KEY,      -- id доставки
    deal_id         TEXT NOT NULL UNIQUE,  -- к какой сделке (FK deals.id), 1↔1
    status          TEXT NOT NULL          -- статус доставки
    CHECK (status IN ('PENDING','IN_TRANSIT','COMPLETE')),
    track_number    INTEGER,               -- трек-номер (NULL если нет)
    departure_place TEXT NOT NULL,         -- место отправления
    delivery_place  TEXT,                  -- место поступления/получения (NULL если нет)
    FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE CASCADE
);

-- evaluations: отзыв (1↔1 к deal)
CREATE TABLE IF NOT EXISTS evaluations (
    id          TEXT PRIMARY KEY,          -- id отзыва
    deal_id     TEXT NOT NULL UNIQUE,      -- к какой сделке (FK deals.id), 1↔1
    type        TEXT NOT NULL              -- тип ("like"/"dislike")
    CHECK (type IN ('like','dislike')),
    comment     TEXT NOT NULL,             -- комментарий
    created_at  INTEGER NOT NULL,          -- время создания (INTEGER)
    FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE CASCADE
);

-- chats: чат по сделке (1↔1 к deal)
-- Денормализация: last_message_id / last_message_at поддерживаются триггерами ниже.
CREATE TABLE IF NOT EXISTS chats (
    id              TEXT PRIMARY KEY,      -- id чата
    deal_id         TEXT NOT NULL UNIQUE,  -- сделка (FK deals.id), 1↔1
    buyer_see_time  INTEGER NOT NULL,      -- время последнего просмотра покупателем
    seller_see_time INTEGER NOT NULL,      -- время последнего просмотра продавцом
    last_message_id TEXT,                  -- id последнего сообщения (денормализация)
    last_message_at INTEGER,               -- время последнего сообщения (денормализация)
    FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE CASCADE
);

-- messages: сообщения (1↔N к chats)
CREATE TABLE IF NOT EXISTS messages (
    id          TEXT PRIMARY KEY,          -- id сообщения
    chat_id     TEXT NOT NULL,             -- чат (FK chats.id)
    user_id     TEXT NOT NULL,             -- автор (FK users.id)
    created_at  INTEGER NOT NULL,          -- время сообщения (INTEGER)
    text        TEXT NOT NULL,             -- текст
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_listings_seller_id     ON listings(seller_id);
CREATE INDEX IF NOT EXISTS idx_deals_seller_id        ON deals(seller_id);
CREATE INDEX IF NOT EXISTS idx_deals_buyer_id         ON deals(buyer_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id       ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_restrictions_user_id   ON user_restrictions(user_id);

-- Триггер: при вставке сообщения обновить last_message_* в chats
CREATE TRIGGER IF NOT EXISTS trg_chats_last_message_ai
AFTER INSERT ON messages
FOR EACH ROW
BEGIN
UPDATE chats
SET last_message_id = NEW.id,
    last_message_at = NEW.created_at
WHERE id = NEW.chat_id
  AND (last_message_at IS NULL OR NEW.created_at >= last_message_at);
END;

-- Триггер: при удалении сообщения пересчитать last_message_* для чата
CREATE TRIGGER IF NOT EXISTS trg_chats_last_message_ad
AFTER DELETE ON messages
FOR EACH ROW
BEGIN
UPDATE chats
SET last_message_id = (
    SELECT id FROM messages
    WHERE chat_id = OLD.chat_id
    ORDER BY created_at DESC
    LIMIT 1
    ),
    last_message_at = (
SELECT created_at FROM messages
WHERE chat_id = OLD.chat_id
ORDER BY created_at DESC
    LIMIT 1
    )
WHERE id = OLD.chat_id;
END;
