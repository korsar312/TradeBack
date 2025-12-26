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
		status: "COMPLETE",
	},
};

export const listing = {
	I1: {
		id: "I1", // id объявления
		dealId: "L1", // id связей

		type: "CARD", // тип товара продажи
		createdAt: 1710000000, // время создания объявления
		status: "ARCHIVED", // статус объявления
		name: "Classic", // название данное продавцом
		desc: "Именная карта", // описание данное продавцом

		info: {
			bank: "loto", // некие данные зависимые от типа товара
			name: "Иван Петров", // некие данные зависимые от типа товара
		},
	},
};

export const payment = {
	P1: {
		id: "P1", // id оплаты
		dealId: "L1", // id связей

		status: "IN_FREEZE", // статус продажи предмета
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

		nickname: "TopSeller", // позывной выбранный пользоватем
		restrictions: {
			chat: { until: 1710090000, reason: "SPAM", byId: "U1", createdAt: 34343434434 },
			sell: { until: 1710090000, reason: "SPAM", byId: "U1", createdAt: 34343434434 },
		},
		login: "top_seller", // логин пользователя (не сменяемый)
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
