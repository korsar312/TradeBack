export const deal = {
	L1: {
		id: "L1", // id связи
		listingId: "I1", // id объявления
		paymentId: "P1", // id оплаты
		chatId: "C1", // id хедера чата
		deliveryId: "D1", // id инфы о доставке (если нет null)
		evaluationId: "E1", // id отзыва (отзыв может быть только от баера. Если нет null)
		sellerId: "U1", // id продавца
		buyerId: "U2", // id покупателя (если нет null)
		status: "COMPLETE", // PENDING_PAYMENT | IN_ESCROW | FULFILLED | COMPLETE | CANCELLED | DISPUTED
	},
};

export const listing = {
	I1: {
		id: "I1", // id объявления
		dealId: "L1", // id связей
		itemId: "IC1", // id связей

		type: "CARD", // тип товара продажи
		createdAt: 1710000000, // время создания объявления
		status: "ARCHIVED", // DRAFT | ACTIVE | RESERVED | SOLD | ARCHIVED // статус объявления
		name: "Classic", // название данное продавцом
		desc: "Именная карта", // описание данное продавцом
	},
};

export const itemCard = {
	IC1: {
		id: "IC1", // id товара
		listingId: "I1", // id лота

		bank: "loto", // некие данные зависимые от типа товара
		name: "Иван Петров", // некие данные зависимые от типа товара
	},
};

export const payment = {
	P1: {
		id: "P1", // id оплаты
		dealId: "L1", // id связей

		status: "IN_ESCROW", // INIT | AUTHORIZED | IN_ESCROW | RELEASED | REFUNDED | FAILED // статус продажи предмета
		price: 12000, // цена данная продавцом в копейках
	},
};

export const delivery = {
	D1: {
		id: "D1", // id доставки
		dealId: "L1", // id связей

		status: "COMPLETE", // статус доставки
		trackNumber: 111, // трек номер доставки (если нет null)
		departurePlace: "Москва", // место отправления
		deliveryPlace: "Тула", // место поступления (если нет null)
	},
};

export const users = {
	U1: {
		id: "U1", // id пользователя

		nickname: "TopSeller", // позывной выбранный пользователем
		login: "top_seller", // логин пользователя (не сменяемый)
		createdAt: 1710000000000, // дата создания
	},
	U2: {
		id: "U2", // id пользователя

		nickname: "BuyerOne", // позывной выбранный пользователем
		login: "buyer_one", // логин пользователя (не сменяемый)
		createdAt: 1710001000000, // дата создания
	},
};

export const userRestrictions = {
	R1: {
		id: "R1", // id рестрикции
		userId: "U1", // id пользователя

		type: "CHAT", // CHAT | SELL | BUY | WITHDRAW | LOGIN ... // тип рестрикции
		until: 1710090000000, // рестрикции до
		reason: "SPAM", // причина
		byId: "U_ADMIN", // кто выдал ограничение
		createdAt: 1710080000000, // когда выдал ограничение
	},
	R2: {
		id: "R2", // id рестрикции
		userId: "U1", // id пользователя

		type: "SELL", // тип рестрикции
		until: 1710090000000, // рестрикции до
		reason: "SPAM", // причина
		byId: "U_ADMIN", // кто выдал ограничение
		createdAt: 1710080000000, // когда выдал ограничение
	},
};

export const usersAuth = {
	A1: {
		id: "A1", // id аунтификации
		userId: "U1", // id пользователя

		tokenHash: "sha256:....", // токен - пароль
	},
};

export const evaluation = {
	E1: {
		id: "E1", // id отзыва
		dealId: "L1", // id связей

		type: "like", // хорошо плохо
		comment: "Все чётко, рекомендую", // текст отзыва
		createdAt: 1710000000, // время создания отзыва
	},
};

export const chat = {
	C1: {
		id: "C1", // id чата
		dealId: "L1", // id связей

		buyerSeeTime: 1709999000,
		sellerSeeTime: 1709999000,

		lastMessageId: "M2",
		lastMessageAt: 1709999050,
	},
};

export const message = {
	M1: {
		id: "M1", // id сообщения,
		chatId: "C1", // id чата
		userId: "U1", // id юзера

		createdAt: 1709999000, // время отправления
		text: "Актуально?", // текст
	},
	M2: {
		id: "M2", // id сообщения
		chatId: "C1", // id чата
		userId: "U2", // id юзера

		createdAt: 1709999050, // время отправления
		text: "Да", // текст
	},
};
